// FILE: app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth';

// NextAuth v5 verwendet standardisierte Handler-Exports für App Router
// -> diese Zeilen sind korrekt und minimal notwendig
export const { GET, POST } = handlers;
