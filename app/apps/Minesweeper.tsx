import { useMemo, useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import faceLost from "../assets/minesweeper-lost.png";
import faceWin from "../assets/minesweeper-win.png";
import faceReset from "../assets/minesweeper-reset.png";

const SIZE = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flag: boolean;
  n: number;
}

function makeBoard(): Cell[][] {
  const b: Cell[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({
      mine: false,
      revealed: false,
      flag: false,
      n: 0,
    })),
  );
  let placed = 0;
  while (placed < MINES) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    if (!b[y][x].mine) {
      b[y][x].mine = true;
      placed++;
    }
  }
  for (let y = 0; y < SIZE; y++)
    for (let x = 0; x < SIZE; x++) {
      if (b[y][x].mine) continue;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx,
            ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE && b[ny][nx].mine)
            n++;
        }
      b[y][x].n = n;
    }
  return b;
}

export function Minesweeper({ win }: { win: WindowState }) {
  const [board, setBoard] = useState(makeBoard);
  const [dead, setDead] = useState(false);
  const [won, setWon] = useState(false);
  const flags = useMemo(
    () => board.flat().filter((c) => c.flag).length,
    [board],
  );

  const reveal = (x: number, y: number) => {
    if (dead || won) return;
    setBoard((prev) => {
      const b = prev.map((r) => r.map((c) => ({ ...c })));
      const stack = [[x, y]];
      while (stack.length) {
        const [cx, cy] = stack.pop()!;
        const c = b[cy]?.[cx];
        if (!c || c.revealed || c.flag) continue;
        c.revealed = true;
        if (c.mine) {
          setDead(true);
          return b;
        }
        if (c.n === 0) {
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              if (dx || dy) stack.push([cx + dx, cy + dy]);
            }
        }
      }
      const safe = b.flat().filter((c) => !c.mine);
      if (safe.every((c) => c.revealed)) setWon(true);
      return b;
    });
  };

  const flag = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (dead || won) return;
    setBoard((prev) =>
      prev.map((r, ry) =>
        r.map((c, cx) =>
          cx === x && ry === y && !c.revealed ? { ...c, flag: !c.flag } : c,
        ),
      ),
    );
  };

  const reset = () => {
    setBoard(makeBoard());
    setDead(false);
    setWon(false);
  };

  return (
    <Win
      win={win}
      menubar={
        <>
          <button onClick={reset} className="hover:underline">
            Game
          </button>
          <span>Help</span>
        </>
      }
    >
      <div className="absolute inset-1 p-2 flex flex-col items-center gap-2">
        <div className="w95-sunken bg-w95-bg w-full p-2 flex justify-between items-center">
          <div className="bg-black text-w95-red font-mono px-2 py-1 text-[16px]">
            {String(MINES - flags).padStart(3, "0")}
          </div>
          <button
            className="w95-btn min-w-0! w-8 h-8 text-[18px]"
            onClick={reset}
          >
            <img
              className="h-full w-full object-cover"
              src={dead ? faceLost : won ? faceWin : faceReset}
              alt=""
            />
          </button>
          <div className="bg-black text-w95-red font-mono px-2 py-1 text-[16px]">
            000
          </div>
        </div>
        <div className="w95-sunken bg-w95-bg p-1">
          {board.map((row, y) => (
            <div key={y} className="flex">
              {row.map((c, x) => (
                <button
                  key={x}
                  onClick={() => reveal(x, y)}
                  onContextMenu={(e) => flag(x, y, e)}
                  className={`w-6 h-6 text-[12px] font-bold grid place-items-center ${c.revealed ? "w95-sunken bg-w95-bg" : "w95-raised bg-w95-bg"}`}
                  style={{
                    color: [
                      "",
                      "#0000ff",
                      "#008000",
                      "#ff0000",
                      "#000080",
                      "#800000",
                      "#008080",
                      "#000",
                      "#808080",
                    ][c.n],
                  }}
                >
                  {c.flag
                    ? "🚩"
                    : c.revealed
                      ? c.mine
                        ? "💣"
                        : c.n || ""
                      : ""}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}
