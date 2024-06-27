import { Card } from "@prisma/client";
import prisma, { assertConfig, getConfigWithDefault } from "@/lib/prisma";
import CatalogMain, { CatalogCard } from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCurrentDBUser, getKnownCards } from "@/app/actions";

export const dynamic = "force-dynamic";

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

  const allCardsKnown = await assertConfig("btg.reveal.all", "true");
  const knownIDs = knownCards.map((c) => c.id);

  let catalogCards: CatalogCard[] = allCards.map((c) => {
    let known = knownIDs.includes(c.id) || allCardsKnown;
    return { card: c, hidden: !known };
  });

  return (
    <div>
      <InvLinkHeader catalogSelected={true}></InvLinkHeader>
      <div className="font-bold text-center text-xl">
        Seen {knownCards.length} of {allCards.length} cards
      </div>
      <div className="text-center">
        Go to the <b>Store</b> to get more packs!{" "}
      </div>

      <CatalogMain
        showCheckboxes={false}
        catalogCards={catalogCards}
        titleTapViewsCard={true}
      ></CatalogMain>
    </div>
  );
}
