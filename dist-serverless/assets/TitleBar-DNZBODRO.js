import { d as defineComponent, a2 as useI18n, cp as useSettingsStore, s as ref, a4 as createElementBlock, a7 as createBaseVNode, ag as createVNode, aW as createBlock, aa as createCommentVNode, a9 as unref, bl as isElectron, ap as withCtx, aZ as createTextVNode, a0 as Button, ab as Fragment, a8 as toDisplayString, bm as __unplugin_components_1, cs as __unplugin_components_2, ak as openBlock, am as _export_sfc } from "./index-9WtWgwAm.js";
const _hoisted_1 = { id: "buttons" };
const _hoisted_2 = { class: "close-dialog-content" };
const _hoisted_3 = { class: "remember-choice" };
const _hoisted_4 = { class: "dialog-footer" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TitleBar",
  setup(__props) {
    const { t } = useI18n();
    const settingsStore = useSettingsStore();
    const showCloseModal = ref(false);
    const rememberChoice = ref(false);
    const openDownloadPage = () => {
      if (!isElectron) {
        window.open("http://donate.alger.fun/download", "_blank");
      }
    };
    const minimize = () => {
      if (!isElectron) {
        return;
      }
      window.api.minimize();
    };
    const miniWindow = () => {
      if (!isElectron) return;
      window.api.miniWindow();
    };
    const handleAction = (action) => {
      if (rememberChoice.value) {
        settingsStore.setSetData({
          ...settingsStore.setData,
          closeAction: action
        });
      }
      if (action === "minimize") {
        window.api.miniTray();
      } else {
        window.api.close();
      }
      showCloseModal.value = false;
    };
    const handleClose = () => {
      const { closeAction } = settingsStore.setData;
      if (closeAction === "minimize") {
        window.api.miniTray();
      } else if (closeAction === "close") {
        window.api.close();
      } else {
        showCloseModal.value = true;
      }
    };
    const drag = (event) => {
      if (!isElectron) {
        return;
      }
      window.api.dragStart(event);
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_checkbox = __unplugin_components_1;
      const _component_n_modal = __unplugin_components_2;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          id: "title-bar",
          onMousedown: drag
        }, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { id: "title" }, "Alger Music", -1)),
          createBaseVNode("div", _hoisted_1, [
            !unref(isElectron) ? (openBlock(), createBlock(_component_n_button, {
              key: 0,
              type: "primary",
              size: "small",
              text: "",
              title: "下载应用",
              onClick: openDownloadPage
            }, {
              default: withCtx(() => [..._cache[4] || (_cache[4] = [
                createBaseVNode("i", { class: "ri-download-line" }, null, -1),
                createTextVNode(" 下载桌面版 ", -1)
              ])]),
              _: 1
            })) : createCommentVNode("", true),
            unref(isElectron) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: "button",
                onClick: miniWindow
              }, [..._cache[5] || (_cache[5] = [
                createBaseVNode("i", { class: "iconfont ri-picture-in-picture-line" }, null, -1)
              ])]),
              createBaseVNode("div", {
                class: "button",
                onClick: minimize
              }, [..._cache[6] || (_cache[6] = [
                createBaseVNode("i", { class: "iconfont icon-minisize" }, null, -1)
              ])]),
              createBaseVNode("div", {
                class: "button",
                onClick: handleClose
              }, [..._cache[7] || (_cache[7] = [
                createBaseVNode("i", { class: "iconfont icon-close" }, null, -1)
              ])])
            ], 64)) : createCommentVNode("", true)
          ])
        ], 32),
        createVNode(_component_n_modal, {
          show: showCloseModal.value,
          "onUpdate:show": _cache[3] || (_cache[3] = ($event) => showCloseModal.value = $event),
          preset: "dialog",
          title: unref(t)("comp.titleBar.closeApp"),
          style: { width: "400px" },
          "mask-closable": true
        }, {
          action: withCtx(() => [
            createBaseVNode("div", _hoisted_4, [
              createVNode(_component_n_button, {
                type: "primary",
                onClick: _cache[1] || (_cache[1] = ($event) => handleAction("minimize"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("comp.titleBar.minimizeToTray")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_n_button, {
                onClick: _cache[2] || (_cache[2] = ($event) => handleAction("close"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("comp.titleBar.exitApp")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("p", null, toDisplayString(unref(t)("comp.titleBar.closeTitle")), 1),
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_n_checkbox, {
                  checked: rememberChoice.value,
                  "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => rememberChoice.value = $event)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("comp.titleBar.rememberChoice")), 1)
                  ]),
                  _: 1
                }, 8, ["checked"])
              ])
            ])
          ]),
          _: 1
        }, 8, ["show", "title"])
      ], 64);
    };
  }
});
const TitleBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8116cf40"]]);
export {
  TitleBar as default
};
