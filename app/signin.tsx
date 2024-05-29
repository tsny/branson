import { authConfig } from "@/lib/auth";
import { NavbarLink } from "flowbite-react";
import { getServerSession } from "next-auth";

export default async function SignInLink() {
  const session = await getServerSession(authConfig);
  if (session) {
    return <></>;
  }
  <NavbarLink href="/api/auth/signin">Login</NavbarLink>;
}
