import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeProps {
  email: string
}

export default function Welcome({ email }: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Power Passenger Passage, {email}</Preview>
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
            <Text style={paragraph}>
              Thank you for signing up for Power Passenger Passage! I'm Emmie, your guide on this
              journey.
            </Text>
            <Text style={paragraph}>
              I'm here to help. Please reach out anytime with questions, comments, or just to say
              hi!
            </Text>

            <Text style={paragraph}>
              As a welcome gift, I've prepared a special resource just for you:
            </Text>

            <Section style={giftSection}>
              <Text style={giftTitle}>🎁 Free Download: "Calming Your Mind in Pregnancy"</Text>
              <Text style={giftDescription}>
                3 simple grounding tools to help you find peace and calm during your pregnancy
                journey.
              </Text>
              <Link
                target="_self"
                download={true}
                style={button}
                href="/docs/calming-your-mind-in-pregnancy_3-simple-grounding-tools.pdf"
              >
                Download Your Free PDF
              </Link>
            </Section>

            <Section>
              <Link style={link} href="https://powerpassengerpassage.com/">
                Visit our website
              </Link>
            </Section>
            <Text style={paragraph}>
              Love,
              <br />
              Emmie
            </Text>
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
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const link = {
  color: '#a82c51',
  textDecoration: 'underline',
}

const button = {
  backgroundColor: '#a82c51',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 28px',
  margin: '0 auto',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

const giftSection = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#fef7f0',
  borderRadius: '8px',
  border: '1px solid #f3e5d0',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  textAlign: 'center' as const,
  gap: '12px',
}

const giftTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#a82c51',
  margin: '0 0 12px 0',
  textAlign: 'center' as const,
}

const giftDescription = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#666666',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}
