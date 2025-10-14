// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1) Organization (mkdigitalworks) sicherstellen
  const org = await prisma.organization.findFirst({ where: { slug: "mkdigitalworks" } });
  const organization =
    org ??
    (await prisma.organization.create({
      data: {
        name: "MK Digital Works",
        slug: "mkdigitalworks",
        currency: "EUR",
        timezone: "Europe/Berlin",
        address: "Online",
      },
    }));

  // 2) Staff "Service Team" sicherstellen
  const staffExisting = await prisma.staff.findFirst({
    where: { orgId: organization.id, name: "Service Team" },
  });
  const staff =
    staffExisting ??
    (await prisma.staff.create({
      data: { orgId: organization.id, name: "Service Team" },
    }));

  // 3) Service "Erstgespräch" mit Preis != 0 und duration in Minuten (ACHTUNG: Feld heißt 'duration')
  const serviceExisting = await prisma.service.findFirst({
    where: { orgId: organization.id, name: "Erstgespräch" },
  });

  const serviceData = {
    orgId: organization.id,
    name: "Erstgespräch",
    duration: 30,   // << dein Schema verlangt 'duration' (Int, Minuten)
    price: 7900,    // 79,00 € (Cents)
    depositPct: 30, // optional, falls in deinem Schema vorhanden
  } as any;

  const service = serviceExisting
    ? await prisma.service.update({
        where: { id: serviceExisting.id },
        data: serviceData,
      })
    : await prisma.service.create({ data: serviceData });

  console.log("Seed done:");
  console.table({
    organization: organization.slug,
    staff: staff.name,
    service: `${service.name} | duration=${service.duration} | price=${service.price}c | depositPct=${service.depositPct ?? "n/a"}`,
  });
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
