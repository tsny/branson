import React from "react";

interface PersonPickerProps {
  users: string[];
}

export default function PersonPicker(props: PersonPickerProps) {
  const list = props.users.map((m) => {
    return (
      <li key={m}>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            name="checkbox-item-11"
            type="checkbox"
            value={m}
            placeholder="test"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          ></input>
          <label className="ml-2">{m}</label>
        </div>
      </li>
    );
  });

  return (
    <div
      id="dropdownSearch"
      className="m-3 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
    >
      <ul
        className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {list}
      </ul>
    </div>
  );
}
