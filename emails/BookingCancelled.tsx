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

interface BookingCancelledEmailProps {
  customerName: string;
  serviceName: string;
  staffName?: string;
  date: string;
  time: string;
  refundAmount?: string;
}

export const BookingCancelledEmail = ({
  customerName,
  serviceName,
  staffName,
  date,
  time,
  refundAmount,
}: BookingCancelledEmailProps) => (
  <Html>
    <Head />
    <Preview>Your appointment has been cancelled</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>Appointment Cancelled</Heading>
          <Text style={text}>
            Hello {customerName},
          </Text>
          <Text style={text}>
            Your appointment has been cancelled. We hope to see you again soon!
          </Text>
          
          <Section style={section}>
            <Text style={h2}>Cancelled Appointment:</Text>
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
            {refundAmount && (
              <Text style={text}>
                <strong>Refund:</strong> {refundAmount}
              </Text>
            )}
          </Section>

          <Text style={footer}>
            If you have any questions or would like to book a new appointment, please don't hesitate to contact us.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BookingCancelledEmail;

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
