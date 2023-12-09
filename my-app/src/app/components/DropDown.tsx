"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button/Button";
import Image from "next/image";
const DropDown = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-start"
        className="bg-white border-2 rounded-md"
      >
        <DropdownTrigger>
          <div className="flex text-white gap-2">
            <Image
              src={"/profile.png"}
              alt="profile-image"
              className="transition-transform text-white"
              width={50}
              height={50}
            />
            <div>
              <p>{session?.user?.fullname}</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session?.user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              id="user-menu-item-0"
            >
              Hồ sơ của bạn
            </Link>
          </DropdownItem>
          <DropdownItem key="team_settings">
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              id="user-menu-item-1"
            >
              Cài đặt
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <Button
              onClick={() => signOut()}
              className="block px-4 py-2 text-sm text-red-500"
              variant={"link"}
            >
              Log out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDown;
