type Move = [number, number];

export function solveTowerOfHanoi(
  numberOfDiscs: number,
  source: number,
  target: number,
  auxiliary: number
): Move[] {
  const moves: Move[] = [];

  function move(n: number, from: number, to: number, aux: number) {
    if (n === 1) {
      moves.push([from, to]);
      return;
    }
    move(n - 1, from, aux, to);
    moves.push([from, to]);
    move(n - 1, aux, to, from);
  }

  move(numberOfDiscs, source, target, auxiliary);
  return moves;
}
