'use client'

import { Navbar } from "flowbite-react";
import Link from "next/link";

export default function BNavbar() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="/">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">branson.mom</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Login
                </Navbar.Link>
                <Navbar.Link as={Link} href="/rules">
                    Rules
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )

}