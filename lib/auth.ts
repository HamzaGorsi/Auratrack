import { PrismaAdapter } from "@auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { prisma } from "./prisma";

export const authOptions: any = {
  adapter: PrismaAdapter(prisma),

  session: {
  strategy: "jwt",

  maxAge: 30 * 24 * 60 * 60,
},

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},

        password: {},
      },

      async authorize(credentials: any) {
        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (!user) {
          throw new Error(
            "Invalid credentials"
          );
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) {
          throw new Error(
            "Invalid credentials"
          );
        }

        return {
  id: user.id,

  email: user.email,

  username: user.username,

  rememberMe:
    credentials.rememberMe,
};
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: any) {
      if (user) {
        token.id = user.id;

        token.username =
          user.username;
      }

      return token;
    },

    async session({
      session,
      token,
    }: any) {
      if (session.user) {
        session.user.id = token.id;

        session.user.username =
          token.username;
      }

      return session;
    },
  },

  secret: "supersecretkey",
};