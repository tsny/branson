import { Card as BCard } from "@prisma/client";
import { hiddenCardImageURL } from "./card";
import Image from "next/image";

interface CardPreviewProps {
  card?: BCard;

  isFoil?: boolean;
  hidden?: boolean;
  revealSelf?: boolean;
  revealPauseInSeconds?: number;

  onImgClick?: (card?: BCard) => void;
  onChecked?: (card: BCard) => void;
  onRevealFinished?: (c: BCard) => void;

  checked?: boolean;
  animate?: boolean;
}

export default function CardPreview(props: CardPreviewProps) {
  const card = props.card;
  const title = card?.title ?? "???";

  let cardBg = rarityToBGColor(card?.rarity);
  if (props.isFoil) {
    cardBg += " bg-holographic";
  }
  if (props.animate && props.hidden && props.card) {
    cardBg += " animate-pulse";
  }
  let imgUrl = card?.imageURL || hiddenCardImageURL;
  if (props.hidden) {
    imgUrl = hiddenCardImageURL;
  }

  let borderCSS = props.checked
    ? "border-4 border-blue-600"
    : rarityToBGColor(card?.rarity) + " border";

  let handleLowerHalfClick = () => {
    if (!props.hidden && props.onChecked && card) {
      props.onChecked(card);
    }
  };

  return (
    <div className={cardBg + " rounded cursor-pointer " + borderCSS}>
      <div className="w-full">
        <img
          draggable={false}
          onClick={() => {
            if (props.onImgClick) {
              props.onImgClick(card);
            }
          }}
          src={imgUrl}
          // width={0}
          // height={0}
          // sizes="100vw"
          // style={{ width: "100%", height: "auto" }} // optional
          alt={title}
        />
      </div>
      <div
        draggable={false}
        onDragEnter={handleLowerHalfClick}
        onClick={handleLowerHalfClick}
        className="flex justify-center pt-3"
      >
        <h1 className="mb-4 text-xs text-center font-bold">
          {props.hidden ? "???" : title}
        </h1>
      </div>
    </div>
  );
}

export function rarityToBGColor(rarity: string | undefined) {
  let cardBg = "p-0 shadow ";
  if (!rarity) {
    return cardBg + " bg-gray-500 opacity-25";
  }
  switch (rarity.toUpperCase()) {
    case "EPIC":
      cardBg +=
        "bg-gradient-to-r from-purple-300 to-purple-200 border-purple-500";
      break;
    case "RARE":
      cardBg += "bg-gradient-to-r from-sky-300 to-sky-200 border-blue-500";
      break;
    case "LEGENDARY":
      cardBg +=
        "bg-gradient-to-r from-yellow-300 to-yellow-200 border-yellow-500";
      break;
    case "COMMON":
      cardBg += "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-500";
      break;
    default:
      cardBg += "bg-gray-500 border-gray-500";
  }
  return cardBg;
}
