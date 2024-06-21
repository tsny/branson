import { Card } from "@prisma/client";
import prisma from "@/lib/prisma";
import CatalogMain, { CatalogCard } from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCurrentDBUser, getKnownCards } from "@/app/actions";

export default async function CatalogPage() {
  let user = await getCurrentDBUser();
  if (!user) {
    return <>error </>;
  }
  let allCards: Card[] = await prisma.card.findMany({
    orderBy: { weight: "desc" },
  });

  let knownCards: Card[] = await getKnownCards(user.id);
  console.log(
    "user %s has seen %s of %s cards",
    user.id,
    knownCards.length,
    allCards.length
  );

  const knownIDs = knownCards.map((c) => c.id);

  let catalogCards: CatalogCard[] = allCards.map((c) => {
    let known = knownIDs.includes(c.id);
    return { card: c, hidden: !known };
  });

  return (
    <div>
      <InvLinkHeader catalogSelected={true}></InvLinkHeader>
      <div className="font-bold text-center text-xl">
        Seen {knownCards.length} of {allCards.length} cards
      </div>

      <CatalogMain
        showCheckboxes={false}
        catalogCards={catalogCards}
        titleTapViewsCard={true}
      ></CatalogMain>
    </div>
  );
}
