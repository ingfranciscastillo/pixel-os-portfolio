import { useState } from "react";
import { Win } from "../os/Window";
import { type WindowState } from "../os/store";

const BOOKMARKS = [
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Windows_95" },
  { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
  { name: "Hacker News", url: "https://news.ycombinator.com/" },
];

export function InternetExplorer({ win }: { win: WindowState }) {
  const [url, setUrl] = useState(BOOKMARKS[0].url);
  const [input, setInput] = useState(BOOKMARKS[0].url);
  const [loading, setLoading] = useState(true);

  const go = (u: string) => {
    setUrl(u);
    setInput(u);
    setLoading(true);
  };

  return (
    <Win
      win={win}
      menubar={
        <>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Help</span>
        </>
      }
      statusbar={<span>{loading ? "Loading…" : "Done"}</span>}
    >
      <div className="absolute inset-1 flex flex-col gap-1">
        <div className="w95-raised bg-w95-bg p-1 flex gap-1 items-center">
          <button className="w95-btn">◀ Back</button>
          <button className="w95-btn">Forward ▶</button>
          <button className="w95-btn" onClick={() => go(url)}>
            ↻ Refresh
          </button>
          <button className="w95-btn" onClick={() => go(BOOKMARKS[0].url)}>
            🏠 Home
          </button>
        </div>
        <div className="flex items-center gap-1 text-[12px] px-1">
          <span>Address:</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go(input)}
            className="w95-input flex-1 px-1 py-[2px] text-[13px]"
          />
          <button className="w95-btn" onClick={() => go(input)}>
            Go
          </button>
        </div>
        <div className="flex items-center gap-2 text-[12px] px-1 pb-1">
          <span>Links:</span>
          {BOOKMARKS.map((b) => (
            <button
              key={b.name}
              className="underline text-w95-blue"
              onClick={() => go(b.url)}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="flex-1 w95-sunken bg-white">
          <iframe
            key={url}
            src={url}
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setLoading(false)}
            title="browser"
          />
        </div>
      </div>
    </Win>
  );
}
