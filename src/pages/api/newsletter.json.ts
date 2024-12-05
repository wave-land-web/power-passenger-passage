export const prerender = false

import type { APIRoute } from 'astro'
import BlogNewsletter from '../../components/email/blog/Newsletter'
import MarketingNewsletter from '../../components/email/marketing/Newsletter'
import { resend } from '../../lib/resend'
import { urlForImage } from '../../sanity/lib/urlForImage'

interface blogNewsletterProps {
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

interface marketingNewsletterProps {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  title: string
  emailDetails: {
    _type: string
    subject: string
    preview: string
    body: [
      {
        _type: string
        _key: string
        style: string
        markDefs: []
        children: [
          {
            _type: string
            _key: string
            text: string
            marks: []
          },
        ]
      },
    ]
  }
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  if (body._type === 'post') {
    const postBody: blogNewsletterProps = body

    const imageUrl = urlForImage(postBody.mainImage).url()

    // Retrieve all contacts from Resend
    const { data: contactData, error: contactError } = await resend.contacts.list({
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
    })

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

    // Create an array of email data for each contact
    const batchData =
      contactData?.data.map((contact) => {
        return {
          from: 'Power Passenger Passage <josh@wavelandweb.com>',
          to: contact.email,
          subject: postBody.title,
          react: BlogNewsletter({
            title: postBody.title,
            slug: postBody.slug.current,
            description: postBody.description,
            imageUrl,
            imageAlt: postBody.mainImage.alt,
            email: contact.email,
            body: postBody.body,
          }),
        }
      }) ?? []

    // Send email to all contacts
    const { data: emailData, error: emailError } = await resend.batch.send(batchData)

    // Log the response from Resend
    console.log({ contactData, contactError, emailData, emailError })

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

    // If everything worked >> return a success message
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      statusText: 'OK',
    })
  } else if (body._type === 'newsletter') {
    const newsletterBody: marketingNewsletterProps = body

    // Retrieve all contacts from Resend
    const { data: contactData, error: contactError } = await resend.contacts.list({
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
    })

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

    // Create an array of email data for each contact
    const batchData =
      contactData?.data.map((contact) => {
        return {
          from: 'Power Passenger Passage <josh@wavelandweb.com>',
          to: contact.email,
          subject: newsletterBody.title,
          react: MarketingNewsletter({
            title: newsletterBody.title,
            preview: newsletterBody.emailDetails.preview,
            email: contact.email,
            body: newsletterBody.emailDetails.body,
          }),
        }
      }) ?? []

    // Send email to all contacts
    const { data: emailData, error: emailError } = await resend.batch.send(batchData)

    // Log the response from Resend
    console.log({ contactData, contactError, emailData, emailError })

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

    // If everything worked >> return a success message
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      statusText: 'OK',
    })
  }

  // If everything worked >> return a success message
  return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
    status: 200,
    statusText: 'OK',
  })
}
