// src/components/ProfilePage.tsx
import React from 'react';
import { Card, Button } from 'flowbite-react';
import BNavbar from '../navbar';

interface ProfilePageProps {
    name: string;
    email: string;
    bio: string;
    avatarUrl: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name, email, bio, avatarUrl }) => {
    return (
        <div>
            <BNavbar></BNavbar>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
                <Card className="max-w-sm w-full">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-24 h-24 rounded-full shadow-lg"
                            src={avatarUrl}
                            alt={`${name}'s avatar`}
                        />
                        <h2 className="mt-4 text-xl font-semibold">{name}</h2>
                        <p className="text-gray-600">{email}</p>
                        <p className="mt-2 text-center">{bio}</p>
                        <Button className="mt-4">Edit Profile</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
