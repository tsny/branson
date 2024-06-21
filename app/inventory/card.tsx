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
} from "react-icons/fa";
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

  return (
    <div className={cardBg + " p-3 rounded border-gray-600 border"}>
      <div className=" bg-gray-100/90 border-4 border-gray-400 rounded mb-1">
        <h1 className="text-2xl pl-1 font-bold tracking-tight text-gray-900 dark:text-white">
          {hidden ? "???" : card?.title}
        </h1>
      </div>
      <img
        className="shadow-lgtext-bold center border-4 text-bold border-gray-500 rounded aspect-square"
        alt={hidden ? "???" : card?.title}
        src={imgSrc}
        draggable={false}
      />
      <div className="flex justify-center">
        <div className="flex w-full justify-between my-1 bg-gray-100/70 border border-gray-600 shadow-lg rounded">
          <p className="p-1 text-xs">{hidden ? "???" : card?.type}</p>
          {icon}
        </div>
      </div>
      <div className="bg-gray-100 border border-gray-600 shadow-lg rounded p-1">
        <div className="p-1 mb-5 text-sm">
          <CardFormatter text={hidden ? "???" : card?.desc}></CardFormatter>
        </div>
        {card?.quote && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <hr className="h-px text-xs w-fill bg-gray-200 border-5 dark:bg-gray-700" />
            {hidden ? "???" : card?.quote}
          </span>
        )}
      </div>
      <div className="flex justify-between pt-3">
        <p className="text-left text-bold text-xs m-0">2024 The Agency©</p>
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
  }
  return <FaRobot className="h-full mr-2"></FaRobot>;
}
