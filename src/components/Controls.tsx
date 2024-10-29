import React from "react";

interface ControlsProps {
  numberOfDisks: number;
  setNumberOfDisks: (value: number) => void;
  startAutoSolve: () => void;
  isAutoSolving: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  numberOfDisks,
  setNumberOfDisks,
  startAutoSolve,
  isAutoSolving,
}) => {
  return (
    <div className="controls gap-4 flex">
      <label>
        Number of Disks:
        <input
          className="border border-gray-400 rounded-md p-1 ml-2"
          type="number"
          min="3"
          max="8"
          value={numberOfDisks}
          onKeyDown={(e) => e.preventDefault()} // Prevent typing
          onChange={(e) => setNumberOfDisks(Number(e.target.value))}
        />
      </label>
      <button
        onClick={startAutoSolve}
        className={`px-4 py-2 rounded text-white ${
          isAutoSolving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-600"
        }`}
        disabled={isAutoSolving}
      >
        Auto Solve
      </button>
    </div>
  );
};

export default Controls;
