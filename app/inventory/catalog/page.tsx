import BFooter from "@/app/footer";
import CardPreview from "../card_preview";
import { CardModal } from "../view_card";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
        Catalog
      </h1>
      <CardModal show={true}></CardModal>
      <div className="m-2 grid grid-cols-3 gap-2">
        <CardPreview></CardPreview>
        <CardPreview></CardPreview>
        <CardPreview></CardPreview>
        <CardPreview></CardPreview>
        <CardPreview></CardPreview>
        <CardPreview></CardPreview>
      </div>
      <div className="sticky bottom-0 pb-2">
        <BFooter></BFooter>
      </div>
    </div>
  );
}
