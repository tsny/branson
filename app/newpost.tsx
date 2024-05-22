'use client'

import React, { useState } from 'react';

const NewPost = () => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (content.trim()) {
            // onAddPost(content);
            setContent('');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
            {/* <form onSubmit={handleSubmit}> */}
            <form>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write something nice about someone"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                // rows="3"
                />
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
