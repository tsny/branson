import { Badge, Button, ButtonGroup, Card, Popover } from "flowbite-react";
import InvLinkHeader from "../linkHeader";
import { buyPackFromForm, getCurrentDBUser, unwrapPack } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import Unwrapper from "./unwrapper";

export default async function Store() {
  const user = await getCurrentDBUser();
  if (!user) {
    return <div>not logged in!</div>;
  }

  return (
    <div>
      <InvLinkHeader storeSelected={true}></InvLinkHeader>
      <Card className="rounded border">
        <div className="text-xl text-bold">Branson Pack</div>
        <hr></hr>
        <div> Cost: 1 Bitboin</div>
        <div>You have {user.numPacks} packs</div>

        <form className="flex justify-between " action={buyPackFromForm}>
          <Button
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

      <Card className="rounded border mt-2">
        <div className="text-xl text-bold">Dust</div>
        <hr></hr>
        <div>Convert 100 Dust to 1 Bitboin</div>
        <div>You have {user.dust || 0} dust</div>
        <form className="flex justify-between " action={buyPackFromForm}>
          <Button disabled={true} gradientDuoTone="cyanToBlue" type="submit">
            Purchase
          </Button>
          <HelpButton
            title="What is dust"
            content="In your inventory, sell cards to get dust"
          ></HelpButton>
        </form>
      </Card>
      <Card className="mt-5">
        <div>You have {user.numPacks} packs you can open</div>
        <Unwrapper unpackBtnDisabled={user.numPacks == 0}></Unwrapper>
      </Card>
    </div>
  );
}
