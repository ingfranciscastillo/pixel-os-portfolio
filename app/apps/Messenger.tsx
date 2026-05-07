import { useEffect, useRef, useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";

interface Msg {
  from: "me" | "bot";
  text: string;
  t: number;
}

function reply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("hi") || t.includes("hello") || t.includes("hey"))
    return `Hey! I'm ${resume.basics.name}'s little autoresponder 👋`;
  if (t.includes("email")) return `You can reach me at ${resume.basics.email}`;
  if (t.includes("hire") || t.includes("work"))
    return "I'd love to hear about it. Email me with details!";
  if (t.includes("cv") || t.includes("resume"))
    return "Open the WordPad app — there's a Download CV button.";
  return "Got it! I'll forward that to my human. (Tip: try 'email', 'hire', or 'resume')";
}

export function Messenger({ win }: { win: WindowState }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: `Hi! Type a message and I'll reply. For real contact: ${resume.basics.email}`,
      t: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [msgs]);

  const send = () => {
    const v = input.trim();
    if (!v) return;
    const next: Msg[] = [...msgs, { from: "me", text: v, t: Date.now() }];
    setMsgs(next);
    setInput("");
    setTimeout(
      () =>
        setMsgs((m) => [...m, { from: "bot", text: reply(v), t: Date.now() }]),
      600,
    );
  };

  return (
    <Win
      win={win}
      menubar={
        <>
          <span>File</span>
          <span>Actions</span>
          <span>Tools</span>
          <span>Help</span>
        </>
      }
    >
      <div className="absolute inset-1 flex flex-col gap-1">
        <div
          ref={scroller}
          className="flex-1 w95-sunken bg-white p-2 overflow-auto w95-scrollbar text-[13px] flex flex-col gap-2"
        >
          {msgs.map((m, i) => (
            <div key={i} className={m.from === "me" ? "text-right" : ""}>
              <div className="text-[10px] text-w95-darker">
                {m.from === "me" ? "You" : resume.basics.name} •{" "}
                {new Date(m.t).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
              <div
                className={`inline-block px-2 py-1 ${m.from === "me" ? "bg-w95-title text-white" : "bg-w95-bg w95-raised"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="w95-input flex-1 px-2 py-1 text-[13px]"
            placeholder="Type a message…"
          />
          <button className="w95-btn" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </Win>
  );
}
