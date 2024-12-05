import { PortableText } from '@portabletext/react'
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
import type { CSSProperties } from 'react'
import { urlForImage } from '../../../sanity/lib/urlForImage'

interface MarketingNewsletterProps {
  email: string
  title: string
  preview: string
  body: any
}

export default function MarketingNewsletter({
  email,
  title,
  preview,
  body,
}: MarketingNewsletterProps) {
  const components = {
    types: {
      image: ({
        value,
      }: {
        value: {
          asset: {
            url: string
          }
          alt: string
        }
      }) => {
        return (
          <Img
            src={urlForImage(value.asset).url()}
            width="100%"
            height="auto"
            alt={value.alt}
            style={image}
          />
        )
      },
    },
  }

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
          <Text style={paragraph}>{preview}</Text>

          <Hr style={hr} />

          <Section style={container}>
            <Heading as="h1">{title}</Heading>

            {/* Post Content */}
            <PortableText value={body} components={components} />
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
