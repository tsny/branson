import InvLinkHeader from "../linkHeader";
import { getCurrentDBUser } from "@/app/actions";
import Unwrapper from "./unwrapper";
import WheelSpinner from "./wheel";
import PurchaseCard from "./purchase";
import prisma, { getConfigAsNumber } from "@/lib/prisma";
import DustConverter from "./DustConverter";
import { Card } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Store() {
  const user = await getCurrentDBUser();
  if (!user) {
    return <div>not logged in!</div>;
  }

  const packDustCost = await getConfigAsNumber("pack.dust.cost");
  const packBoinCost = await getConfigAsNumber("pack.boin.cost");
  const maxSpinBoins = await getConfigAsNumber("spin.max.boins");
  const spinCooldown = await getConfigAsNumber("wheel.cooldown.minutes");
  const now = new Date();

  const lastSpin = await prisma.wheelEvent.findFirst({
    where: { userId: user.id },
  });
  const lastSpinAmt = lastSpin?.amt ?? 0;
  if (lastSpinAmt > 0) {
    await prisma.wheelEvent.deleteMany({ where: { userId: user.id } });
  }

  const events = await prisma.cardEvent.findMany({
    where: { userId: user.id },
  });
  let cardIDs = events.map((c) => c.cardId);
  const hasCardsToReveal = cardIDs && cardIDs.length > 0;

  if (hasCardsToReveal) {
    console.log("got cards to unwrap: %s", cardIDs);
    await prisma.cardEvent.deleteMany({
      where: { cardId: { in: cardIDs } },
    });
  }

  async function getCards() {
    let cards: Card[] = [];
    for (let index = 0; index < cardIDs.length; index++) {
      let c = await prisma.card.findFirst({ where: { id: cardIDs[index] } });
      console.log(c);
      if (c) cards.push(c);
    }
    return cards;
  }
  let cards = await getCards();

  return (
    <div className="p-1">
      <InvLinkHeader storeSelected={true}></InvLinkHeader>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-white border border-gray-800 rounded text-sm p-1">
          <h1 className="text-center font-bold">Branson: The Gathering</h1>
          <hr className="pb-2"></hr>
          <div className="text-xs text-center">
            Each year in <b>Branson</b> the group known as <b>The Agency</b>{" "}
            organizes a Gathering.
            <br></br>
            <br></br>
            Use your <b>Bitboins</b> to buy Packs and open them to get cards!
            Try to collect them all!
          </div>
        </div>

        <PurchaseCard
          boinCost={packBoinCost}
          numPacks={user.numPacks}
          userBoins={user.boins}
        ></PurchaseCard>

        <WheelSpinner
          now={now}
          cd={spinCooldown}
          maxBoins={maxSpinBoins}
          disabled={false}
          lastSpinAmt={lastSpinAmt}
          lastSpinDate={user.lastSpin || new Date()}
        />

        <DustConverter packCost={packDustCost} userDust={user.dust} />
      </div>

      <div className="mt-5 p-1 bg-white text-center font-bold rounded border border-gray-800">
        <div className="mb-4">You have {user.numPacks} packs you can open</div>
        <Unwrapper
          cards={cards}
          unpackBtnDisabled={user.numPacks == 0}
        ></Unwrapper>
      </div>
    </div>
  );
}
