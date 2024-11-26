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
        message: 'Please fill out all fields.',
      }),
      {
        status: 404,
        statusText: 'Did not provide the right data',
      }
    )
  }

  // Send information to Resend
  const { data: welcomeEmailData, error: welcomeEmailError } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: `Sumbission from ${email}`,
    html: `<p>Hi ${email},</p><p>Your message was received.</p>`,
  })

  // If the message was sent successfully, return a 200 response
  if (welcomeEmailData) {
    return new Response(
      JSON.stringify({
        message: 'Message successfully sent!',
      }),
      {
        status: 200,
        statusText: 'OK',
      }
    )
  } else {
    // If there was an error sending the message, return a 500 response
    return new Response(
      JSON.stringify({
        message: `Message failed to send: ${welcomeEmailError?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${welcomeEmailError?.message}`,
      }
    )
  }
}
