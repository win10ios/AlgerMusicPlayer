import { cL as request, d as defineComponent, a2 as useI18n, s as ref, U as watch, an as onMounted, ao as onUnmounted, v as computed, aW as createBlock, cK as __unplugin_components_6, ap as withCtx, a7 as createBaseVNode, a6 as normalizeClass, a4 as createElementBlock, aa as createCommentVNode, ag as createVNode, a9 as unref, cy as NIcon, a0 as Button, cC as __unplugin_components_0, cA as __unplugin_components_7, aZ as createTextVNode, a8 as toDisplayString, b2 as __unplugin_components_2, T as Transition, bc as __unplugin_components_2$1, ak as openBlock, a1 as nextTick, am as _export_sfc } from "./index-0n6GrGnT.js";
const getTopMv = (params) => {
  return request({
    url: "/mv/all",
    method: "get",
    params
  });
};
const getAllMv = (params) => {
  return request({
    url: "/mv/all",
    method: "get",
    params
  });
};
const getMvUrl = (id) => {
  return request.get("/mv/url", {
    params: {
      id
    }
  });
};
const _hoisted_1 = { class: "mv-detail" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "progress-bar custom-slider" };
const _hoisted_4 = { class: "controls-main" };
const _hoisted_5 = { class: "left-controls" };
const _hoisted_6 = {
  key: 1,
  class: "ri-skip-back-line"
};
const _hoisted_7 = {
  key: 1,
  class: "ri-skip-forward-line"
};
const _hoisted_8 = { class: "time-display" };
const _hoisted_9 = { class: "right-controls" };
const _hoisted_10 = {
  key: 0,
  class: "volume-control custom-slider"
};
const _hoisted_11 = {
  key: 0,
  class: "mode-hint"
};
const _hoisted_12 = { class: "mode-text" };
const _hoisted_13 = { class: "title" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MvPlayer",
  props: {
    show: { type: Boolean, default: false },
    currentMv: { default: void 0 },
    noList: { type: Boolean, default: false }
  },
  emits: ["update:show", "next", "prev"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const PLAY_MODE = {
      Single: "single",
      Auto: "auto"
    };
    const props = __props;
    const emit = __emit;
    const mvUrl = ref();
    const playMode = ref(PLAY_MODE.Auto);
    const videoRef = ref();
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const progress = ref(0);
    const bufferedProgress = ref(0);
    const volume = ref(100);
    const showControls = ref(true);
    let controlsTimer = null;
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    const togglePlay = () => {
      if (!videoRef.value) return;
      if (isPlaying.value) {
        videoRef.value.pause();
      } else {
        videoRef.value.play();
      }
      resetCursorTimer();
    };
    const toggleMute = () => {
      if (!videoRef.value) return;
      if (volume.value === 0) {
        volume.value = 100;
      } else {
        volume.value = 0;
      }
    };
    watch(volume, (newVolume) => {
      if (videoRef.value) {
        videoRef.value.volume = newVolume / 100;
      }
    });
    const handleProgressChange = (value) => {
      if (!videoRef.value || !duration.value) return;
      const newTime = value / 100 * duration.value;
      videoRef.value.currentTime = newTime;
    };
    const handleTimeUpdate = () => {
      if (!videoRef.value) return;
      currentTime.value = videoRef.value.currentTime;
      if (!isDragging.value) {
        progress.value = currentTime.value / duration.value * 100;
      }
      if (videoRef.value.buffered.length > 0) {
        bufferedProgress.value = videoRef.value.buffered.end(0) / duration.value * 100;
      }
    };
    const handleLoadedMetadata = () => {
      if (!videoRef.value) return;
      duration.value = videoRef.value.duration;
    };
    const resetControlsTimer = () => {
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
      showControls.value = true;
      controlsTimer = setTimeout(() => {
        if (isPlaying.value) {
          showControls.value = false;
        }
      }, 3e3);
    };
    const handleMouseMove = () => {
      resetControlsTimer();
      resetCursorTimer();
    };
    onMounted(() => {
      document.addEventListener("mousemove", handleMouseMove);
    });
    onUnmounted(() => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
      if (cursorTimer) {
        clearTimeout(cursorTimer);
      }
    });
    watch(
      () => props.currentMv,
      async (newMv) => {
        if (newMv) {
          await loadMvUrl(newMv);
        }
      }
    );
    const autoPlayBlocked = ref(false);
    const playLoading = ref(false);
    const loadMvUrl = async (mv) => {
      playLoading.value = true;
      autoPlayBlocked.value = false;
      try {
        const res = await getMvUrl(mv.id);
        mvUrl.value = res.data.data.url;
        await nextTick();
        if (videoRef.value) {
          try {
            await videoRef.value.play();
          } catch (error) {
            console.warn("自动播放失败，可能需要用户交互:", error);
            autoPlayBlocked.value = true;
          }
        }
      } catch (error) {
        console.error("加载MV地址失败:", error);
      } finally {
        playLoading.value = false;
      }
    };
    const handleClose = () => {
      emit("update:show", false);
    };
    const handleEnded = () => {
      if (playMode.value === PLAY_MODE.Single) {
        if (props.currentMv) {
          loadMvUrl(props.currentMv);
        }
      } else {
        emit("next", (value) => {
          nextLoading.value = value;
        });
      }
    };
    const togglePlayMode = () => {
      playMode.value = playMode.value === PLAY_MODE.Auto ? PLAY_MODE.Single : PLAY_MODE.Auto;
      showModeHint.value = true;
      setTimeout(() => {
        showModeHint.value = false;
      }, 1500);
    };
    const isDragging = ref(false);
    const videoContainerRef = ref();
    const isFullscreen = ref(false);
    const checkFullscreenAPI = () => {
      const doc = document;
      return {
        requestFullscreen: videoContainerRef.value?.requestFullscreen || videoContainerRef.value?.webkitRequestFullscreen || videoContainerRef.value?.mozRequestFullScreen || videoContainerRef.value?.msRequestFullscreen,
        exitFullscreen: doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen,
        fullscreenElement: doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement,
        fullscreenEnabled: doc.fullscreenEnabled || doc.webkitFullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled
      };
    };
    const toggleFullscreen = async () => {
      const api = checkFullscreenAPI();
      if (!api.fullscreenEnabled) {
        console.warn("全屏API不可用");
        return;
      }
      try {
        if (!api.fullscreenElement) {
          await videoContainerRef.value?.requestFullscreen();
          isFullscreen.value = true;
        } else {
          await document.exitFullscreen();
          isFullscreen.value = false;
        }
      } catch (error) {
        console.error("切换全屏失败:", error);
      }
    };
    const handleFullscreenChange = () => {
      const api = checkFullscreenAPI();
      isFullscreen.value = !!api.fullscreenElement;
    };
    onMounted(() => {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.addEventListener("mozfullscreenchange", handleFullscreenChange);
      document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    });
    onUnmounted(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    });
    const handleKeyPress = (e) => {
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeyPress);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyPress);
    });
    const showModeHint = ref(false);
    const prevLoading = ref(false);
    const nextLoading = ref(false);
    const handlePrev = () => {
      prevLoading.value = true;
      emit("prev", (value) => {
        prevLoading.value = value;
      });
    };
    const handleNext = () => {
      nextLoading.value = true;
      emit("next", (value) => {
        nextLoading.value = value;
      });
    };
    const showCursor = ref(true);
    let cursorTimer = null;
    const resetCursorTimer = () => {
      if (cursorTimer) {
        clearTimeout(cursorTimer);
      }
      showCursor.value = true;
      if (isPlaying.value && !showControls.value) {
        cursorTimer = setTimeout(() => {
          showCursor.value = false;
        }, 3e3);
      }
    };
    watch(isPlaying, (newValue) => {
      if (!newValue) {
        showCursor.value = true;
        if (cursorTimer) {
          clearTimeout(cursorTimer);
        }
      } else {
        resetCursorTimer();
      }
    });
    watch(showControls, (newValue) => {
      if (newValue) {
        showCursor.value = true;
        if (cursorTimer) {
          clearTimeout(cursorTimer);
        }
      } else {
        resetCursorTimer();
      }
    });
    const isMobile = computed(() => false);
    return (_ctx, _cache) => {
      const _component_n_spin = __unplugin_components_2;
      const _component_n_ellipsis = __unplugin_components_2$1;
      const _component_n_drawer = __unplugin_components_6;
      return openBlock(), createBlock(_component_n_drawer, {
        show: __props.show,
        height: "100%",
        placement: "bottom",
        "z-index": 999999999,
        to: `#layout-main`
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", {
              ref_key: "videoContainerRef",
              ref: videoContainerRef,
              class: normalizeClass(["video-container", { "cursor-hidden": !showCursor.value }])
            }, [
              createBaseVNode("video", {
                ref_key: "videoRef",
                ref: videoRef,
                src: mvUrl.value,
                class: "video-player",
                onEnded: handleEnded,
                onTimeupdate: handleTimeUpdate,
                onLoadedmetadata: handleLoadedMetadata,
                onPlay: _cache[0] || (_cache[0] = ($event) => isPlaying.value = true),
                onPause: _cache[1] || (_cache[1] = ($event) => isPlaying.value = false),
                onClick: togglePlay
              }, null, 40, _hoisted_2),
              autoPlayBlocked.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "play-hint",
                onClick: togglePlay
              }, [
                createVNode(unref(Button), {
                  quaternary: "",
                  circle: "",
                  size: "large"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(NIcon), { size: "48" }, {
                      default: withCtx(() => [..._cache[4] || (_cache[4] = [
                        createBaseVNode("i", { class: "ri-play-circle-line" }, null, -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass(["custom-controls", { "controls-hidden": !showControls.value }])
              }, [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(unref(__unplugin_components_0), {
                    value: progress.value,
                    "onUpdate:value": [
                      _cache[2] || (_cache[2] = ($event) => progress.value = $event),
                      handleProgressChange
                    ],
                    min: 0,
                    max: 100,
                    tooltip: false,
                    step: 0.1
                  }, null, 8, ["value"])
                ]),
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("div", _hoisted_5, [
                    !props.noList ? (openBlock(), createBlock(unref(__unplugin_components_7), {
                      key: 0,
                      placement: "top"
                    }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          onClick: handlePrev
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [
                                prevLoading.value ? (openBlock(), createBlock(_component_n_spin, {
                                  key: 0,
                                  size: "small"
                                })) : (openBlock(), createElementBlock("i", _hoisted_6))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("player.previous")), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(unref(__unplugin_components_7), { placement: "top" }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          onClick: togglePlay
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [
                                playLoading.value ? (openBlock(), createBlock(_component_n_spin, {
                                  key: 0,
                                  size: "small"
                                })) : (openBlock(), createElementBlock("i", {
                                  key: 1,
                                  class: normalizeClass(isPlaying.value ? "ri-pause-line" : "ri-play-line")
                                }, null, 2))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(isPlaying.value ? unref(t)("player.pause") : unref(t)("player.play")), 1)
                      ]),
                      _: 1
                    }),
                    !props.noList ? (openBlock(), createBlock(unref(__unplugin_components_7), {
                      key: 1,
                      placement: "top"
                    }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          onClick: handleNext
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [
                                nextLoading.value ? (openBlock(), createBlock(_component_n_spin, {
                                  key: 0,
                                  size: "small"
                                })) : (openBlock(), createElementBlock("i", _hoisted_7))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("player.next")), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_8, toDisplayString(formatTime(currentTime.value)) + " / " + toDisplayString(formatTime(duration.value)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_9, [
                    !isMobile.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                      createVNode(unref(__unplugin_components_7), { placement: "top" }, {
                        trigger: withCtx(() => [
                          createVNode(unref(Button), {
                            quaternary: "",
                            circle: "",
                            onClick: toggleMute
                          }, {
                            icon: withCtx(() => [
                              createVNode(unref(NIcon), { size: "24" }, {
                                default: withCtx(() => [
                                  createBaseVNode("i", {
                                    class: normalizeClass(volume.value === 0 ? "ri-volume-mute-line" : "ri-volume-up-line")
                                  }, null, 2)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(volume.value === 0 ? unref(t)("player.unmute") : unref(t)("player.mute")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(__unplugin_components_0), {
                        value: volume.value,
                        "onUpdate:value": _cache[3] || (_cache[3] = ($event) => volume.value = $event),
                        min: 0,
                        max: 100,
                        tooltip: false,
                        class: "volume-slider"
                      }, null, 8, ["value"])
                    ])) : createCommentVNode("", true),
                    !props.noList ? (openBlock(), createBlock(unref(__unplugin_components_7), {
                      key: 1,
                      placement: "top"
                    }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          class: "play-mode-btn",
                          onClick: togglePlayMode
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [
                                createBaseVNode("i", {
                                  class: normalizeClass(
                                    playMode.value === "single" ? "ri-repeat-one-line" : "ri-play-list-line"
                                  )
                                }, null, 2)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(playMode.value === "single" ? unref(t)("player.modeHint.single") : unref(t)("player.modeHint.list")), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(unref(__unplugin_components_7), { placement: "top" }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          onClick: toggleFullscreen
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [
                                createBaseVNode("i", {
                                  class: normalizeClass(isFullscreen.value ? "ri-fullscreen-exit-line" : "ri-fullscreen-line")
                                }, null, 2)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(isFullscreen.value ? unref(t)("player.fullscreen.exit") : unref(t)("player.fullscreen.enter")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(__unplugin_components_7), { placement: "top" }, {
                      trigger: withCtx(() => [
                        createVNode(unref(Button), {
                          quaternary: "",
                          circle: "",
                          onClick: handleClose
                        }, {
                          icon: withCtx(() => [
                            createVNode(unref(NIcon), { size: "24" }, {
                              default: withCtx(() => [..._cache[5] || (_cache[5] = [
                                createBaseVNode("i", { class: "ri-close-line" }, null, -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("player.close")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ], 2),
              createVNode(Transition, { name: "fade" }, {
                default: withCtx(() => [
                  showModeHint.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                    createVNode(unref(NIcon), {
                      size: "48",
                      class: "mode-icon"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("i", {
                          class: normalizeClass(playMode.value === "single" ? "ri-repeat-one-line" : "ri-play-list-line")
                        }, null, 2)
                      ]),
                      _: 1
                    }),
                    createBaseVNode("div", _hoisted_12, toDisplayString(playMode.value === "single" ? unref(t)("player.modeHint.single") : unref(t)("player.modeHint.list")), 1)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["mv-detail-title", { "title-hidden": !showControls.value }])
            }, [
              createBaseVNode("div", _hoisted_13, [
                createVNode(_component_n_ellipsis, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.currentMv?.name), 1)
                  ]),
                  _: 1
                })
              ])
            ], 2)
          ])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
});
const MvPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84289c8b"]]);
export {
  MvPlayer as M,
  getAllMv as a,
  getTopMv as g
};
