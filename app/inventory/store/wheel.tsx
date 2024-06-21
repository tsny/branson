import { spinTheWheel } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Card, Button } from "flowbite-react";
import WheelProgress from "./wheen-progress";
import { getMinutes } from "@/lib/cards";

interface WheelSpinnerProps {
  lastSpin: Date;
  spinDisabled: boolean;
}

export default async function WheelSpinner(props: WheelSpinnerProps) {
  let nextSpin = props.lastSpin;
  nextSpin.setHours(nextSpin.getHours() + 1);
  let now = new Date();
  const minutesTillSpin = getMinutes(nextSpin, now);

  return (
    <Card className="rounded border border-gray-800">
      <div className="underline">Spin The Wheel</div>
      <WheelProgress nextSpin={nextSpin}></WheelProgress>
      <form
        className="flex justify-between"
        action={async (formData) => {
          "use server";
          await spinTheWheel(10);
        }}
      >
        <Button
          size={"sm"}
          disabled={props.spinDisabled || minutesTillSpin > 0}
          gradientDuoTone="cyanToBlue"
          type="submit"
        >
          Spin
        </Button>
        <HelpButton
          title="Spin the wheel"
          content="Every hour you can spin the wheel for some extra boins"
        ></HelpButton>
      </form>
    </Card>
  );
}
