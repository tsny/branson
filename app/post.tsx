import { Button } from 'flowbite-react';
import React from 'react';
import { HiOutlineTrash } from "react-icons/hi";

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    profilePicURL: string;
}

export interface PostProps {
    user: User;
    postText: string;
    boins: number;
    hoursSincePost: Number;
    onUpBoinsClick: () => boolean;
}

export default async function Post(props: PostProps) {

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

                    <div className="flex justify-between">
                        <UpBoins onClick={props.onUpBoinsClick} boins={props.boins}></UpBoins>
                        <Button className='w-20 mr-3'>
                            <HiOutlineTrash className="h-6 w-6" />
                        </Button>
                    </div>
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
            className="flex items-center justify-between mt-4 text-gray-500 hover:text-blue-500 transition duration-200 ease-in-out"
        >
            <div className="flex items-center space-x-1">
                <span>{props.boins.toString()} up-boins</span>
            </div>
        </button>
    );
};