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
            <Section>
              <Button style={button} href="https://powerpassengerpassage.com/">
                Learn More
              </Button>
            </Section>
            <Text style={paragraph}>
              Love,
              <br />
              Emmie
            </Text>
          </Section>

          <Hr style={hr} />

          <Link href={`https://powerpassengerpassage.com/api/unsubscribe/${email}`} target="_blank">
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

const button = {
  backgroundColor: '#a82c51',
  borderRadius: '3px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
