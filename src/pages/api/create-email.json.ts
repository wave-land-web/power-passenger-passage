export const prerender = false

import type { APIRoute } from 'astro'
import { resend } from '../../lib/resend'

// const sampleRequestBody = {
//   _rev: 'FC4JjQUtfvPledz4Kb77f7',
//   _type: 'post',
//   publishedAt: '2024-12-02',
//   description: 'test5',
//   _updatedAt: '2024-12-02T19:34:02Z',
//   body: [
//     {
//       style: 'normal',
//       _key: '1fac2105c721',
//       _type: 'block',
//       children: [{ _key: '655d4635b343', _type: 'span', marks: [], text: 'body text!' }],
//       markDefs: [],
//     },
//   ],
//   slug: { current: 'test5', _type: 'slug' },
//   title: 'test5',
//   _createdAt: '2024-12-02T19:32:59Z',
//   mainImage: {
//     alt: 'test5',
//     asset: {
//       _ref: 'image-bdf317b807dcc0501b77b8243ef51ffc4f3aef11-1460x1460-png',
//       _type: 'reference',
//     },
//     _type: 'image',
//   },
//   _id: '8eeb3393-1eef-437d-af9e-825b11b6b6d7',
// }

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

  // Retrieve all contacts from Resend
  const { data: contactData, error: contactError } = await resend.contacts.list({
    audienceId: import.meta.env.RESEND_AUDIENCE_ID,
  })

  // Send email to all contacts
  const { data: emailData, error: emailError } = await resend.emails.send({
    from: 'Power Passenger Passage <josh@wavelandweb.com>',
    to: contactData?.data.map((contact) => contact.email) || [],
    subject: `New Post: ${body.title}`,
    html: /* HTML */ `<body
      style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; color: #0E1726; margin-bottom: 36px;'
    >
      <img
        alt="Power Passenger Passage Logo"
        height="auto"
        src="https://powerpassengerpassage.netlify.app/images/ppp-logo.png"
        style="display:block;outline:none;border:none;text-decoration:none;margin-top:24px;margin-bottom:24px;margin-right:auto;"
        width="170"
      />

      <h1>${body.title}</h1>
      <p>${body.description}</p>
      <p>${contactData}</p>
      <p>
        Click here to read the full post:
        <a href="https://powerpassengerpassage.netlify.app/blog/${body.slug.current}">Read Post</a>
      </p>
    </body>`,
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
  return new Response(JSON.stringify({ message: 'Email sent successfully', data: emailData }), {
    status: 200,
    statusText: 'OK',
  })
}
