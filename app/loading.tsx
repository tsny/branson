import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex items-center">
      <Spinner size={"xs"}></Spinner>
    </div>
  );
}
