export const prerender = false

import type { APIRoute } from 'astro'
import Welcome from '../../components/email/Welcome'
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
    react: Welcome({ email }),
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
