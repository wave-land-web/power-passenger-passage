export const prerender = false

import type { APIRoute } from 'astro'
import Confirmation from '../../components/email/Confirmation'
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

  // -------------------------------------
  // ------ Send Confirmation Email ------
  // -------------------------------------

  const { data: confirmationEmailData, error: confirmationEmailError } = await resend.emails.send({
    // TODO: replace with emmie's email (ex/ emmie@powerpassengerpassage.com)
    from: 'Power Passenger Passage <josh@powerpassengerpassage.com>',
    to: [email],
    subject: `Please confirm your subscription to Power Passenger Passage`,
    react: Confirmation({ email }),
  })

  // Log the response from Resend
  console.log({ confirmationEmailData, confirmationEmailError })

  // If there was an error sending the email >> return an error
  if (confirmationEmailError) {
    return new Response(
      JSON.stringify({
        message: `Confirmation email failed to send: ${confirmationEmailError?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${confirmationEmailError?.message}`,
      }
    )
  }

  // If everything worked >> return a success message
  return new Response(JSON.stringify({ message: `Confirmation email sent to ${email}` }), {
    status: 200,
    statusText: 'OK',
  })
}
