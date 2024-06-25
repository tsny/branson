import { ButtonGroup, Button } from "flowbite-react";
import Link from "next/link";

interface InvLinkHeaderProps {
  storeSelected?: Boolean;
  invSelected?: Boolean;
  catalogSelected?: Boolean;
}

export default function InvLinkHeader(props: InvLinkHeaderProps) {
  return (
    <div className="flex justify-center mt-2">
      <ButtonGroup outline className="mb-3 self-center">
        <Button
          color={props.storeSelected ? "blue" : "gray"}
          as={Link}
          href="/inventory/store"
        >
          Store
        </Button>
        <Button
          color={props.invSelected ? "blue" : "gray"}
          as={Link}
          href="/inventory"
        >
          Inventory
        </Button>
        <Button
          color={props.catalogSelected ? "blue" : "gray"}
          as={Link}
          href="/inventory/catalog"
        >
          Catalog
        </Button>
      </ButtonGroup>
    </div>
  );
}
