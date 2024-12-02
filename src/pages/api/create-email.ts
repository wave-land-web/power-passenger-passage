export const prerender = false

import type { SanityDocument } from '@sanity/client'
import type { APIRoute } from 'astro'
import { resend } from '../../lib/resend'
import { loadQuery } from '../../sanity/lib/load-query'

export const GET: APIRoute = async ({ params }) => {
  console.log('params', params)
  const { id } = params

  // Get post with given pararm id from Sanity
  const { data: post } = await loadQuery<SanityDocument>({
    query: `*[_type == "post" && _id == ${id}]`,
  })

  const { data, error } = await resend.emails.send({
    from: 'Power Passenger Passage <josh@wavelandweb.com>',
    to: 'josh@wavelandweb.com',
    subject: `New Post: ${post.title}`,
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

      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">
        New Post: ${post.title}
      </h1>
    </body>`,
  })

  return new Response(JSON.stringify(post), {
    headers: {
      'content-type': 'application/json',
    },
  })
}
