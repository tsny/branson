import { buyPackFromForm } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import NumberSpin from "@/app/random";
import { Card, Button } from "flowbite-react";

export default function WheelSpinner() {
  return (
    <Card className="rounded border border-gray-800">
      <div className="underline">Spin The Wheel</div>
      <div className="text-xs">
        The next time you can spin the wheel is blank
      </div>
      <NumberSpin val={3} delay={8}></NumberSpin>
      <form className="flex justify-between" action={buyPackFromForm}>
        <Button
          size={"sm"}
          disabled={true}
          gradientDuoTone="cyanToBlue"
          type="submit"
        >
          Spin
        </Button>
        <HelpButton
          title="What is dust"
          content="In your inventory, sell cards to get dust"
        ></HelpButton>
      </form>
    </Card>
  );
}
