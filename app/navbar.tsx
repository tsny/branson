import { authConfig } from "@/lib/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function BNavbar() {
  const session = await getServerSession(authConfig);
  let loggedIn = session != undefined;

  const loginSection = loggedIn ? (
    <NavbarLink as={Link} href="/api/auth/signout">
      Logout
    </NavbarLink>
  ) : (
    <NavbarLink as={Link} href="/api/auth/signin">
      Login
    </NavbarLink>
  );

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <Image
          className="mr-1"
          width={40}
          height={40}
          alt="boin"
          src={"/boin.png"}
        ></Image>
        <span className="self-center text-black whitespace-nowrap text-xl font-semibold">
          branson.mom
        </span>
      </NavbarBrand>
      {loggedIn && (
        <NavbarLink className="text-center text-sm " disabled={true} href="/">
          Signed in as {session?.user?.name}
        </NavbarLink>
      )}
      <NavbarToggle />
      <NavbarCollapse>
        {loginSection}
        <NavbarLink as={Link} href="/rules">
          Rules
        </NavbarLink>
        {loggedIn && (
          <NavbarLink as={Link} href="/profile">
            Profile
          </NavbarLink>
        )}
        <NavbarLink as={Link} href="/boygirl">
          BoyGirl
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
