import { Card } from "@prisma/client";
import prisma from "@/lib/prisma";
import CardRevealer from "./CardReveal";
import { getCurrentUserCards, unwrapPack } from "../actions";
import CatalogMain from "./catalog/catalog_main";
import InvLinkHeader from "./linkHeader";
import { Button } from "flowbite-react";

export default async function Home() {
  let cards: Card[] = await prisma.card.findMany();

  let user = await getCurrentUserCards();
  let dust = 0;

  return (
    <div>
      <InvLinkHeader invSelected={true}></InvLinkHeader>
      <Button className="ml-2" disabled={true}>
        Sell Selected for {dust} dust
      </Button>
      <CatalogMain showCheckboxes={true} cards={cards}></CatalogMain>
    </div>
  );
}
