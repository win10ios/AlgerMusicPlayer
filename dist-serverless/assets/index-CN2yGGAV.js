import { d as defineComponent, a2 as useI18n, b1 as useRoute, aI as useRouter, aO as usePlayerStore, s as ref, v as computed, an as onMounted, U as watch, aP as resolveDirective, a4 as createElementBlock, aW as createBlock, aa as createCommentVNode, a9 as unref, aY as isMobile, ap as withCtx, a7 as createBaseVNode, a8 as toDisplayString, ak as openBlock, ab as Fragment, ac as renderList, a5 as withModifiers, ad as normalizeStyle, aH as setAnimationDelay, a6 as normalizeClass, aJ as setAnimationClass, aZ as createTextVNode, L as withDirectives, ag as createVNode, b2 as __unplugin_components_2, aR as _sfc_main$1, a0 as Button, b3 as getHotSearch, b4 as searchBilibili, b5 as getBilibiliProxyUrl, b6 as useDateFormat, b7 as getBilibiliVideoDetail, b8 as getBilibiliAudioUrl, b9 as createSimpleBilibiliSong, am as _export_sfc } from "./index-9WtWgwAm.js";
import { u as useSearchStore, S as SEARCH_TYPE, g as getSearch } from "./bar-const-DjUg5NjI.js";
import { B as BilibiliItem } from "./BilibiliItem-Dpktlm3G.js";
import { S as SearchItem } from "./SearchItem-CCva1uw7.js";
import { _ as __unplugin_components_9 } from "./Tag-Dm9hxVfu.js";
import { _ as __unplugin_components_2$1 } from "./Layout-CQVjHXwP.js";
import "./list-DzAptV9H.js";
import "./MvPlayer-B580IO2v.js";
import "./music-B9G-sT9a.js";
const _hoisted_1 = { class: "search-page" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "hot-search-list" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  key: 0,
  class: "title"
};
const _hoisted_6 = {
  key: 0,
  class: "title-play-all"
};
const _hoisted_7 = { class: "search-list-box" };
const _hoisted_8 = {
  key: 0,
  class: "loading-more"
};
const _hoisted_9 = { class: "ml-2" };
const _hoisted_10 = {
  key: 1,
  class: "no-more"
};
const _hoisted_11 = {
  key: 0,
  class: "loading-more"
};
const _hoisted_12 = { class: "ml-2" };
const _hoisted_13 = {
  key: 1,
  class: "no-more"
};
const _hoisted_14 = {
  key: 1,
  class: "search-history"
};
const _hoisted_15 = { class: "search-history-header title" };
const _hoisted_16 = { class: "search-history-list" };
const ITEMS_PER_PAGE = 30;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Search"
  },
  __name: "index",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const playerStore = usePlayerStore();
    const searchStore = useSearchStore();
    const searchDetail = ref();
    const searchType = computed(() => searchStore.searchType);
    const searchDetailLoading = ref(false);
    const searchHistory = ref([]);
    const page = ref(0);
    const hasMore = ref(true);
    const isLoadingMore = ref(false);
    const currentKeyword = ref("");
    const getSearchListAnimation = (index2) => {
      return setAnimationDelay(index2 % ITEMS_PER_PAGE, 50);
    };
    const loadSearchHistory = () => {
      const history = localStorage.getItem("searchHistory");
      searchHistory.value = history ? JSON.parse(history) : [];
    };
    const saveSearchHistory = (keyword, type) => {
      if (!keyword) return;
      const history = searchHistory.value;
      const index2 = history.findIndex((item) => item.keyword === keyword);
      if (index2 > -1) {
        history.splice(index2, 1);
      }
      history.unshift({ keyword, type });
      if (history.length > 20) {
        history.pop();
      }
      searchHistory.value = history;
      localStorage.setItem("searchHistory", JSON.stringify(history));
    };
    const clearSearchHistory = () => {
      searchHistory.value = [];
      localStorage.removeItem("searchHistory");
    };
    const handleCloseSearchHistory = (item) => {
      searchHistory.value = searchHistory.value.filter((h) => h.keyword !== item.keyword);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
    };
    const hotSearchData = ref();
    const loadHotSearch = async () => {
      const { data } = await getHotSearch();
      hotSearchData.value = data;
    };
    onMounted(() => {
      loadHotSearch();
      loadSearchHistory();
    });
    const hotKeyword = ref(route.query.keyword || t("search.title.searchList"));
    const loadSearch = async (keywords, type = null, isLoadMore = false) => {
      if (!keywords) return;
      const searchTypeToUse = type !== null ? type : searchType.value;
      if (!isLoadMore) {
        hotKeyword.value = keywords;
        searchDetail.value = void 0;
        page.value = 0;
        hasMore.value = true;
        currentKeyword.value = keywords;
        saveSearchHistory(keywords, searchTypeToUse);
        searchStore.searchType = searchTypeToUse;
        searchStore.searchValue = keywords;
      } else if (isLoadingMore.value || !hasMore.value) {
        return;
      }
      if (isLoadMore) {
        isLoadingMore.value = true;
      } else {
        searchDetailLoading.value = true;
      }
      try {
        if (searchTypeToUse === SEARCH_TYPE.BILIBILI) {
          const response = await searchBilibili({
            keyword: currentKeyword.value,
            page: page.value + 1,
            pagesize: ITEMS_PER_PAGE
          });
          console.log("response", response);
          const bilibiliVideos = response.data.data.result.map((item) => ({
            id: item.aid,
            bvid: item.bvid,
            title: item.title,
            author: item.author,
            pic: getBilibiliProxyUrl(item.pic),
            duration: item.duration,
            pubdate: item.pubdate,
            description: item.description,
            view: item.play,
            danmaku: item.video_review
          }));
          if (isLoadMore && searchDetail.value) {
            searchDetail.value.bilibili = [...searchDetail.value.bilibili, ...bilibiliVideos];
          } else {
            searchDetail.value = {
              bilibili: bilibiliVideos
            };
          }
          hasMore.value = bilibiliVideos.length === ITEMS_PER_PAGE;
        } else {
          const { data } = await getSearch({
            keywords: currentKeyword.value,
            type: searchTypeToUse,
            limit: ITEMS_PER_PAGE,
            offset: page.value * ITEMS_PER_PAGE
          });
          const songs = data.result.songs || [];
          const albums = data.result.albums || [];
          const mvs = (data.result.mvs || []).map((item) => ({
            ...item,
            picUrl: item.cover,
            playCount: item.playCount,
            desc: item.artists.map((artist) => artist.name).join("/"),
            type: "mv"
          }));
          const playlists = (data.result.playlists || []).map((item) => ({
            ...item,
            picUrl: item.coverImgUrl,
            playCount: item.playCount,
            desc: item.creator.nickname,
            type: "playlist"
          }));
          songs.forEach((item) => {
            item.picUrl = item.al.picUrl;
            item.artists = item.ar;
          });
          albums.forEach((item) => {
            item.desc = `${item.artist.name} ${item.company} ${dateFormat(item.publishTime)}`;
          });
          if (isLoadMore && searchDetail.value) {
            searchDetail.value.songs = [...searchDetail.value.songs, ...songs];
            searchDetail.value.albums = [...searchDetail.value.albums, ...albums];
            searchDetail.value.mvs = [...searchDetail.value.mvs, ...mvs];
            searchDetail.value.playlists = [...searchDetail.value.playlists, ...playlists];
          } else {
            searchDetail.value = {
              songs,
              albums,
              mvs,
              playlists
            };
          }
          hasMore.value = songs.length === ITEMS_PER_PAGE || albums.length === ITEMS_PER_PAGE || mvs.length === ITEMS_PER_PAGE || playlists.length === ITEMS_PER_PAGE;
        }
        page.value++;
      } catch (error) {
        console.error(t("search.error.searchFailed"), error);
      } finally {
        searchDetailLoading.value = false;
        isLoadingMore.value = false;
      }
    };
    watch(
      () => searchStore.searchValue,
      (value) => {
        loadSearch(value);
      }
    );
    watch(
      () => searchType.value,
      () => {
        if (searchStore.searchValue) {
          loadSearch(searchStore.searchValue);
        }
      }
    );
    if (searchStore.searchValue) {
      loadSearch(searchStore.searchValue);
    }
    searchStore.searchValue = route.query.keyword;
    const dateFormat = (time) => useDateFormat(time, "YYYY.MM.DD").value;
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore.value && hasMore.value) {
        loadSearch(currentKeyword.value, null, true);
      }
    };
    watch(
      () => route.query,
      (query) => {
        if (route.path === "/search" && query.keyword) {
          const routeKeyword = query.keyword;
          const routeType = query.type ? Number(query.type) : searchType.value;
          searchStore.searchType = routeType;
          searchStore.searchValue = routeKeyword;
          loadSearch(routeKeyword, routeType);
        }
      },
      { immediate: true }
    );
    const handlePlay = (item) => {
      playerStore.addToNextPlay(item);
    };
    const handleSearchHistory = (item) => {
      searchStore.searchType = item.type;
      searchStore.searchValue = item.keyword;
      loadSearch(item.keyword, item.type);
    };
    const handlePlayBilibili = async (item) => {
      try {
        const videoDetail = await getBilibiliVideoDetail(item.bvid);
        const pages = videoDetail.data.pages;
        if (pages && pages.length === 1) {
          const audioUrl = await getBilibiliAudioUrl(item.bvid, pages[0].cid);
          const playItem = createSimpleBilibiliSong(item, audioUrl);
          playItem.bilibiliData = {
            bvid: item.bvid,
            cid: pages[0].cid
          };
          playerStore.setPlay(playItem);
        } else {
          router.push(`/bilibili/${item.bvid}`);
        }
      } catch (error) {
        console.error("处理B站视频播放失败:", error);
        router.push(`/bilibili/${item.bvid}`);
      }
    };
    const handlePlayAll = () => {
      if (!searchDetail.value?.songs?.length) return;
      playerStore.setPlayList(searchDetail.value.songs);
      if (searchDetail.value.songs[0]) {
        playerStore.setPlay(searchDetail.value.songs[0]);
      }
    };
    return (_ctx, _cache) => {
      const _component_n_layout = __unplugin_components_2$1;
      const _component_n_spin = __unplugin_components_2;
      const _component_n_button = Button;
      const _component_n_tag = __unplugin_components_9;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (unref(isMobile) ? !searchDetail.value : true) ? (openBlock(), createBlock(_component_n_layout, {
          key: 0,
          class: normalizeClass(["hot-search", unref(setAnimationClass)("animate__fadeInDown")]),
          "native-scrollbar": false
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, toDisplayString(unref(t)("search.title.hotSearch")), 1),
            createBaseVNode("div", _hoisted_3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(hotSearchData.value?.data, (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: index2,
                  class: normalizeClass([unref(setAnimationClass)("animate__bounceInLeft"), "hot-search-item"]),
                  style: normalizeStyle(unref(setAnimationDelay)(index2, 10)),
                  onClick: withModifiers(($event) => loadSearch(item.searchWord, 1), ["stop"])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["hot-search-item-count", { "hot-search-item-count-3": index2 < 3 }])
                  }, toDisplayString(index2 + 1), 3),
                  createTextVNode(" " + toDisplayString(item.searchWord), 1)
                ], 14, _hoisted_4);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("", true),
        (unref(isMobile) ? searchDetail.value : true) ? (openBlock(), createBlock(_component_n_layout, {
          key: 1,
          class: normalizeClass(["search-list", unref(setAnimationClass)("animate__fadeInDown")]),
          "native-scrollbar": false,
          onScroll: handleScroll
        }, {
          default: withCtx(() => [
            searchDetail.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("i", {
                class: "ri-arrow-left-s-line mr-1 cursor-pointer hover:text-gray-500 hover:scale-110",
                onClick: _cache[0] || (_cache[0] = ($event) => searchDetail.value = null)
              }),
              createTextVNode(" " + toDisplayString(hotKeyword.value) + " ", 1),
              searchDetail.value?.songs?.length ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createBaseVNode("div", {
                  class: "play-all-btn",
                  onClick: handlePlayAll
                }, [
                  _cache[1] || (_cache[1] = createBaseVNode("i", { class: "ri-play-circle-fill" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("search.button.playAll")), 1)
                ])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            withDirectives((openBlock(), createElementBlock("div", _hoisted_7, [
              searchDetail.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                searchType.value === unref(SEARCH_TYPE).BILIBILI ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(searchDetail.value?.bilibili, (item, index2) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.bvid,
                      class: normalizeClass(unref(setAnimationClass)("animate__bounceInRight")),
                      style: normalizeStyle(getSearchListAnimation(index2))
                    }, [
                      createVNode(BilibiliItem, {
                        item,
                        onPlay: handlePlayBilibili
                      }, null, 8, ["item"])
                    ], 6);
                  }), 128)),
                  isLoadingMore.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
                    createVNode(_component_n_spin, { size: "small" }),
                    createBaseVNode("span", _hoisted_9, toDisplayString(unref(t)("search.loading.more")), 1)
                  ])) : createCommentVNode("", true),
                  !hasMore.value && searchDetail.value ? (openBlock(), createElementBlock("div", _hoisted_10, toDisplayString(unref(t)("search.noMore")), 1)) : createCommentVNode("", true)
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(searchDetail.value?.songs, (item, index2) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.id,
                      class: normalizeClass(unref(setAnimationClass)("animate__bounceInRight")),
                      style: normalizeStyle(getSearchListAnimation(index2))
                    }, [
                      createVNode(_sfc_main$1, {
                        item,
                        onPlay: handlePlay,
                        "is-next": true
                      }, null, 8, ["item"])
                    ], 6);
                  }), 128)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(searchDetail.value, (list, key) => {
                    return openBlock(), createElementBlock(Fragment, null, [
                      key.toString() !== "songs" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(list, (item, index2) => {
                        return openBlock(), createElementBlock("div", {
                          key: item.id,
                          class: normalizeClass(["mb-3", unref(setAnimationClass)("animate__bounceInRight")]),
                          style: normalizeStyle(getSearchListAnimation(index2))
                        }, [
                          createVNode(SearchItem, { item }, null, 8, ["item"])
                        ], 6);
                      }), 128)) : createCommentVNode("", true)
                    ], 64);
                  }), 256)),
                  isLoadingMore.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                    createVNode(_component_n_spin, { size: "small" }),
                    createBaseVNode("span", _hoisted_12, toDisplayString(unref(t)("search.loading.more")), 1)
                  ])) : createCommentVNode("", true),
                  !hasMore.value && searchDetail.value ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(unref(t)("search.noMore")), 1)) : createCommentVNode("", true)
                ], 64))
              ], 64)) : (openBlock(), createElementBlock("div", _hoisted_14, [
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("search.title.searchHistory")), 1),
                  createVNode(_component_n_button, {
                    text: "",
                    type: "error",
                    onClick: clearSearchHistory
                  }, {
                    icon: withCtx(() => [..._cache[2] || (_cache[2] = [
                      createBaseVNode("i", { class: "ri-delete-bin-line" }, null, -1)
                    ])]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)("search.button.clear")), 1)
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("div", _hoisted_16, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(searchHistory.value, (item, index2) => {
                    return openBlock(), createBlock(_component_n_tag, {
                      key: index2,
                      class: normalizeClass([unref(setAnimationClass)("animate__bounceIn"), "search-history-item"]),
                      style: normalizeStyle(getSearchListAnimation(index2)),
                      round: "",
                      closable: "",
                      onClick: ($event) => handleSearchHistory(item),
                      onClose: ($event) => handleCloseSearchHistory(item)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.keyword), 1)
                      ]),
                      _: 2
                    }, 1032, ["class", "style", "onClick", "onClose"]);
                  }), 128))
                ])
              ]))
            ])), [
              [_directive_loading, searchDetailLoading.value]
            ])
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b9ce908"]]);
export {
  index as default
};
