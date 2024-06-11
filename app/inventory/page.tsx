import { getCurrentUserCards } from "../actions";
import CatalogMain from "./catalog/catalog_main";
import InvLinkHeader from "./linkHeader";
import { Button } from "flowbite-react";
import SellerPanel from "./seller";

export default async function Home() {
  let user = await getCurrentUserCards();
  if (!user) {
    return <>not logged in</>;
  }
  let cards = user?.CardOwnership.map((c) => {
    return c.card;
  });
  let dust = 0;

  return (
    <div>
      <InvLinkHeader invSelected={true}></InvLinkHeader>
      <div className="text-bold text-center">
        You have {cards.length} cards!
      </div>
      <SellerPanel cards={cards}></SellerPanel>
      <CatalogMain showCheckboxes={true} cards={cards}></CatalogMain>
    </div>
  );
}
