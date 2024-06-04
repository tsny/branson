import { Card } from "flowbite-react";

export default function BransonCard() {
  return (
    <Card>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Baby Murphy
      </h1>
      <hr className="h-px w-fill bg-gray-200 border-5 dark:bg-gray-700" />
      <img
        className="center border border-gray-300 rounded aspect-square"
        alt="baby murphy"
        src="https://i.imgur.com/uWly5WB.png"
      />
      <h1>
        A divine being descends upon the field. All combat stops. You are
        frozen. All players win.
      </h1>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        "now that's a good baby" - Charles
      </span>
      <p className="text-right text-sm m-0">RARE</p>
    </Card>
  );
}
