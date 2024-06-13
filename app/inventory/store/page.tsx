import { Button, Card } from "flowbite-react";
import InvLinkHeader from "../linkHeader";
import {
  buyPackFromForm,
  convertDustToPack,
  getCurrentDBUser,
} from "@/app/actions";
import HelpButton from "@/app/helpButton";
import Unwrapper from "./unwrapper";
import WheelSpinner from "./wheel";

export default async function Store() {
  const user = await getCurrentDBUser();
  if (!user) {
    return <div>not logged in!</div>;
  }

  return (
    <div className="p-1">
      <InvLinkHeader storeSelected={true}></InvLinkHeader>
      <Card className="rounded border border-gray-800">
        <div className="text-xl underline">Branson Pack</div>
        <div className="text-xs">Cost: 1 Bitboin</div>
        <div className="text-xs">You have {user.numPacks} packs</div>

        <form className="flex justify-between " action={buyPackFromForm}>
          <Button
            size={"sm"}
            disabled={user.boins == 0}
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Purchase
          </Button>
          <HelpButton
            title="Packs"
            content="Packs contain cards. Buy them and unpack them!"
          ></HelpButton>
        </form>
      </Card>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <WheelSpinner></WheelSpinner>

        <Card className="rounded border border-gray-800">
          <div className="underline">Dust</div>
          <div className="text-xs">Convert 100 Dust to 1 Bitboin</div>
          <div className="text-xs">You have {user.dust || 0} dust</div>
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
