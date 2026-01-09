import { d as defineComponent, a2 as useI18n, a4 as createElementBlock, ag as createVNode, a7 as createBaseVNode, aa as createCommentVNode, aN as NImage, a9 as unref, aM as getImgUrl, bc as __unplugin_components_2, ap as withCtx, aZ as createTextVNode, a8 as toDisplayString, a5 as withModifiers, ak as openBlock, am as _export_sfc, bd as useMessage, aI as useRouter, be as useMusicHistory, aS as useUserStore, s as ref, aO as usePlayerStore, an as onMounted, U as watch, aY as isMobile, a6 as normalizeClass, aJ as setAnimationClass, a0 as Button, b0 as Scrollbar, ab as Fragment, ac as renderList, ad as normalizeStyle, aH as setAnimationDelay, aR as _sfc_main$4, L as withDirectives, a3 as vShow, aW as createBlock, b2 as __unplugin_components_2$2, bf as getAlbumDetail, a$ as getMusicDetail, bg as processBilibiliVideos, bh as getRecentSongs, bi as getRecentPlaylists, bj as getRecentAlbums } from "./index-DEM82Ldr.js";
import { F as Favorite } from "./index-D88i-jAj.js";
import { a as getListDetail } from "./list-DZnySGcE.js";
import { n as navigateToMusicList } from "./MusicListNavigator-D4kOV0l6.js";
import { u as usePlaylistHistory, a as useAlbumHistory } from "./PlaylistHistoryHook-CQsC777F.js";
import { _ as __unplugin_components_3, a as __unplugin_components_2$1 } from "./Tabs-DoLYi2VM.js";
import "./ButtonGroup-De4kh3KR.js";
import "./Empty-D6OyvMzC.js";
import "./music-DO0Aa3SP.js";
import "./Add-CBMT917P.js";
const _hoisted_1$3 = { class: "album-item-info" };
const _hoisted_2$2 = { class: "album-item-name" };
const _hoisted_3$2 = { class: "album-item-desc" };
const _hoisted_4$2 = {
  key: 0,
  class: "album-item-count"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AlbumItem",
  props: {
    item: {},
    showCount: { type: Boolean, default: false },
    showDelete: { type: Boolean, default: false }
  },
  emits: ["click", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const getDescription = () => {
      const parts = [];
      if (props.item.artist?.name) {
        parts.push(props.item.artist.name);
      }
      if (props.item.size !== void 0) {
        parts.push(t("user.album.songCount", { count: props.item.size }));
      }
      return parts.join(" · ") || t("history.noDescription");
    };
    const handleClick = () => {
      emit("click", props.item);
    };
    const handleDelete = () => {
      emit("delete", props.item);
    };
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      const _component_n_ellipsis = __unplugin_components_2;
      return openBlock(), createElementBlock("div", {
        class: "album-item",
        onClick: handleClick
      }, [
        createVNode(_component_n_image, {
          src: unref(getImgUrl)(__props.item.picUrl || "", "100y100"),
          class: "album-item-img",
          lazy: "",
          "preview-disabled": ""
        }, null, 8, ["src"]),
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$2, [
            createVNode(_component_n_ellipsis, { "line-clamp": 1 }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(__props.item.name), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_3$2, toDisplayString(getDescription()), 1)
        ]),
        __props.showCount && __props.item.count ? (openBlock(), createElementBlock("div", _hoisted_4$2, toDisplayString(__props.item.count), 1)) : createCommentVNode("", true),
        __props.showDelete ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "album-item-delete",
          onClick: withModifiers(handleDelete, ["stop"])
        }, [..._cache[0] || (_cache[0] = [
          createBaseVNode("i", { class: "iconfont icon-close" }, null, -1)
        ])])) : createCommentVNode("", true)
      ]);
    };
  }
});
const AlbumItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-180d45be"]]);
const _hoisted_1$2 = { class: "playlist-item-info" };
const _hoisted_2$1 = { class: "playlist-item-name" };
const _hoisted_3$1 = { class: "playlist-item-desc" };
const _hoisted_4$1 = {
  key: 0,
  class: "playlist-item-count"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PlaylistItem",
  props: {
    item: {},
    showCount: { type: Boolean, default: false },
    showDelete: { type: Boolean, default: false }
  },
  emits: ["click", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const getDescription = () => {
      const parts = [];
      if (props.item.trackCount !== void 0) {
        parts.push(t("user.playlist.trackCount", { count: props.item.trackCount }));
      }
      if (props.item.creator?.nickname) {
        parts.push(props.item.creator.nickname);
      }
      return parts.join(" · ") || t("history.noDescription");
    };
    const handleClick = () => {
      emit("click", props.item);
    };
    const handleDelete = () => {
      emit("delete", props.item);
    };
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      const _component_n_ellipsis = __unplugin_components_2;
      return openBlock(), createElementBlock("div", {
        class: "playlist-item",
        onClick: handleClick
      }, [
        createVNode(_component_n_image, {
          src: unref(getImgUrl)(__props.item.coverImgUrl || __props.item.picUrl || "", "100y100"),
          class: "playlist-item-img",
          lazy: "",
          "preview-disabled": ""
        }, null, 8, ["src"]),
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$1, [
            createVNode(_component_n_ellipsis, { "line-clamp": 1 }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(__props.item.name), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_3$1, toDisplayString(getDescription()), 1)
        ]),
        __props.showCount && __props.item.count ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString(__props.item.count), 1)) : createCommentVNode("", true),
        __props.showDelete ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "playlist-item-delete",
          onClick: withModifiers(handleDelete, ["stop"])
        }, [..._cache[0] || (_cache[0] = [
          createBaseVNode("i", { class: "iconfont icon-close" }, null, -1)
        ])])) : createCommentVNode("", true)
      ]);
    };
  }
});
const PlaylistItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d410b5d7"]]);
const _hoisted_1$1 = { class: "history-page" };
const _hoisted_2 = { class: "title" };
const _hoisted_3 = { class: "history-item-delete" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  key: 3,
  class: "no-data"
};
const _hoisted_6 = {
  key: 4,
  class: "loading-wrapper"
};
const _hoisted_7 = {
  key: 5,
  class: "no-more-tip"
};
const pageSize = 100;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const { t } = useI18n();
    const message = useMessage();
    const router = useRouter();
    const { delMusic, musicList } = useMusicHistory();
    const { delPlaylist, playlistList } = usePlaylistHistory();
    const { delAlbum, albumList } = useAlbumHistory();
    const userStore = useUserStore();
    const scrollbarRef = ref();
    const loading = ref(false);
    const noMore = ref(false);
    const displayList = ref([]);
    const playerStore = usePlayerStore();
    const hasLoaded = ref(false);
    const currentCategory = ref("songs");
    const currentTab = ref("local");
    const cloudRecords = ref([]);
    const cloudPlaylists = ref([]);
    const cloudAlbums = ref([]);
    const currentPage = ref(1);
    const getCloudRecords = async () => {
      if (!userStore.user?.userId || userStore.loginType !== "cookie") {
        message.warning(t("history.needLogin"));
        return [];
      }
      try {
        const res = await getRecentSongs(1e3);
        if (res.data?.data?.list) {
          return res.data.data.list.map((item) => ({
            id: item.data?.id,
            playTime: item.playTime,
            source: "netease",
            count: 1,
            data: item.data
          }));
        }
        return [];
      } catch (error) {
        console.error(t("history.getCloudRecordFailed"), error);
        if (error?.response?.status !== 301 && error?.response?.data?.code !== -2) {
          message.error(t("history.getCloudRecordFailed"));
        }
        return [];
      }
    };
    const getCloudPlaylists = async () => {
      if (!userStore.user?.userId || userStore.loginType !== "cookie") {
        message.warning(t("history.needLogin"));
        return [];
      }
      try {
        const res = await getRecentPlaylists(100);
        if (res.data?.data?.list) {
          return res.data.data.list.map((item) => ({
            id: item.data?.id,
            name: item.data?.name,
            coverImgUrl: item.data?.coverImgUrl,
            picUrl: item.data?.picUrl,
            trackCount: item.data?.trackCount,
            playCount: item.data?.playCount,
            creator: item.data?.creator,
            playTime: item.playTime
          }));
        }
        return [];
      } catch (error) {
        console.error(t("history.getCloudRecordFailed"), error);
        if (error?.response?.status !== 301 && error?.response?.data?.code !== -2) {
          message.error(t("history.getCloudRecordFailed"));
        }
        return [];
      }
    };
    const getCloudAlbums = async () => {
      if (!userStore.user?.userId || userStore.loginType !== "cookie") {
        message.warning(t("history.needLogin"));
        return [];
      }
      try {
        const res = await getRecentAlbums(100);
        if (res.data?.data?.list) {
          return res.data.data.list.map((item) => ({
            id: item.data?.id,
            name: item.data?.name,
            picUrl: item.data?.picUrl,
            size: item.data?.size,
            artist: item.data?.artist,
            playTime: item.playTime
          }));
        }
        return [];
      } catch (error) {
        console.error(t("history.getCloudRecordFailed"), error);
        if (error?.response?.status !== 301 && error?.response?.data?.code !== -2) {
          message.error(t("history.getCloudRecordFailed"));
        }
        return [];
      }
    };
    const getCurrentList = () => {
      if (currentCategory.value === "songs") {
        switch (currentTab.value) {
          case "local":
            return musicList.value;
          case "cloud":
            return cloudRecords.value.filter((item) => item.id);
        }
      } else if (currentCategory.value === "playlists") {
        switch (currentTab.value) {
          case "local":
            return playlistList.value;
          case "cloud":
            return cloudPlaylists.value;
        }
      } else if (currentCategory.value === "albums") {
        switch (currentTab.value) {
          case "local":
            return albumList.value;
          case "cloud":
            return cloudAlbums.value;
        }
      }
      return [];
    };
    const handleCategoryChange = async (value) => {
      currentCategory.value = value;
      currentPage.value = 1;
      noMore.value = false;
      displayList.value = [];
      if (currentTab.value === "cloud") {
        loading.value = true;
        if (value === "songs" && cloudRecords.value.length === 0) {
          cloudRecords.value = await getCloudRecords();
        } else if (value === "playlists" && cloudPlaylists.value.length === 0) {
          cloudPlaylists.value = await getCloudPlaylists();
        } else if (value === "albums" && cloudAlbums.value.length === 0) {
          cloudAlbums.value = await getCloudAlbums();
        }
        loading.value = false;
      }
      await loadHistoryData();
    };
    const handlePlaylistClick = async (item) => {
      try {
        const res = await getListDetail(item.id);
        if (res.data?.playlist) {
          navigateToMusicList(router, {
            id: item.id,
            type: "playlist",
            name: item.name,
            songList: res.data.playlist.tracks || [],
            listInfo: res.data.playlist,
            canRemove: false
          });
        }
      } catch (error) {
        console.error("打开歌单失败:", error);
        message.error("打开歌单失败");
      }
    };
    const handleAlbumClick = async (item) => {
      try {
        const res = await getAlbumDetail(item.id.toString());
        if (res.data?.album && res.data?.songs) {
          const albumData = res.data.album;
          const songs = res.data.songs.map((song) => ({
            ...song,
            picUrl: albumData.picUrl
          }));
          navigateToMusicList(router, {
            id: item.id,
            type: "album",
            name: albumData.name,
            songList: songs,
            listInfo: albumData,
            canRemove: false
          });
        }
      } catch (error) {
        console.error("打开专辑失败:", error);
        message.error("打开专辑失败");
      }
    };
    const handleDelPlaylist = (item) => {
      delPlaylist(item);
      displayList.value = displayList.value.filter((playlist) => playlist.id !== item.id);
    };
    const handleDelAlbum = (item) => {
      delAlbum(item);
      displayList.value = displayList.value.filter((album) => album.id !== item.id);
    };
    const loadHistoryData = async () => {
      const currentList = getCurrentList();
      if (currentList.length === 0) {
        displayList.value = [];
        return;
      }
      loading.value = true;
      try {
        const startIndex = (currentPage.value - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageItems = currentList.slice(startIndex, endIndex);
        if (currentCategory.value === "songs") {
          const neteaseItems = currentPageItems.filter((item) => item.source !== "bilibili");
          const bilibiliItems = currentPageItems.filter((item) => item.source === "bilibili");
          let neteaseSongs = [];
          if (neteaseItems.length > 0) {
            const currentIds = neteaseItems.map((item) => item.id);
            const res = await getMusicDetail(currentIds);
            if (res.data.songs) {
              neteaseSongs = res.data.songs.map((song) => {
                const historyItem = neteaseItems.find((item) => item.id === song.id);
                return {
                  ...song,
                  picUrl: song.al?.picUrl || "",
                  count: historyItem?.count || 0,
                  source: "netease"
                };
              });
            }
          }
          const bilibiliIds = bilibiliItems.map((item) => `${item.bilibiliData?.bvid}--1--${item.bilibiliData?.cid}`).filter((id) => id && !id.includes("undefined"));
          const bilibiliSongs = await processBilibiliVideos(bilibiliIds);
          bilibiliSongs.forEach((song) => {
            const historyItem = bilibiliItems.find(
              (item) => item.bilibiliData?.bvid === song.bilibiliData?.bvid && item.bilibiliData?.cid === song.bilibiliData?.cid
            );
            if (historyItem) {
              song.count = historyItem.count || 0;
            }
          });
          const newSongs = currentPageItems.map((item) => {
            if (item.source === "bilibili") {
              return bilibiliSongs.find(
                (song) => song.bilibiliData?.bvid === item.bilibiliData?.bvid && song.bilibiliData?.cid === item.bilibiliData?.cid
              );
            }
            return neteaseSongs.find((song) => song.id === item.id);
          }).filter((song) => !!song);
          if (currentPage.value === 1) {
            displayList.value = newSongs;
          } else {
            displayList.value = [...displayList.value, ...newSongs];
          }
        } else {
          if (currentPage.value === 1) {
            displayList.value = currentPageItems;
          } else {
            displayList.value = [...displayList.value, ...currentPageItems];
          }
        }
        const totalLength = getCurrentList().length;
        noMore.value = displayList.value.length >= totalLength;
      } catch (error) {
        console.error(t("history.getHistoryFailed"), error);
      } finally {
        loading.value = false;
      }
    };
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      const threshold = 100;
      if (!loading.value && !noMore.value && scrollHeight - (scrollTop + offsetHeight) < threshold) {
        currentPage.value++;
        loadHistoryData();
      }
    };
    const handlePlay = () => {
      playerStore.setPlayList(displayList.value);
    };
    const handleTabChange = async (value) => {
      currentTab.value = value;
      currentPage.value = 1;
      noMore.value = false;
      displayList.value = [];
      if (value === "cloud") {
        loading.value = true;
        if (currentCategory.value === "songs" && cloudRecords.value.length === 0) {
          cloudRecords.value = await getCloudRecords();
        } else if (currentCategory.value === "playlists" && cloudPlaylists.value.length === 0) {
          cloudPlaylists.value = await getCloudPlaylists();
        } else if (currentCategory.value === "albums" && cloudAlbums.value.length === 0) {
          cloudAlbums.value = await getCloudAlbums();
        }
        loading.value = false;
      }
      await loadHistoryData();
    };
    onMounted(async () => {
      if (!hasLoaded.value) {
        await loadHistoryData();
        hasLoaded.value = true;
      }
    });
    watch(
      [musicList, playlistList, albumList],
      async () => {
        if (hasLoaded.value) {
          currentPage.value = 1;
          noMore.value = false;
          await loadHistoryData();
        }
      },
      { deep: true }
    );
    const handleDelMusic = async (item) => {
      delMusic(item);
      musicList.value = musicList.value.filter((music) => music.id !== item.id);
      displayList.value = displayList.value.filter((music) => music.id !== item.id);
    };
    const handleNavigateToHeatmap = () => {
      router.push("/heatmap");
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_tab = __unplugin_components_2$1;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_spin = __unplugin_components_2$2;
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        !unref(isMobile) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["title-wrapper", unref(setAnimationClass)("animate__fadeInRight")])
        }, [
          createBaseVNode("div", _hoisted_2, toDisplayString(unref(t)("history.title")), 1),
          createVNode(_component_n_button, {
            secondary: "",
            type: "primary",
            size: "small",
            class: "heatmap-btn",
            onClick: handleNavigateToHeatmap
          }, {
            icon: withCtx(() => [..._cache[2] || (_cache[2] = [
              createBaseVNode("i", { class: "iconfont ri-calendar-2-line" }, null, -1)
            ])]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("history.heatmapTitle")), 1)
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["category-tabs-wrapper", unref(setAnimationClass)("animate__fadeInRight")])
        }, [
          createVNode(_component_n_tabs, {
            value: currentCategory.value,
            "onUpdate:value": [
              _cache[0] || (_cache[0] = ($event) => currentCategory.value = $event),
              handleCategoryChange
            ],
            type: "segment",
            animated: "",
            size: "large"
          }, {
            default: withCtx(() => [
              createVNode(_component_n_tab, {
                name: "songs",
                tab: unref(t)("history.categoryTabs.songs")
              }, null, 8, ["tab"]),
              createVNode(_component_n_tab, {
                name: "playlists",
                tab: unref(t)("history.categoryTabs.playlists")
              }, null, 8, ["tab"]),
              createVNode(_component_n_tab, {
                name: "albums",
                tab: unref(t)("history.categoryTabs.albums")
              }, null, 8, ["tab"])
            ]),
            _: 1
          }, 8, ["value"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["tabs-wrapper", unref(setAnimationClass)("animate__fadeInRight")])
        }, [
          createVNode(_component_n_tabs, {
            value: currentTab.value,
            "onUpdate:value": [
              _cache[1] || (_cache[1] = ($event) => currentTab.value = $event),
              handleTabChange
            ],
            type: "segment",
            animated: "",
            size: "small"
          }, {
            default: withCtx(() => [
              createVNode(_component_n_tab, {
                name: "local",
                tab: unref(t)("history.tabs.local")
              }, null, 8, ["tab"]),
              createVNode(_component_n_tab, {
                name: "cloud",
                tab: unref(t)("history.tabs.cloud")
              }, null, 8, ["tab"])
            ]),
            _: 1
          }, 8, ["value"])
        ], 2),
        createVNode(_component_n_scrollbar, {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          size: 100,
          onScroll: handleScroll
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(["history-list-content", unref(setAnimationClass)("animate__bounceInLeft")])
            }, [
              currentCategory.value === "songs" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(displayList.value, (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: normalizeClass(["history-item", unref(setAnimationClass)("animate__bounceInRight")]),
                  style: normalizeStyle(unref(setAnimationDelay)(index2, 30))
                }, [
                  createVNode(_sfc_main$4, {
                    class: "history-item-content",
                    item,
                    onPlay: handlePlay
                  }, null, 8, ["item"]),
                  !unref(isMobile) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    withDirectives(createBaseVNode("div", { class: "history-item-count min-w-[60px]" }, toDisplayString(unref(t)("history.playCount", { count: item.count })), 513), [
                      [vShow, currentTab.value === "local"]
                    ]),
                    withDirectives(createBaseVNode("div", _hoisted_3, [
                      createBaseVNode("i", {
                        class: "iconfont icon-close",
                        onClick: ($event) => handleDelMusic(item)
                      }, null, 8, _hoisted_4)
                    ], 512), [
                      [vShow, currentTab.value === "local"]
                    ])
                  ], 64)) : createCommentVNode("", true)
                ], 6);
              }), 128)) : createCommentVNode("", true),
              currentCategory.value === "playlists" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(displayList.value, (item, index2) => {
                return openBlock(), createBlock(PlaylistItem, {
                  key: item.id,
                  item,
                  "show-count": currentTab.value === "local",
                  "show-delete": currentTab.value === "local",
                  class: normalizeClass(unref(setAnimationClass)("animate__bounceInRight")),
                  style: normalizeStyle(unref(setAnimationDelay)(index2, 30)),
                  onClick: ($event) => handlePlaylistClick(item),
                  onDelete: ($event) => handleDelPlaylist(item)
                }, null, 8, ["item", "show-count", "show-delete", "class", "style", "onClick", "onDelete"]);
              }), 128)) : createCommentVNode("", true),
              currentCategory.value === "albums" ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(displayList.value, (item, index2) => {
                return openBlock(), createBlock(AlbumItem, {
                  key: item.id,
                  item,
                  "show-count": currentTab.value === "local",
                  "show-delete": currentTab.value === "local",
                  class: normalizeClass(unref(setAnimationClass)("animate__bounceInRight")),
                  style: normalizeStyle(unref(setAnimationDelay)(index2, 30)),
                  onClick: ($event) => handleAlbumClick(item),
                  onDelete: ($event) => handleDelAlbum(item)
                }, null, 8, ["item", "show-count", "show-delete", "class", "style", "onClick", "onDelete"]);
              }), 128)) : createCommentVNode("", true),
              displayList.value.length === 0 && !loading.value ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(unref(t)("history.noData")), 1)) : createCommentVNode("", true),
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createVNode(_component_n_spin, { size: "large" })
              ])) : createCommentVNode("", true),
              noMore.value && displayList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(unref(t)("common.noMore")), 1)) : createCommentVNode("", true)
            ], 2)
          ]),
          _: 1
        }, 512)
      ]);
    };
  }
});
const HistoryList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4f65e4bb"]]);
const _hoisted_1 = { class: "flex gap-4 h-full pb-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "History"
  },
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        !unref(isMobile) ? (openBlock(), createBlock(Favorite, {
          key: 0,
          class: "flex-item"
        })) : createCommentVNode("", true),
        createVNode(HistoryList, { class: "flex-item" })
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd088a36"]]);
export {
  index as default
};
