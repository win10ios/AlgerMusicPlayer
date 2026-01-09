import { d as defineComponent, a2 as useI18n, bd as useMessage, ea as useDialog, aO as usePlayerStore, s as ref, v as computed, U as watch, an as onMounted, ao as onUnmounted, a4 as createElementBlock, aa as createCommentVNode, a6 as normalizeClass, a9 as unref, aY as isMobile, a7 as createBaseVNode, a8 as toDisplayString, ag as createVNode, ap as withCtx, aZ as createTextVNode, cA as __unplugin_components_7, aW as createBlock, ak as openBlock, aR as _sfc_main$1, a5 as withModifiers, ab as Fragment, a1 as nextTick, am as _export_sfc } from "./index-9WtWgwAm.js";
import { _ as __unplugin_components_1 } from "./VirtualList-BfnollVL.js";
import "./VirtualList-DgLSbW2u.js";
const _hoisted_1 = { class: "playlist-panel-header" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "header-actions" };
const _hoisted_4 = { class: "playlist-panel-content" };
const _hoisted_5 = {
  key: 0,
  class: "empty-playlist"
};
const _hoisted_6 = { class: "music-play-list-content" };
const _hoisted_7 = { class: "flex items-center justify-between" };
const _hoisted_8 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PlayingListDrawer",
  setup(__props) {
    const { t } = useI18n();
    const message = useMessage();
    const dialog = useDialog();
    const playerStore = usePlayerStore();
    const internalVisible = ref(false);
    const closing = ref(false);
    const show = computed({
      get: () => playerStore.playListDrawerVisible,
      set: (value) => {
        playerStore.setPlayListDrawerVisible(value);
      }
    });
    watch(
      show,
      (newValue) => {
        if (newValue) {
          internalVisible.value = true;
          closing.value = false;
          nextTick(() => {
            scrollToCurrentSong();
          });
        } else {
          if (!internalVisible.value) return;
          closing.value = true;
          setTimeout(() => {
            internalVisible.value = false;
          }, 400);
        }
      },
      { immediate: true }
    );
    const playList = computed(() => playerStore.playList);
    const playListRef = ref(null);
    const closePanel = () => {
      show.value = false;
    };
    const handleClearPlaylist = () => {
      if (playList.value.length === 0) {
        message.info(t("player.playList.alreadyEmpty"));
        return;
      }
      if (isMobile.value) {
        closePanel();
      }
      dialog.warning({
        title: t("player.playList.clearConfirmTitle"),
        content: t("player.playList.clearConfirmContent"),
        positiveText: t("common.confirm"),
        negativeText: t("common.cancel"),
        style: { zIndex: 999999999 },
        // 确保对话框显示在遮罩之上
        onPositiveClick: () => {
          playerStore.clearPlayAll();
          message.success(t("player.playList.cleared"));
        }
      });
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && internalVisible.value) {
        closePanel();
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    const scrollToCurrentSong = () => {
      setTimeout(() => {
        if (playListRef.value && playList.value.length > 0) {
          const index = playerStore.playListIndex;
          console.log("滚动到歌曲索引:", index);
          playListRef.value.scrollTo({
            top: (index > 3 ? index - 3 : 0) * 62
          });
        }
      }, 100);
    };
    const handleDeleteSong = (song) => {
      playerStore.removeFromPlayList(song.id);
    };
    return (_ctx, _cache) => {
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_virtual_list = __unplugin_components_1;
      return openBlock(), createElementBlock(Fragment, null, [
        internalVisible.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed-overlay",
          onClick: closePanel
        })) : createCommentVNode("", true),
        internalVisible.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["playlist-panel", [
            "animate__animated",
            closing.value ? unref(isMobile) ? "animate__slideOutDown" : "animate__slideOutRight" : unref(isMobile) ? "animate__slideInUp" : "animate__slideInRight"
          ]])
        }, [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, toDisplayString(unref(t)("player.playBar.playList")), 1),
            createBaseVNode("div", _hoisted_3, [
              createVNode(_component_n_tooltip, { trigger: "hover" }, {
                trigger: withCtx(() => [
                  createBaseVNode("div", {
                    class: "action-btn",
                    onClick: handleClearPlaylist
                  }, [..._cache[0] || (_cache[0] = [
                    createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)
                  ])])
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("player.playList.clearAll")), 1)
                ]),
                _: 1
              }),
              createBaseVNode("div", {
                class: "close-btn",
                onClick: closePanel
              }, [..._cache[1] || (_cache[1] = [
                createBaseVNode("i", { class: "iconfont ri-close-line" }, null, -1)
              ])])
            ])
          ]),
          createBaseVNode("div", _hoisted_4, [
            playList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
              _cache[2] || (_cache[2] = createBaseVNode("i", { class: "iconfont ri-music-2-line" }, null, -1)),
              createBaseVNode("p", null, toDisplayString(unref(t)("player.playList.empty")), 1)
            ])) : (openBlock(), createBlock(_component_n_virtual_list, {
              key: 1,
              ref_key: "playListRef",
              ref: playListRef,
              "item-size": 62,
              "item-resizable": "",
              items: playList.value
            }, {
              default: withCtx(({ item }) => [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    (openBlock(), createBlock(_sfc_main$1, {
                      key: item.id,
                      class: "flex-1",
                      item,
                      mini: ""
                    }, null, 8, ["item"])),
                    createBaseVNode("div", {
                      class: "delete-btn",
                      onClick: withModifiers(($event) => handleDeleteSong(item), ["stop"])
                    }, [..._cache[3] || (_cache[3] = [
                      createBaseVNode("i", { class: "iconfont ri-delete-bin-line text-gray-400 hover:text-red-500 transition-colors" }, null, -1)
                    ])], 8, _hoisted_8)
                  ])
                ])
              ]),
              _: 1
            }, 8, ["items"]))
          ])
        ], 2)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const PlayingListDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ddf0cd03"]]);
export {
  PlayingListDrawer as default
};
