import { PortableText, type PortableTextComponents } from '@portabletext/react'
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
  subject: string
  preview: string
  body: any
}

export default function MarketingNewsletter({
  email,
  subject,
  preview,
  body,
}: MarketingNewsletterProps) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
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
    block: {
      h2: ({ children }) => {
        return (
          <Heading as="h2" style={heading}>
            {children}
          </Heading>
        )
      },
      h3: ({ children }) => {
        return (
          <Heading as="h3" style={heading}>
            {children}
          </Heading>
        )
      },
      h4: ({ children }) => {
        return (
          <Heading as="h4" style={heading}>
            {children}
          </Heading>
        )
      },
      h5: ({ children }) => {
        return (
          <Heading as="h5" style={heading}>
            {children}
          </Heading>
        )
      },
    },
  }

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://powerpassengerpassage.com/images/ppp-logo.png"
            width="150"
            height="auto"
            alt="Power Passenger Passage Logo"
            style={logo}
          />
          <Text style={paragraph}>Hi {email},</Text>

          <Hr style={hr} />

          <Section style={container}>
            <Heading as="h1" style={heading}>
              {subject}
            </Heading>

            {/* Post Content */}
            <PortableText value={body} components={components} />
          </Section>

          <Hr style={hr} />

          <Link
            style={link}
            href={`https://powerpassengerpassage.com/api/unsubscribe/${email}`}
            target="_blank"
          >
            unsubscribe
          </Link>
          <Text style={footer}>304 Daffodil Ct, Purcellville VA 20132</Text>
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
  lineHeight: '26px',
}

const logo = {
  margin: '0 auto',
}

const heading = {
  lineHeight: 'normal',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const link = {
  fontSize: '12px',
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
