import { useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";

import toolsImg from "../assets/icon-tools.png";
import designImg from "../assets/icon-design.png";
import backendImg from "../assets/icon-backend.png";
import frontendImg from "../assets/icon-frontend.png";

export function ControlPanel({ win }: { win: WindowState }) {
  const [active, setActive] = useState(0);
  const cat = resume.skills[active];

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
    >
      <div className="absolute inset-1 flex gap-2 p-1">
        <div className="w95-sunken bg-white p-2 w-[160px] overflow-auto w95-scrollbar">
          {resume.skills.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={`w-full text-left flex flex-col items-center gap-1 p-2 ${active === i ? "bg-w95-title text-white" : ""}`}
            >
              <span className="text-[28px]">
                {s.name === "Frontend" ? (
                  <img src={frontendImg} className="size-8" />
                ) : s.name === "Backend" ? (
                  <img src={backendImg} className="size-8" />
                ) : s.name === "Design" ? (
                  <img src={designImg} className="size-8" />
                ) : (
                  <img src={toolsImg} className="size-8" />
                )}
              </span>
              <span className="text-[12px]">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 w95-raised bg-w95-bg p-3">
          <div className="font-bold mb-2">
            {cat.name} — {cat.level}
          </div>
          <div className="flex flex-col gap-3">
            {(cat.keywords as { name: string; level: number }[]).map((k) => (
              <div key={k.name}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span>{k.name}</span>
                  <span>{k.level}%</span>
                </div>
                <div className="w95-sunken bg-white h-[14px] p-[2px]">
                  <div
                    className="h-full bg-w95-title"
                    style={{ width: `${k.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Win>
  );
}
