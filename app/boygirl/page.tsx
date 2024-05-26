"use client";
import React, { useEffect, useState } from "react";
import BNavbar from "../navbar";

const RandomImage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [timer, setTimer] = useState(5);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch("https://picsum.photos/800/400");
      setImageSrc(response.url);
      setTimer(5); // Reset the timer to 5 seconds
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          fetchRandomImage();
          return 5; // Reset the timer to 5 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BNavbar></BNavbar>
      <div className="flex flex-col h-100 mt-2 items-center">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Random"
            className="w-80 h-40 object-cover mb-4"
          />
        )}
        <p className="text-2xl mb-4">Boy / Girl?</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${(timer / 5) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default RandomImage;
