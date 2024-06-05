import { authConfig } from "@/lib/auth";
import {
  Dropdown,
  DropdownItem,
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
        {(await isUserSuperAdmin()) && (
          <NavbarLink as={Link} href="/admin">
            Admin
          </NavbarLink>
        )}
        {(await isUserSuperAdmin()) && (
          <div>
            <NavbarLink as={Link} href={"/inventory"}>
              Inventory
            </NavbarLink>
            <NavbarLink as={Link} href={"/inventory/catalog"}>
              Catalog
            </NavbarLink>
            <NavbarLink as={Link} href={"/inventory/editor"}>
              Editor
            </NavbarLink>
          </div>
        )}
        {/* <NavbarLink as={Link} href="/boygirl">
          BoyGirl
        </NavbarLink> */}
      </NavbarCollapse>
    </Navbar>
  );
}
