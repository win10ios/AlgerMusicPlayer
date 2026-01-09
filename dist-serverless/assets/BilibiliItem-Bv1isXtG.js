import { d as defineComponent, a2 as useI18n, a4 as createElementBlock, a7 as createBaseVNode, ag as createVNode, aN as NImage, a8 as toDisplayString, aZ as createTextVNode, ak as openBlock, am as _export_sfc } from "./index-DEM82Ldr.js";
const _hoisted_1 = { class: "bilibili-item-img" };
const _hoisted_2 = { class: "duration" };
const _hoisted_3 = { class: "bilibili-item-info" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "bilibili-item-author" };
const _hoisted_6 = { class: "bilibili-item-stats" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BilibiliItem",
  props: {
    item: {}
  },
  emits: ["play"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const handleClick = () => {
      emit("play", props.item);
    };
    const formatNumber = (num) => {
      if (!num) return "0";
      if (num >= 1e4) {
        return `${(num / 1e4).toFixed(1)}${t("bilibili.player.num")}`;
      }
      return num.toString();
    };
    const formatDuration = (duration) => {
      if (!duration) return "00:00:00";
      if (typeof duration === "string") {
        if (/^\d+:\d+$/.test(duration)) {
          const [minutes2, seconds2] = duration.split(":").map(Number);
          const hours2 = Math.floor(minutes2 / 60);
          const remainingMinutes = minutes2 % 60;
          return `${hours2.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}:${seconds2.toString().padStart(2, "0")}`;
        }
        return "00:00:00";
      }
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor(duration % 3600 / 60);
      const seconds = duration % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      return openBlock(), createElementBlock("div", {
        class: "bilibili-item",
        onClick: handleClick
      }, [
        createBaseVNode("div", _hoisted_1, [
          createVNode(_component_n_image, {
            class: "w-full h-full",
            src: __props.item.pic,
            lazy: "",
            "preview-disabled": ""
          }, null, 8, ["src"]),
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "play" }, [
            createBaseVNode("i", { class: "ri-play-fill text-4xl" })
          ], -1)),
          createBaseVNode("div", _hoisted_2, toDisplayString(formatDuration(__props.item.duration)), 1)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("p", {
            class: "bilibili-item-title",
            innerHTML: __props.item.title
          }, null, 8, _hoisted_4),
          createBaseVNode("p", _hoisted_5, [
            _cache[1] || (_cache[1] = createBaseVNode("i", { class: "ri-user-line mr-1" }, null, -1)),
            createTextVNode(toDisplayString(__props.item.author), 1)
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("span", null, [
              _cache[2] || (_cache[2] = createBaseVNode("i", { class: "ri-play-line mr-1" }, null, -1)),
              createTextVNode(toDisplayString(formatNumber(__props.item.view)), 1)
            ]),
            createBaseVNode("span", null, [
              _cache[3] || (_cache[3] = createBaseVNode("i", { class: "ri-chat-1-line mr-1" }, null, -1)),
              createTextVNode(toDisplayString(formatNumber(__props.item.danmaku)), 1)
            ])
          ])
        ])
      ]);
    };
  }
});
const BilibiliItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf2eae88"]]);
export {
  BilibiliItem as B
};
