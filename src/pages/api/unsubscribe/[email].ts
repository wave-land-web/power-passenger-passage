export const prerender = false

import type { APIRoute } from 'astro'
import Unsubscribe from '../../../components/email/Unsubscribe'
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

  // Handle unsubscription from the Resend audience
  const { data: unsubscribeData, error: unsubscribeError } = await resend.contacts.remove({
    email,
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Log the response from Resend
  console.log(unsubscribeData, unsubscribeError)

  // Send an email to the user confirming their unsubscription
  const { data: unsubscribeEmailData, error: unsubscribeEmailError } = await resend.emails.send({
    from: 'Power Passenger Passage <emmie@powerpassengerpassage.com>',
    to: [email],
    subject: 'You have been unsubscribed',
    react: Unsubscribe({ email }),
  })

  // Log the response from Resend
  console.log(unsubscribeEmailData, unsubscribeEmailError)

  // If there was an error unsubscribing the user  >> return an error
  if (unsubscribeError?.message) {
    return new Response(
      JSON.stringify({
        message: `There was an error unsubscribing ${email}. Please try again later. Error: ${unsubscribeError.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${unsubscribeError.message}`,
      }
    )
  }

  // If there was an error sending the unsubscription email >> return an error
  if (unsubscribeEmailError?.message) {
    return new Response(
      JSON.stringify({
        message: `There was an error sending the unsubscription email to ${email}. Please try again later. Error: ${unsubscribeEmailError.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${unsubscribeEmailError.message}`,
      }
    )
  }

  // If unsubscription was successful >> redirect to the `/unsubscribed` page
  return redirect('/unsubscribed', 303)
}
