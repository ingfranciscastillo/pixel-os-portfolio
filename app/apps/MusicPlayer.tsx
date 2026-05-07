import { useEffect, useRef, useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";

const TRACKS = [
  {
    name: "Lofi Beats — Chillhop",
    url: "https://stream.zeno.fm/0r0xa792kwzuv",
  },
  {
    name: "SomaFM Groove Salad",
    url: "https://ice1.somafm.com/groovesalad-128-mp3",
  },
];

const MENUS = ["File", "Edit", "Device", "Scale", "Help"];

export function MusicPlayer({ win }: { win: WindowState }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [vol] = useState(0.5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (ref.current) ref.current.volume = vol;
  }, [vol]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p + 1) % 100), 400);
    return () => clearInterval(t);
  }, [playing]);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play().catch(() => {});
    setPlaying(!playing);
  };

  const stop = () => {
    if (!ref.current) return;
    ref.current.pause();
    ref.current.currentTime = 0;
    setPlaying(false);
    setProgress(0);
  };

  const next = () => {
    setI((n) => (n + 1) % TRACKS.length);
    setPlaying(false);
    setProgress(0);
  };
  const prev = () => {
    setI((n) => (n - 1 + TRACKS.length) % TRACKS.length);
    setPlaying(false);
    setProgress(0);
  };

  const Btn = ({
    children,
    onClick,
    title,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className="w95-btn min-w-0! h-[24px] px-[6px]! flex items-center justify-center text-[11px]"
    >
      {children}
    </button>
  );

  return (
    <Win win={win}>
      <div className="absolute inset-1 flex flex-col bg-w95-bg overflow-hidden text-black">
        {/* Menu bar */}
        <div className="flex items-center gap-3 px-1 py-[2px] text-[12px] border-b border-w95-dark/40">
          {MENUS.map((m) => (
            <button
              key={m}
              className="px-1 hover:bg-w95-title hover:text-white"
            >
              <u>{m[0]}</u>
              {m.slice(1)}
            </button>
          ))}
        </div>

        {/* Track title */}
        <div className="px-2 py-1 text-[11px] truncate">♪ {TRACKS[i].name}</div>

        {/* Seek track */}
        <div className="px-2">
          <div className="w95-sunken bg-white h-[22px] relative flex items-center">
            {/* tick marks */}
            <div
              className="absolute inset-x-1 bottom-0 h-[6px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #000 0 1px, transparent 1px 8px)",
              }}
            />
            {/* slider thumb */}
            <div
              className="absolute top-[2px] h-[16px] w-[10px] w95-raised bg-w95-bg"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>
        </div>

        {/* Transport row */}
        <div className="px-2 py-2 mt-auto flex items-center gap-1">
          <Btn onClick={toggle} title="Play">
            {playing ? "❚❚" : "▶"}
          </Btn>
          <Btn onClick={stop} title="Stop">
            ■
          </Btn>
          <Btn title="Eject">▲</Btn>
          <div className="w-2" />
          <Btn onClick={prev} title="Previous">
            ⏮
          </Btn>
          <Btn title="Rewind">◀◀</Btn>
          <Btn title="Forward">▶▶</Btn>
          <Btn onClick={next} title="Next">
            ⏭
          </Btn>
          <div className="w-2" />
          <Btn title="Start">⇤</Btn>
          <Btn title="End">⇥</Btn>
        </div>

        <audio ref={ref} src={TRACKS[i].url} />
      </div>
    </Win>
  );
}
