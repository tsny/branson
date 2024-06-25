import { convertDustToPack } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Button } from "flowbite-react";
import React from "react";

interface DustConverterProps {
  packCost: number;
  userDust: number;
}

export default function DustConverter({
  packCost,
  userDust,
}: DustConverterProps) {
  return (
    <div className="rounded bg-white p-1 border border-gray-800 text-center">
      <div className="font-bold">Dust</div>
      <hr className="pb-2"></hr>
      <div className="text-xs pb-3">Convert {packCost} Dust to 1 Bitboin</div>
      <div className="text-xs">
        You have <b>{userDust} dust</b>
      </div>
      <form
        className="flex justify-center gap-1 pt-6"
        action={convertDustToPack}
      >
        <Button
          size={"sm"}
          disabled={packCost < 100}
          gradientDuoTone="cyanToBlue"
          type="submit"
        >
          Convert
        </Button>
        <HelpButton
          title="What is dust"
          content="In your inventory, sell cards to get dust"
        ></HelpButton>
      </form>
    </div>
  );
}
