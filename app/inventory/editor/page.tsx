import prisma from "@/lib/prisma";
import EditorMain from "./EditorMain";
import { Card } from "@prisma/client";

export default async function Home() {
  const cards: Card[] = await prisma.card.findMany();
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 pt-8 mb-8">
        Card Editor
      </h1>
      {/* <EditCardModal show={false}></EditCardModal>
      <CardTable cards={cards}></CardTable> */}
      <EditorMain cards={cards}></EditorMain>
    </div>
  );
}
