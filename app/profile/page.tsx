// components/ProfilePage.js
import React from 'react';
import { Card, Button } from 'flowbite-react';
import BNavbar from '../navbar';

const ProfilePage = () => {
    return (
        <div>
            <BNavbar></BNavbar>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Card className="max-w-sm p-4 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-24 h-24 rounded-full"
                            src="/profile-picture.jpg"
                            alt="Profile"
                        />
                        <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
                        <p className="text-gray-600">john.doe@example.com</p>
                        <p className="mt-2 text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
                            venenatis erat. Sed ultrices leo at libero vehicula, a tempor urna
                            viverra.
                        </p>
                        <div className="mt-4">
                            <Button gradientDuoTone="purpleToBlue">
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
