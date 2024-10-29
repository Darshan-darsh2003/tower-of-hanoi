import React from "react";
import Disk from "./Disk";

interface PegProps {
  disks: number[];
  pegIndex: number;
  onDropDisk: (fromPeg: number, toPeg: number) => void;
  numberOfDisks: number; // New prop to determine peg width based on max disk size
  isWon?: boolean;
}

const Peg: React.FC<PegProps> = ({
  disks,
  pegIndex,
  onDropDisk,
  numberOfDisks,
  isWon,
}) => {
  const pegWidth = numberOfDisks * 28 + 50; // Updated peg width based on the largest disk width
  const pegLabels = ["A", "B", "C"]; // Labels for the pegs

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-72 border border-gray-600 bg-gray-200 flex flex-col items-center"
        style={{
          width: `${pegWidth}px`, // Adjust peg width dynamically
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const fromPeg = Number(e.dataTransfer.getData("pegIndex"));
          if (fromPeg !== pegIndex) onDropDisk(fromPeg, pegIndex);
        }}
      >
        {disks.map((size, index) => (
          <Disk
            key={size}
            size={size}
            pegIndex={pegIndex}
            position={index}
            isWon={isWon}
          />
        ))}
      </div>
      <span className="mt-2 text-lg font-semibold">{pegLabels[pegIndex]}</span>
    </div>
  );
};

export default Peg;
