import { authConfig } from "@/lib/auth";
import { Footer } from "flowbite-react";
import isWebview from "is-ua-webview";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { getCurrentDBUser } from "./actions";

export default async function BFooter() {
  const session = await getServerSession(authConfig);
  let loggedIn = session != undefined;

  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
  const isw = isWebview(userAgent);

  let dbUser = await getCurrentDBUser();
  let bitboins = dbUser ? dbUser.boins : 0;

  let loginLink = isw ? (
    <Link className="underline text-red" href="">
      Use chrome or safari to login
    </Link>
  ) : (
    <Link className="underline text-blue" href="/api/auth/signin">
      Login to see your boins
    </Link>
  );

  return (
    <div className="flex justify-center sticky bottom-2 mx-3">
      <Footer container className="flex justify-center border-2 bg-white/90">
        {loggedIn ? (
          <Footer.LinkGroup className="text-black text-center font-bold">
            You have {bitboins} Bitboins... Ya lil scoundrel
          </Footer.LinkGroup>
        ) : (
          <Footer.LinkGroup>{loginLink}</Footer.LinkGroup>
        )}
      </Footer>
    </div>
  );
}
