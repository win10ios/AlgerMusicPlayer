import { d as defineComponent, s as ref, aI as useRouter, b1 as useRoute, v as computed, aH as setAnimationDelay, an as onMounted, U as watch, aP as resolveDirective, a4 as createElementBlock, a7 as createBaseVNode, ag as createVNode, ap as withCtx, a5 as withModifiers, ak as openBlock, ab as Fragment, ac as renderList, a9 as unref, ad as normalizeStyle, a6 as normalizeClass, aJ as setAnimationClass, a8 as toDisplayString, b0 as Scrollbar, L as withDirectives, aa as createCommentVNode, aN as NImage, aM as getImgUrl, ba as formatNumber, b2 as __unplugin_components_2, aK as getPlaylistCategory, am as _export_sfc } from "./index-0n6GrGnT.js";
import { a as getListDetail, b as getListByCat } from "./list-DpMGK7Ii.js";
import { n as navigateToMusicList } from "./MusicListNavigator-vskRI2hR.js";
import "./music-DbKR7Lte.js";
const _hoisted_1 = { class: "list-page" };
const _hoisted_2 = { class: "play-list-type" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "recommend-list" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "recommend-item-img" };
const _hoisted_7 = { class: "top" };
const _hoisted_8 = { class: "play-count" };
const _hoisted_9 = { class: "recommend-item-title" };
const _hoisted_10 = {
  key: 0,
  class: "loading-more"
};
const _hoisted_11 = {
  key: 1,
  class: "no-more"
};
const TOTAL_ITEMS = 42;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "List"
  },
  __name: "index",
  setup(__props) {
    const recommendList = ref([]);
    const page = ref(0);
    const hasMore = ref(true);
    const isLoadingMore = ref(false);
    const getItemAnimationDelay = (index2) => {
      const currentPageIndex = index2 % TOTAL_ITEMS;
      return setAnimationDelay(currentPageIndex, 30);
    };
    const recommendItem = ref();
    const listDetail = ref();
    const listLoading = ref(true);
    const router = useRouter();
    const openPlaylist = (item) => {
      recommendItem.value = item;
      listLoading.value = true;
      getListDetail(item.id).then((res) => {
        listDetail.value = res.data;
        listLoading.value = false;
        navigateToMusicList(router, {
          id: item.id,
          type: "playlist",
          name: item.name,
          songList: res.data.playlist.tracks || [],
          listInfo: res.data.playlist,
          canRemove: false
        });
      });
    };
    const route = useRoute();
    const listTitle = ref(route.query.type || "歌单列表");
    const loading = ref(false);
    const loadList = async (type, isLoadMore = false) => {
      if (!hasMore.value && isLoadMore) return;
      if (isLoadMore) {
        isLoadingMore.value = true;
      } else {
        loading.value = true;
        page.value = 0;
        recommendList.value = [];
      }
      try {
        const params = {
          cat: type === "每日推荐" ? "" : type,
          limit: TOTAL_ITEMS,
          offset: page.value * TOTAL_ITEMS
        };
        const { data } = await getListByCat(params);
        if (isLoadMore) {
          recommendList.value.push(...data.playlists);
        } else {
          recommendList.value = data.playlists;
        }
        hasMore.value = data.more;
        page.value++;
      } catch (error) {
        console.error("加载歌单列表失败:", error);
      } finally {
        loading.value = false;
        isLoadingMore.value = false;
      }
    };
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore.value && hasMore.value) {
        loadList(currentType.value, true);
      }
    };
    const playlistCategory = ref();
    const currentType = ref(route.query.type || "每日推荐");
    const getAnimationDelay = computed(() => {
      return (index2) => setAnimationDelay(index2, 30);
    });
    const loadPlaylistCategory = async () => {
      const { data } = await getPlaylistCategory();
      playlistCategory.value = {
        ...data,
        sub: [
          {
            name: "每日推荐",
            category: 0
          },
          ...data.sub
        ]
      };
    };
    const handleClickPlaylistType = (type) => {
      currentType.value = type;
      listTitle.value = type;
      loading.value = true;
      loadList(type);
    };
    const scrollbarRef = ref();
    const handleWheel = (e) => {
      const scrollbar = scrollbarRef.value;
      if (scrollbar) {
        const delta = e.deltaY || e.detail;
        scrollbar.scrollBy({ left: delta });
      }
    };
    onMounted(() => {
      loadPlaylistCategory();
      currentType.value = route.query.type || currentType.value;
      loadList(currentType.value);
    });
    watch(
      () => route.query,
      async (newParams) => {
        if (newParams.type) {
          recommendList.value = [];
          listTitle.value = newParams.type || "歌单列表";
          currentType.value = newParams.type;
          loading.value = true;
          loadList(newParams.type);
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n_scrollbar = Scrollbar;
      const _component_n_image = NImage;
      const _component_n_spin = __unplugin_components_2;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_n_scrollbar, {
            ref_key: "scrollbarRef",
            ref: scrollbarRef,
            "x-scrollable": ""
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: "categories-wrapper",
                onWheel: withModifiers(handleWheel, ["prevent"])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(playlistCategory)?.sub, (item, index2) => {
                  return openBlock(), createElementBlock("span", {
                    key: item.name,
                    class: normalizeClass(["play-list-type-item", [unref(setAnimationClass)("animate__bounceIn"), { active: unref(currentType) === item.name }]]),
                    style: normalizeStyle(unref(getAnimationDelay)(index2)),
                    onClick: ($event) => handleClickPlaylistType(item.name)
                  }, toDisplayString(item.name), 15, _hoisted_3);
                }), 128))
              ], 32)
            ]),
            _: 1
          }, 512)
        ]),
        createVNode(_component_n_scrollbar, {
          class: "recommend",
          style: { "height": "calc(100% - 55px)" },
          size: 100,
          onScroll: handleScroll
        }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createElementBlock("div", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(recommendList), (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: normalizeClass(["recommend-item", unref(setAnimationClass)("animate__bounceIn")]),
                  style: normalizeStyle(getItemAnimationDelay(index2)),
                  onClick: withModifiers(($event) => openPlaylist(item), ["stop"])
                }, [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(_component_n_image, {
                      class: "recommend-item-img-img",
                      src: unref(getImgUrl)(item.picUrl || item.coverImgUrl, "300y300"),
                      width: "200",
                      height: "200",
                      lazy: "",
                      "preview-disabled": ""
                    }, null, 8, ["src"]),
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, toDisplayString(unref(formatNumber)(item.playCount)), 1),
                      _cache[0] || (_cache[0] = createBaseVNode("i", { class: "iconfont icon-videofill" }, null, -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_9, toDisplayString(item.name), 1)
                ], 14, _hoisted_5);
              }), 128))
            ])), [
              [_directive_loading, unref(loading)]
            ]),
            unref(isLoadingMore) ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createVNode(_component_n_spin, { size: "small" }),
              _cache[1] || (_cache[1] = createBaseVNode("span", { class: "ml-2" }, "加载中...", -1))
            ])) : createCommentVNode("", true),
            !unref(hasMore) && unref(recommendList).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, "没有更多了")) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ac0d4a9"]]);
export {
  index as default
};
