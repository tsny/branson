import BFooter from "@/app/footer";
import { Card, CardOwnership } from "@prisma/client";
import prisma from "@/lib/prisma";
import CatalogMain from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCordsForUser, getCurrentDBUser } from "@/app/actions";
import { Cord } from "@/lib/cards";

export interface CatalogCard {
  card: Card;
  known: Boolean;
}

export default async function CatalogPage() {
  let cards: Card[] = await prisma.card.findMany({
    orderBy: { weight: "desc" },
  });

  let user = await getCurrentDBUser();
  if (!user) {
    return <>error </>;
  }

  let cords: Cord[] = await getCordsForUser(user.id);

  // let knownCards = cards.map(c => {
  //   if (ownedCards.includes(c2 => {
  //     return true
  //   }))
  // })

  return (
    <div>
      <InvLinkHeader catalogSelected={true}></InvLinkHeader>

      <CatalogMain
        cords={cords}
        showCheckboxes={false}
        cards={cards}
      ></CatalogMain>
    </div>
  );
}
