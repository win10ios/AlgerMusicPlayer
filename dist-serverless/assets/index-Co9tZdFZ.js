const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-9WtWgwAm.js","./index-6TzM627h.css"])))=>i.map(i=>d[i]);
import { d as defineComponent, a2 as useI18n, aS as useUserStore, aO as usePlayerStore, aI as useRouter, s as ref, bd as useMessage, v as computed, az as onBeforeUnmount, U as watch, an as onMounted, aP as resolveDirective, a4 as createElementBlock, aa as createCommentVNode, L as withDirectives, ad as normalizeStyle, a6 as normalizeClass, a9 as unref, aM as getImgUrl, aJ as setAnimationClass, a7 as createBaseVNode, a8 as toDisplayString, ag as createVNode, ap as withCtx, ak as openBlock, ab as Fragment, ac as renderList, bl as isElectron, aN as NImage, bc as __unplugin_components_2$1, aZ as createTextVNode, bn as PlayBottom, b0 as Scrollbar, aY as isMobile, aH as setAnimationDelay, aR as _sfc_main$1, br as checkLoginStatus, bs as getUserDetail, bt as getUserRecord, a_ as getUserPlaylist, bu as __vitePreload, bv as getUserAlbumSublist, am as _export_sfc } from "./index-9WtWgwAm.js";
import { a as getListDetail } from "./list-DzAptV9H.js";
import { n as navigateToMusicList } from "./MusicListNavigator-DBgBAyka.js";
import LoginComponent from "./index-DzHsLfqv.js";
import { _ as __unplugin_components_5 } from "./Avatar-Bj10BTlg.js";
import { a as __unplugin_components_2, _ as __unplugin_components_3 } from "./Tabs-MdVIr7CY.js";
import "./music-B9G-sT9a.js";
import "./Tag-Dm9hxVfu.js";
import "./Add-DkSFdI7Q.js";
const _hoisted_1 = { class: "user-page" };
const _hoisted_2 = { class: "page" };
const _hoisted_3 = { class: "user-name" };
const _hoisted_4 = {
  key: 0,
  class: "login-type"
};
const _hoisted_5 = { class: "user-info" };
const _hoisted_6 = { class: "user-info-list" };
const _hoisted_7 = { class: "user-info-item" };
const _hoisted_8 = { class: "label" };
const _hoisted_9 = { class: "label" };
const _hoisted_10 = { class: "user-info-item" };
const _hoisted_11 = { class: "label" };
const _hoisted_12 = { class: "uesr-signature" };
const _hoisted_13 = { class: "tab-container" };
const _hoisted_14 = { class: "mt-4" };
const _hoisted_15 = { class: "play-list-item-info" };
const _hoisted_16 = { class: "play-list-item-name" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "play-list-item-info" };
const _hoisted_19 = { class: "play-list-item-name" };
const _hoisted_20 = { class: "play-list-item-count" };
const _hoisted_21 = { class: "title" };
const _hoisted_22 = { class: "record-list" };
const _hoisted_23 = { class: "play-score" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "User"
  },
  __name: "index",
  setup(__props) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const playerStore = usePlayerStore();
    const router = useRouter();
    const userDetail = ref();
    const recordList = ref();
    const infoLoading = ref(false);
    const mounted = ref(true);
    const list = ref();
    const listLoading = ref(false);
    const message = useMessage();
    const tabs = [
      { key: "created", label: "user.tabs.created" },
      { key: "favorite", label: "user.tabs.favorite" },
      { key: "album", label: "user.tabs.album" }
    ];
    const currentTab = ref("created");
    const user = computed(() => userStore.user);
    const createdPlaylists = computed(() => {
      if (!user.value) return [];
      return userStore.playList.filter((item) => item.creator?.userId === user.value.userId);
    });
    const favoritePlaylists = computed(() => {
      if (!user.value) return [];
      return userStore.playList.filter((item) => item.creator?.userId !== user.value.userId);
    });
    const currentList = computed(() => {
      if (currentTab.value === "album") {
        return userStore.albumList;
      }
      return currentTab.value === "created" ? createdPlaylists.value : favoritePlaylists.value;
    });
    const getCoverUrl = (item) => {
      return item.coverImgUrl || item.picUrl || "";
    };
    const getItemDescription = (item) => {
      if (currentTab.value === "album") {
        const artist = item.artist?.name || "";
        const size = item.size ? ` · ${item.size}首` : "";
        return `${artist}${size}`;
      } else {
        return `${t("user.playlist.trackCount", { count: item.trackCount })}，${t("user.playlist.playCount", { count: item.playCount })}`;
      }
    };
    const handleItemClick = (item) => {
      if (currentTab.value === "album") {
        openAlbum(item);
      } else {
        openPlaylist(item);
      }
    };
    const goToImportPlaylist = () => {
      router.push("/playlist/import");
    };
    onBeforeUnmount(() => {
      mounted.value = false;
    });
    const checkLoginStatus$1 = () => {
      if (userStore.user && userStore.loginType) {
        return true;
      }
      const loginInfo = checkLoginStatus();
      if (!loginInfo.isLoggedIn) {
        !isMobile.value && router.push("/login");
        return false;
      }
      return true;
    };
    const loadPage = async () => {
      if (!mounted.value) return;
      if (!checkLoginStatus$1()) return;
      await loadData();
    };
    const loadData = async () => {
      try {
        infoLoading.value = true;
        if (!user.value) {
          console.warn("用户数据不存在，尝试重新获取");
          return;
        }
        const promises = [getUserDetail(user.value.userId), getUserRecord(user.value.userId)];
        if (userStore.playList.length === 0) {
          promises.push(getUserPlaylist(user.value.userId));
        }
        const results = await Promise.all(promises);
        if (!mounted.value) return;
        userDetail.value = results[0].data;
        recordList.value = results[1].data.allData.map((item) => ({
          ...item,
          ...item.song,
          picUrl: item.song.al.picUrl
        }));
        if (results.length > 2 && results[2].data?.playlist) {
          userStore.playList = results[2].data.playlist;
        }
      } catch (error) {
        console.error("加载用户页面失败:", error);
        if (error.response?.status === 401) {
          userStore.handleLogout();
          router.push("/login");
        } else {
          message.error(t("user.message.loadFailed"));
        }
      } finally {
        if (mounted.value) {
          infoLoading.value = false;
        }
      }
    };
    const loadAlbumList = async () => {
      if (userStore.albumList.length > 0) {
        return;
      }
      try {
        infoLoading.value = true;
        const res = await getUserAlbumSublist({ limit: 100, offset: 0 });
        if (!mounted.value) return;
        userStore.albumList = res.data.data || [];
      } catch (error) {
        console.error("加载专辑列表失败:", error);
        message.error("加载专辑列表失败");
      } finally {
        if (mounted.value) {
          infoLoading.value = false;
        }
      }
    };
    watch(
      () => router.currentRoute.value.path,
      (newPath) => {
        console.log("newPath", newPath);
        if (newPath === "/user") {
          checkLoginStatus$1();
          loadData();
        }
      }
    );
    watch(
      () => userStore.user,
      (newUser) => {
        if (!mounted.value) return;
        if (newUser) {
          checkLoginStatus$1();
          loadPage();
        }
      }
    );
    watch(currentTab, async (newTab) => {
      if (newTab === "album") {
        await userStore.initializeCollectedAlbums();
        if (userStore.albumList.length === 0) {
          loadAlbumList();
        }
      }
    });
    onMounted(() => {
      checkLoginStatus$1() && loadData();
    });
    const openPlaylist = (item) => {
      listLoading.value = true;
      getListDetail(item.id).then((res) => {
        list.value = res.data.playlist;
        listLoading.value = false;
        navigateToMusicList(router, {
          id: item.id,
          type: "playlist",
          name: item.name,
          songList: res.data.playlist.tracks || [],
          listInfo: res.data.playlist,
          canRemove: true
          // 保留可移除功能
        });
      });
    };
    const openAlbum = async (item) => {
      try {
        listLoading.value = true;
        const { getAlbumDetail } = await __vitePreload(async () => {
          const { getAlbumDetail: getAlbumDetail2 } = await import("./index-9WtWgwAm.js").then((n) => n.ec);
          return { getAlbumDetail: getAlbumDetail2 };
        }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
        const res = await getAlbumDetail(item.id.toString());
        if (res.data?.album && res.data?.songs) {
          const albumData = res.data.album;
          const songs = res.data.songs.map((item2) => ({
            ...item2,
            picUrl: albumData.picUrl
          }));
          navigateToMusicList(router, {
            id: item.id,
            type: "album",
            name: albumData.name,
            songList: songs,
            listInfo: albumData,
            canRemove: false
            // 专辑不支持移除歌曲
          });
        }
      } catch (error) {
        console.error("加载专辑失败:", error);
        message.error("加载专辑失败");
      } finally {
        listLoading.value = false;
      }
    };
    const handlePlay = () => {
      const tracks = recordList.value || [];
      playerStore.setPlayList(tracks);
    };
    const showFollowList = () => {
      if (!user.value) return;
      router.push("/user/follows");
    };
    const handleLoginSuccess = () => {
      checkLoginStatus$1();
      loadData();
    };
    const isLoggedIn = computed(() => userStore.user);
    const currentLoginType = computed(() => userStore.loginType);
    return (_ctx, _cache) => {
      const _component_n_avatar = __unplugin_components_5;
      const _component_n_tab = __unplugin_components_2;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_image = NImage;
      const _component_n_ellipsis = __unplugin_components_2$1;
      const _component_n_scrollbar = Scrollbar;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        userDetail.value && user.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["left", unref(setAnimationClass)("animate__fadeInLeft")]),
          style: normalizeStyle({ backgroundImage: `url(${unref(getImgUrl)(user.value.backgroundUrl)})` })
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("span", null, toDisplayString(user.value.nickname), 1),
              currentLoginType.value ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(t)("login.title." + currentLoginType.value)), 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_n_avatar, {
                round: "",
                size: 50,
                src: unref(getImgUrl)(user.value.avatarUrl, "50y50")
              }, null, 8, ["src"]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", _hoisted_8, toDisplayString(userDetail.value.profile.followeds), 1),
                  createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.followers")), 1)
                ]),
                createBaseVNode("div", {
                  class: "user-info-item",
                  onClick: showFollowList
                }, [
                  createBaseVNode("div", _hoisted_9, toDisplayString(userDetail.value.profile.follows), 1),
                  createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.following")), 1)
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", _hoisted_11, toDisplayString(userDetail.value.level), 1),
                  createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.level")), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_12, toDisplayString(userDetail.value.profile.signature), 1),
            createBaseVNode("div", {
              class: normalizeClass(["play-list", unref(setAnimationClass)("animate__fadeInLeft")])
            }, [
              createBaseVNode("div", _hoisted_13, [
                createVNode(_component_n_tabs, {
                  value: currentTab.value,
                  "onUpdate:value": _cache[0] || (_cache[0] = ($event) => currentTab.value = $event),
                  type: "segment",
                  animated: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                      return createVNode(_component_n_tab, {
                        key: tab.key,
                        name: tab.key,
                        tab: unref(t)(tab.label)
                      }, null, 8, ["name", "tab"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["value"])
              ]),
              createVNode(_component_n_scrollbar, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_14, [
                    unref(isElectron) && currentTab.value === "created" ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "play-list-item",
                      onClick: goToImportPlaylist
                    }, [
                      _cache[1] || (_cache[1] = createBaseVNode("div", { class: "play-list-item-img" }, [
                        createBaseVNode("i", { class: "icon iconfont ri-add-line" })
                      ], -1)),
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", _hoisted_16, toDisplayString(unref(t)("comp.playlist.import.button")), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(currentList.value, (item, index2) => {
                      return openBlock(), createElementBlock("div", {
                        key: index2,
                        class: "play-list-item",
                        onClick: ($event) => handleItemClick(item)
                      }, [
                        createVNode(_component_n_image, {
                          src: unref(getImgUrl)(getCoverUrl(item), "50y50"),
                          class: "play-list-item-img",
                          lazy: "",
                          "preview-disabled": ""
                        }, null, 8, ["src"]),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", _hoisted_19, [
                            createVNode(_component_n_ellipsis, { "line-clamp": 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.name), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createBaseVNode("div", _hoisted_20, toDisplayString(getItemDescription(item)), 1)
                        ])
                      ], 8, _hoisted_17);
                    }), 128)),
                    _cache[2] || (_cache[2] = createBaseVNode("div", { class: "pb-20" }, null, -1)),
                    createVNode(PlayBottom)
                  ])
                ]),
                _: 1
              })
            ], 2)
          ])
        ], 6)) : createCommentVNode("", true),
        !unref(isMobile) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["right", unref(setAnimationClass)("animate__fadeInRight")])
        }, [
          createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("user.ranking.title")), 1),
          createBaseVNode("div", _hoisted_22, [
            createVNode(_component_n_scrollbar, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(recordList.value, (item, index2) => {
                  return openBlock(), createElementBlock("div", {
                    key: item.id,
                    class: normalizeClass(["record-item", unref(setAnimationClass)("animate__bounceInUp")]),
                    style: normalizeStyle(unref(setAnimationDelay)(index2, 25))
                  }, [
                    createBaseVNode("div", _hoisted_23, toDisplayString(index2 + 1), 1),
                    createVNode(_sfc_main$1, {
                      class: "song-item",
                      item,
                      mini: "",
                      onPlay: handlePlay
                    }, null, 8, ["item"])
                  ], 6);
                }), 128)),
                createVNode(PlayBottom)
              ]),
              _: 1
            })
          ])
        ], 2)), [
          [_directive_loading, infoLoading.value]
        ]) : createCommentVNode("", true),
        !isLoggedIn.value && unref(isMobile) ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(["login-container", unref(setAnimationClass)("animate__fadeIn")])
        }, [
          createVNode(LoginComponent, { onLoginSuccess: handleLoginSuccess })
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f34bacd7"]]);
export {
  index as default
};
