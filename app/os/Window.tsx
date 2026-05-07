import { Rnd } from "react-rnd";
import { type ReactNode } from "react";
import { useOS, type WindowState } from "./store";
import { sfx } from "./sounds";

interface Props {
  win: WindowState;
  children: ReactNode;
  icon?: ReactNode;
  menubar?: ReactNode;
  statusbar?: ReactNode;
}

export function Win({ win, children, icon, menubar, statusbar }: Props) {
  const { focus, close, minimize, toggleMax, move, resize, focusedId } =
    useOS();
  const active = focusedId === win.id;
  if (win.minimized) return null;

  return (
    <Rnd
      size={{ width: win.w, height: win.h }}
      position={{ x: win.x, y: win.y }}
      style={{ zIndex: win.z }}
      bounds="parent"
      minWidth={240}
      minHeight={140}
      dragHandleClassName="w95-drag"
      cancel=".w95-titlebar-btn"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      onDragStop={(_, d) => move(win.id, d.x, d.y)}
      onResizeStop={(_, __, ref, ____, pos) =>
        resize(win.id, pos.x, pos.y, ref.offsetWidth, ref.offsetHeight)
      }
      onMouseDown={() => !active && focus(win.id)}
      className="absolute"
    >
      <div className="w95-raised bg-w95-bg w-full h-full flex flex-col p-[3px]">
        <div
          className={`w95-drag flex items-center h-[22px] px-1 ${active ? "w95-titlebar" : "w95-titlebar-inactive"}`}
          onDoubleClick={() => toggleMax(win.id)}
        >
          {icon && <span className="mr-1 inline-flex">{icon}</span>}
          <span className="font-bold text-[12px] truncate flex-1">
            {win.title}
          </span>
          <div className="flex gap-[2px]">
            <button
              className="w95-titlebar-btn w95-btn min-w-0! px-0! w-[18px] h-[16px] grid place-items-center"
              onClick={(e) => {
                e.stopPropagation();
                sfx.click();
                minimize(win.id);
              }}
              aria-label="Minimize"
            >
              <span className="text-[14px] leading-none -mt-2">_</span>
            </button>
            <button
              className="w95-titlebar-btn w95-btn min-w-0! px-0! w-[18px] h-[16px] grid place-items-center"
              onClick={(e) => {
                e.stopPropagation();
                sfx.click();
                toggleMax(win.id);
              }}
              aria-label="Maximize"
            >
              <span className="text-[10px] leading-none">▢</span>
            </button>
            <button
              className="w95-titlebar-btn w95-btn min-w-0! px-0! w-[18px] h-[16px] grid place-items-center font-bold"
              onClick={(e) => {
                e.stopPropagation();
                sfx.close();
                close(win.id);
              }}
              aria-label="Close"
            >
              <span className="text-[11px] leading-none">✕</span>
            </button>
          </div>
        </div>
        {menubar && (
          <div className="flex items-center gap-3 px-1 h-[20px] text-[12px]">
            {menubar}
          </div>
        )}
        <div className="flex-1 min-h-0 relative bg-w95-bg">{children}</div>
        {statusbar && (
          <div className="w95-sunken h-[18px] px-2 text-[11px] flex items-center mt-[2px]">
            {statusbar}
          </div>
        )}
      </div>
    </Rnd>
  );
}
