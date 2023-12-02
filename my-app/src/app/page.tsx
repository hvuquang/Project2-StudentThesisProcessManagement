"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignIn = () => {
  const [flag, setFlag] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  function handleClick() {
    console.log(session?.user);
    if (email === "20521419@gm.uit.edu.vn" && password === "123456") {
      router.push("/pages/dashboard/");
      // <Link href={{
      //   pathname: "/pages/dashboard/", query: {
      //     password: password,
      //     email: email
      //   }
      // }}></Link>
    }
  }
  // const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <p>Hello {}</p>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src="/next.svg"
          alt="Your Company"
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="/pages/forgetpassword"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClick}
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          <Link
            href="/"
            className="font-semibold leading-4 text-indigo-600 hover:text-indigo-500"
          >
            Back to Home
          </Link>
          {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a> */}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
