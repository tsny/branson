import { FullBet } from "@/lib/prisma";
import { HasAtleastOneRole, Status } from "@/lib/utils";
import { Bet, User } from "@prisma/client";
import { Button } from "flowbite-react";
import { deleteWager, settleWager } from "../actions";

interface WagerCardProps {
  bet: FullBet;
  currentUser?: User | null;
  userControlsBets?: boolean;
}

export default function WagerCard({
  currentUser,
  bet,
  userControlsBets: userIsBookie,
}: WagerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border-gray-800 border p-3">
      <div>
        <b>{bet.creator.firstName}</b> bets <b>{bet.opponent.firstName}</b>{" "}
        that:
        <br />
        {bet.desc}
      </div>
      <hr className="my-4"></hr>
      <div className="flex justify-center gap-20">
        <TeamTable
          bet={bet}
          creatorTeam={true}
          teamWon={bet.creatorWon}
          userIsBookie={userIsBookie}
        ></TeamTable>
        <TeamTable
          bet={bet}
          creatorTeam={false}
          teamWon={!bet.creatorWon}
          userIsBookie={userIsBookie}
        ></TeamTable>
      </div>
      <div className="mt-3 mx-10 p-2 border shadow rounded-lg">
        Status: <Status ok={!bet.closed} s1="OPEN" s2="CLOSED"></Status>
        <hr></hr>
        <div>
          <b>Bet:</b> {bet.amt} boins
        </div>
        <div>
          <b>Pot:</b> {bet.amt * 20} boins
        </div>
        <div>
          <b>Created At:</b> {bet.createdAt.toLocaleString()}
        </div>
      </div>
      <div className="flex gap-1 justify-center">
        {userIsBookie && (
          <form action={deleteWager} className="flex gap-1">
            <Button
              type="submit"
              name="id"
              value={bet.id}
              color={"failure"}
              className="mt-10 inline"
            >
              Delete
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

interface TeamTableProps {
  bet: FullBet;
  teamWon: boolean;
  creatorTeam: boolean;
  userIsBookie?: boolean;
}

function TeamTable({
  creatorTeam: isCreatorTeam,
  teamWon: thisTeamWon,
  userIsBookie,
  bet,
}: TeamTableProps) {
  let bg = bet.closed && thisTeamWon ? "border-green-500 border-2" : "";
  bg += " p-1";
  const teamTitle = isCreatorTeam
    ? bet.creator.firstName
    : bet.opponent.firstName;

  let button = (
    <form>
      <Button color={"success"} className="mt-2 inline" type="submit">
        Join Team
      </Button>
    </form>
  );

  if (userIsBookie) {
    button = (
      <form action={settleWager}>
        <input hidden readOnly value={bet.id} name="bet-id" />
        <Button
          name="creator-won"
          value={String(isCreatorTeam)}
          color={"success"}
          className="mt-2 inline"
          type="submit"
        >
          Declare Winner
        </Button>
      </form>
    );
  }

  if (bet.closed) {
    button = <div></div>;
  }

  return (
    <div className={bg}>
      <div className="font-bold">{teamTitle}</div>
      {button}
    </div>
  );
}
