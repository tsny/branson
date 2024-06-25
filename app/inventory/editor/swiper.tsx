import React, { useState } from "react";
import { Modal } from "flowbite-react";

interface SwipeableModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SwipeableModal({
  show,
  onClose,
  children,
}: SwipeableModalProps) {
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === null || startY === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    setTranslateX(currentX - startX);
    setTranslateY(currentY - startY);
    setCurrentX(currentX);
    setCurrentY(currentY);
  };

  const handleTouchEnd = () => {
    if (isNearBorder(currentX, currentY)) {
      onClose();
    }
    resetPosition();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || startX === null || startY === null) {
      return;
    }

    const currentX = e.clientX;
    const currentY = e.clientY;
    setTranslateX(currentX - startX);
    setTranslateY(currentY - startY);
    setCurrentX(currentX);
    setCurrentY(currentY);
  };

  const isNearBorder = (x: number | null, y: number | null) => {
    const threshold = 150; // Distance from the border to consider as "near"

    if (x === null || y === null) {
      return false;
    }

    const { innerWidth, innerHeight } = window;

    return (
      x < threshold ||
      y < threshold ||
      x > innerWidth - threshold ||
      y > innerHeight - threshold
    );
  };

  const resetPosition = () => {
    setStartX(null);
    setStartY(null);
    setTranslateX(0);
    setTranslateY(0);
    setCurrentX(null);
    setCurrentY(null);
    setIsDragging(false);
  };

  return (
    <Modal show={show} onClose={onClose} dismissible>
      <div
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {children}
      </div>
    </Modal>
  );
}
