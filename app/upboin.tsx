'use client '

import React from 'react';
import { useState } from 'react';

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    profilePicURL: string;
}

export interface PostProps {
    user: User;
    postText: string;
    boins: Number;
    hoursSincePost: Number;
    onUpBoinsClicked: () => void;
}

export default function Post(props: PostProps) {
    return (
        <div className="w-full bg-white  border-black-300 rounded-lg shadow-md p-2 m-2">
            <div className="flex items-start">
                <img
                    src={props.user.profilePicURL}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                />
                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-bold text-gray-800">
                                {props.user.firstName}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                                @{props.user.username}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                                {props.hoursSincePost.toString()}h
                            </span>
                        </div>
                    </div>
                    <p className="mt-2 text-gray-800">{props.postText}</p>
                    <UpBoins onClick={props.onUpBoinsClicked} boins={props.boins}></UpBoins>
                </div>
            </div>
        </div>
    );
}


interface IUpBoin {
    boins: Number;
    onClick: () => void;
}

function UpBoins(props: IUpBoin) {
    return (
        <button
            onClick={props.onClick}
            className="flex items-center justify-between mt-4 text-gray-500 hover:text-blue-500 transition duration-200 ease-in-out"
        >
            <div className="flex items-center space-x-1">
                <span>{props.boins.toString()} up-boins</span>
            </div>
        </button>
    );
};