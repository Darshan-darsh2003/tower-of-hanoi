import { useState, useEffect } from "react";
import { solveTowerOfHanoi } from "../utils/hanoiSolver";

const useTowerOfHanoi = () => {
  const [numberOfDisks, setNumberOfDisks] = useState(3);
  const [pegs, setPegs] = useState<number[][]>([[], [], []]);
  const [moveCount, setMoveCount] = useState(0);
  const [autoSolveMoves, setAutoSolveMoves] = useState<[number, number][]>([]);
  const [isWon, setIsWon] = useState(false);
  const [isAutoSolving, setIsAutoSolving] = useState(false);

  useEffect(() => {
    resetGame();
  }, [numberOfDisks]);

  useEffect(() => {
    if (pegs[2].length === numberOfDisks) setIsWon(true);
  }, [pegs]);

  const resetGame = () => {
    const initialDisks = Array.from(
      { length: numberOfDisks },
      (_, i) => numberOfDisks - i
    );
    setPegs([initialDisks, [], []]);
    setMoveCount(0);
    setAutoSolveMoves([]);
    setIsWon(false);
    setIsAutoSolving(false);
  };

  const isValidMove = (fromPeg: number, toPeg: number): boolean => {
    const fromDisk = pegs[fromPeg][pegs[fromPeg].length - 1];
    const toDisk = pegs[toPeg][pegs[toPeg].length - 1];
    return (
      fromDisk !== undefined && (toDisk === undefined || fromDisk < toDisk)
    );
  };

  const onDropDisk = (fromPeg: number, toPeg: number) => {
    if (isValidMove(fromPeg, toPeg)) {
      const updatedPegs = pegs.map((peg) => [...peg]);
      const disk = updatedPegs[fromPeg].pop()!;
      updatedPegs[toPeg].push(disk);
      setPegs(updatedPegs);
      setMoveCount((prev) => prev + 1);
    } else {
      alert(
        "Invalid move! You can't place a larger disk on top of a smaller disk."
      );
    }
  };

  const startAutoSolve = () => {
    if (isAutoSolving) return;
    resetGame();
    setIsAutoSolving(true);
    setAutoSolveMoves([]);
    const moves = solveTowerOfHanoi(numberOfDisks, 0, 2, 1);
    setAutoSolveMoves(moves);
  };

  useEffect(() => {
    if (autoSolveMoves.length > 0) {
      const timer = setTimeout(() => {
        const [from, to] = autoSolveMoves[0];
        onDropDisk(from, to);
        setAutoSolveMoves((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoSolveMoves, pegs]);

  return {
    numberOfDisks,
    setNumberOfDisks,
    pegs,
    moveCount,
    isWon,
    resetGame,
    onDropDisk,
    startAutoSolve,
    isAutoSolving,
  };
};

export default useTowerOfHanoi;
