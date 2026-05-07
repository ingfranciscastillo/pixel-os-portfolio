import { useEffect, useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";

export function Notepad({ win }: { win: WindowState }) {
  const text = `Lo_que_aporto.txt
==================

${resume.basics.summary}

— ${resume.basics.name}, ${resume.basics.label}
`;
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 4;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [text]);

  return (
    <Win
      win={win}
      menubar={
        <>
          <span>File</span>
          <span>Edit</span>
          <span>Search</span>
          <span>Help</span>
        </>
      }
    >
      <textarea
        readOnly
        className="w95-input absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] p-2 text-[13px] font-pixel resize-none w95-scrollbar"
        value={shown}
      />
    </Win>
  );
}
