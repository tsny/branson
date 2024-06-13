import { Button, Popover } from "flowbite-react";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface HelpButtonProps {
  title: string;
  content: string;
}

export default function HelpButton(props: HelpButtonProps) {
  return (
    <Popover
      aria-labelledby="default-popover"
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white"
            >
              {props.title}
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>{props.content}</p>
          </div>
        </div>
      }
    >
      <Button className="text-3xl self-center">
        <HiQuestionMarkCircle className="h-full w-full" />
      </Button>
    </Popover>
  );
}
