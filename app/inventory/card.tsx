import { Card as BCard } from "@prisma/client";
import { rarityToBGColor } from "./card_preview";
import {
  FaCat,
  FaSkull,
  FaUser,
  FaPhoenixSquadron,
  FaBuilding,
  FaBone,
  FaRobot,
  FaBiohazard,
  FaGem,
  FaBible,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import { LuSwords } from "react-icons/lu";

import CardFormatter from "@/lib/CardFormatter";

interface BrandonCardProps {
  card?: BCard;
  hidden?: boolean;
  isFoil?: boolean;
}

export const missingCardImageURL = "https://i.imgur.com/9z1wyms.png";
export const hiddenCardImageURL = "https://i.imgur.com/5dW0nSj.png";

export default function BransonCard(props: BrandonCardProps) {
  let card = props.card;
  let cardBg = rarityToBGColor(props.card?.rarity || "");
  let imgSrc = missingCardImageURL;
  let hidden = props.hidden;
  if (props.hidden) {
    imgSrc = hiddenCardImageURL;
  } else if (props.card?.imageURL) {
    imgSrc = props.card?.imageURL;
  }

  let icon = CardTypeToIcon(card?.type);
  const quotePadding = card && card?.defense > 0 ? "mb-5" : "";

  return (
    <div
      className={cardBg + " p-3 rounded-lg border-gray-600 border shadow-md"}
    >
      <div className="flex justify-between bg-white border-4 border-gray-400 rounded mb-1">
        <h1 className="text-2xl pl-1 font-bold tracking-tight text-gray-900 dark:text-white">
          {hidden ? "???" : card?.title}
        </h1>
        <span className="p-1 rounded-lg self-center mr-1">
          {card?.cost} <FaGem className="inline text-blue-600"></FaGem>
        </span>
      </div>

      <img
        className="shadow-lgtext-bold center border-4 text-bold border-gray-500 rounded aspect-square"
        alt={hidden ? "???" : card?.title}
        src={imgSrc}
        draggable={false}
      />
      <div className="flex justify-center">
        <div className="flex w-full justify-between my-1 bg-gray-100/70 border border-gray-600 shadow-lg rounded">
          <p className="p-1 text-xs font-bold">{hidden ? "???" : card?.type}</p>
          {icon}
        </div>
      </div>
      <div className="relative bg-gray-100 border border-gray-600 shadow-lg rounded p-1">
        <div className="p-1 mb-3 text-sm">
          <CardFormatter text={hidden ? "???" : card?.desc}></CardFormatter>
        </div>
        {card && card?.hp > 0 && (
          <div className="p-1 px-3 bg-white gap-1 flex self-center rounded-lg text-sm border shadow font-bold border-gray-900 absolute -bottom-2 right-3">
            <FaHeart className="inline self-center text-red-400" /> {card.hp}
            <LuSwords className="inline self-center" /> {card.defense}
          </div>
        )}
        {card?.quote && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <hr className="bg-gray-600 text-gray-600 border-6 dark:bg-gray-700" />
            <span className={"flex pt-2" + quotePadding}>
              <span>{hidden ? "???" : card?.quote}</span>
            </span>
          </span>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-left text-bold text-xs m-0">2024 BTG©</p>
        <p className="text-right text-bold text-xs m-0">
          {hidden ? "???" : card?.rarity.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

function CardTypeToIcon(type?: string | undefined) {
  if (!type) {
    return <FaRobot className="h-full mr-2"></FaRobot>;
  }
  type = type.toLowerCase();
  if (type.includes("zombie")) {
    return <FaBiohazard className="h-full mr-2" />;
  } else if (type.includes("human")) {
    return <FaUser className="h-full mr-2" />;
  } else if (type.includes("bone")) {
    return <FaBone className="h-full mr-2" />;
  } else if (type.includes("struct")) {
    return <FaBuilding className="h-full mr-2" />;
  } else if (type.includes("location")) {
    return <FaBuilding className="h-full mr-2" />;
  } else if (type.includes("creature")) {
    return <FaSkull className="h-full mr-2" />;
  } else if (type.includes("spell")) {
    return <FaPhoenixSquadron className="h-full mr-2" />;
  } else if (type.includes("event")) {
    return <FaGem className="h-full mr-2" />;
  } else if (type.includes("cat")) {
    return <FaCat className="h-full mr-2" />;
  } else if (type.includes("divine")) {
    return <FaBible className="h-full mr-2" />;
  }
  return <FaRobot className="h-full mr-2"></FaRobot>;
}
