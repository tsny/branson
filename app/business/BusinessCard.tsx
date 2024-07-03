"use client";

import { Avatar, Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import PersonPicker from "./PersonPicker";
import { deleteBusiness, upsertBusiness } from "../actions";
import { Business, User } from "@prisma/client";

interface BusinessCardProps {
  biz?: Business;
  allUsers: User[];
  onCancel?: () => void;
  editMode?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function BusinessCard(props: BusinessCardProps) {
  let [editMode, setEditMode] = useState(props.editMode);

  let titleDiv = (
    <p className="text-2xl text-center font-bold mb-1">{props?.biz?.name}</p>
  );

  let bioDiv = (
    <div className="text-sm  text-gray-500 mb-0">{props?.biz?.bio}</div>
  );
  let headerDiv = (
    <div className="text-sm font-bold text-gray-500 mb-2">
      {props?.biz?.header}
    </div>
  );

  let members = props.biz?.members.map((m, i) => (
    <div className="text-center" key={i}>
      - {m}
    </div>
  ));
  let teamList = <div className="grid col-1 gap-1 mb-3">{members}</div>;

  const defaultLogo = "https://i.imgur.com/9bXzi7g.png";
  let logoDiv = (
    <img
      height={200}
      width={200}
      src={props.biz?.logoURL ?? defaultLogo}
      className="border border-gray-800 rounded shadow-lg"
      alt="business-logo"
    ></img>
  );

  if (editMode) {
    logoDiv = (
      <TextInput
        defaultValue={props?.biz?.logoURL ?? ""}
        placeholder="Logo URL"
        name="logo-url"
      ></TextInput>
    );
  }

  if (editMode) {
    titleDiv = (
      <TextInput
        required
        type="text"
        defaultValue={props?.biz?.name}
        name="name"
        placeholder="Biz Name"
      />
    );
  }

  if (editMode && props.allUsers) {
    teamList = (
      <PersonPicker
        checkedUsers={props.biz?.members}
        users={props.allUsers.map((u) => u.firstName ?? "badname")}
      ></PersonPicker>
    );
  }

  if (editMode) {
    bioDiv = (
      <Textarea
        className="text-sm w-full text-gray-500 mb-0"
        defaultValue={props?.biz?.bio ?? ""}
        required
        placeholder="Bio"
        name="bio"
      ></Textarea>
    );
  }

  if (editMode) {
    headerDiv = (
      <TextInput
        className="text-sm text-gray-500 mb-0"
        defaultValue={props?.biz?.header ?? ""}
        required
        name="header"
        placeholder="Header/Slogan"
      ></TextInput>
    );
  }

  return (
    <div className="rounded border-gray-700 border shadow-lg bg-white p-2 m-2">
      <form
        onSubmit={() => setEditMode(false)}
        action={async (formData) => {
          await upsertBusiness(formData);
        }}
      >
        <input hidden readOnly name="biz-id" value={props?.biz?.id}></input>
        <div className="flex justify-between">
          {titleDiv}
          {logoDiv}
        </div>
        <div className="">
          {headerDiv}
          {bioDiv}
          <p className="text-sm  text-gray-500 mb-3">
            Located in <b>Branson</b>
          </p>
          <p className="text-sm text-gra-500">
            Status: <b className="text-green-500">ACTIVE</b>
          </p>
        </div>

        <hr className=""></hr>
        <p className="text-xl underline text-center mt-3 mb-2">Meet the Team</p>
        {teamList}
        {!editMode && props.canEdit && (
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
      {props.canDelete && (
        <form className="mt-1" action={deleteBusiness}>
          <Button
            name="biz-id"
            value={props.biz?.id}
            type="submit"
            color={"failure"}
          >
            Delete
          </Button>
        </form>
      )}
    </div>
  );
}
