import { Spinner } from "flowbite-react";
import InvLinkHeader from "../linkHeader";

export default function Loading() {
  return (
    <>
      <InvLinkHeader></InvLinkHeader>
      <Spinner></Spinner>
    </>
  );
}
