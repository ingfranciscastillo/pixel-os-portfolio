import { useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";

const IMAGES = [
  { src: "https://picsum.photos/seed/1/800/500", caption: "Lumen Dashboard" },
  { src: "https://picsum.photos/seed/2/800/500", caption: "Kettle Notes" },
  { src: "https://picsum.photos/seed/3/800/500", caption: "Pocket Atlas" },
  { src: "https://picsum.photos/seed/4/800/500", caption: "Studio shot" },
  { src: "https://picsum.photos/seed/5/800/500", caption: "Workshop" },
];

export function Gallery({ win }: { win: WindowState }) {
  const [i, setI] = useState(0);
  const next = () => setI((n) => (n + 1) % IMAGES.length);
  const prev = () => setI((n) => (n - 1 + IMAGES.length) % IMAGES.length);
  return (
    <Win
      win={win}
      menubar={
        <>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </>
      }
      statusbar={
        <span>
          {i + 1} / {IMAGES.length} — {IMAGES[i].caption}
        </span>
      }
    >
      <div className="absolute inset-1 flex flex-col gap-1">
        <div className="w95-raised bg-w95-bg p-1 flex gap-1">
          <button className="w95-btn" onClick={prev}>
            ◀ Prev
          </button>
          <button className="w95-btn" onClick={next}>
            Next ▶
          </button>
        </div>
        <div className="flex-1 w95-sunken bg-black grid place-items-center overflow-hidden">
          <img
            src={IMAGES[i].src}
            alt={IMAGES[i].caption}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="w95-sunken bg-white p-1 flex gap-1 overflow-auto w95-scrollbar">
          {IMAGES.map((im, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={idx === i ? "outline-2 outline-w95-title" : ""}
            >
              <img
                src={im.src}
                alt=""
                className="w-[60px] h-[40px] object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </Win>
  );
}
