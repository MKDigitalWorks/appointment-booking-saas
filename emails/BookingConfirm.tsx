import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmEmailProps {
  customerName: string;
  serviceName: string;
  staffName?: string;
  date: string;
  time: string;
  address?: string;
  total: string;
  reference: string;
  downloadUrl: string;
}

export const BookingConfirmEmail = ({
  customerName,
  serviceName,
  staffName,
  date,
  time,
  address,
  total,
  reference,
  downloadUrl,
}: BookingConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>Your appointment has been confirmed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>Appointment Confirmed!</Heading>
          <Text style={text}>
            Hello {customerName},
          </Text>
          <Text style={text}>
            Your appointment has been confirmed! We look forward to seeing you.
          </Text>
          
          <Section style={section}>
            <Text style={h2}>Appointment Details:</Text>
            <Text style={text}>
              <strong>Service:</strong> {serviceName}
            </Text>
            {staffName && (
              <Text style={text}>
                <strong>Staff:</strong> {staffName}
              </Text>
            )}
            <Text style={text}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={text}>
              <strong>Time:</strong> {time}
            </Text>
            {address && (
              <Text style={text}>
                <strong>Location:</strong> {address}
              </Text>
            )}
            <Text style={text}>
              <strong>Total:</strong> {total}
            </Text>
            <Text style={text}>
              <strong>Reference:</strong> {reference}
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Link style={button} href={downloadUrl}>
              Download Calendar
            </Link>
          </Section>

          <Text style={footer}>
            Thank you for choosing us! If you need to make any changes, please contact us as soon as possible.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BookingConfirmEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  margin: '0 0 24px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: '600',
  margin: '24px 0 12px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.4',
  margin: '0 0 12px',
};

const section = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  margin: '24px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#4F46E5',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '32px 0 0',
  textAlign: 'center' as const,
};
