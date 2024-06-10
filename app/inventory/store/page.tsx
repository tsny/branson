import { Button, ButtonGroup, Card } from "flowbite-react";
import InvLinkHeader from "../linkHeader";
import { buyPackFromForm, getCurrentDBUser, unwrapPack } from "@/app/actions";
import CardRevealer from "../CardReveal";
import { Card as BCard } from "@prisma/client";

export default async function Store() {
  const currentUser = await getCurrentDBUser();
  let newCards: BCard[] = await unwrapPack();

  return (
    <div>
      <InvLinkHeader storeSelected={true}></InvLinkHeader>
      <Card className="rounded border">
        <div className="text-xl text-bold">Branson Pack</div>
        <hr></hr>
        <div> Cost: 1 Bitboin</div>
        <div>You have {currentUser?.numPacks} bitboins</div>
        <form action={buyPackFromForm}>
          <Button
            disabled={currentUser?.boins == 0}
            name="userid"
            value={currentUser?.id}
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Purchase
          </Button>
        </form>
      </Card>
      <Card className="rounded border mt-2">
        <div className="text-xl text-bold">Dust</div>
        <hr></hr>
        <div>Convert 100 Dust to 1 Bitboin</div>
        <div>You have {currentUser?.boins} dust</div>
        <form action={buyPackFromForm}>
          <Button
            disabled={true}
            name="userid"
            value={currentUser?.id}
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Purchase
          </Button>
        </form>
      </Card>
      <Card className="mt-5">
        <form action={buyPackFromForm}>
          <Button
            disabled={currentUser?.numPacks == 0}
            name="userid"
            value={currentUser?.id}
            gradientDuoTone="pinkToOrange"
            type="submit"
          >
            Unpack
          </Button>
        </form>
        <CardRevealer cards={newCards}></CardRevealer>
      </Card>
    </div>
  );
}
