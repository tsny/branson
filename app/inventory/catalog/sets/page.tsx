import { Card } from "@prisma/client";
import prisma, { assertConfig } from "@/lib/prisma";
import { CatalogCard } from "../catalog_main";
import InvLinkHeader from "../../linkHeader";
import { getCurrentDBUser, getKnownCards } from "@/app/actions";
import CardCatalogViewer from "../../CardCatalog";

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

  const allCardsKnown = await assertConfig("btg.reveal.all", "true");
  const knownIDs = knownCards.map((c) => c.id);

  let catalogCards: CatalogCard[] = allCards.map((c) => {
    let known = knownIDs.includes(c.id) || allCardsKnown;
    return { card: c, hidden: !known };
  });

  return (
    <div>
      <InvLinkHeader setsSelected={true}></InvLinkHeader>
      <div className="bg-white p-1 rounded border shadow mx-10">
        <div className="font-bold text-center text-xl">
          Seen {knownCards.length} of {allCards.length} cards
        </div>
      </div>

      <CardCatalogViewer
        showCheckboxes={false}
        catalogCards={catalogCards}
        titleTapViewsCard={true}
      />
    </div>
  );
}
