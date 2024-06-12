"use client";

import AnimatedNumbers from "react-animated-numbers";

interface NumberSpinProps {
  delay: number;
  val: number;
}

export default function NumberSpin(props: NumberSpinProps) {
  return (
    <AnimatedNumbers
      className="border border-gray-700 rounded p-2"
      includeComma
      transitions={(index) => ({
        type: "spring",
        duration: 8,
      })}
      animateToNumber={props.val}
      fontStyle={{
        fontSize: 40,
        color: "black",
      }}
    />
  );
}
