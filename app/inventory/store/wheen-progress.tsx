import { FaCoins } from "react-icons/fa";
export interface WheelProgressProps {
  nextSpin: Date;
  now: Date;
  minutesRemaining: number;
}

export default function WheelProgress(props: WheelProgressProps) {
  return (
    <div className="text-sm">
      Spin the wheel for free boins{" "}
      <FaCoins className="inline text-yellow-500" />
      <br></br>
      The next time you can spin the wheel is in{" "}
      <b>{props.minutesRemaining} minutes</b>
    </div>
  );
}
