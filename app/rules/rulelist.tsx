import prisma from "@/lib/prisma";
import { Card } from "flowbite-react";
import DeleteRuleButton from "./deleteRuleButton";

export default async function RuleList() {
  const rules = await prisma.rule.findMany({
    orderBy: [{ id: "desc" }],
  });

  return (
    <>
      {rules.map((rule) => (
        <Card key={rule.id} className="w-11/12 mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {rule.content}
          </h5>
          <hr></hr>
          <div className="grid justify-between">
            <div className="tracking-tight text-gray-900 dark:text-white">
              Fine: {rule.fine} boin
            </div>
            <div className="tracking-tight text-gray-900 dark:text-white mb-4">
              Author: {rule.authorName}
            </div>
            <DeleteRuleButton ruleID={rule.id}></DeleteRuleButton>
          </div>
        </Card>
      ))}
    </>
  );
}
