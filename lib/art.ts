/** Deterministic fake QR pattern (decorative only) shared by SVG and canvas art. */
export function qrCells(size = 11, seed = 7): [number, number][] {
  const cells: [number, number][] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const inFinder = (x: number, y: number) =>
    (x < 4 && y < 4) || (x > size - 5 && y < 4) || (x < 4 && y > size - 5);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (inFinder(x, y)) continue;
      if (rand() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
