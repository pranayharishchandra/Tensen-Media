"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const router   = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className = 'custom-scrollbar leftsidebar'>
    <div     className = 'flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          // checking the active link among home, search, etc. using the params (pathname) to give it color
          const isActive = 
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          // return inside return... it's a map function with statements
          return (
            <Link
              href = {link.route}
              key  = {link.label}
              className = {`leftsidebar_link ${isActive && "bg-cyan-400 "}`}
            >
              <Image
                src    = {link.imgURL}
                alt    = {link.label}
                width  = {24}
                height = {24}
              />

              <p className = 'text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className = 'mt-10 px-6'>
        <SignedIn>
          {/* if we are signed in (above component) then we will be using sign-out button 
              router.push will not push the 'sing-in' in the end.. but will redirect to '/sign-in'
           */}
          <SignOutButton signOutCallback = {() => router.push("/sign-in")}>
          <div           className       = 'flex cursor-pointer gap-4 p-4'>
              <Image
                src    = '/assets/logout.svg'
                alt    = 'logout'
                width  = {24}
                height = {24}
              />

              <p className = 'text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
