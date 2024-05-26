import React from "react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";
import {
  Button,
  Card,
  Label,
  RangeSlider,
  TextInput,
  Textarea,
} from "flowbite-react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default function RuleForm() {
  const addRule = async (formData: FormData) => {
    "use server";

    let content = formData.get("textbox") as string;
    await prisma.rule.create({
      data: {
        authorID: 1,
        content: content,
      },
    });

    revalidatePath("/rules");
  };

  return (
    <Card className="w-4/5 mb-2">
      <form action={addRule} className="flex flex-col p-2 w-full">
        <div className=" block">
          <Label
            htmlFor="email2"
            value="Rule:"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          />
        </div>
        <TextInput
          className="mb-1"
          name="textbox"
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
        <input
          type="number"
          id="number-input"
          defaultValue={1}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 w-1/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <Button className="mt-3 w-1/3" type="submit">
          Submit
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Card>
  );
}
