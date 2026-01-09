import { bu as __vitePreload } from "./index-DEM82Ldr.js";
let _inited = false;
let _converter = null;
async function init() {
  if (_inited) return;
  const mod = await __vitePreload(() => import("https://cdn.jsdelivr.net/npm/opencc-rust/dist/opencc-rust.mjs"), true ? [] : void 0, import.meta.url);
  if (!mod?.initOpenccRust || !mod?.getConverter) {
    throw new Error("opencc-rust module missing expected exports");
  }
  await mod.initOpenccRust();
  _converter = mod.getConverter();
  _inited = true;
}
async function convert(text) {
  await init();
  if (!_converter) return text;
  return _converter.convert(text);
}
async function convertLines(lines) {
  await init();
  if (!_converter) return lines.slice();
  const cjkRe = /[\u4e00-\u9fff]/;
  const convertOne = async (s) => {
    const src = (s || "").trim();
    if (!src || !cjkRe.test(src)) return "";
    try {
      return await _converter.convert(src);
    } catch (e) {
      console.warn("opencc convertLines item failed:", e);
      return "";
    }
  };
  const results = await Promise.all(lines.map((s) => convertOne(s)));
  return results;
}
async function translateLines(lines) {
  if (!lines || lines.length === 0) return lines.slice();
  const srcInfo = lines.map((l) => {
    const hasTr = !!(l.trText && l.trText.trim() !== "");
    return {
      src: hasTr ? (l.trText || "").trim() : (l.text || "").trim(),
      targetIsTr: hasTr
    };
  });
  const srcLines = srcInfo.map((s) => s.src);
  const converted = await convertLines(srcLines);
  return lines.map((l, i) => {
    const { targetIsTr } = srcInfo[i];
    const conv = converted[i] || "";
    if (targetIsTr) {
      const tr = conv || l.trText || l.text || "";
      return { ...l, trText: tr };
    }
    const txt = conv || l.text || "";
    return { ...l, text: txt };
  });
}
const opencc = {
  init,
  convert,
  convertLines,
  translateLines
};
let _ensurePromise = null;
async function ensureOpenccConverter() {
  if (_ensurePromise) return _ensurePromise;
  _ensurePromise = (async () => {
    try {
      await init();
    } catch (e) {
      console.warn("opencc ensureOpenccConverter init failed:", e);
    }
    return {
      init,
      convert,
      convertLines,
      translateLines
    };
  })();
  return _ensurePromise;
}
export {
  convert,
  convertLines,
  opencc as default,
  ensureOpenccConverter,
  init,
  translateLines
};
