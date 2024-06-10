import BFooter from "@/app/footer";
import { Card } from "@prisma/client";
import prisma from "@/lib/prisma";
import CatalogMain from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCurrentDBUser } from "@/app/actions";

export interface CatalogCard {
  card: Card;
  known: Boolean;
}

export default async function Home() {
  let cards: Card[] = await prisma.card.findMany({
    orderBy: { weight: "desc" },
  });

  let user = await getCurrentDBUser();
  if (!user) {
    return <>error </>;
  }

  let ownedCards = await prisma.cardOwnership.findMany({
    where: {
      userId: user.id,
    },
  });

  // let knownCards = cards.map(c => {
  //   if (ownedCards.includes(c2 => {
  //     return true
  //   }))
  // })

  return (
    <div>
      <InvLinkHeader catalogSelected={true}></InvLinkHeader>
      {/* <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
        Catalog
      </h1> */}

      <CatalogMain showCheckboxes={false} cards={cards}></CatalogMain>
    </div>
  );
}
