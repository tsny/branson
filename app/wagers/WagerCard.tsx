import { FullBet } from "@/lib/prisma";
import { User } from "@prisma/client";
import { Button } from "flowbite-react";
import { closeWager as markWagerPaid, deleteWager } from "../actions";
import { HasAtleastOneRole } from "@/lib/utils";
import TeamTable from "./WagerTeamTable";

interface WagerCardProps {
  bet: FullBet;
  user?: User;
  allUsers: User[];
}

export default function WagerCard({ user, bet, allUsers }: WagerCardProps) {
  let status = "OPEN";
  if (bet.closed && bet.duesPaid) {
    status = "CLOSED";
  } else if (!bet.closed) {
    status = "AWAITING OUTCOME";
  } else {
    status = "AWAITING PAYMENT";
  }

  const totalTeamSize = bet.team1.length + bet.team2.length;
  const pot = bet.amt * totalTeamSize;
  const bookieCut = pot * 0.1;
  const winnings = pot - bookieCut;
  const isBookie = user && HasAtleastOneRole(user, ["bookie", "super"]);
  let userAlreadyBet = false;
  if (user)
    userAlreadyBet = bet.team1.includes(user.id) || bet.team2.includes(user.id);

  let markPaidButton = <></>;
  if (isBookie && bet.closed && !bet.duesPaid) {
    markPaidButton = (
      <form action={markWagerPaid}>
        <input hidden readOnly value={bet.id} name="bet-id" />
        <Button color={"success"} className="inline" type="submit">
          Mark Paid
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border-gray-800 border p-3">
      <div>
        <b>{bet.creator.firstName}</b> bets that:
        <br />
        {bet.desc}
      </div>
      <hr className="my-4"></hr>

      <div className="flex justify-center gap-20">
        <TeamTable
          allUsers={allUsers}
          teamNum={1}
          bet={bet}
          thisTeamWon={bet.closed && bet.team1Won}
          teamIDs={bet.team1}
          user={user}
          userAlreadyBet={userAlreadyBet}
        ></TeamTable>

        <TeamTable
          allUsers={allUsers}
          teamNum={2}
          bet={bet}
          teamIDs={bet.team2}
          thisTeamWon={bet.closed && !bet.team1Won}
          user={user}
          userAlreadyBet={userAlreadyBet}
        ></TeamTable>
      </div>

      <div className="mt-3 mx-5 p-2 border shadow rounded-lg">
        Status: <b>{status}</b>
        <hr className="mb-2"></hr>
        <div>
          <b>Bet:</b> {bet.amt} boins
        </div>
        <div>
          <b>Pot:</b> {pot} boins
        </div>
        {bet.closed && (
          <div>
            <div>
              <b>Bookie Cut:</b> {bookieCut} boins
            </div>
            <div>
              <b>Winnings:</b> {winnings} boins
            </div>
          </div>
        )}
        <div>
          <b>Created At:</b> {bet.createdAt.toLocaleString()}
        </div>
      </div>

      <div className="mt-3 flex gap-1 justify-center">
        {isBookie && (
          <form action={deleteWager}>
            <Button type="submit" name="id" value={bet.id} color={"failure"}>
              Delete
            </Button>
          </form>
        )}
        {markPaidButton}
      </div>
    </div>
  );
}
