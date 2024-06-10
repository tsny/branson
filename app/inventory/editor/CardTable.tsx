"use client";

import { Button, Table, TableBody, TableCell, TableRow } from "flowbite-react";
import CardRow from "./CardRow";
import { Card } from "@prisma/client";
import { CardStats } from "@/app/actions";

interface CardTableProps {
  cards: Card[];
  stat: CardStats[];
  onEditClick: (id: number) => void;
}

export default function CardEditorTable(props: CardTableProps) {
  let body = props.stat.map((stat) => (
    <CardRow
      card={stat.card}
      chance={stat.chance}
      onEditClick={props.onEditClick}
      key={stat.id}
      id={stat.id}
      title={stat.title}
    ></CardRow>
  ));

  return (
    <div>
      <Table striped>
        <TableBody className="divide-y">{body}</TableBody>
      </Table>
    </div>
  );
}
