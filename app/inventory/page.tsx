import { Card } from "@prisma/client";
import BFooter from "../footer";
import prisma from "@/lib/prisma";
import CardPreview from "./card_preview";
import CardRevealer from "./CardReveal";
import { unwrapPack } from "../actions";
import CatalogMain from "./catalog/catalog_main";

export default async function Home() {
  let newCards: Card[] = await unwrapPack();
  let cards: Card[] = await prisma.card.findMany();

  return (
    <div>
      <CardRevealer cards={newCards}></CardRevealer>
      <CatalogMain cards={cards}></CatalogMain>
    </div>
  );
}
