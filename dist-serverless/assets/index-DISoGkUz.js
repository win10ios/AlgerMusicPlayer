import { d as defineComponent, a2 as useI18n, aO as usePlayerStore, v as computed, s as ref, bk as useDownload, an as onMounted, U as watch, aI as useRouter, a4 as createElementBlock, aa as createCommentVNode, a7 as createBaseVNode, a8 as toDisplayString, a9 as unref, bl as isElectron, aW as createBlock, a6 as normalizeClass, aZ as createTextVNode, a0 as Button, ap as withCtx, ag as createVNode, bm as __unplugin_components_1, aJ as setAnimationClass, ab as Fragment, ac as renderList, b2 as __unplugin_components_2, bn as PlayBottom, b0 as Scrollbar, a$ as getMusicDetail, bg as processBilibiliVideos, ak as openBlock, aR as _sfc_main$1, ad as normalizeStyle, aH as setAnimationDelay, am as _export_sfc } from "./index-0n6GrGnT.js";
import { _ as __unplugin_components_0 } from "./ButtonGroup-cMFcADml.js";
import { _ as __unplugin_components_3 } from "./Empty-CP-gZxMg.js";
const _hoisted_1 = {
  key: 0,
  class: "favorite-page"
};
const _hoisted_2 = { class: "favorite-header-left" };
const _hoisted_3 = { class: "favorite-count" };
const _hoisted_4 = {
  key: 0,
  class: "favorite-header-right"
};
const _hoisted_5 = {
  key: 0,
  class: "sort-controls"
};
const _hoisted_6 = { class: "sort-buttons" };
const _hoisted_7 = {
  key: 2,
  class: "select-controls"
};
const _hoisted_8 = {
  key: 0,
  class: "empty-tip"
};
const _hoisted_9 = {
  key: 0,
  class: "favorite-list-more text-center"
};
const _hoisted_10 = {
  key: 1,
  class: "loading-wrapper"
};
const _hoisted_11 = {
  key: 2,
  class: "no-more-tip"
};
const pageSize = 100;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    isComponent: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const playerStore = usePlayerStore();
    const favoriteList = computed(() => playerStore.favoriteList);
    const favoriteSongs = ref([]);
    const loading = ref(false);
    const noMore = ref(false);
    const scrollbarRef = ref();
    const isSelecting = ref(false);
    const selectedSongs = ref([]);
    const { isDownloading, batchDownloadMusic } = useDownload();
    const startSelect = () => {
      isSelecting.value = true;
      selectedSongs.value = [];
    };
    const cancelSelect = () => {
      isSelecting.value = false;
      selectedSongs.value = [];
    };
    const handleSelect = (songId, selected) => {
      if (selected) {
        selectedSongs.value.push(songId);
      } else {
        selectedSongs.value = selectedSongs.value.filter((id) => id !== songId);
      }
    };
    const handleBatchDownload = async () => {
      const selectedSongsList = selectedSongs.value.map((songId) => favoriteSongs.value.find((s) => s.id === songId)).filter((song) => song);
      await batchDownloadMusic(selectedSongsList);
      cancelSelect();
    };
    const isDescending = ref(true);
    const toggleSort = (descending) => {
      if (isDescending.value === descending) return;
      isDescending.value = descending;
      currentPage.value = 1;
      favoriteSongs.value = [];
      noMore.value = false;
      getFavoriteSongs();
    };
    const currentPage = ref(1);
    const props = __props;
    const getCurrentPageIds = () => {
      let ids = [...favoriteList.value];
      if (isDescending.value) {
        ids = ids.reverse();
      }
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return ids.slice(startIndex, endIndex);
    };
    const getFavoriteSongs = async () => {
      if (favoriteList.value.length === 0) {
        favoriteSongs.value = [];
        return;
      }
      if (props.isComponent && favoriteSongs.value.length >= 16) {
        return;
      }
      loading.value = true;
      try {
        const currentIds = getCurrentPageIds();
        const musicIds = currentIds.filter((id) => typeof id === "number");
        const bilibiliIds = currentIds.filter((id) => typeof id === "string");
        let neteaseSongs = [];
        if (musicIds.length > 0) {
          const res = await getMusicDetail(musicIds);
          if (res.data.songs) {
            neteaseSongs = res.data.songs.map((song) => ({
              ...song,
              picUrl: song.al?.picUrl || "",
              source: "netease"
            }));
          }
        }
        const bilibiliSongs = await processBilibiliVideos(bilibiliIds);
        console.log("获取数据统计:", {
          neteaseSongs: neteaseSongs.length,
          bilibiliSongs: bilibiliSongs.length
        });
        const newSongs = currentIds.map((id) => {
          const strId = String(id);
          if (typeof id === "string") {
            const found2 = bilibiliSongs.find((song) => String(song.id) === strId);
            if (found2) return found2;
          }
          const found = neteaseSongs.find((song) => String(song.id) === strId);
          return found;
        }).filter((song) => !!song);
        console.log(`最终歌曲列表: ${newSongs.length}首`);
        if (currentPage.value === 1) {
          favoriteSongs.value = newSongs;
        } else {
          favoriteSongs.value = [...favoriteSongs.value, ...newSongs];
        }
        noMore.value = favoriteSongs.value.length >= favoriteList.value.length;
      } catch (error) {
        console.error("获取收藏歌曲失败:", error);
      } finally {
        loading.value = false;
      }
    };
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      const threshold = 100;
      if (!loading.value && !noMore.value && scrollHeight - (scrollTop + offsetHeight) < threshold) {
        currentPage.value++;
        getFavoriteSongs();
      }
    };
    const hasLoaded = ref(false);
    onMounted(async () => {
      if (!hasLoaded.value) {
        await playerStore.initializeFavoriteList();
        await getFavoriteSongs();
        hasLoaded.value = true;
      }
    });
    watch(
      favoriteList,
      async () => {
        hasLoaded.value = false;
        currentPage.value = 1;
        noMore.value = false;
        await getFavoriteSongs();
        hasLoaded.value = true;
      },
      { deep: true }
    );
    const handlePlay = () => {
      playerStore.setPlayList(favoriteSongs.value);
    };
    const getItemAnimationDelay = (index) => {
      return setAnimationDelay(index, 30);
    };
    const router = useRouter();
    const handleMore = () => {
      router.push("/history");
    };
    const isAllSelected = computed(() => {
      return favoriteSongs.value.length > 0 && selectedSongs.value.length === favoriteSongs.value.length;
    });
    const isIndeterminate = computed(() => {
      return selectedSongs.value.length > 0 && selectedSongs.value.length < favoriteSongs.value.length;
    });
    const handleSelectAll = (checked) => {
      if (checked) {
        selectedSongs.value = favoriteSongs.value.map((song) => song.id);
      } else {
        selectedSongs.value = [];
      }
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_checkbox = __unplugin_components_1;
      const _component_n_button_group = __unplugin_components_0;
      const _component_n_empty = __unplugin_components_3;
      const _component_n_spin = __unplugin_components_2;
      const _component_n_scrollbar = Scrollbar;
      return (__props.isComponent ? favoriteSongs.value.length : true) ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["favorite-header", unref(setAnimationClass)("animate__fadeInLeft")])
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h2", null, toDisplayString(unref(t)("favorite.title")), 1),
            createBaseVNode("div", _hoisted_3, toDisplayString(unref(t)("favorite.count", { count: favoriteList.value.length })), 1)
          ]),
          !__props.isComponent && unref(isElectron) ? (openBlock(), createElementBlock("div", _hoisted_4, [
            !isSelecting.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", {
                  class: normalizeClass(["sort-button", { active: isDescending.value }]),
                  onClick: _cache[0] || (_cache[0] = ($event) => toggleSort(true))
                }, [
                  _cache[2] || (_cache[2] = createBaseVNode("i", { class: "iconfont ri-sort-desc" }, null, -1)),
                  createTextVNode(" " + toDisplayString(unref(t)("favorite.descending")), 1)
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(["sort-button", { active: !isDescending.value }]),
                  onClick: _cache[1] || (_cache[1] = ($event) => toggleSort(false))
                }, [
                  _cache[3] || (_cache[3] = createBaseVNode("i", { class: "iconfont ri-sort-asc" }, null, -1)),
                  createTextVNode(" " + toDisplayString(unref(t)("favorite.ascending")), 1)
                ], 2)
              ])
            ])) : createCommentVNode("", true),
            !isSelecting.value ? (openBlock(), createBlock(_component_n_button, {
              key: 1,
              secondary: "",
              type: "primary",
              size: "small",
              class: "select-btn",
              onClick: startSelect
            }, {
              icon: withCtx(() => [..._cache[4] || (_cache[4] = [
                createBaseVNode("i", { class: "iconfont ri-checkbox-multiple-line" }, null, -1)
              ])]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("favorite.batchDownload")), 1)
              ]),
              _: 1
            })) : (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(_component_n_checkbox, {
                class: "select-all-checkbox",
                checked: isAllSelected.value,
                indeterminate: isIndeterminate.value,
                "onUpdate:checked": handleSelectAll
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("common.selectAll")), 1)
                ]),
                _: 1
              }, 8, ["checked", "indeterminate"]),
              createVNode(_component_n_button_group, { class: "operation-btns" }, {
                default: withCtx(() => [
                  createVNode(_component_n_button, {
                    type: "primary",
                    size: "small",
                    loading: unref(isDownloading),
                    disabled: selectedSongs.value.length === 0,
                    class: "download-btn",
                    onClick: handleBatchDownload
                  }, {
                    icon: withCtx(() => [..._cache[5] || (_cache[5] = [
                      createBaseVNode("i", { class: "iconfont ri-download-line" }, null, -1)
                    ])]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)("favorite.download", { count: selectedSongs.value.length })), 1)
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"]),
                  createVNode(_component_n_button, {
                    size: "small",
                    class: "cancel-btn",
                    onClick: cancelSelect
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]))
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["favorite-main", unref(setAnimationClass)("animate__bounceInRight")])
        }, [
          createVNode(_component_n_scrollbar, {
            ref_key: "scrollbarRef",
            ref: scrollbarRef,
            class: "favorite-content",
            onScroll: handleScroll
          }, {
            default: withCtx(() => [
              favoriteList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
                createVNode(_component_n_empty, {
                  description: unref(t)("favorite.emptyTip")
                }, null, 8, ["description"])
              ])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["favorite-list", { "max-w-[400px]": __props.isComponent }])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(favoriteSongs.value, (song, index) => {
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: song.id,
                    item: song,
                    favorite: false,
                    class: normalizeClass(["favorite-list-item", unref(setAnimationClass)("animate__bounceInLeft")]),
                    style: normalizeStyle(getItemAnimationDelay(index)),
                    selectable: isSelecting.value,
                    selected: selectedSongs.value.includes(song.id),
                    onPlay: handlePlay,
                    onSelect: handleSelect
                  }, null, 8, ["item", "class", "style", "selectable", "selected"]);
                }), 128)),
                __props.isComponent ? (openBlock(), createElementBlock("div", _hoisted_9, [
                  createVNode(_component_n_button, {
                    text: "",
                    type: "primary",
                    onClick: handleMore
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("common.viewMore")), 1)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                loading.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                  createVNode(_component_n_spin, { size: "large" })
                ])) : createCommentVNode("", true),
                noMore.value ? (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString(unref(t)("common.noMore")), 1)) : createCommentVNode("", true)
              ], 2)),
              createVNode(PlayBottom)
            ]),
            _: 1
          }, 512)
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
});
const Favorite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c237fce4"]]);
export {
  Favorite as F
};
