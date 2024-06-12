"use client";

import { deleteCard } from "@/app/actions";
import { Card } from "@prisma/client";
import { TableRow, TableCell, Button } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";

interface CardRowProps {
  card: Card;
  chance: number;
  id: number;
  title: string;
  onEditClick: (id: number) => void;
}

export default function CardRow(props: CardRowProps) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="font-medium text-xs text-gray-900 dark:text-white">
        {props.card.title}
      </TableCell>
      <TableCell className="font-medium text-xs text-gray-900 dark:text-white">
        {props.card.rarity}
      </TableCell>
      <TableCell className="font-medium text-xs text-gray-900 dark:text-white">
        {props.chance}%
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap items-start gap-1">
          <Button size={"xs"} onClick={() => props.onEditClick(props.id)}>
            Edit
          </Button>
          <form action={deleteCard}>
            <Button
              name="cardid"
              value={props.id}
              type="submit"
              color="failure"
              size={"xs"}
            >
              Delete
            </Button>
          </form>
        </div>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
