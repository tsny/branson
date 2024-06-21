import BFooter from "@/app/footer";
import { Card, CardOwnership } from "@prisma/client";
import prisma from "@/lib/prisma";
import CatalogMain, { CatalogCard } from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCordsForUser, getCurrentDBUser } from "@/app/actions";
import { Cord } from "@/lib/prisma";

export default async function CatalogPage() {
  let allCards: Card[] = await prisma.card.findMany({
    orderBy: { weight: "desc" },
  });

  let user = await getCurrentDBUser();
  if (!user) {
    return <>error </>;
  }

  let cords: Cord[] = await getCordsForUser(user.id);

  let knownCards = cords.map((c) => {
    return c.card;
  });

  let catalogCards: CatalogCard[] = allCards.map((c) => {
    let hidden = knownCards.includes(c);
    return { card: c, hidden: hidden };
  });

  return (
    <div>
      <InvLinkHeader catalogSelected={true}></InvLinkHeader>

      <CatalogMain
        showCheckboxes={false}
        catalogCards={catalogCards}
        titleTapViewsCard={true}
      ></CatalogMain>
    </div>
  );
}
