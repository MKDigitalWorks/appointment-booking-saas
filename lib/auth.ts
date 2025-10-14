import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter'; // v5-Adapter
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { db } from './db';  // PrismaClient-Instanz
import { env } from './env'; // deine Env-Helper (optional)

// Schema für Credentials-Validierung
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  // WICHTIG: v5-Adapter
  adapter: PrismaAdapter(db),

  // JWT-Session (performant, DB-Session-Tabellen werden dennoch vom Adapter angelegt)
  session: { strategy: 'jwt' },

  // Provider
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const user = await db.user.findUnique({
            where: { email }
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return null;
          }

          // NextAuth v5 erwartet ein „User-like“ Objekt
          return {
            id: user.id,
            email: user.email,
            name: user.name ?? null,
            image: user.image ?? null
          };
        } catch {
          return null;
        }
      }
    })
  ],

  // Callbacks: schreibe die user.id in den Token und in die Session
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        // @ts-expect-error – session.user.id wird projektweit via TypeAugmentation ergänzt
        session.user.id = token.id as string;
      }
      return session;
    }
  },

  // Optional: eigene Pages (funktioniert auch in v5)
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
});
