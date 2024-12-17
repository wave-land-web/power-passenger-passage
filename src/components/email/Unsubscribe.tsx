import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface UnsubscribeProps {
  email: string
}

export default function Unsubscribe({ email }: UnsubscribeProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {email} has been unsubscribed from our email list. You will no longer receive any emails
        from us.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://powerpassengerpassage.com/images/ppp-logo.png"
            width="150"
            height="auto"
            alt="Power Passenger Passage Logo"
            style={logo}
          />

          <Hr style={hr} />

          <Section style={container}>
            <Text style={paragraph}>
              {email} has been unsubscribed from our email list. You will no longer receive any
              emails from us.
            </Text>
            <Text style={paragraph}>Come back anytime!</Text>
            <Button style={button} href="https://powerpassengerpassage.com/" target="_blank">
              Back to Power Passenger Passage
            </Button>
          </Section>

          <Hr style={hr} />

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
