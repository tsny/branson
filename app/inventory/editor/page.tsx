import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { EditCardModal } from "./edit_card";

export default async function Home() {
  return (
    <div className="overflow-x-auto">
      <Button className="m-2">+ Add New Card</Button>
      <EditCardModal show={false}></EditCardModal>
      <Table>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Baby Murphy
            </TableCell>
            <TableCell>
              <ButtonGroup>
                <Button>Edit</Button>
                <Button color={"red"}>Delete</Button>
              </ButtonGroup>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>
              <ButtonGroup>
                <Button>Edit</Button>
                <Button color={"red"}>Delete</Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
