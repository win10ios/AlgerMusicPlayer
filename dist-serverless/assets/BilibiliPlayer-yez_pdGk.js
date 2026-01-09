import { d as defineComponent, b1 as useRoute, aI as useRouter, bd as useMessage, aO as usePlayerStore, a2 as useI18n, v as computed, s as ref, aJ as setAnimationClass, U as watch, an as onMounted, b7 as getBilibiliVideoDetail, cN as createSongFromBilibiliVideo, cO as getBilibiliPlayUrl, b5 as getBilibiliProxyUrl, a4 as createElementBlock, ag as createVNode, ap as withCtx, a7 as createBaseVNode, aa as createCommentVNode, ak as openBlock, b2 as __unplugin_components_2, a8 as toDisplayString, a9 as unref, a0 as Button, aZ as createTextVNode, a6 as normalizeClass, aN as NImage, aW as createBlock, ab as Fragment, ac as renderList, b0 as Scrollbar, am as _export_sfc } from "./index-9WtWgwAm.js";
const _hoisted_1 = { class: "bilibili-player-page" };
const _hoisted_2 = { class: "content-wrapper" };
const _hoisted_3 = {
  key: 0,
  class: "loading-wrapper"
};
const _hoisted_4 = {
  key: 1,
  class: "error-wrapper"
};
const _hoisted_5 = { class: "bilibili-cover" };
const _hoisted_6 = { class: "play-overlay" };
const _hoisted_7 = { class: "video-info" };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = { class: "author" };
const _hoisted_10 = { class: "stats" };
const _hoisted_11 = { class: "description" };
const _hoisted_12 = { class: "duration" };
const _hoisted_13 = { class: "parts-title" };
const _hoisted_14 = { class: "parts-list" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BilibiliPlayer"
  },
  __name: "BilibiliPlayer",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    const playerStore = usePlayerStore();
    const { t } = useI18n();
    const bvid = computed(() => route.params.bvid);
    const isLoading = ref(true);
    const partLoading = ref(false);
    const errorMessage = ref("");
    const videoDetail = ref(null);
    const currentPage = ref(null);
    const audioList = ref([]);
    const initialLoadDone = ref(false);
    const mainContentAnimation = computed(() => {
      if (!initialLoadDone.value) {
        return setAnimationClass("animate__fadeInDown");
      }
      return "";
    });
    const partsListAnimation = computed(() => {
      if (!initialLoadDone.value) {
        return setAnimationClass("animate__fadeInUp");
      }
      return "";
    });
    watch(
      () => bvid.value,
      async (newBvid) => {
        if (newBvid) {
          initialLoadDone.value = false;
          await loadVideoDetail(newBvid);
        }
      }
    );
    onMounted(async () => {
      if (bvid.value) {
        await loadVideoDetail(bvid.value);
      } else {
        message.error(t("bilibili.player.errors.invalidVideoId"));
        router.back();
      }
    });
    const loadVideoDetail = async (bvid2) => {
      if (!bvid2) return;
      isLoading.value = true;
      errorMessage.value = "";
      audioList.value = [];
      try {
        console.log("加载B站视频详情:", bvid2);
        const res = await getBilibiliVideoDetail(bvid2);
        console.log("B站视频详情数据:", res.data);
        videoDetail.value = JSON.parse(JSON.stringify(res.data));
        if (videoDetail.value?.pages && videoDetail.value.pages.length > 0) {
          console.log("视频有多个分P，共", videoDetail.value.pages.length, "个");
          const [firstPage] = videoDetail.value.pages;
          currentPage.value = firstPage;
          await loadVideoSource();
        } else {
          console.log("视频无分P或分P数据为空");
          errorMessage.value = t("bilibili.player.errors.loadPartInfoFailed");
        }
      } catch (error) {
        console.error("获取视频详情失败", error);
        errorMessage.value = t("bilibili.player.errors.loadVideoDetailFailed");
      } finally {
        isLoading.value = false;
        initialLoadDone.value = true;
      }
    };
    const loadVideoSource = async () => {
      if (!bvid.value || !currentPage.value?.cid) {
        console.error("缺少必要参数:", { bvid: bvid.value, cid: currentPage.value?.cid });
        return;
      }
      isLoading.value = true;
      errorMessage.value = "";
      try {
        console.log("加载音频源:", bvid.value, currentPage.value.cid);
        const tempAudio = createSongFromBilibiliVideo$1();
        const currentAudio = await loadSongUrl(currentPage.value, tempAudio);
        if (videoDetail.value?.pages) {
          audioList.value = videoDetail.value.pages.map((page, index) => {
            if (index === 0 && currentPage.value?.cid === page.cid) {
              return currentAudio;
            }
            return createSongFromBilibiliVideo(videoDetail.value, page, bvid.value);
          });
          console.log("已生成音频列表，共", audioList.value.length, "首");
          if (audioList.value.length > 1) {
            const nextIndex = 1;
            const nextPage = videoDetail.value.pages[nextIndex];
            const nextAudio = audioList.value[nextIndex];
            loadSongUrl(nextPage, nextAudio).catch((e) => console.warn("预加载下一个分P失败:", e));
          }
        }
      } catch (error) {
        console.error("获取音频播放地址失败", error);
        errorMessage.value = t("bilibili.player.errors.loadAudioUrlFailed");
      } finally {
        isLoading.value = false;
      }
    };
    const createSongFromBilibiliVideo$1 = () => {
      if (!videoDetail.value || !currentPage.value) {
        throw new Error("视频详情未加载");
      }
      return createSongFromBilibiliVideo(videoDetail.value, currentPage.value, bvid.value);
    };
    const loadSongUrl = async (page, songItem, forceRefresh = false) => {
      if (songItem.playMusicUrl && !forceRefresh) return songItem;
      try {
        console.log(`加载分P音频URL: ${page.part}, cid: ${page.cid}`);
        const res = await getBilibiliPlayUrl(bvid.value, page.cid);
        const playUrlData = res.data;
        let url = "";
        if (playUrlData.dash && playUrlData.dash.audio && playUrlData.dash.audio.length > 0) {
          url = playUrlData.dash.audio[0].baseUrl;
          console.log("获取到dash音频URL:", url);
        } else if (playUrlData.durl && playUrlData.durl.length > 0) {
          url = playUrlData.durl[0].url;
          console.log("获取到durl音频URL:", url);
        } else {
          throw new Error("未找到可用的音频地址");
        }
        songItem.playMusicUrl = getBilibiliProxyUrl(url);
        return songItem;
      } catch (error) {
        console.error(`加载分P音频URL失败: ${page.part}`, error);
        return songItem;
      }
    };
    const switchPage = async (page) => {
      if (partLoading.value || currentPage.value?.cid === page.cid) return;
      console.log("切换到分P:", page.part);
      currentPage.value = page;
      const audioItem = audioList.value.find((item) => item.bilibiliData?.cid === page.cid);
      if (audioItem) {
        try {
          partLoading.value = true;
          await loadSongUrl(page, audioItem, true);
          playCurrentAudio();
        } catch (error) {
          console.error("切换分P时加载音频URL失败:", error);
          message.error(t("bilibili.player.errors.switchPartFailed"));
        } finally {
          partLoading.value = false;
        }
      } else {
        console.error("未找到对应的音频项");
        message.error(t("bilibili.player.errors.switchPartFailed"));
      }
    };
    const playCurrentAudio = async () => {
      if (audioList.value.length === 0) {
        console.error("音频列表为空");
        errorMessage.value = t("bilibili.player.errors.audioListEmpty");
        return;
      }
      const currentIndex = audioList.value.findIndex(
        (item) => item.bilibiliData?.cid === currentPage.value?.cid
      );
      if (currentIndex === -1) {
        console.error("未找到当前分P的音频");
        errorMessage.value = t("bilibili.player.errors.currentPartNotFound");
        return;
      }
      const currentAudio = audioList.value[currentIndex];
      console.log("准备播放当前选中的分P:", currentAudio.name);
      try {
        partLoading.value = true;
        await loadSongUrl(currentPage.value, currentAudio, true);
        if (!currentAudio.playMusicUrl) {
          throw new Error("获取音频URL失败");
        }
        const nextIndex = (currentIndex + 1) % audioList.value.length;
        if (nextIndex !== currentIndex) {
          const nextAudio = audioList.value[nextIndex];
          const nextPage = videoDetail.value.pages.find((p) => p.cid === nextAudio.bilibiliData?.cid);
          if (nextPage) {
            console.log("预加载下一个分P:", nextPage.part);
            loadSongUrl(nextPage, nextAudio).catch((e) => console.warn("预加载下一个分P失败:", e));
          }
        }
        playerStore.setPlayList(audioList.value);
        console.log("播放当前选中的分P:", currentAudio.name, "音频URL:", currentAudio.playMusicUrl);
        playerStore.setPlay(currentAudio);
        message.success(t("bilibili.player.playStarted"));
      } catch (error) {
        console.error("播放音频失败:", error);
        errorMessage.value = error instanceof Error ? error.message : "播放失败，请重试";
      } finally {
        partLoading.value = false;
      }
    };
    const formatTotalDuration = (seconds) => {
      if (!seconds) return "00:00:00";
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const remainingSeconds = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    const formatNumber = (num) => {
      if (!num) return "0";
      if (num >= 1e4) {
        return `${(num / 1e4).toFixed(1)}万`;
      }
      return num.toString();
    };
    const isCurrentPlayingPage = (page) => {
      const currentPlayingMusic = playerStore.playMusic;
      if (currentPlayingMusic && typeof currentPlayingMusic === "object" && currentPlayingMusic.bilibiliData) {
        return currentPlayingMusic.bilibiliData.cid === page.cid && currentPlayingMusic.bilibiliData.bvid === bvid.value;
      }
      return currentPage.value?.cid === page.cid;
    };
    watch(
      () => playerStore.playMusic,
      (newMusic) => {
        if (newMusic && typeof newMusic === "object" && newMusic.bilibiliData && newMusic.bilibiliData.bvid === bvid.value) {
          const playingPage = videoDetail.value?.pages?.find(
            (p) => p.cid === newMusic.bilibiliData.cid
          );
          if (playingPage) {
            currentPage.value = playingPage;
          }
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n_spin = __unplugin_components_2;
      const _component_n_button = Button;
      const _component_n_image = NImage;
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n_scrollbar, { class: "content-scrollbar" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
                createVNode(_component_n_spin, { size: "large" }),
                createBaseVNode("p", null, toDisplayString(unref(t)("bilibili.player.loading")), 1)
              ])) : errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
                _cache[0] || (_cache[0] = createBaseVNode("i", { class: "ri-error-warning-line text-4xl text-red-500" }, null, -1)),
                createBaseVNode("p", null, toDisplayString(errorMessage.value), 1),
                createVNode(_component_n_button, {
                  type: "primary",
                  onClick: loadVideoSource
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("bilibili.player.retry")), 1)
                  ]),
                  _: 1
                })
              ])) : videoDetail.value ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: normalizeClass(["bilibili-info-wrapper", mainContentAnimation.value])
              }, [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(_component_n_image, {
                    src: unref(getBilibiliProxyUrl)(videoDetail.value.pic),
                    class: "cover-image",
                    "preview-disabled": ""
                  }, null, 8, ["src"]),
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", {
                      class: "play-icon-bg",
                      onClick: playCurrentAudio
                    }, [..._cache[1] || (_cache[1] = [
                      createBaseVNode("i", { class: "ri-play-fill" }, null, -1)
                    ])]),
                    createVNode(_component_n_button, {
                      type: "primary",
                      size: "large",
                      class: "corner-play-button",
                      loading: partLoading.value,
                      onClick: playCurrentAudio
                    }, {
                      icon: withCtx(() => [..._cache[2] || (_cache[2] = [
                        createBaseVNode("i", { class: "ri-play-fill" }, null, -1)
                      ])]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("bilibili.player.playNow")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ]),
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", {
                    class: "title",
                    innerHTML: videoDetail.value?.title || unref(t)("bilibili.player.loadingTitle")
                  }, null, 8, _hoisted_8),
                  createBaseVNode("div", _hoisted_9, [
                    _cache[3] || (_cache[3] = createBaseVNode("i", { class: "ri-user-line mr-1" }, null, -1)),
                    createBaseVNode("span", null, toDisplayString(videoDetail.value.owner?.name), 1)
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("span", null, [
                      _cache[4] || (_cache[4] = createBaseVNode("i", { class: "ri-play-line mr-1" }, null, -1)),
                      createTextVNode(toDisplayString(formatNumber(videoDetail.value.stat?.view)), 1)
                    ]),
                    createBaseVNode("span", null, [
                      _cache[5] || (_cache[5] = createBaseVNode("i", { class: "ri-chat-1-line mr-1" }, null, -1)),
                      createTextVNode(toDisplayString(formatNumber(videoDetail.value.stat?.danmaku)), 1)
                    ]),
                    createBaseVNode("span", null, [
                      _cache[6] || (_cache[6] = createBaseVNode("i", { class: "ri-thumb-up-line mr-1" }, null, -1)),
                      createTextVNode(toDisplayString(formatNumber(videoDetail.value.stat?.like)), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("p", null, toDisplayString(videoDetail.value.desc), 1)
                  ]),
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("p", null, toDisplayString(unref(t)("bilibili.player.totalDuration", {
                      duration: formatTotalDuration(videoDetail.value.duration)
                    })), 1)
                  ])
                ])
              ], 2)) : createCommentVNode("", true),
              videoDetail.value?.pages && videoDetail.value.pages.length > 1 ? (openBlock(), createElementBlock("div", {
                key: 3,
                class: normalizeClass(["video-parts", partsListAnimation.value])
              }, [
                createBaseVNode("div", _hoisted_13, [
                  createTextVNode(toDisplayString(unref(t)("bilibili.player.partsList", { count: videoDetail.value.pages.length })) + " ", 1),
                  partLoading.value ? (openBlock(), createBlock(_component_n_spin, {
                    key: 0,
                    size: "small",
                    class: "ml-2"
                  })) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(videoDetail.value.pages, (page) => {
                    return openBlock(), createBlock(_component_n_button, {
                      key: page.cid,
                      type: isCurrentPlayingPage(page) ? "primary" : "default",
                      disabled: partLoading.value,
                      size: "small",
                      class: "part-item",
                      onClick: ($event) => switchPage(page)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(page.part), 1)
                      ]),
                      _: 2
                    }, 1032, ["type", "disabled", "onClick"]);
                  }), 128))
                ])
              ], 2)) : createCommentVNode("", true),
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "pb-20" }, null, -1))
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const BilibiliPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f2d165cc"]]);
export {
  BilibiliPlayer as default
};
