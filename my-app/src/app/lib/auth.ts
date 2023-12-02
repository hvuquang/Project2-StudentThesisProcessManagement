import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "12345678" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //retrieve user data
        const user = {
          id: "1",
          username: "123456",
          password: "123456@example.com",
          type: "sv",
        };
        const gv = {
          id: "1",
          username: "123",
          password: "123@example.com",
          type: "gv",
        };
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    // signIn: "/",
  },
};
