import { useEffect, useState } from "react";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(onDone, 350);
          return 100;
        }
        return p + 4;
      });
    }, 60);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-black grid place-items-center z-10000">
      <div
        className="text-center text-white"
        style={{ fontFamily: "W95FA, monospace" }}
      >
        <div className="text-[64px] font-bold tracking-tight mb-2">
          <span className="text-[#ff4040]">P</span>
          <span className="text-[#40ff40]">o</span>
          <span className="text-[#4040ff]">r</span>
          <span className="text-[#ffff40]">t</span>
          <span>9</span>
          <span>5</span>
        </div>
        <div className="text-[14px] mb-8 opacity-70">
          A nostalgic operating experience
        </div>
        <div className="w-[320px] h-[18px] w95-sunken bg-black mx-auto p-[2px]">
          <div
            className="h-full bg-w95-title transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 text-[12px] opacity-70">Loading… {pct}%</div>
      </div>
    </div>
  );
}
