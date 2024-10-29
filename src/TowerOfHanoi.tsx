import React from "react";
import Peg from "./components/Peg";
import Controls from "./components/Controls";
import useTowerOfHanoi from "./hooks/useTowerOfHanoi";

const TowerOfHanoi: React.FC = () => {
  const {
    numberOfDisks,
    setNumberOfDisks,
    pegs,
    moveCount,
    isWon,
    resetGame,
    onDropDisk,
    startAutoSolve,
    isAutoSolving,
  } = useTowerOfHanoi();

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Tower of Hanoi
      </h1>
      <Description />
      <div className="flex flex-col items-center  mt-10 flex-grow">
        <Controls
          numberOfDisks={numberOfDisks}
          setNumberOfDisks={setNumberOfDisks}
          startAutoSolve={startAutoSolve}
          isAutoSolving={isAutoSolving}
        />
        <div className="flex justify-around w-full max-w-4xl mt-8 mb-4">
          {pegs.map((disks, index) => (
            <Peg
              isWon={isWon}
              key={index}
              disks={disks}
              pegIndex={index}
              onDropDisk={onDropDisk}
              numberOfDisks={numberOfDisks} // Pass the number of disks to determine peg width
            />
          ))}
        </div>
        <p className="text-lg font-semibold">Move Count: {moveCount}</p>
        <p className="text-lg font-semibold">
          Minimum Moves: {Math.pow(2, numberOfDisks) - 1}
        </p>
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
        {isWon && (
          <div className="text-2xl font-semibold text-green-500 mt-6">
            You Win!
          </div>
        )}
      </div>
    </div>
  );
};

const Description = () => (
  <>
    <p className="mx-auto text-sm w-1/2 text-center">
      The Tower of Hanoi is a mathematical puzzle where you have three rods and
      a number of disks of different sizes. The puzzle starts with the disks
      stacked in ascending order of size on one rod, the smallest at the top,
      making a conical shape. The objective of the puzzle is to move the entire
      stack to another rod, obeying the following rules:
    </p>
    <ul className="mx-auto mb-6 text-sm w-2/5 list-disc list-inside text-left">
      <li>Only one disk can be moved at a time.</li>
      <li>
        Each move consists of taking the upper disk from one of the stacks and
        placing it on top of another stack or on an empty rod.
      </li>
      <li>No disk may be placed on top of a smaller disk.</li>
    </ul>
  </>
);

export default TowerOfHanoi;
