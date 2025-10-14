import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BookingReminderEmailProps {
  customerName: string;
  serviceName: string;
  staffName?: string;
  date: string;
  time: string;
  address?: string;
}

export const BookingReminderEmail = ({
  customerName,
  serviceName,
  staffName,
  date,
  time,
  address,
}: BookingReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>Reminder: Your appointment tomorrow</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>Appointment Reminder</Heading>
          <Text style={text}>
            Hello {customerName},
          </Text>
          <Text style={text}>
            This is a friendly reminder about your appointment tomorrow. We look forward to seeing you!
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
          </Section>

          <Text style={footer}>
            If you need to make any changes, please contact us as soon as possible.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BookingReminderEmail;

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

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '32px 0 0',
  textAlign: 'center' as const,
};
