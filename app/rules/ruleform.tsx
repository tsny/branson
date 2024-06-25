import React from "react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { createRule } from "../actions";

export default async function RuleForm() {
  return (
    <Card className="w-11/12 mb-2">
      <div className="text-xl">Create Rule</div>
      <form action={createRule} className="flex flex-col p-2 w-full">
        <Label
          htmlFor="email2"
          value="Rule:"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        />
        <TextInput
          className="mb-1"
          name="ruleText"
          placeholder="Enter your rule here"
          required
          shadow
        />

        <Label
          htmlFor="number-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Fine amount:
        </Label>
        <TextInput
          type="number"
          id="number-input"
          name="fine"
          defaultValue={1}
          required
        />

        <Label
          htmlFor="number-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Rule Author:
        </Label>
        <TextInput required name="author" />
        <Button className="mt-3 w-1/3" type="submit">
          Submit
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Card>
  );
}
