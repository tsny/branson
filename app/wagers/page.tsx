import prisma, { FullBet } from "@/lib/prisma";
import WagerPanel from "./WagerPanel";
import { getCurrentDBUser } from "../actions";
import { HasAtleastOneRole } from "@/lib/utils";

export default async function Page() {
  const users = await prisma.user.findMany();

  const currentUser = await getCurrentDBUser();
  const userControlsBets = HasAtleastOneRole(currentUser, ["bookie", "super"]);

  const bets: FullBet[] = await prisma.bet.findMany({
    include: {
      creator: true,
      opponent: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="text-center mt-2 rounded-log">
      <div className="overflow-x-auto">
        <WagerPanel
          userControlsBets={userControlsBets}
          users={users}
          bets={bets}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
