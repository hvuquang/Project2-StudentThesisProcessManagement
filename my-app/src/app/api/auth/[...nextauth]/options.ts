import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "12345678" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //retrieve user data
        const user = {
          id: "1",
          name: "123456",
          password: "123456",
          type: "sv",
        };
        const gv = {
          id: "2",
          username: "123",
          password: "123@example.com",
          type: "gv",
        };
        if (
          credentials?.name === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    // signIn: "/",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Modify the session data before sending it to the client
      session.user = {
        id: "1",
        username: "huy",
      };
      return session;
    },
  },
};
