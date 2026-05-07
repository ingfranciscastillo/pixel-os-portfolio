import { Win } from "../os/Window";
import { type WindowState } from "../os/store";
import resume from "../content/resume.json";

export function RecycleBin({ win }: { win: WindowState }) {
  const items = (resume as any).deletedIdeas as {
    name: string;
    note: string;
  }[];
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
      statusbar={<span>{items.length} object(s) in Recycle Bin</span>}
    >
      <div className="absolute inset-1 w95-sunken bg-white p-2 overflow-auto w95-scrollbar">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="text-left">
              <th className="w95-raised bg-w95-bg p-1">Name</th>
              <th className="w95-raised bg-w95-bg p-1">Reason</th>
              <th className="w95-raised bg-w95-bg p-1 w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="hover:bg-w95-title hover:text-white">
                <td className="p-1">🗒 {it.name}</td>
                <td className="p-1 italic">{it.note}</td>
                <td className="p-1">
                  <button
                    className="w95-btn text-black!"
                    onClick={() => alert("Restore failed: idea is too risky.")}
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Win>
  );
}
