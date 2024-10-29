import React from "react";

interface DiskProps {
  size: number;
  pegIndex: number;
  position: number;
  isWon?: boolean;
}

const Disk: React.FC<DiskProps> = ({ size, pegIndex, position, isWon }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isWon) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("pegIndex", pegIndex.toString());
  };
  return (
    <div
      className="absolute transform -translate-x-1/2 rounded-lg flex justify-center items-center"
      style={{
        width: `${size * 25 + 50}px`, // Increased width for each disk based on size
        height: "24px", // Increased height for all disks
        bottom: `${position * 26}px`, // Adjusted vertical spacing
        left: "50%", // Center each disk horizontally in the peg
        backgroundColor: `hsl(${size * 40}, 70%, 60%)`, // Dynamic color based on size
      }}
      draggable={!isWon}
      onDragStart={handleDragStart}
    >
      <span className="text-white text-xs font-semibold">{size}</span>
    </div>
  );
};

export default Disk;
