import { l } from "./main-Bco1MTsi.js";
import { cL as request, d as defineComponent, a2 as useI18n, b1 as useRoute, aO as usePlayerStore, bd as useMessage, v as computed, s as ref, aY as isMobile, U as watch, cm as onActivated, an as onMounted, cM as onDeactivated, ao as onUnmounted, aP as resolveDirective, L as withDirectives, aW as createBlock, ap as withCtx, a7 as createBaseVNode, ag as createVNode, aN as NImage, a9 as unref, aM as getImgUrl, a4 as createElementBlock, aa as createCommentVNode, a8 as toDisplayString, ak as openBlock, cA as __unplugin_components_7, aZ as createTextVNode, a6 as normalizeClass, aR as _sfc_main$1, ab as Fragment, ac as renderList, bn as PlayBottom, a$ as getMusicDetail, b6 as useDateFormat, a1 as nextTick, b0 as Scrollbar, am as _export_sfc } from "./index-9WtWgwAm.js";
import { S as SearchItem } from "./SearchItem-CCva1uw7.js";
import { _ as __unplugin_components_1$1 } from "./VirtualList-BfnollVL.js";
import { _ as __unplugin_components_3, b as __unplugin_components_3$1 } from "./Tabs-MdVIr7CY.js";
import { _ as __unplugin_components_1 } from "./Input-BWrKoNPd.js";
import "./list-DzAptV9H.js";
import "./MvPlayer-B580IO2v.js";
import "./music-B9G-sT9a.js";
import "./VirtualList-DgLSbW2u.js";
import "./Add-DkSFdI7Q.js";
const getArtistDetail = (id) => {
  return request.get("/artist/detail", { params: { id } });
};
const getArtistTopSongs = (params) => {
  return request.get("/artist/songs", {
    params: {
      ...params,
      order: "hot"
    }
  });
};
const getArtistAlbums = (params) => {
  return request.get("/artist/album", { params });
};
const _hoisted_1 = { class: "artist-header" };
const _hoisted_2 = { class: "artist-cover" };
const _hoisted_3 = { class: "artist-info" };
const _hoisted_4 = { class: "artist-name" };
const _hoisted_5 = {
  key: 0,
  class: "artist-alias"
};
const _hoisted_6 = {
  key: 1,
  class: "artist-desc"
};
const _hoisted_7 = { class: "songs-toolbar" };
const _hoisted_8 = { class: "toolbar-left" };
const _hoisted_9 = { class: "toolbar-right" };
const _hoisted_10 = {
  key: 0,
  class: "layout-toggle"
};
const _hoisted_11 = { class: "songs-list" };
const _hoisted_12 = { class: "song-list-content" };
const _hoisted_13 = {
  key: 0,
  class: "no-result"
};
const _hoisted_14 = { class: "double-item" };
const _hoisted_15 = {
  key: 0,
  class: "h-36"
};
const _hoisted_16 = {
  key: 1,
  class: "loading-more"
};
const _hoisted_17 = { class: "albums-list" };
const _hoisted_18 = { class: "albums-grid" };
const _hoisted_19 = {
  key: 0,
  class: "loading-more"
};
const _hoisted_20 = { class: "artist-description" };
const _hoisted_21 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ArtistDetail"
  },
  __name: "detail",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const playerStore = usePlayerStore();
    const message = useMessage();
    const artistId = computed(() => Number(route.params.id));
    const activeTab = ref("songs");
    const artistInfo = ref();
    const songs = ref([]);
    const albums = ref([]);
    const loading = ref(false);
    const songLoading = ref(false);
    const albumLoading = ref(false);
    const songPage = ref({
      page: 1,
      pageSize: 30,
      hasMore: true
    });
    const albumPage = ref({
      page: 1,
      pageSize: 30,
      hasMore: true
    });
    const songsLoadMoreRef = ref(null);
    const albumsLoadMoreRef = ref(null);
    let songsObserver = null;
    let albumsObserver = null;
    const previousId = ref(null);
    const artistDataCache = /* @__PURE__ */ new Map();
    const getCacheKey = (id) => `artist_${id}`;
    const searchKeyword = ref("");
    const isSearchVisible = ref(false);
    const isCompactLayout = ref(
      isMobile.value ? false : localStorage.getItem("musicListLayout") === "compact"
    );
    const loadArtistInfo = async () => {
      if (!artistId.value) return;
      const cacheKey = getCacheKey(artistId.value);
      if (artistDataCache.has(cacheKey)) {
        console.log("使用缓存数据");
        const cachedData = artistDataCache.get(cacheKey);
        artistInfo.value = cachedData.artistInfo;
        songs.value = cachedData.songs;
        albums.value = cachedData.albums;
        songPage.value = cachedData.songPage;
        albumPage.value = cachedData.albumPage;
        return;
      }
      loading.value = true;
      try {
        const info = await getArtistDetail(artistId.value);
        if (info.data?.data?.artist) {
          artistInfo.value = info.data.data.artist;
        }
        resetPagination();
        await Promise.all([loadSongs(), loadAlbums()]);
        artistDataCache.set(cacheKey, {
          artistInfo: artistInfo.value,
          songs: [...songs.value],
          albums: [...albums.value],
          songPage: { ...songPage.value },
          albumPage: { ...albumPage.value }
        });
      } catch (error) {
        console.error("加载歌手信息失败:", error);
      } finally {
        loading.value = false;
      }
    };
    const resetPagination = () => {
      songPage.value = {
        page: 1,
        pageSize: 50,
        hasMore: true
      };
      albumPage.value = {
        page: 1,
        pageSize: 50,
        hasMore: true
      };
      songs.value = [];
      albums.value = [];
    };
    const loadSongs = async () => {
      if (!artistId.value || !songPage.value.hasMore || songLoading.value) return;
      try {
        songLoading.value = true;
        const { page, pageSize } = songPage.value;
        const res = await getArtistTopSongs({
          id: artistId.value,
          limit: pageSize,
          offset: (page - 1) * pageSize
        });
        const ids = res.data.songs.map((item) => item.id);
        const songsDetail = await getMusicDetail(ids);
        if (songsDetail.data?.songs) {
          const newSongs = songsDetail.data.songs.map((item) => {
            return {
              ...item,
              picUrl: item.al.picUrl,
              song: {
                artists: item.ar,
                name: item.name,
                id: item.id
              }
            };
          });
          songs.value = page === 1 ? newSongs : [...songs.value, ...newSongs];
          songPage.value.hasMore = newSongs.length === pageSize;
          songPage.value.page++;
        } else {
          songPage.value.hasMore = false;
        }
      } catch (error) {
        console.error("加载歌曲失败:", error);
      } finally {
        songLoading.value = false;
      }
    };
    const loadAlbums = async () => {
      if (!artistId.value || !albumPage.value.hasMore || albumLoading.value) return;
      try {
        albumLoading.value = true;
        const { page, pageSize } = albumPage.value;
        const res = await getArtistAlbums({
          id: artistId.value,
          limit: pageSize,
          offset: (page - 1) * pageSize
        });
        if (res.data?.hotAlbums) {
          const newAlbums = res.data.hotAlbums;
          albums.value = page === 1 ? newAlbums : [...albums.value, ...newAlbums];
          albumPage.value.hasMore = newAlbums.length === pageSize;
          albumPage.value.page++;
        } else {
          albumPage.value.hasMore = false;
        }
      } catch (error) {
        console.error("加载专辑失败:", error);
      } finally {
        albumLoading.value = false;
      }
    };
    const formatPublishTime = (time) => {
      return useDateFormat(time, "YYYY-MM-DD").value;
    };
    const showSearch = () => {
      isSearchVisible.value = true;
      nextTick(() => {
        const inputEl = document.querySelector(".search-container input");
        if (inputEl) {
          inputEl.focus();
        }
      });
    };
    const closeSearch = () => {
      isSearchVisible.value = false;
      searchKeyword.value = "";
    };
    const handleSearchBlur = () => {
      if (!searchKeyword.value) {
        setTimeout(() => {
          isSearchVisible.value = false;
        }, 200);
      }
    };
    const filteredSongs = computed(() => {
      if (!searchKeyword.value) {
        return songs.value;
      }
      const keyword = searchKeyword.value.toLowerCase().trim();
      return songs.value.filter((song) => {
        const songName = song.name?.toLowerCase() || "";
        const albumName = song.al?.name?.toLowerCase() || "";
        const artists = song.ar || song.artists || [];
        const nameMatch = songName.includes(keyword);
        const albumMatch = albumName.includes(keyword);
        const artistsMatch = artists.some((artist) => {
          return artist.name?.toLowerCase().includes(keyword);
        });
        const namePinyinMatch = song.name && l.match(song.name, keyword);
        const albumPinyinMatch = song.al?.name && l.match(song.al.name, keyword);
        const artistsPinyinMatch = artists.some((artist) => {
          return artist.name && l.match(artist.name, keyword);
        });
        return nameMatch || albumMatch || artistsMatch || namePinyinMatch || albumPinyinMatch || artistsPinyinMatch;
      });
    });
    const toggleLayout = () => {
      isCompactLayout.value = !isCompactLayout.value;
      localStorage.setItem("musicListLayout", isCompactLayout.value ? "compact" : "normal");
    };
    const handlePlayAll = () => {
      if (filteredSongs.value.length === 0) return;
      playerStore.setPlayList(
        filteredSongs.value.map((song) => ({
          ...song,
          picUrl: song.al.picUrl
        }))
      );
      playerStore.setPlay(filteredSongs.value[0]);
      message.success(t("comp.musicList.playAll"));
    };
    const addToPlaylist = () => {
      if (filteredSongs.value.length === 0) return;
      const currentList = playerStore.playList;
      const newSongs = filteredSongs.value.filter(
        (song) => !currentList.some((item) => item.id === song.id)
      );
      if (newSongs.length === 0) {
        message.info(t("comp.musicList.songsAlreadyInPlaylist"));
        return;
      }
      const newList = [
        ...currentList,
        ...newSongs.map((song) => ({
          ...song,
          picUrl: song.al.picUrl
        }))
      ];
      playerStore.setPlayList(newList);
      message.success(t("comp.musicList.addToPlaylistSuccess", { count: newSongs.length }));
    };
    const handlePlay = (song) => {
      if (song) {
        const songList = [...filteredSongs.value];
        const index = songList.findIndex((item) => item.id === song.id);
        if (index !== -1) {
          const clickedSong = songList.splice(index, 1)[0];
          songList.unshift(clickedSong);
        }
        playerStore.setPlayList(
          songList.map((item) => ({
            ...item,
            picUrl: item.al?.picUrl || item.picUrl
          }))
        );
        playerStore.setPlay(song);
      } else {
        playerStore.setPlayList(
          filteredSongs.value.map((item) => ({
            ...item,
            picUrl: item.al?.picUrl || item.picUrl
          }))
        );
      }
    };
    const setupObservers = () => {
      if (songsObserver) songsObserver.disconnect();
      if (albumsObserver) albumsObserver.disconnect();
      if (!songsObserver) {
        songsObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && songPage.value.hasMore) {
              loadSongs();
            }
          },
          { threshold: 0.1 }
        );
      }
      if (!albumsObserver) {
        albumsObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && albumPage.value.hasMore) {
              loadAlbums();
            }
          },
          { threshold: 0.1 }
        );
      }
      nextTick(() => {
        if (activeTab.value === "songs" && songsLoadMoreRef.value) {
          songsObserver?.observe(songsLoadMoreRef.value);
        } else if (activeTab.value === "albums" && albumsLoadMoreRef.value) {
          albumsObserver?.observe(albumsLoadMoreRef.value);
        }
      });
    };
    watch(activeTab, () => {
      setupObservers();
    });
    watch([songsLoadMoreRef, albumsLoadMoreRef], () => {
      setupObservers();
    });
    watch(searchKeyword, () => {
      nextTick(() => {
        setupObservers();
      });
    });
    onActivated(() => {
      if (route.name === "artistDetail") {
        const currentId = route.params.id;
        if (!previousId.value || previousId.value !== currentId) {
          console.log("ID已变化，加载新数据");
          previousId.value = currentId;
          activeTab.value = "songs";
          loadArtistInfo();
        }
        setupObservers();
      }
    });
    onMounted(() => {
      if (route.params.id) {
        previousId.value = route.params.id;
        loadArtistInfo();
        setupObservers();
      }
    });
    onDeactivated(() => {
      if (songsObserver) songsObserver.disconnect();
      if (albumsObserver) albumsObserver.disconnect();
    });
    onUnmounted(() => {
      if (songsObserver) {
        songsObserver.disconnect();
        songsObserver = null;
      }
      if (albumsObserver) {
        albumsObserver.disconnect();
        albumsObserver = null;
      }
    });
    const songListRef = ref(null);
    const formatSong = (item) => {
      if (!item) {
        return null;
      }
      return {
        ...item,
        picUrl: item.al?.picUrl || item.picUrl
      };
    };
    const handleVirtualScroll = (e) => {
      if (!e || !e.target) return;
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const threshold = 200;
      if (scrollHeight - scrollTop - clientHeight < threshold && !songLoading.value && songPage.value.hasMore && !searchKeyword.value) {
        loadSongs();
      }
    };
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_input = __unplugin_components_1;
      const _component_n_virtual_list = __unplugin_components_1$1;
      const _component_n_tab_pane = __unplugin_components_3$1;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_scrollbar = Scrollbar;
      const _directive_loading = resolveDirective("loading");
      return withDirectives((openBlock(), createBlock(_component_n_scrollbar, { class: "artist-page" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_n_image, {
                src: unref(getImgUrl)(artistInfo.value?.avatar, "300y300"),
                class: "artist-avatar",
                "preview-disabled": ""
              }, null, 8, ["src"])
            ]),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("h1", _hoisted_4, toDisplayString(artistInfo.value?.name), 1),
              artistInfo.value?.alias?.length ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(artistInfo.value.alias.join(" / ")), 1)) : createCommentVNode("", true),
              artistInfo.value?.briefDesc ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(artistInfo.value.briefDesc), 1)) : createCommentVNode("", true)
            ])
          ]),
          createVNode(_component_n_tabs, {
            value: activeTab.value,
            "onUpdate:value": _cache[1] || (_cache[1] = ($event) => activeTab.value = $event),
            class: "content-tabs",
            type: "line",
            animated: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_n_tab_pane, {
                name: "songs",
                tab: unref(t)("artist.hotSongs")
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("div", _hoisted_8, [
                      createVNode(_component_n_tooltip, {
                        placement: "bottom",
                        trigger: "hover"
                      }, {
                        trigger: withCtx(() => [
                          createBaseVNode("div", {
                            class: "action-button hover-green",
                            onClick: handlePlayAll
                          }, [..._cache[2] || (_cache[2] = [
                            createBaseVNode("i", { class: "icon iconfont ri-play-fill" }, null, -1)
                          ])])
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.playAll")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_n_tooltip, {
                        placement: "bottom",
                        trigger: "hover"
                      }, {
                        trigger: withCtx(() => [
                          createBaseVNode("div", {
                            class: "action-button hover-green",
                            onClick: addToPlaylist
                          }, [..._cache[3] || (_cache[3] = [
                            createBaseVNode("i", { class: "icon iconfont ri-add-line" }, null, -1)
                          ])])
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.addToPlaylist")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      !unref(isMobile) ? (openBlock(), createElementBlock("div", _hoisted_10, [
                        createVNode(_component_n_tooltip, {
                          placement: "bottom",
                          trigger: "hover"
                        }, {
                          trigger: withCtx(() => [
                            createBaseVNode("div", {
                              class: "toggle-button hover-green",
                              onClick: toggleLayout
                            }, [
                              createBaseVNode("i", {
                                class: normalizeClass(["icon iconfont", isCompactLayout.value ? "ri-list-check-2" : "ri-grid-line"])
                              }, null, 2)
                            ])
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" " + toDisplayString(isCompactLayout.value ? unref(t)("comp.musicList.switchToNormal") : unref(t)("comp.musicList.switchToCompact")), 1)
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true),
                      createBaseVNode("div", {
                        class: normalizeClass(["search-container", { "search-expanded": isSearchVisible.value }])
                      }, [
                        isSearchVisible.value ? (openBlock(), createBlock(_component_n_input, {
                          key: 0,
                          value: searchKeyword.value,
                          "onUpdate:value": _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                          placeholder: unref(t)("comp.musicList.searchSongs"),
                          clearable: "",
                          round: "",
                          size: "small",
                          onBlur: handleSearchBlur
                        }, {
                          prefix: withCtx(() => [..._cache[4] || (_cache[4] = [
                            createBaseVNode("i", { class: "icon iconfont ri-search-line text-sm" }, null, -1)
                          ])]),
                          suffix: withCtx(() => [
                            createBaseVNode("i", {
                              class: "icon iconfont ri-close-line text-sm cursor-pointer",
                              onClick: closeSearch
                            })
                          ]),
                          _: 1
                        }, 8, ["value", "placeholder"])) : (openBlock(), createBlock(_component_n_tooltip, {
                          key: 1,
                          placement: "bottom",
                          trigger: "hover"
                        }, {
                          trigger: withCtx(() => [
                            createBaseVNode("div", {
                              class: "search-button",
                              onClick: showSearch
                            }, [..._cache[5] || (_cache[5] = [
                              createBaseVNode("i", { class: "icon iconfont ri-search-line" }, null, -1)
                            ])])
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.searchSongs")), 1)
                          ]),
                          _: 1
                        }))
                      ], 2)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      filteredSongs.value.length === 0 && searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(unref(t)("comp.musicList.noSearchResults")), 1)) : createCommentVNode("", true),
                      createVNode(_component_n_virtual_list, {
                        ref_key: "songListRef",
                        ref: songListRef,
                        class: "song-virtual-list",
                        style: { "height": "calc(80vh - 60px)" },
                        items: filteredSongs.value,
                        "item-size": isCompactLayout.value ? 50 : 70,
                        "item-resizable": "",
                        "key-field": "id",
                        onScroll: handleVirtualScroll
                      }, {
                        default: withCtx(({ item, index }) => [
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_14, [
                              createVNode(_sfc_main$1, {
                                index,
                                compact: isCompactLayout.value,
                                item: formatSong(item),
                                onPlay: handlePlay
                              }, null, 8, ["index", "compact", "item"])
                            ]),
                            index === filteredSongs.value.length - 1 ? (openBlock(), createElementBlock("div", _hoisted_15)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }, 8, ["items", "item-size"]),
                      songLoading.value ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(unref(t)("common.loading")), 1)) : songPage.value.hasMore ? (openBlock(), createElementBlock("div", {
                        key: 2,
                        ref_key: "songsLoadMoreRef",
                        ref: songsLoadMoreRef,
                        class: "load-more-trigger"
                      }, null, 512)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["tab"]),
              createVNode(_component_n_tab_pane, {
                name: "albums",
                tab: unref(t)("artist.albums")
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("div", _hoisted_18, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(albums.value, (album) => {
                        return openBlock(), createBlock(SearchItem, {
                          key: album.id,
                          shape: "square",
                          item: {
                            id: album.id,
                            picUrl: album.picUrl,
                            name: album.name,
                            desc: formatPublishTime(album.publishTime),
                            size: album.size,
                            type: "专辑"
                          }
                        }, null, 8, ["item"]);
                      }), 128)),
                      albumLoading.value ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(unref(t)("common.loading")), 1)) : albumPage.value.hasMore ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        ref_key: "albumsLoadMoreRef",
                        ref: albumsLoadMoreRef,
                        class: "load-more-trigger"
                      }, null, 512)) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["tab"]),
              createVNode(_component_n_tab_pane, {
                name: "about",
                tab: unref(t)("artist.description")
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("div", {
                      class: "description-content",
                      innerHTML: artistInfo.value?.briefDesc
                    }, null, 8, _hoisted_21)
                  ])
                ]),
                _: 1
              }, 8, ["tab"])
            ]),
            _: 1
          }, 8, ["value"]),
          createVNode(PlayBottom)
        ]),
        _: 1
      })), [
        [_directive_loading, loading.value]
      ]);
    };
  }
});
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce4123ec"]]);
export {
  detail as default
};
