import { d as defineComponent, b1 as useRoute, s as ref, cp as useSettingsStore, U as watch, a2 as useI18n, dG as resolveComponent, a4 as createElementBlock, a7 as createBaseVNode, a9 as unref, ab as Fragment, ac as renderList, a6 as normalizeClass, ak as openBlock, ag as createVNode, ap as withCtx, aa as createCommentVNode, a8 as toDisplayString, ad as normalizeStyle, aY as isMobile, cA as __unplugin_components_7, am as _export_sfc } from "./index-DEM82Ldr.js";
const icon = "" + new URL("icon-mGmYaNg4.png", import.meta.url).href;
const _hoisted_1 = { class: "app-menu-header" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "app-menu-list" };
const _hoisted_4 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppMenu",
  props: {
    size: {
      type: String,
      default: "26px"
    },
    color: {
      type: String,
      default: "#aaa"
    },
    selectColor: {
      type: String,
      default: "#10B981"
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const path = ref(route.path);
    const settingsStore = useSettingsStore();
    watch(
      () => route.path,
      async (newParams) => {
        path.value = newParams;
      }
    );
    const { t } = useI18n();
    const isChecked = (index) => {
      return path.value === props.menus[index].path;
    };
    const iconStyle = (index) => {
      const style = {
        fontSize: props.size,
        color: isChecked(index) ? props.selectColor : props.color
      };
      return style;
    };
    const toggleMenu = () => {
      settingsStore.setSetData({
        isMenuExpanded: !settingsStore.setData.isMenuExpanded
      });
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_n_tooltip = __unplugin_components_7;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: normalizeClass(["app-menu", { "app-menu-expanded": unref(settingsStore).setData.isMenuExpanded }])
        }, [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", {
              class: "app-menu-logo",
              onClick: toggleMenu
            }, [
              createBaseVNode("img", {
                src: unref(icon),
                class: "w-9 h-9",
                alt: "logo"
              }, null, 8, _hoisted_2)
            ])
          ]),
          createBaseVNode("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.menus, (item, index) => {
              return openBlock(), createElementBlock("div", {
                key: item.path,
                class: "app-menu-item"
              }, [
                createVNode(_component_n_tooltip, {
                  delay: 200,
                  disabled: unref(settingsStore).setData.isMenuExpanded || unref(isMobile),
                  placement: "bottom"
                }, {
                  trigger: withCtx(() => [
                    createVNode(_component_router_link, {
                      class: "app-menu-item-link",
                      to: item.path
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("i", {
                          class: normalizeClass(["iconfont app-menu-item-icon", item.meta.icon]),
                          style: normalizeStyle(iconStyle(index))
                        }, null, 6),
                        unref(settingsStore).setData.isMenuExpanded ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["app-menu-item-text ml-3", isChecked(index) ? "text-green-500" : ""])
                        }, toDisplayString(unref(t)(item.meta.title)), 3)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]),
                  default: withCtx(() => [
                    !unref(settingsStore).setData.isMenuExpanded ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(unref(t)(item.meta.title)), 1)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ]);
            }), 128))
          ])
        ], 2)
      ]);
    };
  }
});
const AppMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8b4d86c"]]);
export {
  AppMenu as default
};
