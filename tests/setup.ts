import { beforeAll, afterAll, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Setup test database
});

afterEach(async () => {
  // Clean up after each test
  await prisma.booking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.reminder.deleteMany();
});

afterAll(async () => {
  // Clean up after all tests
  await prisma.$disconnect();
});
