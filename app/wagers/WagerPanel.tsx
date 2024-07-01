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
  userControlsBets?: boolean;
  currentUser?: User | null;
}

export default function WagerPanel({
  userControlsBets,
  users,
  bets,
  currentUser,
}: WagerPanelProps) {
  const usernames = users.map((u) => u.firstName ?? "unk");

  const wagers = bets.map((b, i) => {
    const user = usernames.find((u) => u == "");

    return <WagerCard userControlsBets={userControlsBets} key={i} bet={b} />;
  });

  return (
    <Tabs aria-label="Full width tabs">
      <Tabs.Item active title="Wagers" icon={HiUserCircle}>
        {userControlsBets && (
          <Accordion
            className="bg-white m-2 border-gray-800 border"
            collapseAll
          >
            <AccordionPanel>
              <AccordionTitle>+ New Wager</AccordionTitle>
              <AccordionContent>
                <WagerForm users={users} />
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        )}
        <div className="px-1 grid grid-cols-1 gap-3">{wagers}</div>
      </Tabs.Item>
      <Tabs.Item title="Ledger" icon={HiClipboardList}>
        <div className="p-2">
          <LedgerCard user="Taylor" />
          <LedgerCard user="Frank" open={true} />
          <LedgerCard user="Aaron" />
        </div>
      </Tabs.Item>
    </Tabs>
  );
}
