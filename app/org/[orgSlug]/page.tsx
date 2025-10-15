export const dynamic = "force-static";

type PageProps = {
  params: { orgSlug: string };
};

export default function OrgPage({ params }: PageProps) {
  const { orgSlug } = params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Organisation: {orgSlug}</h1>
      <p className="text-muted-foreground">
        Dies ist eine Platzhalter-Seite unter <code>/org/{orgSlug}</code>.{" "}
        Hier kommt später das echte Tenant-Dashboard/Buchung rein.
      </p>
    </main>
  );
}
