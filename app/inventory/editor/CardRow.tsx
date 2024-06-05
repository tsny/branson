"use client";

import { deleteCard } from "@/app/actions";
import { TableRow, TableCell, Button } from "flowbite-react";

interface CardRowProps {
  id: number;
  title: string;
  onEditClick: (id: number) => void;
}

export default function CardRow(props: CardRowProps) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {props.title}
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => props.onEditClick(props.id)}>Edit</Button>
          <form action={deleteCard}>
            <Button
              name="button"
              value={props.id}
              type="submit"
              color="failure"
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
