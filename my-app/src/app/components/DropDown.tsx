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

const DropDown = () => {
  return (
    <div className="flex items-center gap-4">
      {/* <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform text-white"
            description="20521419@gm.uit.edu.vn"
            name="Vũ Quang Huy"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">20521419@gm.uit.edu.vn</p>
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
            <Link
              href="/pages/signin"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              id="user-menu-item-2"
            >
              Log out
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDown;
