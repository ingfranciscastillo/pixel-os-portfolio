import { type ReactNode } from "react";
import folderImg from "../assets/icon-folder.png";
import startImg from "../assets/icon-start.png";
import ieImg from "../assets/icon-ie.png";
import paintImg from "../assets/icon-paint.png";
import binImg from "../assets/icon-bin.png";
import computerImg from "../assets/icon-computer.png";
import notepadImg from "../assets/icon-notepad.png";
import msdosImg from "../assets/icon-msdos.png";
import sysinfoImg from "../assets/icon-sysinfo.png";
import controlPanelImg from "../assets/icon-controlpanel.png";
import mediaImg from "../assets/icon-media.png";
import galleryImg from "../assets/icon-gallery.png";
import messengerImg from "../assets/icon-messenger.png";
import minesweeperImg from "../assets/icon-minesweeper.png";
import wordPadImg from "../assets/icon-wordpad.png";

const Img = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    className="inline-block align-middle"
    style={{
      width: "1em",
      height: "1em",
      imageRendering: "pixelated",
      objectFit: "contain",
    }}
    draggable={false}
  />
);

export const Icon = {
  Computer: () => <Img src={computerImg} alt="my computer" />,
  Folder: () => <Img src={folderImg} alt="folder" />,
  Notepad: () => <Img src={notepadImg} alt="notepad" />,
  Paint: () => <Img src={paintImg} alt="paint" />,
  IE: () => <Img src={ieImg} alt="internet explorer" />,
  Chat: () => <Img src={messengerImg} alt="messenger" />,
  Settings: () => <Img src={controlPanelImg} alt="control panel" />,
  Doc: () => <Img src={wordPadImg} alt="resume" />,
  Image: () => <Img src={galleryImg} alt="gallery" />,
  Terminal: () => <Img src={msdosImg} alt="ms-dos" />,
  Bin: () => <Img src={binImg} alt="recycle bin" />,
  Mine: () => <Img src={minesweeperImg} alt="Minesweeper" />,
  Music: () => <Img src={mediaImg} alt="media player" />,
  Info: () => <Img src={sysinfoImg} alt="system info" />,
  Start: () => <Img src={startImg} alt="start" />,
};

export function DesktopIcon({
  icon,
  label,
  selected,
  onSelect,
  onOpen,
  onContextMenu,
}: {
  icon: ReactNode;
  label: string;
  selected?: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        onSelect();
        onContextMenu?.(e);
      }}
      className="group flex flex-col items-center w-[78px] gap-1 p-1 focus:outline-none"
    >
      <span
        className={`text-[34px] leading-none drop-shadow-[1px_1px_0_rgba(0,0,0,0.4)] ${
          selected ? "filter-[brightness(0.85)_contrast(1.1)]" : ""
        }`}
      >
        {icon}
      </span>
      <span
        className={`text-white text-[12px] text-center leading-tight px-1 ${
          selected
            ? "bg-w95-title outline-1 outline-dotted outline-white"
            : "group-focus:bg-w95-title group-focus:outline group-focus:outline-dotted group-focus:outline-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
