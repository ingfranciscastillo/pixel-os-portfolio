import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";
import ieIcon from "../assets/icon-ie.png";
import printIcon from "../assets/icon-print.png";

export function WordPad({ win }: { win: WindowState }) {
  const print = () => window.print();
  return (
    <Win
      win={win}
      menubar={
        <>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Help</span>
        </>
      }
      statusbar={<span>Page 1 • {resume.basics.name}</span>}
    >
      <div className="absolute inset-1 flex flex-col">
        <div className="w95-raised bg-w95-bg p-1 flex gap-1 mb-1">
          <button className="w95-btn" onClick={print}>
            <img src={printIcon} className="size-3 inline-block" /> Download /
            Print CV
          </button>
          <a
            className="w95-btn"
            href={resume.basics.url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={ieIcon} className="size-3 inline-block" /> Website
          </a>
        </div>
        <div className="flex-1 w95-sunken bg-white overflow-auto w95-scrollbar p-6 text-[13px]">
          <div
            className="max-w-[560px] mx-auto"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <h1 className="text-[28px] font-bold mb-1">{resume.basics.name}</h1>
            <div className="text-[14px] mb-4">
              {resume.basics.label} • {resume.basics.email}
            </div>

            <h2 className="text-[18px] font-bold border-b border-black mb-2">
              Summary
            </h2>
            <p className="whitespace-pre-line mb-4">{resume.basics.summary}</p>

            <h2 className="text-[18px] font-bold border-b border-black mb-2">
              Experience
            </h2>
            {resume.work.map((w, i) => (
              <div key={i} className="mb-3">
                <div className="font-bold">
                  {w.position} — {w.name}
                </div>
                <div className="text-[12px] italic">
                  {w.startDate.slice(0, 7)} →{" "}
                  {w.endDate ? w.endDate.slice(0, 7) : "Present"}
                </div>
                <div>{w.summary}</div>
                <ul className="list-disc ml-5">
                  {w.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="text-[18px] font-bold border-b border-black mb-2">
              Education
            </h2>
            {resume.education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="font-bold">
                  {e.studyType} • {e.area}
                </div>
                <div>
                  {e.institution} — {e.startDate.slice(0, 4)}–
                  {e.endDate.slice(0, 4)}
                </div>
              </div>
            ))}

            <h2 className="text-[18px] font-bold border-b border-black mb-2">
              Skills
            </h2>
            {resume.skills.map((s) => (
              <div key={s.name} className="mb-1">
                <span className="font-bold">{s.name}: </span>
                {(s.keywords as { name: string }[])
                  .map((k) => k.name)
                  .join(", ")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Win>
  );
}
