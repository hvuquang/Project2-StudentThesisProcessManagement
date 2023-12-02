// id: string;
// username: string;
// type: string;

// src/app/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    };
  }
}
