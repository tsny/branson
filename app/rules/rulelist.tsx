import prisma from "@/lib/prisma";
import { Button, Card } from "flowbite-react";
import DeleteRuleButton from "./deleteRuleButton";

export default async function RuleList() {
  let rules: any[];
  try {
    rules = await prisma.rule.findMany({
      orderBy: [{ id: "desc" }],
    });
  } catch (e) {
    if (typeof e === "string") {
      return <>{e}</>;
    } else if (e instanceof Error) {
      return <>{e.message}</>;
    }
    return <>get err</>;
  }

  return (
    <>
      {rules.map((rule) => (
        <Card key={rule.id} className="w-3/4 mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {rule.content}
          </h5>
          <div className="flex justify-between">
            <p className="tracking-tight text-gray-900 dark:text-white">
              Fine: {rule.fine} boin
            </p>
            <DeleteRuleButton ruleID={rule.id}></DeleteRuleButton>
          </div>
        </Card>
      ))}
    </>
  );
}
