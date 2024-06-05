"use client";

import { Button, Modal } from "flowbite-react";

interface AddCardButtonProps {
  onClick: () => void;
}

export default function AddCardButton(props: AddCardButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      className="m-2"
      gradientDuoTone="purpleToPink"
    >
      + Add New Card
    </Button>
  );
}
