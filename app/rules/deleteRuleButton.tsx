"use client";
import { Button } from "flowbite-react";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteRule } from "../actions";

interface IDeleteRuleButton {
  ruleID: number;
}

export default function DeleteRuleButton(props: IDeleteRuleButton) {
  return (
    <Button
      onClick={() => {
        deleteRule(props.ruleID);
      }}
      color="failure"
      className="w-20"
    >
      <HiOutlineTrash className="h-6 w-6" />
    </Button>
  );
}
