import type { CSSProperties } from 'react'
import PortableText from '../../components/text/PortableText.astro'

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
  body: any
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
              <Link href={`https://powerpassengerpassage.netlify.app/blog/${slug}`}>
                View in browser
              </Link>
            </em>
          </Text>

          <Hr style={hr} />

          <Section style={container}>
            <Heading as="h1">{title}</Heading>
            <Text style={paragraph}>{description}</Text>
            <Img src={imageUrl} width="100%" height="auto" alt={imageAlt} style={image} />

            {/* Post Content */}
            <PortableText portableText={body} />
          </Section>

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
  fontSize: '16px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const image: CSSProperties = {
  margin: '0 auto',
  borderRadius: '3px',
  objectFit: 'cover',
  maxHeight: '350px',
}

const hr = {
  borderColor: '#e5e1dd',
  margin: '20px 0',
}

const footer = {
  color: '#999697',
  fontSize: '12px',
}
