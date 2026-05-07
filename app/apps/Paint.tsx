import { useEffect, useRef, useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import pencilImg from "../assets/paint-pencil.png";
import eraserImg from "../assets/paint-eraser.png";
import bucketImg from "../assets/paint-bucket.png";

const TOOL_ICON: Record<string, string> = {
  pencil: pencilImg,
  eraser: eraserImg,
  fill: bucketImg,
};

const PALETTE = [
  "#000000",
  "#7f7f7f",
  "#880015",
  "#ed1c24",
  "#ff7f27",
  "#fff200",
  "#22b14c",
  "#00a2e8",
  "#3f48cc",
  "#a349a4",
  "#ffffff",
  "#c3c3c3",
  "#b97a57",
  "#ffaec9",
  "#ffc90e",
  "#efe4b0",
  "#b5e61d",
  "#99d9ea",
  "#7092be",
  "#c8bfe7",
];

type Tool = "pencil" | "eraser" | "fill";

export function Paint({ win }: { win: WindowState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<Tool>("pencil");
  const [size, setSize] = useState(2);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  const pos = (e: React.MouseEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * canvasRef.current!.width,
      y: ((e.clientY - r.top) / r.height) * canvasRef.current!.height,
    };
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 4 : size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current?.x ?? p.x, last.current?.y ?? p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const fill = (e: React.MouseEvent) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  const clear = () => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const save = () => {
    const url = canvasRef.current!.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "painting.png";
    a.click();
  };

  return (
    <Win
      win={win}
      menubar={
        <>
          <button onClick={clear} className="hover:underline">
            File
          </button>
          <button onClick={save} className="hover:underline">
            Save
          </button>
          <span>Edit</span>
          <span>View</span>
          <span>Image</span>
          <span>Help</span>
        </>
      }
      statusbar={
        <span>
          Tool: {tool} • Color: {color}
        </span>
      }
    >
      <div className="absolute inset-1 flex gap-1">
        <div className="w95-raised bg-w95-bg p-1 flex flex-col gap-1 w-[58px]">
          {(["pencil", "eraser", "fill"] as Tool[]).map((t) => (
            <button
              key={t}
              className="w95-btn min-w-0! px-0! h-7 text-[16px]"
              data-pressed={tool === t}
              onClick={() => (t === "fill" ? setTool("fill") : setTool(t))}
              title={t}
            >
              <img
                src={TOOL_ICON[t]}
                alt={t}
                className="w-5 h-5 mx-auto"
                style={{ imageRendering: "pixelated", objectFit: "contain" }}
                draggable={false}
              />
            </button>
          ))}
          <div className="border-t border-w95-dark my-1" />
          {[1, 2, 4, 8].map((s) => (
            <button
              key={s}
              className="w95-btn min-w-0! px-0! h-6 text-[11px]"
              data-pressed={size === s}
              onClick={() => setSize(s)}
            >
              {s}px
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 w95-sunken bg-white">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full h-full block cursor-crosshair"
              onMouseDown={(e) => {
                if (tool === "fill") return fill(e);
                drawing.current = true;
                last.current = pos(e);
                draw(e);
              }}
              onMouseMove={draw}
              onMouseUp={() => {
                drawing.current = false;
                last.current = null;
              }}
              onMouseLeave={() => {
                drawing.current = false;
                last.current = null;
              }}
            />
          </div>
          <div className="w95-raised bg-w95-bg p-1 mt-1 grid grid-cols-10 gap-[2px]">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="h-5 w95-sunken"
                style={{
                  background: c,
                  outline: color === c ? "2px solid black" : "none",
                }}
                aria-label={c}
              />
            ))}
          </div>
        </div>
      </div>
    </Win>
  );
}
