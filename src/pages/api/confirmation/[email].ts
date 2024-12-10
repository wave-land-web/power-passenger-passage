export const prerender = false

import type { APIRoute } from 'astro'
import Welcome from '../../../components/email/Welcome'
import { resend } from '../../../lib/resend'

/**
 * GET request handler for unsubscribing an email.
 *
 * @param params The request parameters.
 * @param redirect The redirect function.
 * @returns The response object.
 */
export const GET: APIRoute = async ({ params, redirect }) => {
  // Extract the email from the URL
  const { email } = params

  // If there is no email in the URL >> return an error
  if (!email) {
    return new Response(null, {
      status: 404,
      statusText: 'Email Not found',
    })
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
    subject: `Welcome to Power Passenger Passage, ${email}!`,
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

  // If subscription was successful >> redirect to the `/subscribed` page
  return redirect('/subscribed', 303)
}
