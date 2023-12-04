// id: string;
// username: string;
// type: string;

// src/app/types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

export enum Role {
  teacher = "gv",
  student = "sv",
}

declare module "next-auth" {
  interface User {
    // role?: Role;
    email?: string;
    fullname?: string;
    account_type?: string;
  }
  // interface Session {
  //   user: {
  //     id?: string;
  //     email?: string;
  //     fullname?: string;
  //     account_type?: string;
  //   };
  // }
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    account_type?: string;
    email?: string;
    fullname?: string;
    // subscribed: boolean;
  }
}
