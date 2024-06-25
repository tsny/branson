"use client";
import { getMinutes } from "@/lib/cards";
import { useEffect, useState } from "react";

export interface WheelProgressProps {
  nextSpin: Date;
}

export default function WheelProgress(props: WheelProgressProps) {
  let now = new Date();
  const [time, setTime] = useState(now);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const minutes = getMinutes(props.nextSpin, now);

  return (
    <div className="text-sm">
      The next time you can spin the wheel is in <b>{minutes} minutes</b>
    </div>
  );
}
