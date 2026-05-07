import { useEffect, useRef, useState } from "react";
import { Win } from "../os/Window";
import { useOS, type WindowState, type AppId } from "../os/store";
import resume from "../content/resume.json";

const HELP = `Available commands:
  help                 Show this help
  about                About the developer
  skills               List skills
  projects             List projects
  contact              Contact info
  open <app>           Open an app (notepad, paint, explorer, ie, messenger,
                       controlpanel, wordpad, gallery, recyclebin, minesweeper,
                       music, systeminfo)
  whoami               Current user
  date                 Current date/time
  cls                  Clear screen
  matrix               ?
  exit                 Close terminal`;

export function Terminal({ win }: { win: WindowState }) {
  const { open, close } = useOS();
  const [lines, setLines] = useState<string[]>([
    "Microsoft(R) Windows 95 [Version 4.00.950]",
    "(C) Copyright Microsoft Corp 1981-1995.",
    "",
    `Welcome. Type 'help' to see commands.`,
    "",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const push = (...l: string[]) => setLines((s) => [...s, ...l]);

  const exec = (cmd: string) => {
    const trimmed = cmd.trim();
    push(`C:\\> ${trimmed}`);
    if (!trimmed) return;
    const [c, ...args] = trimmed.split(/\s+/);
    switch (c.toLowerCase()) {
      case "help":
        push(HELP);
        break;
      case "about":
        push(resume.basics.summary, "");
        break;
      case "skills":
        resume.skills.forEach((s) =>
          push(
            `${s.name}: ${(s.keywords as any[]).map((k) => k.name).join(", ")}`,
          ),
        );
        break;
      case "projects":
        resume.projects.forEach((p) =>
          push(`• ${p.name} (${p.year}) — ${p.description}`),
        );
        break;
      case "contact":
        push(
          `Email:    ${resume.basics.email}`,
          `Website:  ${resume.basics.url}`,
          ...resume.basics.profiles.map(
            (p) => `${p.network.padEnd(9)} ${p.url}`,
          ),
        );
        break;
      case "open": {
        const valid: AppId[] = [
          "notepad",
          "paint",
          "explorer",
          "ie",
          "messenger",
          "controlpanel",
          "wordpad",
          "gallery",
          "recyclebin",
          "minesweeper",
          "music",
          "systeminfo",
          "terminal",
        ];
        if (valid.includes(args[0] as AppId)) {
          open(args[0] as AppId);
          push(`Opening ${args[0]}…`);
        } else push(`Unknown app: ${args[0] ?? ""}`);
        break;
      }
      case "whoami":
        push("guest@portfolio95");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "cls":
        setLines([]);
        break;
      case "matrix":
        push(
          ...Array.from({ length: 12 }, () =>
            Array.from({ length: 50 }, () =>
              Math.random() > 0.5 ? "1" : "0",
            ).join(""),
          ),
        );
        break;
      case "exit":
        close(win.id);
        break;
      case "sudo":
        if (args.join(" ").includes("sandwich")) push("Okay.");
        else push("Permission denied.");
        break;
      default:
        push(`'${c}' is not recognized as an internal or external command.`);
    }
    push("");
  };

  return (
    <Win win={win}>
      <div
        ref={scroller}
        className="absolute inset-1 bg-black text-white p-2 overflow-auto w95-scrollbar font-mono text-[12px] leading-tight"
        onClick={() => inputRef.current?.focus()}
        style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l || "\u00A0"}
          </div>
        ))}
        <div className="flex">
          <span>C:\&gt;&nbsp;</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                exec(input);
                if (input.trim()) setHistory((h) => [...h, input]);
                setInput("");
                setHi(-1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const n = hi < 0 ? history.length - 1 : Math.max(0, hi - 1);
                setHi(n);
                setInput(history[n] ?? "");
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hi < 0 ? -1 : hi + 1;
                if (n >= history.length) {
                  setHi(-1);
                  setInput("");
                } else {
                  setHi(n);
                  setInput(history[n]);
                }
              }
            }}
            className="bg-transparent flex-1 outline-none text-white"
            style={{ fontFamily: "inherit" }}
          />
        </div>
      </div>
    </Win>
  );
}
