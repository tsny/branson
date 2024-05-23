import React from 'react';
import { Button, Label, Textarea } from "flowbite-react";


export default function PostForm() {
    return (
        <form className="m-3 max-w-md">
            <Textarea maxLength={400} id="comment" placeholder="Say something nice bout someone" required rows={4} />
            <Button className="mt-2" type="submit">Submit</Button>
        </form>
    );
}
