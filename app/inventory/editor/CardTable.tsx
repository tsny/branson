"use client";

import { Table, TableBody } from "flowbite-react";
import CardEditorRow from "./CardRow";
import { Card } from "@prisma/client";
import { CardStats } from "@/app/actions";

interface EditorTableProps {
  cards: Card[];
  stat: CardStats[];
  onEditClick: (id: number) => void;
  onViewClick: (id: number) => void;
}

export default function CardEditorTable(props: EditorTableProps) {
  let body = props.stat.map((stat) => (
    <CardEditorRow
      card={stat.card}
      chance={stat.chance}
      onEditClick={props.onEditClick}
      onViewClick={props.onViewClick}
      key={stat.id}
      id={stat.id}
      title={stat.title}
    ></CardEditorRow>
  ));

  return (
    <div>
      <Table striped>
        <TableBody className="divide-y">{body}</TableBody>
      </Table>
    </div>
  );
}
