'use client '

import React from 'react';
import { useState } from 'react';

function UpBoins() {

    const [value, setValue] = useState(0)

    const handleClick = () => {
        // Define what happens when the div is clicked
        setValue(value + 1)
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-between mt-4 text-gray-500 hover:text-blue-500 transition duration-200 ease-in-out"
        >
            <div className="flex items-center space-x-1">
                <span>{value.toString()} up-boins</span>
            </div>
        </button>
    );
};

export default UpBoins;