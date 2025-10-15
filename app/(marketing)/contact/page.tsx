export const metadata = {
  title: "Kontakt",
  description: "Schreib uns – wir melden uns schnell zurück.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
      <p className="text-muted-foreground mb-8">
        Wir freuen uns auf Ihre Nachricht. Nutzen Sie das Formular oder senden
        Sie uns eine E-Mail.
      </p>

      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Danke! (Demo)");
        }}
      >
        <label className="grid gap-2">
          <span className="text-sm">Name</span>
          <input
            className="rounded-md border px-3 py-2"
            name="name"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">E-Mail</span>
          <input
            className="rounded-md border px-3 py-2"
            name="email"
            type="email"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Nachricht</span>
          <textarea
            className="min-h-[120px] rounded-md border px-3 py-2"
            name="message"
            required
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white"
        >
          Absenden
        </button>
      </form>
    </main>
  );
}
