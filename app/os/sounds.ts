import { useOS } from "./store";

// Tiny inline beep using WebAudio — no asset deps
let ctx: AudioContext | null = null;
function tone(freq: number, ms: number, type: OscillatorType = "square", gain = 0.04) {
  if (useOS.getState().muted) return;
  try {
    ctx ??= new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g); g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + ms / 1000);
  } catch { /* noop */ }
}
export const sfx = {
  click: () => tone(800, 30, "square", 0.02),
  open:  () => { tone(660, 60); setTimeout(() => tone(880, 80), 60); },
  close: () => { tone(440, 60); setTimeout(() => tone(330, 80), 60); },
  error: () => { tone(200, 200, "sawtooth", 0.05); },
};
