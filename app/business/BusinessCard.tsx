"use client";

import { Avatar, Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import PersonPicker from "./PersonPicker";

interface BusinessCardProps {
  businessName: string;
  header: string;
  bio?: string;
  id?: number;
  users?: string[];
  onCancel?: () => void;
  editMode?: boolean;
}

export default function BusinessCard(props: BusinessCardProps) {
  let [editMode, setEditMode] = useState(props.editMode);

  let titleDiv = (
    <p className="text-2xl text-center font-bold mb-1">{props.businessName}</p>
  );

  let bioDiv = <div className="text-sm  text-gray-500 mb-0">{props.bio}</div>;
  let headerDiv = (
    <div className="text-sm  text-gray-500 mb-0">{props.header}</div>
  );
  let teamList = (
    <div className="grid col-1 gap-2 mb-3">
      <Avatar
        img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
        alt="avatar of Jese"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>Jese Leos</div>
        </div>
      </Avatar>
      <Avatar
        img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
        alt="avatar of Jese"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>Jese Leos</div>
        </div>
      </Avatar>
    </div>
  );

  if (editMode) {
    titleDiv = (
      <input type="text" defaultValue={props.businessName} name="title"></input>
    );
  }

  if (editMode && props.users) {
    teamList = <PersonPicker users={props.users}></PersonPicker>;
  }

  if (editMode) {
    bioDiv = (
      <Textarea
        className="text-sm text-gray-500 mb-0"
        defaultValue={props.bio}
      ></Textarea>
    );
  }

  if (editMode) {
    headerDiv = (
      <TextInput
        className="text-sm text-gray-500 mb-0"
        defaultValue={props.header}
      ></TextInput>
    );
  }

  return (
    <form
      className="rounded border-gray-300 border-2 shadow bg-white p-2 m-2"
      action={async (formData) => {
        setEditMode(false);
      }}
    >
      <input hidden readOnly name="biz-id" value={props.id}></input>
      {titleDiv}
      <div className="flex justify-between">
        <div>
          {headerDiv}
          {bioDiv}
          <p className="text-sm  text-gray-500 mb-3">
            Located in <b>Branson</b>
          </p>
        </div>

        <img
          height={200}
          width={200}
          src="https://i.imgur.com/9bXzi7g.png"
          className="border-2 rounded "
        ></img>
      </div>

      <hr className=""></hr>
      <p className="text-xl underline text-center mt-3 mb-2">Meet the Team</p>
      {teamList}
      {!editMode && (
        <Button
          className="inline"
          onClick={() => setEditMode(true)}
          size={"sm"}
        >
          Edit
        </Button>
      )}
      {editMode && (
        <div>
          <Button
            className="ml-2 inline"
            color={"failure"}
            onClick={() => {
              setEditMode(false);
              if (props.onCancel) props.onCancel();
            }}
            size={"sm"}
          >
            Cancel
          </Button>
          <Button
            className="ml-2 inline"
            color={"success"}
            size={"sm"}
            type="submit"
          >
            Save
          </Button>
        </div>
      )}
    </form>
  );
}
