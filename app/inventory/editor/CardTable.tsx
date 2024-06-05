"use client";

import { Button, Table, TableBody, TableCell, TableRow } from "flowbite-react";
import CardRow from "./CardRow";
import { Card } from "@prisma/client";

interface CardTableProps {
  cards: Card[];
  onEditClick: (id: number) => void;
}

export default function CardTable(props: CardTableProps) {
  let body = props.cards.map((card) => (
    <CardRow
      onEditClick={props.onEditClick}
      key={card.id}
      id={card.id}
      title={card.title}
    ></CardRow>
  ));

  return (
    <div>
      <Table>
        <TableBody className="divide-y">{body}</TableBody>
      </Table>
    </div>
  );
}
