import { Button } from "flowbite-react";

interface LedgerCardProps {
  open?: boolean;
  user: string;
}

export default function LedgerCard({ open, user }: LedgerCardProps) {
  function Status() {
    if (open) {
      return <span className="text-red-800 animate-pulse">OUTSTANDING</span>;
    }
    return <span className="text-green-800 animate-pulse">CLEARED</span>;
  }

  return (
    <div className="bg-white rounded-lg shadow border-2 p-3">
      <div>
        <b>User: </b> {user}
      </div>
      <div>
        <b>Wager: </b> 500 boins
      </div>
      <div>
        <b>Balance Owed: </b> 20 boins
      </div>
      <div>
        <b>Status: </b>
        <Status />
      </div>
      <div>
        <b>Bookie: </b>Justin
      </div>

      <div className="pt-2 flex justify-center">
        {open && <Button className="center-self">Mark Complete</Button>}
      </div>
    </div>
  );
}
