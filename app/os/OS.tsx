import { useEffect, useState } from "react";
import { useOS } from "../os/store";
import { Desktop } from "../os/Desktop";
import { Taskbar } from "../os/Taskbar";
import { BootScreen } from "../os/BootScreen";
import { Notepad } from "../apps/Notepad";
import { Paint } from "../apps/Paint";
import { FileExplorer, ProjectWindow } from "../apps/FileExplorer";
import { InternetExplorer } from "../apps/InternetExplorer";
import { Messenger } from "../apps/Messenger";
import { ControlPanel } from "../apps/ControlPanel";
import { WordPad } from "../apps/WordPad";
import { Gallery } from "../apps/Gallery";
import { Terminal } from "../apps/Terminal";
import { RecycleBin } from "../apps/RecycleBin";
import { Minesweeper } from "../apps/Minesweeper";
import { MusicPlayer } from "../apps/MusicPlayer";
import { SystemInfo } from "../apps/SystemInfo";

const APPS: Record<string, any> = {
  notepad: Notepad,
  paint: Paint,
  explorer: FileExplorer,
  ie: InternetExplorer,
  messenger: Messenger,
  controlpanel: ControlPanel,
  wordpad: WordPad,
  gallery: Gallery,
  terminal: Terminal,
  recyclebin: RecycleBin,
  minesweeper: Minesweeper,
  music: MusicPlayer,
  systeminfo: SystemInfo,
  project: ProjectWindow,
};

export function OS() {
  const { windows, booted, setBooted } = useOS();
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    if (booted) setShowBoot(false);
  }, [booted]);

  return (
    <>
      {showBoot && <BootScreen onDone={() => setBooted(true)} />}
      <div className="fixed inset-0 overflow-hidden">
        <Desktop />
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-[calc(100%-30px)]">
            {windows.map((w) => {
              const C = APPS[w.app];
              return C ? <C key={w.id} win={w} /> : null;
            })}
          </div>
        </div>
        <Taskbar />
      </div>
    </>
  );
}
