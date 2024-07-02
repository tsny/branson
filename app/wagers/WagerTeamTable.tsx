import { FullBet } from "@/lib/prisma";
import { HasAtleastOneRole } from "@/lib/utils";
import { Button } from "flowbite-react";
import { settleWager, joinWager, closeWager } from "../actions";
import { User } from "@prisma/client";

export interface TeamTableProps {
  bet: FullBet;
  allUsers: User[];
  thisTeamWon: boolean;
  user?: User;
  teamNum: number;
  teamIDs: number[];
  userAlreadyBet: boolean;
}

export default function TeamTable({
  thisTeamWon,
  bet,
  teamIDs,
  allUsers,
  user,
  teamNum,
  userAlreadyBet,
}: TeamTableProps) {
  let bg =
    bet.closed && thisTeamWon
      ? "rounded border-green-500 border-2 p-3"
      : "rounded border-gray-800 border p-3";

  const isBookie = user && HasAtleastOneRole(user, ["bookie", "super"]);

  const teamList = teamIDs.map((id) => {
    const user = allUsers.find((u) => u.id == id);
    if (user) {
      return <div key={user.id}> - {user.firstName}</div>;
    }
  });

  let settleButton = <></>;
  if (isBookie && !bet.closed) {
    settleButton = (
      <form action={settleWager}>
        <input hidden readOnly value={bet.id} name="bet-id" />
        <Button
          name="teamNum"
          value={teamNum}
          color={"success"}
          className="mt-2 inline"
          type="submit"
        >
          Declare Winner
        </Button>
      </form>
    );
  }

  let joinButtn = <div></div>;
  if (user && !bet.closed && !userAlreadyBet) {
    joinButtn = (
      <form action={joinWager}>
        <Button type="submit" name="teamNum" value={teamNum}>
          Count me in
        </Button>
        <input hidden readOnly name="bet-id" value={bet.id}></input>
      </form>
    );
  }

  return (
    <div>
      <div className={bg}>
        {thisTeamWon && (
          <div className="font-bold text-xl animate-pulse">WINNER</div>
        )}
        <div className="font-bold">Team {teamNum}</div>
        <hr></hr>
        {teamList}
        {settleButton}
        {joinButtn}
      </div>
    </div>
  );
}
