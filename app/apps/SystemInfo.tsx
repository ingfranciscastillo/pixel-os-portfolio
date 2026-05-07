import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";
import sysInfoImg from "../assets/icon-sysinfo.png";

export function SystemInfo({ win }: { win: WindowState }) {
  const totalSkills = resume.skills.reduce(
    (n, s) => n + (s.keywords as any[]).length,
    0,
  );
  return (
    <Win win={win}>
      <div className="absolute inset-1 p-3 text-[13px] flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <span className="text-[48px]">
            <img src={sysInfoImg} className="size-10" />
          </span>
          <div>
            <div className="font-bold text-[15px]">Portfolio95</div>
            <div>Build 1995.{new Date().getFullYear()}</div>
            <div className="opacity-70">
              Registered to: {resume.basics.name}
            </div>
          </div>
        </div>
        <div className="w95-sunken bg-white p-3 flex-1 grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="font-bold">Computer:</div>
          <div>{resume.basics.name}-PC</div>
          <div className="font-bold">CPU:</div>
          <div>Creativity™ @ ∞ GHz</div>
          <div className="font-bold">Memory:</div>
          <div>{totalSkills * 64} MB of skill RAM</div>
          <div className="font-bold">Storage:</div>
          <div>{resume.projects.length} projects shipped</div>
          <div className="font-bold">Display:</div>
          <div>
            {window.innerWidth}×{window.innerHeight} • 256 colors
          </div>
          <div className="font-bold">OS:</div>
          <div>Portfolio95 SE</div>
          <div className="font-bold">Email:</div>
          <div>{resume.basics.email}</div>
          <div className="font-bold">Web:</div>
          <div>{resume.basics.url}</div>
        </div>
        <div className="flex justify-end gap-1">
          <button className="w95-btn">OK</button>
          <button className="w95-btn">Cancel</button>
        </div>
      </div>
    </Win>
  );
}
