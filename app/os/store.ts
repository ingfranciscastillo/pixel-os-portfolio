import { create } from "zustand";

export type AppId =
  | "notepad" | "paint" | "explorer" | "ie" | "messenger"
  | "controlpanel" | "wordpad" | "gallery" | "terminal"
  | "recyclebin" | "minesweeper" | "music" | "systeminfo"
  | "project";

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  icon?: string;
  x: number; y: number;
  w: number; h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; w: number; h: number };
  payload?: any;
}

interface OS {
  windows: WindowState[];
  zCounter: number;
  focusedId: string | null;
  muted: boolean;
  booted: boolean;
  setBooted: (b: boolean) => void;
  toggleMute: () => void;
  open: (app: AppId, opts?: Partial<WindowState>) => string;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, x: number, y: number, w: number, h: number) => void;
}

const defaults: Record<AppId, { title: string; w: number; h: number }> = {
  notepad:      { title: "Lo_que_aporto.txt - Notepad", w: 520, h: 400 },
  paint:        { title: "untitled - Paint",            w: 640, h: 480 },
  explorer:     { title: "Projects",                    w: 680, h: 460 },
  ie:           { title: "Live Projects - Internet Explorer", w: 800, h: 560 },
  messenger:    { title: "Messenger - Contact",         w: 420, h: 480 },
  controlpanel: { title: "Control Panel - Skills",      w: 560, h: 420 },
  wordpad:      { title: "Resume.doc - WordPad",        w: 640, h: 560 },
  gallery:      { title: "Gallery - Image Viewer",      w: 640, h: 480 },
  terminal:     { title: "Terminal", w: 600, h: 380 },
  recyclebin:   { title: "Recycle Bin - Deleted Ideas", w: 520, h: 360 },
  minesweeper:  { title: "Minesweeper",                 w: 280, h: 340 },
  music:        { title: "Media Player",                w: 380, h: 200 },
  systeminfo:   { title: "System Properties",           w: 440, h: 400 },
  project:      { title: "Project",                     w: 560, h: 460 },
};

let idCounter = 0;

export const useOS = create<OS>((set, get) => ({
  windows: [],
  zCounter: 10,
  focusedId: null,
  muted: true,
  booted: false,
  setBooted: (b) => set({ booted: b }),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  open: (app, opts = {}) => {
    const def = defaults[app];
    const z = get().zCounter + 1;
    const id = opts.id ?? `${app}-${++idCounter}`;
    // focus existing if singleton-like and no payload
    if (!opts.payload) {
      const existing = get().windows.find((w) => w.app === app && !w.payload);
      if (existing) {
        get().focus(existing.id);
        if (existing.minimized) set((s) => ({
          windows: s.windows.map((w) => w.id === existing.id ? { ...w, minimized: false } : w),
        }));
        return existing.id;
      }
    }
    const cascade = get().windows.length * 24;
    const w: WindowState = {
      id, app,
      title: opts.title ?? def.title,
      x: opts.x ?? 60 + cascade,
      y: opts.y ?? 40 + cascade,
      w: opts.w ?? def.w,
      h: opts.h ?? def.h,
      z, minimized: false, maximized: false,
      payload: opts.payload,
    };
    set((s) => ({ windows: [...s.windows, w], zCounter: z, focusedId: id }));
    return id;
  },
  close: (id) => set((s) => ({
    windows: s.windows.filter((w) => w.id !== id),
    focusedId: s.focusedId === id ? null : s.focusedId,
  })),
  focus: (id) => set((s) => {
    const z = s.zCounter + 1;
    return {
      zCounter: z,
      focusedId: id,
      windows: s.windows.map((w) => w.id === id ? { ...w, z, minimized: false } : w),
    };
  }),
  minimize: (id) => set((s) => ({
    windows: s.windows.map((w) => w.id === id ? { ...w, minimized: true } : w),
    focusedId: s.focusedId === id ? null : s.focusedId,
  })),
  toggleMax: (id) => set((s) => ({
    windows: s.windows.map((w) => {
      if (w.id !== id) return w;
      if (w.maximized && w.prev) return { ...w, maximized: false, ...w.prev, prev: undefined };
      return {
        ...w, maximized: true,
        prev: { x: w.x, y: w.y, w: w.w, h: w.h },
        x: 0, y: 0,
        w: window.innerWidth,
        h: window.innerHeight - 30,
      };
    }),
  })),
  move: (id, x, y) => set((s) => ({
    windows: s.windows.map((w) => w.id === id ? { ...w, x, y } : w),
  })),
  resize: (id, x, y, w, h) => set((s) => ({
    windows: s.windows.map((win) => win.id === id ? { ...win, x, y, w, h } : win),
  })),
}));
