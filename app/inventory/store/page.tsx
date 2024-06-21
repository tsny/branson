import { Button, Card } from "flowbite-react";
import InvLinkHeader from "../linkHeader";
import { convertDustToPack, getCurrentDBUser } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import Unwrapper from "./unwrapper";
import WheelSpinner from "./wheel";
import PurchaseCard from "./purchase";
import { getConfigAsNumber } from "@/lib/prisma";

export default async function Store() {
  const user = await getCurrentDBUser();
  if (!user) {
    return <div>not logged in!</div>;
  }
  const packDustCost = await getConfigAsNumber("pack.dust.cost");
  const maxSpinBoins = await getConfigAsNumber("spin.max.boins");

  return (
    <div className="p-1">
      <InvLinkHeader storeSelected={true}></InvLinkHeader>
      <PurchaseCard
        numPacks={user.numPacks}
        userBoins={user.boins}
      ></PurchaseCard>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <WheelSpinner
          maxBoins={maxSpinBoins}
          spinDisabled={false}
          lastSpin={user.lastSpin || new Date()}
        ></WheelSpinner>

        <Card className="rounded border border-gray-800">
          <div className="underline">Dust</div>
          <div className="text-xs">
            Convert {packDustCost} Dust to 1 Bitboin
          </div>
          <div className="text-xs">You have {user.dust} dust</div>
          <form className="flex justify-between" action={convertDustToPack}>
            <Button
              size={"sm"}
              disabled={user.dust < 100}
              gradientDuoTone="cyanToBlue"
              type="submit"
            >
              Convert
            </Button>
            <HelpButton
              title="What is dust"
              content="In your inventory, sell cards to get dust"
            ></HelpButton>
          </form>
        </Card>
      </div>

      <div className="mt-2 p-1 bg-white text-center font-bold rounded border border-gray-800">
        <div className="mb-4">You have {user.numPacks} packs you can open</div>
        <Unwrapper unpackBtnDisabled={user.numPacks == 0}></Unwrapper>
      </div>
    </div>
  );
}
