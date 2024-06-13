"use client";
import { Card as BCard } from "@prisma/client";
import { Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { hiddenCardImageURL } from "./card";

interface CardPreviewProps {
  card: BCard;
  isFoil?: boolean;
  hidden?: boolean;
  revealSelf?: boolean;
  revealPauseInSeconds?: number;
  onImgClick?: (B: BCard) => void;

  onChecked?: (c: BCard) => void;
  checked?: boolean;
  onRevealFinished?: (c: BCard) => void;
}

export default function CardPreview(props: CardPreviewProps) {
  let [hidden, setHidden] = useState(props.hidden);
  let [cardImgURL, setCardImgURL] = useState(hiddenCardImageURL);

  let cardBg = rarityToBG(props.card.rarity);
  if (props.isFoil) {
    cardBg += " bg-holographic";
  }
  let imgUrl = props.card.imageURL || "";
  let borderCSS = props.checked
    ? "border-4 border-blue-600"
    : "border border-gray-600";

  useEffect(() => {
    if (props.revealSelf) {
      setHidden(true);
      setTimeout(() => {
        setHidden(false);
        setCardImgURL(imgUrl);
        console.log("reveal");
        if (props.onRevealFinished) {
          props.onRevealFinished(props.card);
        }
      }, 1000 * (props.revealPauseInSeconds || 1));
    }
  }, [props.card]);

  let handleLowerHalfClick = () => {
    if (props.onChecked) {
      props.onChecked(props.card);
    }
  };

  return (
    <div className={cardBg + " rounded " + borderCSS}>
      <div className="w-full mb-4">
        <img
          className="w-full"
          onClick={() => {
            if (props.onImgClick) props.onImgClick(props.card);
          }}
          src={hidden ? hiddenCardImageURL : imgUrl}
          alt={props.card.title}
        ></img>
      </div>
      <div onClick={handleLowerHalfClick} className="flex justify-center">
        <h1
          // onClick={handleLowerHalfClick}
          className="mb-4 text-xs text-center font-bold"
        >
          {hidden ? "???" : props.card.title}
        </h1>
      </div>
    </div>
  );
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
    default:
      cardBg += "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-500";
  }
  return cardBg;
}
