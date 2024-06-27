"use client";

import { Card } from "@prisma/client";
import { Button, Label, Select } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import CatalogMain from "./catalog/catalog_main";
import { Cord } from "@/lib/prisma";
import { sellCards } from "../actions";
import HelpButton from "../helpButton";
import { RarityBlock } from "./RarityBlock";

interface SellerPanelProps {
  cords: Cord[];
  userDust: number;
}

export default function SellerPanel(props: SellerPanelProps) {
  const cards = props.cords.map((c) => c.card);
  const initialCords = props.cords;

  let [cords, setCords] = useState(props.cords);
  let [dust, setDust] = useState(0);
  let [selectedCards, setSelectedCards] = useState<number[]>([]);
  let [sortCardsByName, setSortCardsByName] = useState(false);

  useEffect(() => {
    if (sortCardsByName) {
      console.log("sorting");
      setCords(sort(cords));
    } else {
      console.log("not sorting");
      setCords(initialCords);
    }
  }, [sortCardsByName]);

  const ref = useRef<HTMLFormElement>(null);

  const onCardCheck = (card: Card, ownershipId: number) => {
    const index = selectedCards.indexOf(ownershipId);
    const selectingCard = index === -1;
    if (selectingCard) {
      setDust(dust + card.dustValue);
      selectedCards.push(ownershipId);
    } else {
      setDust(dust - card.dustValue);
      selectedCards.splice(index, 1);
    }
    setSelectedCards(selectedCards);
    console.log(selectedCards);
  };

  if (cords.length == 0) {
    return (
      <div className="bg-white rounded border shadow p-4 m-4">
        First, go to the <b>Store</b> and get some cards!
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        setSelectedCards([]);
        setDust(0);
        await sellCards(dust, selectedCards);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <div className="sticky p-2 mx-2 text-xs text-justify top-2 bg-white border-gray-600 rounded border">
        <div className="flex gap-1 justify-between">
          <div className="text-justify self-center font-bold">
            You have <b>{props.cords.length}</b> cards <br></br>
            and <b>{props.userDust}</b> dust!
          </div>
          <div className="flex gap-1">
            <Button
              type="submit"
              className="inline"
              disabled={selectedCards?.length === 0}
            >
              Sell for {dust} dust
            </Button>
            <HelpButton
              title="What?"
              content="Tap the card's image to view more details! Tap the name of the card to select it. You can select multiple"
            ></HelpButton>
          </div>
        </div>
        <div className="mt-3 bg-white flex justify-between font-bold">
          <RarityBlock cards={cards}></RarityBlock>
          <div className="inline">
            <Label className="inline">Sort Cards By</Label>
            <Select
              className="inline"
              onChange={(e) => {
                setSortCardsByName(e.target.value === "alpha");
              }}
            >
              <option defaultChecked={true} value={"id"}>
                Date Unpacked
              </option>
              <option value={"alpha"}>Name</option>
            </Select>
          </div>
        </div>
      </div>

      <CatalogMain
        onChecked={onCardCheck}
        showCheckboxes={true}
        cords={props.cords}
        selectedIDs={selectedCards}
      ></CatalogMain>
    </form>
  );
}

export function sort(cards: Cord[]) {
  return cards.sort((a, b) => {
    if (a.card.title.toLowerCase() < b.card.title.toLowerCase()) {
      return -1;
    }
    if (a.card.title.toLowerCase() > b.card.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
}
