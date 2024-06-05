"use client";
import { Card as BCard } from "@prisma/client";
import { Card, Checkbox } from "flowbite-react";
import { useState } from "react";
import { hiddenCardImageURL } from "./card";

interface CardPreviewProps {
  card: BCard;
  isFoil?: boolean;
  showCheckbox?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

export function rarityToBG(rarity: string) {
  let cardBg = "p-0 ";
  switch (rarity.toUpperCase()) {
    case "EPIC":
      cardBg +=
        "bg-gradient-to-r from-purple-100 to-purple-200 border-purple-500";
      break;
    case "RARE":
      cardBg += "bg-gradient-to-r from-sky-100 to-sky-200 border-blue-500";
      break;
    case "LEGENDARY":
      cardBg +=
        "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-500";
      break;
  }
  return cardBg;
}

export default function CardPreview(props: CardPreviewProps) {
  let [checked, setChecked] = useState(false);
  let hidden = props.hidden;
  let cardBg = rarityToBG(props.card.rarity);
  if (props.isFoil) {
    cardBg += " bg-holographic";
  }
  let imgUrl = props.card.imageURL || "";
  if (props.hidden) {
    imgUrl = hiddenCardImageURL;
  }
  return (
    <Card
      className={cardBg + " "}
      href="#"
      imgSrc={imgUrl}
      // renderImage={() => (
      //   <Image
      //     width={200}
      //     height={200}
      //     src={props.card.imageURL || ""}
      //     alt="image 1"
      //   />
      // )}
      onClick={props.onClick}
    >
      {props.showCheckbox && <Checkbox checked={checked} id="accept" />}
      <h1 className="text-xs text-left font-bold">
        {hidden ? "???" : props.card.title}
      </h1>
    </Card>
  );
}
