import { Button } from "flowbite-react";
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
  const packBoinCost = await getConfigAsNumber("pack.boin.cost");
  const maxSpinBoins = await getConfigAsNumber("spin.max.boins");

  return (
    <div className="p-1">
      <InvLinkHeader storeSelected={true}></InvLinkHeader>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-white border border-gray-800 rounded text-sm p-1">
          <h1 className="text-center font-bold">Branson: The Gathering</h1>
          <hr className="pb-2"></hr>
          <div className="text-xs text-center">
            <b>Branson: The Gathering</b> takes place in the land of Branson.
            <br></br>
            <br></br>
            The organization known as <b>The Agency</b> organizes, each year, a
            Gathering.
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
          maxBoins={maxSpinBoins}
          spinDisabled={false}
          lastSpin={user.lastSpin || new Date()}
        ></WheelSpinner>

        <div className="rounded bg-white p-1 border border-gray-800 text-center">
          <div className="font-bold">Dust</div>
          <hr className="pb-2"></hr>
          <div className="text-xs pb-3">
            Convert {packDustCost} Dust to 1 Bitboin
          </div>
          <div className="text-xs">
            You have <b>{user.dust} dust</b>
          </div>
          <form
            className="flex justify-center gap-1 pt-6"
            action={convertDustToPack}
          >
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
        </div>
      </div>

      <div className="mt-5 p-1 bg-white text-center font-bold rounded border border-gray-800">
        <div className="mb-4">You have {user.numPacks} packs you can open</div>
        <Unwrapper unpackBtnDisabled={user.numPacks == 0}></Unwrapper>
      </div>
    </div>
  );
}
