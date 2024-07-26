"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useCart } from "@/contexts/CartContext";

// import { UserContext } from '@/context/userContext'
// import { CartContext } from '@/context/cartContext'

const ProfileMenu = () => {
  const { token, removeAuthToken } = useAuthContext();
  const { refreshCart } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    refreshCart(true);
    router.push("/login");
  };

  if (!token) {
    return (
      <Link
        href="/login"
        type="button"
        className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
      >
        <i className="sicon-user"></i>
      </Link>
    );
  }

  return (
    // @FIXME: move dropdown to a separte file
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary">
          <i className="sicon-user"></i>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <span
              onClick={handleLogout}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Logout
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
