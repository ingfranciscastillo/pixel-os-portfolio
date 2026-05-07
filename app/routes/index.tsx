import { useEffect, useState } from "react";
import { OS } from "../os/OS";
import { MobileShell } from "../mobile/MobileShell";

const Index = () => {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const onR = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  useEffect(() => {
    document.title = "Portfolio95 — A nostalgic OS portfolio";
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      "content",
      "An interactive Windows 95-style desktop portfolio: explore projects, skills and resume through retro apps.",
    );
  }, []);

  return mobile ? <MobileShell /> : <OS />;
};

export default Index;
