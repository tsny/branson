import { authConfig } from "@/lib/auth";
import { Footer } from "flowbite-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface FooterProps {
  boins: Number;
}

export default async function BFooter(props: FooterProps) {
  const session = await getServerSession(authConfig);
  let loggedIn = session != undefined;

  return (
    <Footer
      container
      className="sticky text-sm bottom w-2/3 border-2 border-gray"
    >
      {loggedIn ? (
        <Footer.LinkGroup>
          You have {props.boins.toString()} Bitboins
        </Footer.LinkGroup>
      ) : (
        <Footer.LinkGroup>
          <Link className="underline" href="/api/auth/signin">
            Login to see your boins
          </Link>
        </Footer.LinkGroup>
      )}
    </Footer>
  );
}
