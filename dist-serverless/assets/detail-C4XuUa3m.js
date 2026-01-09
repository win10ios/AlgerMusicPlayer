import { d as defineComponent, a2 as useI18n, aI as useRouter, b1 as useRoute, bd as useMessage, aO as usePlayerStore, s as ref, an as onMounted, U as watch, aP as resolveDirective, a4 as createElementBlock, ag as createVNode, ap as withCtx, L as withDirectives, ak as openBlock, aa as createCommentVNode, a7 as createBaseVNode, ab as Fragment, a6 as normalizeClass, a9 as unref, aJ as setAnimationClass, ad as normalizeStyle, aM as getImgUrl, aZ as createTextVNode, aW as createBlock, a8 as toDisplayString, cA as __unplugin_components_7, ac as renderList, aH as setAnimationDelay, aN as NImage, ba as formatNumber, aR as _sfc_main$1, b0 as Scrollbar, bs as getUserDetail, a_ as getUserPlaylist, bt as getUserRecord, am as _export_sfc } from "./index-DEM82Ldr.js";
import { a as getListDetail } from "./list-DZnySGcE.js";
import { n as navigateToMusicList } from "./MusicListNavigator-D4kOV0l6.js";
import { _ as __unplugin_components_3, b as __unplugin_components_3$1 } from "./Tabs-DoLYi2VM.js";
import { _ as __unplugin_components_5 } from "./Avatar-BcgBqkBV.js";
import "./music-DO0Aa3SP.js";
import "./Add-CBMT917P.js";
import "./Tag-DCh4qtFH.js";
const _hoisted_1 = { class: "user-detail-page" };
const _hoisted_2 = { class: "content-wrapper" };
const _hoisted_3 = { class: "user-info-content" };
const _hoisted_4 = { class: "user-info-detail" };
const _hoisted_5 = { class: "user-info-name" };
const _hoisted_6 = { class: "user-info-stats" };
const _hoisted_7 = { class: "label" };
const _hoisted_8 = { class: "label" };
const _hoisted_9 = { class: "user-info-stat-item" };
const _hoisted_10 = { class: "label" };
const _hoisted_11 = { class: "user-info-signature" };
const _hoisted_12 = {
  key: 0,
  class: "empty-message"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "playlist-cover" };
