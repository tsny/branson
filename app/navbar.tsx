"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";

export default function BNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center text-black whitespace-nowrap text-xl font-semibold">
          branson.mom
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Login</Navbar.Link>
        <Navbar.Link as={Link} href="/rules">
          Rules
        </Navbar.Link>
        <Navbar.Link as={Link} href="/profile">
          Profile
        </Navbar.Link>
        <Navbar.Link as={Link} href="/boygirl">
          BoyGirl
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
