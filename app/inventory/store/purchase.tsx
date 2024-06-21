"use client";

import { buyPackFromForm, submitPost } from "@/app/actions";
import HelpButton from "@/app/helpButton";
import { Card, Button } from "flowbite-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export interface PurchaseCardProps {
  numPacks: number;
  userBoins: number;
}

export default function PurchaseCard(props: PurchaseCardProps) {
  let [busy, setBusy] = useState(false);

  return (
    <Card className="rounded border border-gray-800">
      <div className="text-xl underline">Branson Pack</div>
      <div className="text-xs">Cost: 1 Bitboin</div>
      <div className="text-xs">You have {props.numPacks} packs</div>

      <form
        className="flex justify-between "
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
    </Card>
  );
}
