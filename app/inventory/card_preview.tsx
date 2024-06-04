import { Card, Rating, RatingStar } from "flowbite-react";

export default function CardPreview() {
  return (
    <Card
      className="mx-2 p-0"
      href="#"
      imgSrc="https://i.imgur.com/uWly5WB.png"
    >
      <Rating>
        <h1 className="text-sm text-left font-bold underline decoration-pink-500">
          Baby Murphy
        </h1>
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
        <RatingStar />
      </Rating>
    </Card>
  );
}
