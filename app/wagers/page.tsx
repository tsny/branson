import prisma, { FullBet } from "@/lib/prisma";
import WagerPanel from "./WagerPanel";
import { getCurrentDBUser } from "../actions";

export default async function Page() {
  const users = await prisma.user.findMany();

  const currentUser = await getCurrentDBUser();

  const bets: FullBet[] = await prisma.bet.findMany({
    include: { creator: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="text-center mt-2 rounded-log">
      <div className="overflow-x-auto">
        <WagerPanel
          users={users}
          bets={bets}
          currentUser={currentUser ?? undefined}
        />
      </div>
    </div>
  );
}
