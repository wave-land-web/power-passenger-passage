export const prerender = false

import type { APIRoute } from 'astro'
import Newsletter from '../../components/email/Newsletter'
import { resend } from '../../lib/resend'
import { urlForImage } from '../../sanity/lib/urlForImage'

interface postProps {
  _rev: string
  _type: string
  publishedAt: string
  description: string
  _updatedAt: string
  body: [
    {
      style: string
      _key: string
      _type: string
      children: [{ _key: string; _type: string; marks: []; text: string }]
      markDefs: []
    },
  ]
  slug: { current: string; _type: string }
  title: string
  _createdAt: string
  mainImage: {
    alt: string
    asset: {
      _ref: string
      _type: string
    }
    _type: string
  }
  _id: string
}

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json()) as postProps
  const imageUrl = urlForImage(body.mainImage).url()

  // Retrieve all contacts from Resend
  const { data: contactData, error: contactError } = await resend.contacts.list({
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Send email to all contacts
  // TODO: add email to "unsubscribe" link as prop
  // const { data: emailData, error: emailError } = await resend.emails.send({
  //   from: 'Power Passenger Passage <josh@wavelandweb.com>',
  //   to: contactData?.data.map((contact) => contact.email) ?? [],
  //   subject: body.title,
  //   react: Newsletter({
  //     title: body.title,
  //     slug: body.slug.current,
  //     description: body.description,
  //     imageUrl,
  //     imageAlt: body.mainImage.alt,
  //   }),
  // })

  // If contacts were not retrieved >> return an error message
  if (contactError) {
    return new Response(
      JSON.stringify({
        message: `Failed to retrieve contacts: ${contactError?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${contactError?.message}`,
      }
    )
  }

  // Send email to each contact
  contactData?.data.map(async (contact) => {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Power Passenger Passage <josh@wavelandweb.com>',
      to: contact.email ?? [],
      subject: body.title,
      react: Newsletter({
        title: body.title,
        slug: body.slug.current,
        description: body.description,
        imageUrl,
        imageAlt: body.mainImage.alt,
        email: contact.email,
      }),
    })

    // Log the response from Resend
    console.log({ emailData, emailError })

    // If email was not sent >> return an error message
    if (emailError) {
      return new Response(
        JSON.stringify({
          message: `Failed to send email: ${emailError?.message}`,
        }),
        {
          status: 500,
          statusText: `Internal Server Error: ${emailError?.message}`,
        }
      )
    }
  })

  // If everything worked >> return a success message
  return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
    status: 200,
    statusText: 'OK',
  })
}
