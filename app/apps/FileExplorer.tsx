import { useState } from "react";
import { Win } from "../os/Window";
import { useOS, type WindowState } from "../os/store";
import resume from "../content/resume.json";
import folderImg from "../assets/icon-folder.png";
import textFileImg from "../assets/icon-text-file.png";
import imagingImg from "../assets/icon-imaging.png";

export function FileExplorer({ win }: { win: WindowState }) {
  const open = useOS((s) => s.open);
  const folders = Array.from(new Set(resume.projects.map((p) => p.year)));
  const [folder, setFolder] = useState<string>(folders[0]);
  const items = resume.projects.filter((p) => p.year === folder);

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
      statusbar={<span>{items.length} object(s)</span>}
    >
      <div className="absolute inset-1 flex gap-1">
        <div className="w95-sunken bg-white w-[180px] p-2 text-[13px] overflow-auto w95-scrollbar">
          <div className="font-bold mb-1">
            <img src={folderImg} className="size-3 inline-block" /> Projects
          </div>
          <ul className="ml-4">
            {folders.map((f) => (
              <li key={f}>
                <button
                  className={`text-left w-full px-1 ${folder === f ? "bg-w95-title text-white" : ""}`}
                  onClick={() => setFolder(f)}
                >
                  <img src={folderImg} className="size-3 inline-block" /> {f}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w95-sunken bg-white p-3 overflow-auto w95-scrollbar">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
            {items.map((p) => (
              <button
                key={p.name}
                onDoubleClick={() =>
                  open("project", { title: p.name, payload: p })
                }
                className="flex flex-col items-center gap-1 p-1 focus:bg-w95-title focus:text-white text-[12px]"
              >
                <img src={textFileImg} className="size-8" />
                <span className="text-center leading-tight">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Win>
  );
}

export function ProjectWindow({ win }: { win: WindowState }) {
  const p = win.payload as (typeof resume.projects)[number];
  return (
    <Win win={win}>
      <div className="absolute inset-1 p-3 overflow-auto w95-scrollbar text-[13px] flex flex-col gap-3">
        <div className="w95-sunken bg-white h-[180px] grid place-items-center text-[60px]">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={imagingImg} className="size-24" />
          )}
        </div>
        <h2 className="font-bold text-[16px]">{p.name}</h2>
        <p>{p.description}</p>
        <div className="flex flex-wrap gap-1">
          {p.tech.map((t) => (
            <span
              key={t}
              className="w95-raised bg-w95-bg px-2 py-px text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="w95-btn"
            >
              Open Live
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="w95-btn"
            >
              View Source
            </a>
          )}
        </div>
      </div>
    </Win>
  );
}