const _hoisted_15 = { class: "play-count" };
const _hoisted_16 = { class: "playlist-info" };
const _hoisted_17 = { class: "playlist-name" };
const _hoisted_18 = { class: "playlist-stats" };
const _hoisted_19 = {
  key: 0,
  class: "empty-message"
};
const _hoisted_20 = { class: "no-permission" };
const _hoisted_21 = {
  key: 1,
  class: "empty-message"
};
const _hoisted_22 = {
  key: 2,
  class: "record-list"
};
const _hoisted_23 = {
  key: 1,
  class: "empty-message"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "UserDetail"
  },
  __name: "detail",
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const message = useMessage();
    const playerStore = usePlayerStore();
    const userId = ref(Number(route.params.uid));
    const userDetail = ref();
    const playList = ref([]);
    const recordList = ref([]);
    const loading = ref(true);
    const hasRecordPermission = ref(true);
    const currentList = ref();
    const listLoading = ref(false);
    const loadUserData = async () => {
      if (!userId.value) {
        message.error(t("user.detail.invalidUserId"));
        router.back();
        return;
      }
      try {
        loading.value = true;
        recordList.value = [];
        hasRecordPermission.value = true;
        try {
          const [userDetailRes, playlistRes] = await Promise.all([
            getUserDetail(userId.value),
            getUserPlaylist(userId.value)
          ]);
          userDetail.value = userDetailRes.data;
          playList.value = playlistRes.data.playlist;
        } catch (error) {
          console.error("加载用户基本信息失败:", error);
          message.error(t("user.message.loadBasicInfoFailed"));
          return;
        }
        try {
          const recordRes = await getUserRecord(userId.value);
          if (recordRes.data && recordRes.data.allData) {
            recordList.value = recordRes.data.allData.map((item) => ({
              ...item,
              ...item.song,
              picUrl: item.song.al.picUrl
            }));
          }
        } catch (error) {
          console.error("加载听歌记录失败:", error);
          if (error.response?.data?.code === -2 || error.data?.code === -2) {
            hasRecordPermission.value = false;
          }
        }
      } catch (error) {
        console.error("加载用户数据失败:", error);
        message.error(t("user.message.loadFailed"));
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      loadUserData();
    });
    watch(
      () => route.params.uid,
      (newUid) => {
        if (newUid && Number(newUid) !== userId.value) {
          userId.value = Number(newUid);
          loadUserData();
        }
      }
    );
    const openPlaylist = (item) => {
      listLoading.value = true;
      getListDetail(item.id).then((res) => {
        currentList.value = res.data.playlist;
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
    const handlePlay = () => {
      if (!recordList.value || recordList.value.length === 0) return;
      const tracks = recordList.value;
      playerStore.setPlayList(tracks);
    };
    const showFollowList = () => {
      if (!userDetail.value) return;
      router.push({
        path: `/user/follows`,
        query: {
          uid: userId.value.toString(),
          name: userDetail.value.profile.nickname
        }
      });
    };
    const showFollowerList = () => {
      if (!userDetail.value) return;
      router.push({
        path: `/user/followers`,
        query: {
          uid: userId.value.toString(),
          name: userDetail.value.profile.nickname
        }
      });
    };
    const isArtist = (profile) => {
      return profile.userType === 4 || profile.userType === 2 || profile.accountType === 2;
    };
    return (_ctx, _cache) => {
      const _component_n_avatar = __unplugin_components_5;
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_image = NImage;
      const _component_n_tab_pane = __unplugin_components_3$1;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_scrollbar = Scrollbar;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n_scrollbar, { class: "content-scrollbar" }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createElementBlock("div", _hoisted_2, [
              userDetail.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", {
                  class: normalizeClass(["user-info-section", unref(setAnimationClass)("animate__fadeInDown")])
                }, [
                  createBaseVNode("div", {
                    class: "user-info-bg",
                    style: normalizeStyle({ backgroundImage: `url(${unref(getImgUrl)(userDetail.value.profile.backgroundUrl)})` })
                  }, [
                    createBaseVNode("div", _hoisted_3, [
                      createVNode(_component_n_avatar, {
                        round: "",
                        size: 80,
                        src: unref(getImgUrl)(userDetail.value.profile.avatarUrl, "80y80")
                      }, null, 8, ["src"]),
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("div", _hoisted_5, [
                          createTextVNode(toDisplayString(userDetail.value.profile.nickname) + " ", 1),
                          isArtist(userDetail.value.profile) ? (openBlock(), createBlock(_component_n_tooltip, {
                            key: 0,
                            trigger: "hover"
                          }, {
                            trigger: withCtx(() => [..._cache[0] || (_cache[0] = [
                              createBaseVNode("i", { class: "ri-verified-badge-fill artist-icon" }, null, -1)
                            ])]),
                            default: withCtx(() => [
                              createTextVNode(" " + toDisplayString(unref(t)("user.detail.artist")), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_6, [
                          createBaseVNode("div", {
                            class: "user-info-stat-item",
                            onClick: showFollowerList
                          }, [
                            createBaseVNode("div", _hoisted_7, toDisplayString(userDetail.value.profile.followeds), 1),
                            createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.followers")), 1)
                          ]),
                          createBaseVNode("div", {
                            class: "user-info-stat-item",
                            onClick: showFollowList
                          }, [
                            createBaseVNode("div", _hoisted_8, toDisplayString(userDetail.value.profile.follows), 1),
                            createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.following")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_9, [
                            createBaseVNode("div", _hoisted_10, toDisplayString(userDetail.value.level), 1),
                            createBaseVNode("div", null, toDisplayString(unref(t)("user.profile.level")), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_11, toDisplayString(userDetail.value.profile.signature || unref(t)("user.detail.noSignature")), 1)
                      ])
                    ])
                  ], 4)
                ], 2),
                createVNode(_component_n_tabs, {
                  type: "line",
                  animated: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_n_tab_pane, {
                      name: "playlists",
                      tab: unref(t)("user.detail.playlists")
                    }, {
                      default: withCtx(() => [
                        playList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(unref(t)("user.detail.noPlaylists")), 1)) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(["playlist-grid", unref(setAnimationClass)("animate__fadeInUp")])
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(playList.value, (item, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: index,
                              class: normalizeClass(["playlist-item", unref(setAnimationClass)("animate__fadeInUp")]),
                              style: normalizeStyle(unref(setAnimationDelay)(index, 50)),
                              onClick: ($event) => openPlaylist(item)
                            }, [
                              createBaseVNode("div", _hoisted_14, [
                                createVNode(_component_n_image, {
                                  src: unref(getImgUrl)(item.coverImgUrl, "200y200"),
                                  lazy: "",
                                  "preview-disabled": "",
                                  class: "cover-img"
                                }, null, 8, ["src"]),
                                createBaseVNode("div", _hoisted_15, [
                                  _cache[1] || (_cache[1] = createBaseVNode("i", { class: "ri-play-fill" }, null, -1)),
                                  createTextVNode(" " + toDisplayString(unref(formatNumber)(item.playCount)), 1)
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_16, [
                                createBaseVNode("div", _hoisted_17, toDisplayString(item.name), 1),
                                createBaseVNode("div", _hoisted_18, toDisplayString(unref(t)("user.playlist.trackCount", { count: item.trackCount })), 1)
                              ])
                            ], 14, _hoisted_13);
                          }), 128))
                        ], 2))
                      ]),
                      _: 1
                    }, 8, ["tab"]),
                    createVNode(_component_n_tab_pane, {
                      name: "records",
                      tab: unref(t)("user.detail.records")
                    }, {
                      default: withCtx(() => [
                        !hasRecordPermission.value ? (openBlock(), createElementBlock("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, [
                            _cache[2] || (_cache[2] = createBaseVNode("i", { class: "ri-lock-line text-2xl mr-2" }, null, -1)),
                            createTextVNode(" " + toDisplayString(unref(t)("user.detail.noRecordPermission", { name: userDetail.value.profile.nickname })), 1)
                          ])
                        ])) : !recordList.value || recordList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(unref(t)("user.detail.noRecords")), 1)) : (openBlock(), createElementBlock("div", _hoisted_22, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(recordList.value, (item, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: item.id,
                              class: normalizeClass(["record-item", unref(setAnimationClass)("animate__bounceInUp")]),
                              style: normalizeStyle(unref(setAnimationDelay)(index, 25))
                            }, [
                              createVNode(_sfc_main$1, {
                                class: "song-item",
                                index,
                                item,
                                compact: "",
                                onPlay: handlePlay
                              }, null, 8, ["index", "item"])
                            ], 6);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    }, 8, ["tab"])
                  ]),
                  _: 1
                })
              ], 64)) : !loading.value ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(unref(t)("user.message.loadFailed")), 1)) : createCommentVNode("", true),
              _cache[3] || (_cache[3] = createBaseVNode("div", { class: "pb-20" }, null, -1))
            ])), [
              [_directive_loading, loading.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf29d527"]]);
export {
  detail as default
};
