import { useEffect, useRef, useState } from "react";
import { type AppId, useOS } from "./store";
import { DesktopIcon, Icon } from "./icons";
import { sfx } from "./sounds";

const desktopIcons: {
  id: string;
  app: AppId;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "computer",
    app: "systeminfo",
    label: "My Computer",
    icon: <Icon.Computer />,
  },
  { id: "projects", app: "explorer", label: "Projects", icon: <Icon.Folder /> },
  { id: "about", app: "notepad", label: "About Me", icon: <Icon.Notepad /> },
  { id: "resume", app: "wordpad", label: "Resume", icon: <Icon.Doc /> },
  {
    id: "skills",
    app: "controlpanel",
    label: "Skills",
    icon: <Icon.Settings />,
  },
  { id: "ie", app: "ie", label: "Internet Explorer", icon: <Icon.IE /> },
  { id: "contact", app: "messenger", label: "Contact", icon: <Icon.Chat /> },
  { id: "paint", app: "paint", label: "Paint", icon: <Icon.Paint /> },
  { id: "gallery", app: "gallery", label: "Gallery", icon: <Icon.Image /> },
  {
    id: "terminal",
    app: "terminal",
    label: "Terminal",
    icon: <Icon.Terminal />,
  },
  {
    id: "mines",
    app: "minesweeper",
    label: "Minesweeper",
    icon: <Icon.Mine />,
  },
  { id: "music", app: "music", label: "Media Player", icon: <Icon.Music /> },
  { id: "bin", app: "recyclebin", label: "Recycle Bin", icon: <Icon.Bin /> },
];

type Menu =
  | { kind: "desktop"; x: number; y: number }
  | {
      kind: "icon";
      x: number;
      y: number;
      iconId: string;
      app: AppId;
      label: string;
    };

export function Desktop() {
  const open = useOS((s) => s.open);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const launch = (app: AppId) => {
    sfx.open();
    open(app);
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-w95-desktop overflow-hidden"
      onClick={() => setSelectedId(null)}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedId(null);
        setMenu({ kind: "desktop", x: e.clientX, y: e.clientY });
      }}
    >
      <div className="grid grid-flow-col grid-rows-[repeat(8,90px)] auto-cols-[90px] gap-1 p-2 h-full content-start">
        {desktopIcons.map((it) => (
          <DesktopIcon
            key={it.id}
            icon={it.icon}
            label={it.label}
            selected={selectedId === it.id}
            onSelect={() => {
              sfx.click();
              setSelectedId(it.id);
            }}
            onOpen={() => launch(it.app)}
            onContextMenu={(e) =>
              setMenu({
                kind: "icon",
                x: e.clientX,
                y: e.clientY,
                iconId: it.id,
                app: it.app,
                label: it.label,
              })
            }
          />
        ))}
      </div>

      {menu && (
        <ul
          className="w95-raised bg-w95-bg fixed py-1 w-[190px] z-9999 text-[13px]"
          style={{ left: menu.x, top: menu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {menu.kind === "desktop" &&
            [
              { label: "View", onClick: () => {} },
              { label: "Refresh", onClick: () => window.location.reload() },
              { label: "New Folder", onClick: () => sfx.error() },
              { label: "Properties", onClick: () => open("systeminfo") },
            ].map((it) => (
              <li key={it.label}>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-w95-title hover:text-white"
                  onClick={() => {
                    sfx.click();
                    it.onClick();
                    setMenu(null);
                  }}
                >
                  {it.label}
                </button>
              </li>
            ))}

          {menu.kind === "icon" &&
            [
              { label: "Open", onClick: () => launch(menu.app) },
              { label: "Explore", onClick: () => launch(menu.app) },
              { label: "Create Shortcut", onClick: () => sfx.error() },
              { label: "Delete", onClick: () => sfx.error() },
              { label: "Rename", onClick: () => sfx.error() },
              { label: "Properties", onClick: () => open("systeminfo") },
            ].map((it) => (
              <li key={it.label}>
                <button
                  className="w-full text-left px-3 py-1 hover:bg-w95-title hover:text-white"
                  onClick={() => {
                    sfx.click();
                    it.onClick();
                    setMenu(null);
                  }}
                >
                  {it.label}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
