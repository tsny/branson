import BFooter from "../footer";
import BransonCard from "./card";
import CardPreview from "./card_preview";
import { CardModal } from "./view_card";

export default function Home() {
  return (
    <div>
      <CardModal></CardModal>
      <div className="m-2 grid grid-cols-3 gap-2">
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
