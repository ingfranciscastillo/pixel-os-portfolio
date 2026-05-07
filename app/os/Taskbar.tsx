import { useEffect, useState } from "react";
import { useOS, type AppId } from "./store";
import { Icon } from "./icons";
import { sfx } from "./sounds";
import shutDownImg from "../assets/icon-shutdown.png";

const APP_ICON: Record<AppId, React.ReactNode> = {
  notepad: <Icon.Notepad />,
  paint: <Icon.Paint />,
  explorer: <Icon.Folder />,
  ie: <Icon.IE />,
  messenger: <Icon.Chat />,
  controlpanel: <Icon.Settings />,
  wordpad: <Icon.Doc />,
  gallery: <Icon.Image />,
  terminal: <Icon.Terminal />,
  recyclebin: <Icon.Bin />,
  minesweeper: <Icon.Mine />,
  music: <Icon.Music />,
  systeminfo: <Icon.Info />,
  project: <Icon.Folder />,
};

const items: { id: AppId; label: string; icon: React.ReactNode }[] = [
  { id: "notepad", label: "Notepad — About", icon: <Icon.Notepad /> },
  { id: "explorer", label: "Projects", icon: <Icon.Folder /> },
  { id: "wordpad", label: "WordPad — Resume", icon: <Icon.Doc /> },
  {
    id: "controlpanel",
    label: "Control Panel — Skills",
    icon: <Icon.Settings />,
  },
  { id: "ie", label: "Internet Explorer", icon: <Icon.IE /> },
  { id: "messenger", label: "Messenger — Contact", icon: <Icon.Chat /> },
  { id: "paint", label: "Paint — Playground", icon: <Icon.Paint /> },
  { id: "gallery", label: "Image Viewer", icon: <Icon.Image /> },
  { id: "terminal", label: "Terminal", icon: <Icon.Terminal /> },
  { id: "minesweeper", label: "Minesweeper", icon: <Icon.Mine /> },
  { id: "music", label: "Media Player", icon: <Icon.Music /> },
  { id: "systeminfo", label: "System Properties", icon: <Icon.Info /> },
  { id: "recyclebin", label: "Recycle Bin", icon: <Icon.Bin /> },
];

export function Taskbar() {
  const { windows, focus, minimize, focusedId, open, muted, toggleMute } =
    useOS();
  const [now, setNow] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setStartOpen(false);
    if (startOpen) {
      window.addEventListener("mousedown", h);
      return () => window.removeEventListener("mousedown", h);
    }
  }, [startOpen]);

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <>
      {startOpen && (
        <div
          className="fixed bottom-[30px] left-0 w95-raised bg-w95-bg w-[260px] flex z-9999"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="w-[28px] bg-w95-title text-white [writing-mode:vertical-rl] rotate-180 text-center font-bold py-2 text-[14px]">
            Portfolio<span className="opacity-70">95</span>
          </div>
          <ul className="flex-1 py-1">
            {items.map((it) => (
              <li key={it.id}>
                <button
                  className="w-full flex items-center gap-2 px-2 py-[6px] text-left text-[13px] hover:bg-w95-title hover:text-white"
                  onClick={() => {
                    sfx.open();
                    open(it.id);
                    setStartOpen(false);
                  }}
                >
                  <span className="text-[18px] w-5 grid place-items-center">
                    {it.icon}
                  </span>
                  <span>{it.label}</span>
                </button>
              </li>
            ))}
            <li className="border-t border-w95-dark my-1" />
            <li>
              <button
                className="w-full flex items-center gap-2 px-2 py-[6px] text-left text-[13px] hover:bg-w95-title hover:text-white"
                onClick={() => {
                  sfx.close();
                  window.location.reload();
                }}
              >
                <span className="text-[18px] w-5 grid place-items-center">
                  <img src={shutDownImg} alt="shudown button" />
                </span>
                <span>Shut Down…</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 h-[30px] w95-raised bg-w95-bg flex items-center px-1 gap-1 z-9998">
        <button
          className="w95-btn h-[24px] flex items-center gap-1 font-bold px-2!"
          data-pressed={startOpen}
          onMouseDown={(e) => {
            e.stopPropagation();
            sfx.click();
            setStartOpen((s) => !s);
          }}
        >
          <span className="text-[16px] leading-none">
            <Icon.Start />
          </span>{" "}
          Start
        </button>
        <div className="w-px h-[20px] bg-w95-dark mx-1" />
        <div className="flex-1 flex gap-[2px] overflow-hidden">
          {windows.map((w) => (
            <button
              key={w.id}
              className="w95-btn h-[24px] min-w-0! max-w-[160px] truncate text-left px-2! flex items-center gap-1"
              data-pressed={focusedId === w.id && !w.minimized}
              onClick={() =>
                focusedId === w.id && !w.minimized
                  ? minimize(w.id)
                  : focus(w.id)
              }
            >
              <span className="text-[14px] leading-none shrink-0 grid place-items-center w-4 h-4">
                {APP_ICON[w.app]}
              </span>
              <span className="truncate text-[12px]">{w.title}</span>
            </button>
          ))}
        </div>
        <div className="w95-sunken h-[22px] px-2 flex items-center gap-2 text-[12px]">
          <button
            onClick={toggleMute}
            aria-label="Toggle sound"
            title={muted ? "Sound off" : "Sound on"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <span>{time}</span>
        </div>
      </div>
    </>
  );
}
