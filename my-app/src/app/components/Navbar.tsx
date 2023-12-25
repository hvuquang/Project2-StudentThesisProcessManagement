"use client";
import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
// import { classList } from 'tailwind-classlist';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import DropDown from "./DropDown";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isActive, setActive] = useState(false);
  const highlightNav = ["bg-gray-900", "text-white"];
  const activeNavItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>
  ) => {
    deactiveNavItem();
    // const navitem = document.getElementById('')
    alert(event.target);
  };

  const NAVIGATION_ITEMS = [
    {
      name: "Trang chủ",
      href: "/pages/homepage",
      id: "homepage",
    },
    {
      name: "Đăng ký Khóa luận Tốt Nghiệp",
      href: "/pages/registerthesis",
      id: "registerthesis",
    },
    // {
    //   name: "Nộp ĐTĐT",
    //   href: "/pages/changetopic",
    //   id: "changetopic",
    // },
    // {
    //   name: "Tiến trình thực hiện",
    //   href: "/pages/process",
    //   id: "process",
    // },
    {
      name: "Dashboard",
      href: "/pages/dashboard",
      id: "dashboard",
    },
  ];

  const NAVIGATION_ITEMS_TEACHER = [
    {
      name: "Trang chủ",
      href: "/pages/homepage",
      id: "homepage",
    },
    {
      name: "Đăng ký Đề Tài",
      href: "/pages/registerthesis",
      id: "registerthesis",
    },
    {
      name: "Nộp ĐTĐT",
      href: "/pages/changetopic",
      id: "changetopic",
    },
    // {
    //   name: "Tiến trình thực hiện",
    //   href: "/pages/process",
    //   id: "process",
    // },
    {
      name: "Dashboard",
      href: "/pages/dashboard",
      id: "dashboard",
    },
  ];

  function deactiveNavItem() {
    //return html collection
    const navitem = document.getElementsByClassName("navbar-items");
    for (let i = 0; i < navitem.length; i++) {
      //cast to HTMLElement
      const item = navitem[i] as HTMLElement;
      item.classList.remove(...highlightNav);
    }
  }

  function handleClick(event: React.MouseEvent) {
    deactiveNavItem();
    const navitem_id = document.getElementById(event.currentTarget.id);
    //spread operator
    navitem_id!.classList.add(...highlightNav);
  }

  return (
    <NextUIProvider>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            --> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            --> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  {/* <Link
                    href="/pages/dashboard"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                    id="dashboard"
                    // onClick={activeNavItem}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/pages/registerthesis"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    id="registerthesis"
                  >
                    Đăng ký Khóa luận Tốt Nghiệp
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    id="project"
                  >
                    Projects
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    id="process"
                  >
                    Tiến trình thực hiện
                  </Link> */}
                  {session?.user?.account_type === "gv" &&
                    NAVIGATION_ITEMS_TEACHER.map((item) => (
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium navbar-items"
                        id={item.id}
                        onClick={handleClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                  {session?.user?.account_type === "sv" &&
                    NAVIGATION_ITEMS.map((item) => (
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium navbar-items"
                        id={item.id}
                        onClick={handleClick}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3">
                <DropDown></DropDown>
                <div>
                  {/* <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={manageDropDownMenu}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/avatar.avif"
                    alt=""
                    width={50}
                    height={50}
                  />
                </button> */}
                </div>

                {/* <!--
              Dropdown menu, show/hide based on menu state.
  
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </Link>
          </div>
        </div>
      </nav>
    </NextUIProvider>
  );
};

export default Navbar;
