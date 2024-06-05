"use client";
import { Card, Checkbox, Rating, RatingStar } from "flowbite-react";
import { useState } from "react";

export default function CardPreview() {
  let [checked, setChecked] = useState(false);
  return (
    <Card
      className="mx-2 p-0"
      href="#"
      imgSrc="https://i.imgur.com/uWly5WB.png"
      onClick={() => setChecked(!checked)}
    >
      <Checkbox checked={checked} id="accept" />
      <h1 className="text-sm text-left font-bold underline decoration-pink-500">
        Baby Murphy
      </h1>
    </Card>
  );
}
