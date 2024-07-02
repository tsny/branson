"use client";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Tabs,
} from "flowbite-react";
import { HiClipboardList, HiUserCircle } from "react-icons/hi";
import React from "react";
import WagerCard from "./WagerCard";
import LedgerCard from "./LedgerCard";
import { Bet, User } from "@prisma/client";
import WagerForm from "./WagerForm";
import { FullBet } from "@/lib/prisma";

interface WagerPanelProps {
  users: User[];
  bets: FullBet[];
  currentUser?: User;
}

export default function WagerPanel({
  users: allUsers,
  bets,
  currentUser,
}: WagerPanelProps) {
  const wagers = bets.map((b, i) => {
    return <WagerCard allUsers={allUsers} user={currentUser} key={i} bet={b} />;
  });

  return (
    <div className="p-2">
      <WagerForm users={allUsers} />
      <div className="mt-2 p-2 grid grid-cols-1 gap-3">{wagers}</div>
    </div>
  );
}
