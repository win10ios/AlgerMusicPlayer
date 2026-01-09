const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./opencc-Bxkpbr-R.js","./index-0n6GrGnT.js","./index-6TzM627h.css"])))=>i.map(i=>d[i]);
import { cp as useSettingsStore, bu as __vitePreload } from "./index-0n6GrGnT.js";
async function translateLyrics(lines) {
  if (!lines || lines.length === 0) return lines || [];
  const settingsStore = useSettingsStore();
  const engine = settingsStore.setData?.lyricTranslationEngine || "none";
  switch (engine) {
    case "opencc": {
      const mod = await __vitePreload(() => import("./opencc-Bxkpbr-R.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
      const engineMod = await mod.ensureOpenccConverter();
      return engineMod.translateLines(lines);
    }
    default: {
      return lines.map((l) => ({ ...l, trText: l.trText || "" }));
    }
  }
}
export {
  translateLyrics
};
