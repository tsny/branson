import { isAdmin } from "../actions";
import RuleForm from "./ruleform";
import RuleList from "./rulelist";

export const dynamic = "force-dynamic";

export default async function RulesPage() {
  let isUserAdmin = await isAdmin();
  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold text-center text-gray-800 pt-2">
        Branson Rules
      </h1>
      <div className="text-center mb-3">
        Rules to be specifically followed while in Branson
      </div>
      {isUserAdmin && <RuleForm></RuleForm>}
      <RuleList isAdmin={isUserAdmin}></RuleList>
    </div>
  );
}
