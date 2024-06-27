export interface WheelProgressProps {
  nextSpin: Date;
  now: Date;
  minutesRemaining: number;
}

export default function WheelProgress(props: WheelProgressProps) {
  return (
    <div className="text-sm">
      The next time you can spin the wheel is in{" "}
      <b>{props.minutesRemaining} minutes</b>
    </div>
  );
}
