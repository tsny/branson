import { Card } from "@prisma/client";
import prisma, { assertConfig } from "@/lib/prisma";
import CatalogMain, { CatalogCard } from "./catalog_main";
import InvLinkHeader from "../linkHeader";
import { getCurrentDBUser, getKnownCards } from "@/app/actions";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";

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
      <div className="bg-white p-1 rounded border shadow mx-10">
        <div className="font-bold text-center text-xl">
          Seen {knownCards.length} of {allCards.length} cards
        </div>
        <div className="text-center">
          Go to the <b>Store</b> to get more packs!{" "}
        </div>
      </div>

      <Accordion className="bg-white m-2" collapseAll>
        <AccordionPanel>
          <AccordionTitle>The Lore</AccordionTitle>
          <AccordionContent className="text-sm">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <b>Branson: The Gathering</b> takes place in Branson where every
              year the <b>Agency</b> organizes a <b>Gathering</b> for
              adventurers
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Cards represent events, memories, players, creatures and spells
              experienced to <b>Branson</b>
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              If you find every card, be sure to inform your nearest{" "}
              <b>Agency</b> representative
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <CatalogMain
        showCheckboxes={false}
        catalogCards={catalogCards}
        titleTapViewsCard={true}
      ></CatalogMain>
    </div>
  );
}
