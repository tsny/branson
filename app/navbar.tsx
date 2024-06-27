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
import { isUserSuperAdmin } from "./actions";
import { assertConfig } from "@/lib/prisma";

export default async function BNavbar() {
  const session = await getServerSession(authConfig);
  let loggedIn = session != undefined;
  const isSuper = await isUserSuperAdmin();
  const isBTGEnabled = await assertConfig("btg.enabled", "true");

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
    <Navbar fluid rounded className="border shadow ">
      <NavbarBrand as={Link} href="/">
        <Image
          className="mr-1"
          width={40}
          height={40}
          alt="boin"
          src={"/boin.png"}
        ></Image>
        <span className="self-center dark:text-white whitespace-nowrap text-xl font-bold">
          branson.mom
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {loginSection}
        <NavbarLink as={Link} href="/rules">
          Rules
        </NavbarLink>
        <NavbarLink as={Link} href="/business">
          Businesses
        </NavbarLink>
        {isSuper && (
          <NavbarLink as={Link} href="/profile">
            Profile
          </NavbarLink>
        )}
        {isSuper && (
          <NavbarLink as={Link} href="/admin">
            Admin
          </NavbarLink>
        )}
        {(isSuper || isBTGEnabled) && (
          <NavbarLink className="border" as={Link} href="/inventory">
            Cards
          </NavbarLink>
        )}
        {isSuper && (
          <NavbarLink as={Link} href="/inventory/editor">
            Editor
          </NavbarLink>
        )}
        {/* <NavbarLink as={Link} href="/boygirl">
          BoyGirl
        </NavbarLink> */}
      </NavbarCollapse>
    </Navbar>
  );
}
