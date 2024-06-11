import { Card as BCard } from "@prisma/client";
import { rarityToBG } from "./card_preview";

interface BrandonCardProps {
  card?: BCard;
  hidden?: boolean;
  isFoil?: boolean;
}

export const missingCardImageURL = "https://i.imgur.com/9z1wyms.png";
export const hiddenCardImageURL = "https://i.imgur.com/5dW0nSj.png";

export default function BransonCard(props: BrandonCardProps) {
  let card = props.card;
  let cardBg = rarityToBG(props.card?.rarity || "");
  let imgSrc = missingCardImageURL;
  let hidden = props.hidden;
  if (props.hidden) {
    imgSrc = hiddenCardImageURL;
  } else if (props.card?.imageURL) {
    imgSrc = props.card?.imageURL;
  }

  return (
    <div className={cardBg + " p-3 rounded border-gray-600 border"}>
      <div className=" bg-gray-100/90 border-4 border-gray-400 rounded mb-1">
        <h1 className="text-2xl pl-1 font-bold tracking-tight text-gray-900 dark:text-white">
          {hidden ? "???" : card?.title}
        </h1>
      </div>
      <img
        className="shadow-lg center border-4 border-gray-500 rounded aspect-square"
        alt={hidden ? "???" : card?.title}
        src={imgSrc}
      />
      <p className="p-1 mb-2 text-xs">{hidden ? "???" : card?.type}</p>
      <div className="bg-gray-100 border border-gray-600 shadow-lg rounded p-1">
        <h1 className="p-1 mb-5 text-sm">{hidden ? "???" : card?.desc}</h1>
        {card?.quote && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <hr className="h-px text-xs w-fill bg-gray-200 border-5 dark:bg-gray-700" />
            {hidden ? "???" : card?.quote}
          </span>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-left text-bold text-xs m-0">2024 The Agency©</p>
        <p className="text-right text-bold text-sm m-0">
          {hidden ? "???" : card?.rarity.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
