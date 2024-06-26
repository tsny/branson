"use client";

import { buyPackFromForm, submitPost } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Card, Button } from "flowbite-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export interface PurchaseCardProps {
  numPacks: number;
  userBoins: number;
  boinCost: number;
}

export default function PurchaseCard(props: PurchaseCardProps) {
  let [busy, setBusy] = useState(false);

  return (
    <div className="bg-white rounded border border-gray-800 p-1 text-center">
      <div className="text-center font-bold">Buy Packs</div>
      <hr className="pb-2"></hr>
      <div className="text-xs pb-2">
        Cost: <b>{props.boinCost} Bitboin</b>
      </div>
      <div className="text-xs">
        You have {props.numPacks} packs and {props.userBoins} boins
      </div>

      <form
        className="flex justify-center gap-1 pt-6"
        action={async (formData) => {
          await buyPackFromForm(formData);
          setBusy(false);
        }}
        onSubmit={() => setBusy(true)}
      >
        <Button
          size={"sm"}
          disabled={busy || props.userBoins == 0}
          gradientDuoTone="cyanToBlue"
          type="submit"
        >
          Purchase
        </Button>
        <HelpButton
          title="Packs"
          content="Packs contain cards. Buy them and unpack them!"
        ></HelpButton>
      </form>
    </div>
  );
}
