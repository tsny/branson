import React, { useState } from 'react';
import { Button, Label, Textarea } from "flowbite-react";


export default function PostForm() {

    const handleSubmit = (e: Event) => {
        e.preventDefault();
    };

    return (
        <div className="m-3 max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea id="comment" placeholder="Say something nice bout someone" required rows={4} />
            <Button className="mt-2" type="submit">Submit</Button>
        </div>
    );
}
