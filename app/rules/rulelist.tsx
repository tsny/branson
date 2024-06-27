import prisma from "@/lib/prisma";
import { Card } from "flowbite-react";
import DeleteRuleButton from "./deleteRuleButton";

interface RuleListProps {
  isAdmin?: boolean;
}

export default async function RuleList(props: RuleListProps) {
  const rules = await prisma.rule.findMany({
    orderBy: [{ id: "desc" }],
  });

  return (
    <div className="grid grid-cols-2 gap-1">
      {rules.map((rule) => (
        <Card key={rule.id} className="mb-2 rounded border shadow">
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
            {rule.content}
          </h5>
          <div className="grid justify-between">
            <div className="text-sm text-gray-900 dark:text-white">
              Fine: {rule.fine} boin
            </div>
            <div className="text-sm text-gray-900 dark:text-white mb-4">
              Author: {rule.authorName}
            </div>
            {props.isAdmin && (
              <DeleteRuleButton ruleID={rule.id}></DeleteRuleButton>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
