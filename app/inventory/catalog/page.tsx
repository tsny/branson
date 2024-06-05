import BFooter from "@/app/footer";
import { Card } from "@prisma/client";
import prisma from "@/lib/prisma";
import CatalogMain from "./catalog_main";

export default async function Home() {
  let cards: Card[] = await prisma.card.findMany();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
        Catalog
      </h1>

      <CatalogMain cards={cards}></CatalogMain>
      <div className="sticky bottom-0 pb-2">
        <BFooter></BFooter>
      </div>
    </div>
  );
}
