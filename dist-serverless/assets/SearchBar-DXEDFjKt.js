import { co as wechat, cn as alipay, a2 as useI18n, bd as useMessage, a4 as createElementBlock, ak as openBlock, ag as createVNode, ap as withCtx, a7 as createBaseVNode, a9 as unref, aN as NImage, a8 as toDisplayString, bE as renderSlot, a0 as Button, aZ as createTextVNode, bY as __unplugin_components_4, s as ref, d as defineComponent, aI as useRouter, cp as useSettingsStore, aS as useUserStore, v as computed, A as watchEffect, an as onMounted, bl as isElectron, U as watch, cD as checkUpdate, cE as config, aa as createCommentVNode, b0 as Scrollbar, b2 as __unplugin_components_2, ab as Fragment, ac as renderList, a5 as withModifiers, a6 as normalizeClass, dI as __unplugin_components_0, aM as getImgUrl, cA as __unplugin_components_7, aW as createBlock, df as getSearchKeyword, bx as getUserDetail, cF as useDebounceFn, am as _export_sfc } from "./index-9WtWgwAm.js";
import { u as useSearchStore, S as SEARCH_TYPE, U as USER_SET_OPTIONS, b as getSearchSuggestions, a as SEARCH_TYPES } from "./bar-const-DjUg5NjI.js";
import { _ as __unplugin_components_1 } from "./Input-BWrKoNPd.js";
import { _ as __unplugin_components_5 } from "./Avatar-Bj10BTlg.js";
import { _ as __unplugin_components_8 } from "./Switch-ET_jPshi.js";
import { _ as __unplugin_components_9 } from "./Tag-Dm9hxVfu.js";
const _hoisted_1$1 = { class: "relative inline-block" };
const _hoisted_2$1 = { class: "p-6 rounded-lg shadow-lg bg-light dark:bg-gray-800" };
const _hoisted_3$1 = { class: "flex gap-10" };
const _hoisted_4$1 = { class: "flex flex-col items-center gap-2" };
const _hoisted_5$1 = { class: "text-sm text-gray-700 dark:text-gray-200" };
const _hoisted_6$1 = { class: "flex flex-col items-center gap-2" };
const _hoisted_7$1 = { class: "text-sm text-gray-700 dark:text-gray-200" };
const _hoisted_8$1 = { class: "mt-4" };
const _hoisted_9$1 = { class: "mt-4" };
const _sfc_main$1 = {
  __name: "Coffee",
  props: {
    alipayQR: {
      type: String,
      default: alipay
    },
    wechatQR: {
      type: String,
      default: wechat
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const message = useMessage();
    const copyText = () => {
      navigator.clipboard.writeText("AlgerMusic");
      message.success(t("common.copySuccess"));
    };
    const toDonateList = () => {
      window.open("http://donate.alger.fun/download", "_blank");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(unref(__unplugin_components_4), {
          trigger: "hover",
          placement: "top",
          "show-arrow": true,
          raw: true,
          delay: 100
        }, {
          trigger: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createVNode(unref(Button), {
                quaternary: "",
                class: "inline-flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("comp.coffee.title")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, [
                createBaseVNode("div", _hoisted_4$1, [
                  createVNode(unref(NImage), {
                    src: __props.alipayQR,
                    alt: unref(t)("comp.coffee.alipayQR"),
                    class: "w-32 h-32 rounded-lg cursor-none",
                    "preview-disabled": ""
                  }, null, 8, ["src", "alt"]),
                  createBaseVNode("span", _hoisted_5$1, toDisplayString(unref(t)("comp.coffee.alipay")), 1)
                ]),
                createBaseVNode("div", _hoisted_6$1, [
                  createVNode(unref(NImage), {
                    src: __props.wechatQR,
                    alt: unref(t)("comp.coffee.wechatQR"),
                    class: "w-32 h-32 rounded-lg cursor-none",
                    "preview-disabled": ""
                  }, null, 8, ["src", "alt"]),
                  createBaseVNode("span", _hoisted_7$1, toDisplayString(unref(t)("comp.coffee.wechat")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_8$1, [
                createBaseVNode("p", {
                  class: "text-sm text-gray-700 dark:text-gray-200 text-center cursor-pointer hover:text-green-500",
                  onClick: copyText
                }, toDisplayString(unref(t)("comp.coffee.groupText")), 1)
              ]),
              createBaseVNode("div", _hoisted_9$1, [
                createBaseVNode("p", {
                  class: "text-sm text-green-600 dark:text-gray-200 text-center cursor-pointer hover:text-green-500",
                  onClick: toDonateList
                }, toDisplayString(unref(t)("comp.coffee.donateList")), 1)
              ])
            ])
          ]),
          _: 3
        })
      ]);
    };
  }
};
function useZoom() {
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 1.5;
  const ZOOM_STEP = 0.05;
  const zoomFactor = ref(1);
  const initZoomFactor = async () => {
    try {
      const currentZoom = await window.ipcRenderer.invoke("get-content-zoom");
      zoomFactor.value = currentZoom;
    } catch (error) {
      console.error("获取缩放比例失败:", error);
    }
  };
  const increaseZoom = () => {
    let newZoom;
    if (zoomFactor.value < 1 && zoomFactor.value + ZOOM_STEP > 1) {
      newZoom = 1;
    } else {
      newZoom = Math.min(MAX_ZOOM, Math.round((zoomFactor.value + ZOOM_STEP) * 20) / 20);
    }
    setZoomFactor(newZoom);
  };
  const decreaseZoom = () => {
    let newZoom;
    if (zoomFactor.value > 1 && zoomFactor.value - ZOOM_STEP < 1) {
      newZoom = 1;
    } else {
      newZoom = Math.max(MIN_ZOOM, Math.round((zoomFactor.value - ZOOM_STEP) * 20) / 20);
    }
    setZoomFactor(newZoom);
  };
  const resetZoom = async () => {
    try {
      setZoomFactor(1);
    } catch (error) {
      console.error("重置缩放比例失败:", error);
    }
  };
  const setZoom100 = () => {
    setZoomFactor(1);
  };
  const setZoomFactor = (zoom) => {
    window.ipcRenderer.send("set-content-zoom", zoom);
    zoomFactor.value = zoom;
  };
  const isZoom100 = () => {
    return Math.abs(zoomFactor.value - 1) < 1e-3;
  };
  return {
    zoomFactor,
    initZoomFactor,
    increaseZoom,
    decreaseZoom,
    resetZoom,
    setZoom100,
    setZoomFactor,
    isZoom100,
    MIN_ZOOM,
    MAX_ZOOM,
    ZOOM_STEP
  };
}
const _hoisted_1 = { class: "search-box flex search-bar" };
const _hoisted_2 = { class: "search-box-input flex-1 relative" };
const _hoisted_3 = { class: "w-20 px-3 flex justify-between items-center" };
const _hoisted_4 = { class: "search-suggestions-panel" };
const _hoisted_5 = {
  key: 0,
  class: "suggestion-item loading"
};
const _hoisted_6 = ["onMousedown", "onMouseenter"];
const _hoisted_7 = { class: "user-box" };
const _hoisted_8 = { class: "user-popover" };
const _hoisted_9 = { class: "username" };
const _hoisted_10 = { class: "menu-items" };
const _hoisted_11 = {
  key: 2,
  class: "menu-item"
};
const _hoisted_12 = { class: "zoom-controls ml-auto" };
const _hoisted_13 = { class: "menu-item" };
const _hoisted_14 = { class: "version-info" };
const _hoisted_15 = { class: "version-number" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  setup(__props) {
    const router = useRouter();
    const searchStore = useSearchStore();
    const settingsStore = useSettingsStore();
    const userStore = useUserStore();
    const userSetOptions = ref(USER_SET_OPTIONS);
    const { t, locale } = useI18n();
    const { zoomFactor, initZoomFactor, increaseZoom, decreaseZoom, resetZoom, isZoom100 } = useZoom();
    const showBackButton = computed(() => {
      return router.currentRoute.value.meta.back === true;
    });
    const goBack = () => {
      router.back();
    };
    const hotSearchKeyword = ref(t("comp.searchBar.searchPlaceholder"));
    const hotSearchValue = ref("");
    const loadHotSearchKeyword = async () => {
      const { data } = await getSearchKeyword();
      hotSearchKeyword.value = data.data.showKeyword;
      hotSearchValue.value = data.data.realkeyword;
    };
    const loadPage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await getUserDetail();
      userStore.user = data.profile || userStore.user || JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify(userStore.user));
    };
    loadPage();
    watchEffect(() => {
      if (userStore.user) {
        userSetOptions.value = USER_SET_OPTIONS;
      } else {
        userSetOptions.value = USER_SET_OPTIONS.filter((item) => item.key !== "logout");
      }
    });
    const restartApp = () => {
      window.electron.ipcRenderer.send("restart");
    };
    const toLogin = () => {
      router.push("/user");
    };
    onMounted(() => {
      loadHotSearchKeyword();
      loadPage();
      checkForUpdates();
      isElectron && initZoomFactor();
    });
    const isDark = computed({
      get: () => settingsStore.theme === "dark",
      set: () => settingsStore.toggleTheme()
    });
    const searchValue = ref("");
    watch(
      () => searchStore.searchValue,
      (newValue) => {
        if (newValue) {
          searchValue.value = newValue;
        }
      },
      { immediate: true }
    );
    const search = () => {
      const { value } = searchValue;
      if (value === "") {
        searchValue.value = hotSearchValue.value;
        return;
      }
      if (router.currentRoute.value.path === "/search") {
        searchStore.searchValue = value;
        return;
      }
      router.push({
        path: "/search",
        query: {
          keyword: value,
          type: searchStore.searchType
        }
      });
      console.log(`[UI] 执行搜索，关键词: "${searchValue.value}"`);
      showSuggestions.value = false;
    };
    const selectSearchType = (key) => {
      searchStore.searchType = key;
      if (searchValue.value) {
        if (router.currentRoute.value.path === "/search") {
          search();
        } else {
          router.push({
            path: "/search",
            query: {
              keyword: searchValue.value,
              type: key
            }
          });
        }
      }
    };
    const rawSearchTypes = ref(SEARCH_TYPES);
    const searchTypeOptions = computed(() => {
      locale.value;
      return rawSearchTypes.value.filter((type) => isElectron || type.key !== SEARCH_TYPE.BILIBILI).map((type) => ({
        label: t(type.label),
        key: type.key
      }));
    });
    const selectItem = async (key) => {
      switch (key) {
        case "logout":
          userStore.handleLogout();
          break;
        case "login":
          router.push("/login");
          break;
        case "set":
          router.push("/set");
          break;
        case "user":
          router.push("/user");
          break;
        case "refresh":
          window.location.reload();
          break;
      }
    };
    const toGithub = () => {
      window.open("http://donate.alger.fun/download", "_blank");
    };
    const updateInfo = ref({
      hasUpdate: false,
      latestVersion: "",
      currentVersion: config.version,
      releaseInfo: null
    });
    const checkForUpdates = async () => {
      try {
        const result = await checkUpdate(config.version);
        if (result) {
          updateInfo.value = result;
        }
      } catch (error) {
        console.error("检查更新失败:", error);
      }
    };
    const toGithubRelease = () => {
      window.location.href = "https://donate.alger.fun/download";
    };
    const suggestions = ref([]);
    const showSuggestions = ref(false);
    const suggestionsLoading = ref(false);
    const highlightedIndex = ref(-1);
    const debouncedGetSuggestions = useDebounceFn(async (keyword) => {
      if (!keyword.trim()) {
        suggestions.value = [];
        showSuggestions.value = false;
        return;
      }
      suggestionsLoading.value = true;
      suggestions.value = await getSearchSuggestions(keyword);
      suggestionsLoading.value = false;
      showSuggestions.value = suggestions.value.length > 0;
      highlightedIndex.value = -1;
    }, 300);
    const handleInput = (value) => {
      debouncedGetSuggestions(value);
    };
    const handleFocus = () => {
      if (searchValue.value && suggestions.value.length > 0) {
        showSuggestions.value = true;
      }
    };
    const handleBlur = () => {
      setTimeout(() => {
        showSuggestions.value = false;
      }, 150);
    };
    const selectSuggestion = (suggestion) => {
      searchValue.value = suggestion;
      showSuggestions.value = false;
      search();
    };
    const handleKeydown = (event) => {
      if (!showSuggestions.value || suggestions.value.length === 0) {
        if (event.key === "Enter") {
          search();
        }
        return;
      }
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          highlightedIndex.value = (highlightedIndex.value + 1) % suggestions.value.length;
          break;
        case "ArrowUp":
          event.preventDefault();
          highlightedIndex.value = (highlightedIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex.value !== -1) {
            selectSuggestion(suggestions.value[highlightedIndex.value]);
          } else {
            search();
          }
          break;
        case "Escape":
          showSuggestions.value = false;
          break;
      }
    };
    return (_ctx, _cache) => {
      const _component_n_dropdown = __unplugin_components_0;
      const _component_n_input = __unplugin_components_1;
      const _component_n_spin = __unplugin_components_2;
      const _component_n_scrollbar = Scrollbar;
      const _component_n_popover = __unplugin_components_4;
      const _component_n_avatar = __unplugin_components_5;
      const _component_n_button = Button;
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_switch = __unplugin_components_8;
      const _component_n_tag = __unplugin_components_9;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        showBackButton.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "back-button",
          onClick: goBack
        }, [..._cache[8] || (_cache[8] = [
          createBaseVNode("i", { class: "ri-arrow-left-line" }, null, -1)
        ])])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_n_popover, {
            trigger: "manual",
            placement: "bottom-start",
            show: showSuggestions.value,
            "show-arrow": false,
            style: { "width": "100%", "margin-top": "4px" },
            "content-style": "padding: 0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);",
            raw: ""
          }, {
            trigger: withCtx(() => [
              createVNode(_component_n_input, {
                value: searchValue.value,
                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
                size: "medium",
                round: "",
                placeholder: hotSearchKeyword.value,
                class: "border dark:border-gray-600 border-gray-200",
                onInput: handleInput,
                onKeydown: handleKeydown,
                onFocus: handleFocus,
                onBlur: handleBlur
              }, {
                prefix: withCtx(() => [..._cache[9] || (_cache[9] = [
                  createBaseVNode("i", { class: "iconfont icon-search" }, null, -1)
                ])]),
                suffix: withCtx(() => [
                  createVNode(_component_n_dropdown, {
                    trigger: "hover",
                    options: searchTypeOptions.value,
                    onSelect: selectSearchType
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", null, toDisplayString(searchTypeOptions.value.find((item) => item.key === unref(searchStore).searchType)?.label), 1),
                        _cache[10] || (_cache[10] = createBaseVNode("i", { class: "iconfont icon-xiasanjiaoxing" }, null, -1))
                      ])
                    ]),
                    _: 1
                  }, 8, ["options"])
                ]),
                _: 1
              }, 8, ["value", "placeholder"])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_4, [
                createVNode(_component_n_scrollbar, { style: { "max-height": "300px" } }, {
                  default: withCtx(() => [
                    suggestionsLoading.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
                      createVNode(_component_n_spin, { size: "small" })
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(suggestions.value, (suggestion, index) => {
                      return openBlock(), createElementBlock("div", {
                        key: index,
                        class: normalizeClass(["suggestion-item", { highlighted: index === highlightedIndex.value }]),
                        onMousedown: withModifiers(($event) => selectSuggestion(suggestion), ["prevent"]),
                        onMouseenter: ($event) => highlightedIndex.value = index
                      }, [
                        _cache[11] || (_cache[11] = createBaseVNode("i", { class: "ri-search-line suggestion-icon" }, null, -1)),
                        createBaseVNode("span", null, toDisplayString(suggestion), 1)
                      ], 42, _hoisted_6);
                    }), 128))
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }, 8, ["show"])
        ]),
        createVNode(_component_n_popover, {
          trigger: "hover",
          placement: "bottom",
          "show-arrow": false,
          raw: ""
        }, {
          trigger: withCtx(() => [
            createBaseVNode("div", _hoisted_7, [
              unref(userStore).user ? (openBlock(), createBlock(_component_n_avatar, {
                key: 0,
                class: "cursor-pointer",
                circle: "",
                size: "medium",
                src: unref(getImgUrl)(unref(userStore).user.avatarUrl),
                onClick: _cache[1] || (_cache[1] = ($event) => selectItem("user"))
              }, null, 8, ["src"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: "mx-2 rounded-full cursor-pointer text-sm",
                onClick: toLogin
              }, toDisplayString(unref(t)("comp.searchBar.login")), 1))
            ])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_8, [
              unref(userStore).user ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "user-header",
                onClick: _cache[2] || (_cache[2] = ($event) => selectItem("user"))
              }, [
                createVNode(_component_n_avatar, {
                  circle: "",
                  size: "small",
                  src: unref(getImgUrl)(unref(userStore).user?.avatarUrl)
                }, null, 8, ["src"]),
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_9, toDisplayString(unref(userStore).user?.nickname || "Theodore"), 1),
                  _cache[12] || (_cache[12] = createBaseVNode("p", null, null, -1))
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_10, [
                !unref(userStore).user ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "menu-item",
                  onClick: toLogin
                }, [
                  _cache[13] || (_cache[13] = createBaseVNode("i", { class: "iconfont ri-login-box-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.toLogin")), 1)
                ])) : createCommentVNode("", true),
                unref(userStore).user ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: "menu-item",
                  onClick: _cache[3] || (_cache[3] = ($event) => selectItem("logout"))
                }, [
                  _cache[14] || (_cache[14] = createBaseVNode("i", { class: "iconfont ri-logout-box-r-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.logout")), 1)
                ])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "menu-item",
                  onClick: _cache[4] || (_cache[4] = ($event) => selectItem("set"))
                }, [
                  _cache[15] || (_cache[15] = createBaseVNode("i", { class: "iconfont ri-settings-3-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.set")), 1)
                ]),
                unref(isElectron) ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  _cache[18] || (_cache[18] = createBaseVNode("i", { class: "iconfont ri-zoom-in-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.zoom")), 1),
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(_component_n_button, {
                      quaternary: "",
                      circle: "",
                      size: "tiny",
                      onClick: unref(decreaseZoom)
                    }, {
                      default: withCtx(() => [..._cache[16] || (_cache[16] = [
                        createBaseVNode("i", { class: "ri-subtract-line" }, null, -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_n_tooltip, { trigger: "hover" }, {
                      trigger: withCtx(() => [
                        createBaseVNode("span", {
                          class: normalizeClass(["zoom-value", { "zoom-100": unref(isZoom100)() }]),
                          onClick: _cache[5] || (_cache[5] = //@ts-ignore
                          (...args) => unref(resetZoom) && unref(resetZoom)(...args))
                        }, toDisplayString(Math.round(unref(zoomFactor) * 100)) + "%", 3)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(isZoom100)() ? unref(t)("comp.searchBar.zoom100") : unref(t)("comp.searchBar.resetZoom")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_n_button, {
                      quaternary: "",
                      circle: "",
                      size: "tiny",
                      onClick: unref(increaseZoom)
                    }, {
                      default: withCtx(() => [..._cache[17] || (_cache[17] = [
                        createBaseVNode("i", { class: "ri-add-line" }, null, -1)
                      ])]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("i", {
                    class: normalizeClass(["iconfont", isDark.value ? "ri-moon-line" : "ri-sun-line"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.theme")), 1),
                  createVNode(_component_n_switch, {
                    value: isDark.value,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => isDark.value = $event),
                    class: "ml-auto"
                  }, {
                    checked: withCtx(() => [..._cache[19] || (_cache[19] = [
                      createBaseVNode("i", { class: "ri-moon-line" }, null, -1)
                    ])]),
                    unchecked: withCtx(() => [..._cache[20] || (_cache[20] = [
                      createBaseVNode("i", { class: "ri-sun-line" }, null, -1)
                    ])]),
                    _: 1
                  }, 8, ["value"])
                ]),
                createBaseVNode("div", {
                  class: "menu-item",
                  onClick: restartApp
                }, [
                  _cache[21] || (_cache[21] = createBaseVNode("i", { class: "iconfont ri-restart-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.restart")), 1)
                ]),
                createBaseVNode("div", {
                  class: "menu-item",
                  onClick: _cache[7] || (_cache[7] = ($event) => selectItem("refresh"))
                }, [
                  _cache[22] || (_cache[22] = createBaseVNode("i", { class: "iconfont ri-refresh-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.refresh")), 1)
                ]),
                createBaseVNode("div", {
                  class: "menu-item",
                  onClick: toGithubRelease
                }, [
                  _cache[23] || (_cache[23] = createBaseVNode("i", { class: "iconfont ri-github-fill" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("comp.searchBar.currentVersion")), 1),
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("span", _hoisted_15, toDisplayString(updateInfo.value.currentVersion), 1),
                    updateInfo.value.hasUpdate ? (openBlock(), createBlock(_component_n_tag, {
                      key: 0,
                      type: "success",
                      size: "small",
                      class: "ml-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" New " + toDisplayString(updateInfo.value.latestVersion), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ])
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_sfc_main$1, {
          "alipay-q-r": unref(alipay),
          "wechat-q-r": unref(wechat)
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: "github",
              onClick: toGithub
            }, [..._cache[24] || (_cache[24] = [
              createBaseVNode("i", { class: "ri-github-fill" }, null, -1)
            ])])
          ]),
          _: 1
        }, 8, ["alipay-q-r", "wechat-q-r"])
      ]);
    };
  }
});
const SearchBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a14152a"]]);
export {
  SearchBar as default
};
