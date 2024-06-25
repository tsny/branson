"use client";

import { Avatar, Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import PersonPicker from "./PersonPicker";

interface BusinessCardProps {
  businessName: string;
  header: string;
  bio: string;
  id: number;
  users?: string[];
}

export default function BusinessCard(props: BusinessCardProps) {
  let [editMode, setEditMode] = useState(false);

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
      className="rounded border-gray-300 border-2 bg-white p-2 m-2"
      action={async (formData) => {
        setEditMode(false);
      }}
    >
      <p className="text-2xl font-bold mb-1">{props.businessName}</p>
      {headerDiv}
      {bioDiv}
      <input hidden name="biz-id" value={props.id}></input>
      <p className="text-sm  text-gray-500 mb-3">St. Louis</p>

      <hr className=""></hr>
      <p className="text-xl underline text-center mt-3 mb-2">Meet the Team</p>
      {teamList}
      {!editMode && (
        <Button
          className="inline"
          onClick={() => setEditMode(!editMode)}
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
            onClick={() => setEditMode(false)}
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
