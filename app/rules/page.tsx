import BNavbar from "../navbar";
import RuleForm from "./ruleform";
import RuleList from "./rulelist";

export const dynamic = "force-dynamic";

export default async function RulesPage() {
  return (
    <div>
      <BNavbar></BNavbar>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 pt-8 mb-8">
          Branson Rules
        </h1>
        <RuleForm></RuleForm>
        <RuleList></RuleList>
      </div>
    </div>
  );
}
