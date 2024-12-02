export const prerender = false

import type { APIRoute } from 'astro'
import { resend } from '../../lib/resend'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const email = data.get('Email')?.toString()

  // If the email field is empty, return a 404 response
  if (!email) {
    return new Response(
      JSON.stringify({
        message: 'Please fill out this field',
      }),
      {
        status: 404,
        statusText: 'Email field is empty',
      }
    )
  }

  // -------------------------
  // ------ Create User ------
  // -------------------------

  // Subscribe the user to the Resend audience
  const { data: subscribeData, error: subscribeError } = await resend.contacts.create({
    email,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Log the response from Resend
  console.log({ subscribeData, subscribeError })

  // ------------------------
  // ------ Send Email ------
  // ------------------------

  const { data: welcomeEmailData, error: welcomeEmailError } = await resend.emails.send({
    // TODO: add PPP domain to Resend update with emmie's email (ex/ emmie@powerpassengerpassage.com)
    from: 'Power Passenger Passage <josh@wavelandweb.com>',
    to: [email],
    subject: `Welcome to Power Passenger Passage, ${email}`,
    html: /* HTML */ ` <body
      style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; color: #0E1726; margin-bottom: 36px;'
    >
      <img
        alt="Power Passenger Passage Logo"
        height="auto"
        src="https://powerpassengerpassage.netlify.app/images/ppp-logo.png"
        style="display:block;outline:none;border:none;text-decoration:none;margin-top:24px;margin-bottom:24px;margin-right:auto;"
        width="150"
      />
      <p>Hi ${email},</p>
      <p>
        Thank you for signing up for Power Passenger Passage! I'm Emmie, your guide on this journey.
      </p>
      <p>
        Reach out anytime with questions, comments, or just to say hi -
        <a href="mailto:emmie@erslifecoach.com">emmie@erslifecoach.com</a>.
      </p>
      <p>Thanks again for joining, <br />Emmie</p>
      <p>
        <a href="mailto:emmie@erslifecoach.com" target="_blank">Email</a>
        |
        <a href="https://www.instagram.com/erslifecoach/" target="_blank">Instagram</a>
      </p>
      <p style="color:#626060;">
        To unsubscribe, simply reply to this email with "Unsubscribe" in the subject line or click
        the link below.
      </p>
      <p>
        <a href="https://powerpassengerpassage.netlify.app/api/unsubscribe/${email}" target="_blank"
          >Unsubscribe</a
        >
      </p>
    </body>`,
  })

  // Log the response from Resend
  console.log({ welcomeEmailData, welcomeEmailError })

  // If there was an error subscribing the email address >> return an error
  if (subscribeError) {
    return new Response(
      JSON.stringify({
        message: `There was an error subscribing the email address: ${subscribeError?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${subscribeError?.message}`,
      }
    )
  }

  // If there was an error sending the email >> return an error
  if (welcomeEmailError) {
    return new Response(
      JSON.stringify({
        message: `Welcome message failed to send: ${welcomeEmailError?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${welcomeEmailError?.message}`,
      }
    )
  }

  // If everything worked >> return a success message
  return new Response(
    JSON.stringify({ message: `Email address ${email} was successfully subscribed!` }),
    {
      status: 200,
      statusText: 'OK',
    }
  )
}
