import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Admin-only authentication (no public sign-up, no social login).
// Visitors never see a login screen — only /admin routes are protected.
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // NOTE: this looks up an Admin row via Prisma. Until DATABASE_URL
        // is configured this will throw at runtime — that's expected in
        // the demo/mock-data mode described in README.md.
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });
        if (!admin) return null;

        const valid = await bcrypt.compare(credentials.password, admin.password);
        if (!valid) return null;

        return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
