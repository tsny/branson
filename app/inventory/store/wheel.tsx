import { spinTheWheel } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Button, Toast, ToastToggle } from "flowbite-react";
import WheelProgress from "./wheen-progress";
import { HiFire } from "react-icons/hi";
import { getMinutes } from "@/lib/cards";

interface WheelSpinnerProps {
  lastSpinDate: Date;
  now: Date;
  lastSpinAmt?: number;
  cd: number;
  disabled: boolean;
  maxBoins: number;
}

export default function WheelSpinner(props: WheelSpinnerProps) {
  let nextSpin = props.lastSpinDate;
  let now = new Date();
  nextSpin.setMinutes(nextSpin.getMinutes() + props.cd);
  const minRemaining = getMinutes(nextSpin, now);

  const disabled = false;

  return (
    <div className="rounded bg-white border border-gray-800 text-center p-1">
      <div className="font-bold">Spin The Wheel</div>
      <hr className="pb-2"></hr>
      <WheelProgress
        now={props.now}
        minutesRemaining={minRemaining}
        nextSpin={nextSpin}
      ></WheelProgress>
      <div className="flex fade-in justify-center mt-3">
        {props.lastSpinAmt && props.lastSpinAmt > 0 && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              You acquired {props.lastSpinAmt} <b>Bitboins!</b>{" "}
            </div>
            <ToastToggle />
          </Toast>
        )}
      </div>
      <form
        className="flex justify-center gap-1 pt-4"
        action={async (formData) => {
          "use server";
          await spinTheWheel(props.maxBoins);
        }}
      >
        <Button
          size={"sm"}
          disabled={disabled || minRemaining > 0}
          gradientDuoTone="cyanToBlue"
          type="submit"
          className={disabled ? "" : "animate-pulse"}
        >
          Spin
        </Button>
        <HelpButton
          title="Spin the wheel"
          content="Every so often you can spin the wheel for some extra boins"
        ></HelpButton>
      </form>
    </div>
  );
}
