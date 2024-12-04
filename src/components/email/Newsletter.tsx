import { toHTML } from '@portabletext/to-html'

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface NewsletterProps {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  slug: string
  email: string
  body: [
    {
      style: string
      _key: string
      _type: string
      children: [{ _key: string; _type: string; marks: []; text: string }]
      markDefs: []
    },
  ]
}

export default function Newsletter({
  title,
  description,
  imageUrl,
  imageAlt,
  slug,
  email,
  body,
}: NewsletterProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Power Passenger Passage, {email}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://powerpassengerpassage.netlify.app/images/ppp-logo.png"
            width="150"
            height="auto"
            alt="Power Passenger Passage Logo"
            style={logo}
          />
          <Text style={paragraph}>Hi {email},</Text>
          <Text style={paragraph}>
            I just posted something new on the Power Passenger Passage blog, and I wanted you to be
            the first to know!
          </Text>
          <Text style={paragraph}>
            <em>
              Dive into the full post to explore more:{' '}
              <Link href={`https://powerpassengerpassage.netlify.app/blog/${slug}`}>
                Read the Full Post
              </Link>
            </em>
          </Text>

          <Section style={container}>
            <Heading as="h1">{title}</Heading>
            <Text style={paragraph}>{description}</Text>
            <Img src={imageUrl} width="300" height="auto" alt={imageAlt} style={image} />
            
            {/* Post Content */}
            <Section dangerouslySetInnerHTML={{ __html: toHTML(body) }} />
          </Section>

          <Text style={paragraph}>
            Thanks for subscribing and being part of this journey with me. If you have any thoughts
            or questions, feel free to reply to this email—I'd love to hear from you!
          </Text>
          <Text style={paragraph}>
            Love,
            <br />
            Emmie
          </Text>

          <Hr style={hr} />
          <Link
            href={`https://powerpassengerpassage.netlify.app/api/unsubscribe/${email}`}
            target="_blank"
          >
            unsubscribe
          </Link>
          <Text style={footer}>470 Noor Ave STE B #1148, South San Francisco, CA 94080</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const image = {
  margin: '0 auto',
  borderRadius: '3px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
