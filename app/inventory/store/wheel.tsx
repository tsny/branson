import { spinTheWheel } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Card, Button } from "flowbite-react";
import WheelProgress from "./wheen-progress";
import { getMinutes } from "@/lib/cards";

interface WheelSpinnerProps {
  lastSpin: Date;
  spinDisabled: boolean;
  maxBoins: number;
}

export default async function WheelSpinner(props: WheelSpinnerProps) {
  let nextSpin = props.lastSpin;
  nextSpin.setHours(nextSpin.getHours() + 1);
  let now = new Date();
  const minutesTillSpin = getMinutes(nextSpin, now);

  return (
    <div className="rounded bg-white border border-gray-800 text-center p-1">
      <div className="font-bold">Spin The Wheel</div>
      <hr className="pb-2"></hr>
      <WheelProgress nextSpin={nextSpin}></WheelProgress>
      <form
        className="flex justify-center gap-1 pt-6"
        action={async (formData) => {
          "use server";
          await spinTheWheel(props.maxBoins);
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
    </div>
  );
}
