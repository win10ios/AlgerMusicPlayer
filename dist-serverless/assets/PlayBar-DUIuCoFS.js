import { d as defineComponent, a2 as useI18n, s as ref, bb as audioService, an as onMounted, a4 as createElementBlock, a7 as createBaseVNode, aZ as createTextVNode, aW as createBlock, aa as createCommentVNode, a8 as toDisplayString, a9 as unref, bl as isElectron, ap as withCtx, ag as createVNode, b0 as Scrollbar, ab as Fragment, ac as renderList, ak as openBlock, cC as __unplugin_components_0, am as _export_sfc, aO as usePlayerStore, dH as storeToRefs, v as computed, U as watch, ao as onUnmounted, a0 as Button, h, dI as __unplugin_components_0$1, cA as __unplugin_components_7, cs as __unplugin_components_2$1, a6 as normalizeClass, bd as useMessage, bY as __unplugin_components_4, dJ as playMusic, dK as SongSourceConfigManager, dL as CacheManager, cp as useSettingsStore, dM as useThrottleFn, dN as nowTime, aU as useArtist, dO as allTime, aM as getImgUrl, aN as NImage, bc as __unplugin_components_2$2, dP as artistList, a5 as withModifiers, aY as isMobile, dQ as isLyricWindowOpen, ad as normalizeStyle, dR as textColors, aJ as setAnimationClass, dS as openLyric, dT as isBilibiliIdMatch, dU as secondToMinute } from "./index-DEM82Ldr.js";
import { u as usePlayMode, _ as _sfc_main$5 } from "./MusicFullWrapper.vue_vue_type_script_setup_true_lang-CXtswhaK.js";
import { _ as __unplugin_components_9 } from "./Tag-DCh4qtFH.js";
import { _ as __unplugin_components_8 } from "./Switch-CrwnJyAS.js";
import { _ as __unplugin_components_2 } from "./Space-B-WWlwyn.js";
import { _ as __unplugin_components_1 } from "./InputNumber-B6WeryiE.js";
import "./Layout-C6XaEWC0.js";
import "./Input-D3IxH167.js";
import "./Add-CBMT917P.js";
const _hoisted_1$4 = { class: "eq-control" };
const _hoisted_2$4 = { class: "eq-header" };
const _hoisted_3$4 = { class: "eq-controls" };
const _hoisted_4$4 = { class: "eq-presets" };
const _hoisted_5$4 = { class: "eq-sliders" };
const _hoisted_6$4 = { class: "freq-label" };
const _hoisted_7$4 = { class: "gain-value" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EQControl",
  setup(__props) {
    const { t } = useI18n();
    const frequencies = [31, 62, 125, 250, 500, 1e3, 2e3, 4e3, 8e3, 16e3];
    const eqValues = ref({});
    const isEnabled = ref(audioService.isEQEnabled());
    const currentPreset = ref(audioService.getCurrentPreset() || "flat");
    const presets = {
      flat: {
        label: t("player.eq.presets.flat"),
        values: Object.fromEntries(frequencies.map((f) => [f, 0]))
      },
      pop: {
        label: t("player.eq.presets.pop"),
        values: {
          31: -1.5,
          62: 3.5,
          125: 5.5,
          250: 3.5,
          500: -0.5,
          1e3: -1.5,
          2e3: 1.5,
          4e3: 2.5,
          8e3: 2.5,
          16e3: 2.5
        }
      },
      rock: {
        label: t("player.eq.presets.rock"),
        values: {
          31: 4.5,
          62: 3.5,
          125: 2,
          250: 0.5,
          500: -0.5,
          1e3: -1,
          2e3: 0.5,
          4e3: 2,
          8e3: 2.5,
          16e3: 3.5
        }
      },
      classical: {
        label: t("player.eq.presets.classical"),
        values: {
          31: 3.5,
          62: 3,
          125: 2.5,
          250: 1.5,
          500: -0.5,
          1e3: -1.5,
          2e3: -1.5,
          4e3: 0.5,
          8e3: 2,
          16e3: 3
        }
      },
      jazz: {
        label: t("player.eq.presets.jazz"),
        values: {
          31: 3,
          62: 2,
          125: 1.5,
          250: 2,
          500: -1,
          1e3: -1.5,
          2e3: -0.5,
          4e3: 1,
          8e3: 2.5,
          16e3: 3
        }
      },
      hiphop: {
        label: t("player.eq.presets.hiphop"),
        values: {
          31: 5,
          62: 4.5,
          125: 3,
          250: 1.5,
          500: -0.5,
          1e3: -1,
          2e3: 0.5,
          4e3: 1.5,
          8e3: 2,
          16e3: 2.5
        }
      },
      vocal: {
        label: t("player.eq.presets.vocal"),
        values: {
          31: -2,
          62: -1.5,
          125: -1,
          250: 0.5,
          500: 2,
          1e3: 3.5,
          2e3: 3,
          4e3: 1.5,
          8e3: 0.5,
          16e3: 0
        }
      },
      dance: {
        label: t("player.eq.presets.dance"),
        values: {
          31: 4,
          62: 3.5,
          125: 2.5,
          250: 1,
          500: 0,
          1e3: -0.5,
          2e3: 1.5,
          4e3: 2.5,
          8e3: 3,
          16e3: 2.5
        }
      },
      acoustic: {
        label: t("player.eq.presets.acoustic"),
        values: {
          31: 2,
          62: 1.5,
          125: 1,
          250: 1.5,
          500: 2,
          1e3: 1.5,
          2e3: 2,
          4e3: 2.5,
          8e3: 2,
          16e3: 1.5
        }
      }
    };
    const presetOptions = Object.entries(presets).map(([value, preset]) => ({
      label: preset.label,
      value
    }));
    const toggleEQ = (enabled) => {
      audioService.setEQEnabled(enabled);
    };
    const applyPreset = (presetName) => {
      currentPreset.value = presetName;
      audioService.setCurrentPreset(presetName);
      const preset = presets[presetName];
      if (preset) {
        Object.entries(preset.values).forEach(([freq, gain]) => {
          updateEQ(freq, gain);
        });
      }
    };
    onMounted(() => {
      const settings = audioService.getAllEQSettings();
      eqValues.value = settings;
      const savedPreset = audioService.getCurrentPreset();
      if (savedPreset && presets[savedPreset]) {
        currentPreset.value = savedPreset;
      }
    });
    const updateEQ = (frequency, gain) => {
      audioService.setEQFrequencyGain(frequency, gain);
      eqValues.value = {
        ...eqValues.value,
        [frequency]: gain
      };
      const currentValues = eqValues.value;
      let matchedPreset = null;
      Object.entries(presets).forEach(([presetName, preset]) => {
        const isMatch = Object.entries(preset.values).every(
          ([freq, value]) => Math.abs(currentValues[freq] - value) < 0.1
        );
        if (isMatch) {
          matchedPreset = presetName;
        }
      });
      if (matchedPreset !== null) {
        currentPreset.value = matchedPreset;
        audioService.setCurrentPreset(matchedPreset);
      } else if (currentPreset.value !== "custom") {
        currentPreset.value = "custom";
        audioService.setCurrentPreset("custom");
      }
    };
    const formatFreq = (freq) => {
      if (freq >= 1e3) {
        return `${freq / 1e3}kHz`;
      }
      return `${freq}Hz`;
    };
    return (_ctx, _cache) => {
      const _component_n_tag = __unplugin_components_9;
      const _component_n_switch = __unplugin_components_8;
      const _component_n_space = __unplugin_components_2;
      const _component_n_scrollbar = Scrollbar;
      const _component_n_slider = __unplugin_components_0;
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("h3", null, [
            createTextVNode(toDisplayString(unref(t)("player.eq.title")) + " ", 1),
            !unref(isElectron) ? (openBlock(), createBlock(_component_n_tag, {
              key: 0,
              type: "warning",
              size: "small",
              round: ""
            }, {
              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                createTextVNode(" 桌面版可用，网页端不支持 ", -1)
              ])]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_3$4, [
            createVNode(_component_n_switch, {
              value: isEnabled.value,
              "onUpdate:value": [
                _cache[0] || (_cache[0] = ($event) => isEnabled.value = $event),
                toggleEQ
              ]
            }, {
              checked: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("player.eq.on")), 1)
              ]),
              unchecked: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("player.eq.off")), 1)
              ]),
              _: 1
            }, 8, ["value"])
          ])
        ]),
        createBaseVNode("div", _hoisted_4$4, [
          createVNode(_component_n_scrollbar, { "x-scrollable": "" }, {
            default: withCtx(() => [
              createVNode(_component_n_space, {
                size: 6,
                wrap: false
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(presetOptions), (preset) => {
                    return openBlock(), createBlock(_component_n_tag, {
                      key: preset.value,
                      type: currentPreset.value === preset.value ? "success" : "default",
                      bordered: false,
                      size: "medium",
                      round: "",
                      clickable: "",
                      onClick: ($event) => applyPreset(preset.value)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(preset.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["type", "onClick"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_5$4, [
          (openBlock(), createElementBlock(Fragment, null, renderList(frequencies, (freq) => {
            return createBaseVNode("div", {
              key: freq,
              class: "eq-slider"
            }, [
              createBaseVNode("div", _hoisted_6$4, toDisplayString(formatFreq(freq)), 1),
              createVNode(_component_n_slider, {
                value: eqValues.value[freq.toString()],
                "onUpdate:value": [($event) => eqValues.value[freq.toString()] = $event, ($event) => updateEQ(freq.toString(), $event)],
                min: -12,
                max: 12,
                step: 0.1,
                vertical: "",
                disabled: !isEnabled.value
              }, null, 8, ["value", "onUpdate:value", "disabled"]),
              createBaseVNode("div", _hoisted_7$4, toDisplayString(eqValues.value[freq.toString()]) + "dB", 1)
            ]);
          }), 64))
        ])
      ]);
    };
  }
});
const EqControl = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ed455286"]]);
const _hoisted_1$3 = { class: "sleep-timer-content" };
const _hoisted_2$3 = { class: "timer-title" };
const _hoisted_3$3 = {
  key: 0,
  class: "sleep-timer-active"
};
const _hoisted_4$3 = { class: "timer-status" };
const _hoisted_5$3 = {
  key: 0,
  class: "timer-value countdown-timer"
};
const _hoisted_6$3 = { class: "timer-value" };
const _hoisted_7$3 = { class: "timer-label" };
const _hoisted_8$3 = { class: "timer-value" };
const _hoisted_9$3 = { class: "timer-label" };
const _hoisted_10$3 = {
  key: 1,
  class: "sleep-timer-options"
};
const _hoisted_11$2 = { class: "option-section" };
const _hoisted_12$1 = { class: "option-title" };
const _hoisted_13$1 = { class: "time-options" };
const _hoisted_14$1 = { class: "custom-time" };
const _hoisted_15$1 = { class: "option-section" };
const _hoisted_16 = { class: "option-title" };
const _hoisted_17 = { class: "songs-options" };
const _hoisted_18 = { class: "custom-songs" };
const _hoisted_19 = { class: "option-section playlist-end-section" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SleepTimer",
  setup(__props) {
    const { t } = useI18n();
    const playerStore = usePlayerStore();
    const { sleepTimer } = storeToRefs(playerStore);
    const customMinutes = ref(30);
    const customSongs = ref(5);
    const refreshTrigger = ref(0);
    const hasTimerActive = computed(() => {
      return playerStore.hasSleepTimerActive;
    });
    const timerType = computed(() => {
      return sleepTimer.value.type;
    });
    const remainingSongs = computed(() => {
      return playerStore.sleepTimerRemainingSongs;
    });
    function handleSetTimeTimer(minutes) {
      playerStore.setSleepTimerByTime(minutes);
    }
    function handleSetSongsTimer(songs) {
      playerStore.setSleepTimerBySongs(songs);
    }
    function handleSetPlaylistEndTimer() {
      playerStore.setSleepTimerAtPlaylistEnd();
    }
    function handleCancelTimer() {
      playerStore.clearSleepTimer();
    }
    const formattedRemainingTime = computed(() => {
      void refreshTrigger.value;
      if (timerType.value !== "time" || !sleepTimer.value.endTime) {
        return "00:00:00";
      }
      const remaining = Math.max(0, sleepTimer.value.endTime - Date.now());
      const totalSeconds = Math.floor(remaining / 1e3);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      const seconds = Math.floor(totalSeconds % 60);
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    });
    let timerInterval = null;
    onMounted(() => {
      if (hasTimerActive.value && timerType.value === "time") {
        startTimerUpdate();
      }
      watch(
        () => [hasTimerActive.value, timerType.value],
        ([newHasTimer, newType]) => {
          if (newHasTimer && newType === "time") {
            startTimerUpdate();
          } else {
            stopTimerUpdate();
          }
        }
      );
    });
    function startTimerUpdate() {
      stopTimerUpdate();
      timerInterval = window.setInterval(() => {
        refreshTrigger.value = Date.now();
      }, 500);
    }
    function stopTimerUpdate() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
    onUnmounted(() => {
      stopTimerUpdate();
    });
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_input_number = __unplugin_components_1;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("h3", _hoisted_2$3, toDisplayString(unref(t)("player.sleepTimer.title")), 1),
        hasTimerActive.value ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          createBaseVNode("div", _hoisted_4$3, [
            timerType.value === "time" ? (openBlock(), createElementBlock("div", _hoisted_5$3, toDisplayString(formattedRemainingTime.value), 1)) : timerType.value === "songs" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", _hoisted_6$3, toDisplayString(remainingSongs.value), 1),
              createBaseVNode("div", _hoisted_7$3, toDisplayString(unref(t)("player.sleepTimer.songsRemaining", { count: remainingSongs.value })), 1)
            ], 64)) : timerType.value === "end" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createBaseVNode("div", _hoisted_8$3, toDisplayString(unref(t)("player.sleepTimer.activeUntilEnd")), 1),
              createBaseVNode("div", _hoisted_9$3, toDisplayString(unref(t)("player.sleepTimer.afterPlaylist")), 1)
            ], 64)) : createCommentVNode("", true)
          ]),
          createVNode(_component_n_button, {
            type: "error",
            class: "cancel-timer-btn",
            onClick: handleCancelTimer,
            round: ""
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("player.sleepTimer.cancel")), 1)
            ]),
            _: 1
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_10$3, [
          createBaseVNode("div", _hoisted_11$2, [
            createBaseVNode("h4", _hoisted_12$1, toDisplayString(unref(t)("player.sleepTimer.timeMode")), 1),
            createBaseVNode("div", _hoisted_13$1, [
              (openBlock(), createElementBlock(Fragment, null, renderList([15, 30, 60, 90], (minutes) => {
                return createVNode(_component_n_button, {
                  key: minutes,
                  size: "small",
                  class: "time-option-btn",
                  onClick: ($event) => handleSetTimeTimer(minutes),
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(minutes) + toDisplayString(unref(t)("player.sleepTimer.minutes")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 64)),
              createBaseVNode("div", _hoisted_14$1, [
                createVNode(_component_n_input_number, {
                  value: customMinutes.value,
                  "onUpdate:value": _cache[0] || (_cache[0] = ($event) => customMinutes.value = $event),
                  min: 1,
                  max: 300,
                  size: "small",
                  class: "custom-time-input",
                  round: ""
                }, null, 8, ["value"]),
                createVNode(_component_n_button, {
                  size: "small",
                  type: "primary",
                  class: "custom-time-btn",
                  disabled: !customMinutes.value,
                  onClick: _cache[1] || (_cache[1] = ($event) => handleSetTimeTimer(customMinutes.value)),
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("player.sleepTimer.set")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_15$1, [
            createBaseVNode("h4", _hoisted_16, toDisplayString(unref(t)("player.sleepTimer.songsMode")), 1),
            createBaseVNode("div", _hoisted_17, [
              (openBlock(), createElementBlock(Fragment, null, renderList([1, 3, 5, 10], (songs) => {
                return createVNode(_component_n_button, {
                  key: songs,
                  size: "small",
                  class: "songs-option-btn",
                  onClick: ($event) => handleSetSongsTimer(songs),
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(songs) + toDisplayString(unref(t)("player.sleepTimer.songs")), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 64)),
              createBaseVNode("div", _hoisted_18, [
                createVNode(_component_n_input_number, {
                  value: customSongs.value,
                  "onUpdate:value": _cache[2] || (_cache[2] = ($event) => customSongs.value = $event),
                  min: 1,
                  max: 50,
                  size: "small",
                  class: "custom-songs-input",
                  round: ""
                }, null, 8, ["value"]),
                createVNode(_component_n_button, {
                  size: "small",
                  type: "primary",
                  class: "custom-songs-btn",
                  disabled: !customSongs.value,
                  onClick: _cache[3] || (_cache[3] = ($event) => handleSetSongsTimer(customSongs.value)),
                  round: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("player.sleepTimer.set")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_19, [
            createVNode(_component_n_button, {
              block: "",
              class: "playlist-end-btn",
              onClick: handleSetPlaylistEndTimer,
              round: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("player.sleepTimer.playlistEnd")), 1)
              ]),
              _: 1
            })
          ])
        ]))
      ]);
    };
  }
});
const SleepTimer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-ce63d1b8"]]);
const _hoisted_1$2 = { class: "advanced-controls-btn" };
const _hoisted_2$2 = {
  key: 0,
  class: "active-indicator"
};
const _hoisted_3$2 = {
  key: 0,
  class: "timer-badge"
};
const _hoisted_4$2 = { class: "eq-modal-content" };
const _hoisted_5$2 = { class: "timer-modal-content" };
const _hoisted_6$2 = { class: "speed-modal-content" };
const _hoisted_7$2 = { class: "speed-controls" };
const _hoisted_8$2 = { class: "speed-options" };
const _hoisted_9$2 = ["onClick"];
const _hoisted_10$2 = { class: "speed-slider" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdvancedControlsPopover",
  setup(__props) {
    const { t } = useI18n();
    const playerStore = usePlayerStore();
    const showDropdown = ref(false);
    const showEQModal = ref(false);
    const showSpeedModal = ref(false);
    const isEQVisible = ref(false);
    watch(showEQModal, (newValue) => {
      if (newValue) {
        playerStore.showSleepTimer = false;
        showSpeedModal.value = false;
      }
    });
    watch(
      () => playerStore.showSleepTimer,
      (newValue) => {
        if (newValue) {
          showEQModal.value = false;
          showSpeedModal.value = false;
        }
      }
    );
    watch(showSpeedModal, (newValue) => {
      if (newValue) {
        showEQModal.value = false;
        playerStore.showSleepTimer = false;
      }
    });
    const playbackRate = computed(() => playerStore.playbackRate);
    const playbackRateOptions = [
      { label: "0.5x", key: 0.5 },
      { label: "0.75x", key: 0.75 },
      { label: "1.0x", key: 1 },
      { label: "1.25x", key: 1.25 },
      { label: "1.5x", key: 1.5 },
      { label: "2.0x", key: 2 }
    ];
    const hasActiveSleepTimer = computed(() => playerStore.hasSleepTimerActive);
    const hasActiveSettings = computed(() => {
      return playbackRate.value !== 1 || hasActiveSleepTimer.value || isEQVisible.value;
    });
    const dropdownOptions = computed(() => [
      {
        label: t("player.playBar.eq"),
        key: "eq",
        icon: () => h("i", { class: "ri-equalizer-line" })
      },
      {
        label: t("player.sleepTimer.title"),
        key: "timer",
        icon: () => h("i", { class: "ri-timer-line" }),
        // 如果有激活的定时器，添加标记
        suffix: () => hasActiveSleepTimer.value ? h("span", { class: "active-option-mark" }) : null
      },
      {
        label: t("player.playBar.playbackSpeed") + `(${playbackRate.value}x)`,
        key: "speed",
        icon: () => h("i", { class: "ri-speed-line" }),
        // 如果播放速度不是1.0，添加标记
        suffix: () => playbackRate.value !== 1 ? h("span", { class: "active-option-mark" }, `${playbackRate.value}x`) : null
      }
    ]);
    const handleSelect = (key) => {
      showEQModal.value = false;
      playerStore.showSleepTimer = false;
      showSpeedModal.value = false;
      switch (key) {
        case "eq":
          showEQModal.value = true;
          break;
        case "timer":
          playerStore.showSleepTimer = true;
          break;
        case "speed":
          showSpeedModal.value = true;
          break;
      }
    };
    const selectSpeed = (speed) => {
      playerStore.setPlaybackRate(speed);
    };
    return (_ctx, _cache) => {
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_dropdown = __unplugin_components_0$1;
      const _component_n_modal = __unplugin_components_2$1;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_n_dropdown, {
          show: showDropdown.value,
          options: dropdownOptions.value,
          trigger: "hover",
          "z-index": 9999999,
          onSelect: handleSelect,
          placement: "top",
          "onUpdate:show": _cache[0] || (_cache[0] = (show) => showDropdown.value = show)
        }, {
          default: withCtx(() => [
            createVNode(_component_n_tooltip, {
              trigger: "hover",
              "z-index": 9999999
            }, {
              trigger: withCtx(() => [
                createBaseVNode("div", _hoisted_1$2, [
                  _cache[8] || (_cache[8] = createBaseVNode("i", { class: "iconfont ri-settings-3-line" }, null, -1)),
                  hasActiveSettings.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
                    hasActiveSleepTimer.value ? (openBlock(), createElementBlock("span", _hoisted_3$2, [..._cache[7] || (_cache[7] = [
                      createBaseVNode("i", { class: "ri-time-line" }, null, -1)
                    ])])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ])
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("player.playBar.advancedControls")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["show", "options"]),
        createVNode(_component_n_modal, {
          show: showEQModal.value,
          "onUpdate:show": _cache[2] || (_cache[2] = ($event) => showEQModal.value = $event),
          "mask-closable": true,
          "unstable-show-mask": false,
          "z-index": 9999999
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("div", {
                class: "modal-close",
                onClick: _cache[1] || (_cache[1] = ($event) => showEQModal.value = false)
              }, [..._cache[9] || (_cache[9] = [
                createBaseVNode("i", { class: "ri-close-line" }, null, -1)
              ])]),
              createVNode(EqControl)
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_n_modal, {
          show: unref(playerStore).showSleepTimer,
          "onUpdate:show": _cache[4] || (_cache[4] = ($event) => unref(playerStore).showSleepTimer = $event),
          "mask-closable": true,
          "unstable-show-mask": false,
          "z-index": 9999999
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_5$2, [
              createBaseVNode("div", {
                class: "modal-close",
                onClick: _cache[3] || (_cache[3] = ($event) => unref(playerStore).showSleepTimer = false)
              }, [..._cache[10] || (_cache[10] = [
                createBaseVNode("i", { class: "ri-close-line" }, null, -1)
              ])]),
              createVNode(SleepTimer)
            ])
          ]),
          _: 1
        }, 8, ["show"]),
        createVNode(_component_n_modal, {
          show: showSpeedModal.value,
          "onUpdate:show": _cache[6] || (_cache[6] = ($event) => showSpeedModal.value = $event),
          "mask-closable": true,
          "unstable-show-mask": false,
          "z-index": 9999999
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_6$2, [
              createBaseVNode("div", {
                class: "modal-close",
                onClick: _cache[5] || (_cache[5] = ($event) => showSpeedModal.value = false)
              }, [..._cache[11] || (_cache[11] = [
                createBaseVNode("i", { class: "ri-close-line" }, null, -1)
              ])]),
              createBaseVNode("h3", null, toDisplayString(unref(t)("player.playBar.playbackSpeed")) + " (" + toDisplayString(playbackRate.value) + "x)", 1),
              createBaseVNode("div", _hoisted_7$2, [
                createBaseVNode("div", _hoisted_8$2, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(playbackRateOptions, (option) => {
                    return createBaseVNode("div", {
                      key: option.key,
                      class: normalizeClass(["speed-option", { active: playbackRate.value === option.key }]),
                      onClick: ($event) => selectSpeed(option.key)
                    }, toDisplayString(option.label), 11, _hoisted_9$2);
                  }), 64))
                ]),
                createBaseVNode("div", _hoisted_10$2, [
                  createVNode(unref(__unplugin_components_0), {
                    value: playbackRate.value,
                    min: 0.25,
                    max: 2,
                    step: 0.01,
                    "onUpdate:value": selectSpeed
                  }, null, 8, ["value"])
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["show"])
      ], 64);
    };
  }
});
const AdvancedControlsPopover = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c19783dd"]]);
const _hoisted_1$1 = { class: "reparse-popover bg-light-100 dark:bg-dark-100 p-4 rounded-xl max-w-60" };
const _hoisted_2$1 = { class: "text-base font-medium mb-2" };
const _hoisted_3$1 = { class: "text-sm opacity-70 mb-3" };
const _hoisted_4$1 = { class: "mb-3" };
const _hoisted_5$1 = { class: "flex flex-col space-y-2" };
const _hoisted_6$1 = ["onClick"];
const _hoisted_7$1 = { class: "flex items-center justify-center w-6 h-6 mr-3 text-lg" };
const _hoisted_8$1 = { class: "flex-1 text-sm whitespace-nowrap overflow-hidden text-ellipsis" };
const _hoisted_9$1 = {
  key: 0,
  class: "w-5 h-5 flex items-center justify-center"
};
const _hoisted_10$1 = {
  key: 1,
  class: "w-5 h-5 flex items-center justify-center"
};
const _hoisted_11$1 = {
  key: 0,
  class: "text-red-500 text-sm"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReparsePopover",
  setup(__props) {
    const playerStore = usePlayerStore();
    const { t } = useI18n();
    const message = useMessage();
    const isReparsing = ref(false);
    const currentReparsingSource = ref(null);
    const selectedSourcesValue = ref([]);
    const isReparse = computed(() => selectedSourcesValue.value.length > 0);
    const musicSourceOptions = ref([
      { label: "MiGu", value: "migu" },
      { label: "KuGou", value: "kugou" },
      { label: "pyncmd", value: "pyncmd" },
      { label: "Bilibili", value: "bilibili" },
      { label: "GdMuisc", value: "gdmusic" }
    ]);
    const isCurrentSource = (source) => {
      return selectedSourcesValue.value.includes(source);
    };
    const getSourceIcon = (source) => {
      const iconMap = {
        migu: "ri-music-2-fill",
        kugou: "ri-music-fill",
        qq: "ri-qq-fill",
        joox: "ri-disc-fill",
        pyncmd: "ri-netease-cloud-music-fill",
        bilibili: "ri-bilibili-fill",
        gdmusic: "ri-google-fill",
        kuwo: "ri-music-fill",
        lxMusic: "ri-leaf-fill"
      };
      return iconMap[source] || "ri-music-2-fill";
    };
    const initSelectedSources = () => {
      const songId = playMusic.value.id;
      const config = SongSourceConfigManager.getConfig(songId);
      if (config) {
        selectedSourcesValue.value = config.sources;
      } else {
        selectedSourcesValue.value = [];
      }
    };
    const clearCustomSource = () => {
      SongSourceConfigManager.clearConfig(playMusic.value.id);
      selectedSourcesValue.value = [];
    };
    const directReparseMusic = async (source) => {
      if (isReparsing.value || playMusic.value.source === "bilibili") {
        return;
      }
      try {
        isReparsing.value = true;
        currentReparsingSource.value = source;
        const songId = Number(playMusic.value.id);
        await CacheManager.clearMusicCache(songId);
        selectedSourcesValue.value = [source];
        SongSourceConfigManager.setConfig(songId, [source], "manual");
        const success = await playerStore.reparseCurrentSong(source, false);
        if (success) {
          message.success(t("player.reparse.success"));
        } else {
          message.error(t("player.reparse.failed"));
        }
      } catch (error) {
        console.error("解析失败:", error);
        message.error(t("player.reparse.failed"));
      } finally {
        isReparsing.value = false;
        currentReparsingSource.value = null;
      }
    };
    watch(
      () => playMusic.value.id,
      () => {
        if (playMusic.value.id) {
          initSelectedSources();
        }
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_popover = __unplugin_components_4;
      return openBlock(), createBlock(_component_n_popover, {
        trigger: "click",
        "z-index": 99999999,
        placement: "top",
        "content-class": "music-source-popover",
        raw: "",
        "show-arrow": false,
        delay: 200
      }, {
        trigger: withCtx(() => [
          createVNode(_component_n_tooltip, {
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              createBaseVNode("i", {
                class: normalizeClass(["iconfont ri-refresh-line", { "text-green-500": isReparse.value, "animate-spin": isReparsing.value }])
              }, null, 2)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("player.playBar.reparse")), 1)
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, toDisplayString(unref(t)("player.reparse.title")), 1),
            createBaseVNode("div", _hoisted_3$1, toDisplayString(unref(t)("player.reparse.desc")), 1),
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(musicSourceOptions.value, (source) => {
                  return openBlock(), createElementBlock("div", {
                    key: source.value,
                    class: normalizeClass(["source-button flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 bg-light-200 dark:bg-dark-200 hover:bg-light-300 dark:hover:bg-dark-300", {
                      "bg-green-50 dark:bg-green-900/20 text-green-500": isCurrentSource(source.value),
                      "opacity-50 cursor-not-allowed": isReparsing.value || unref(playMusic).source === "bilibili"
                    }]),
                    onClick: ($event) => directReparseMusic(source.value)
                  }, [
                    createBaseVNode("div", _hoisted_7$1, [
                      createBaseVNode("i", {
                        class: normalizeClass(getSourceIcon(source.value))
                      }, null, 2)
                    ]),
                    createBaseVNode("div", _hoisted_8$1, toDisplayString(source.label), 1),
                    isReparsing.value && currentReparsingSource.value === source.value ? (openBlock(), createElementBlock("div", _hoisted_9$1, [..._cache[0] || (_cache[0] = [
                      createBaseVNode("i", { class: "ri-loader-4-line animate-spin" }, null, -1)
                    ])])) : isCurrentSource(source.value) ? (openBlock(), createElementBlock("div", _hoisted_10$1, [..._cache[1] || (_cache[1] = [
                      createBaseVNode("i", { class: "ri-check-line" }, null, -1)
                    ])])) : createCommentVNode("", true)
                  ], 10, _hoisted_6$1);
                }), 128))
              ])
            ]),
            unref(playMusic).source === "bilibili" ? (openBlock(), createElementBlock("div", _hoisted_11$1, toDisplayString(unref(t)("player.reparse.bilibiliNotSupported")), 1)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: "text-red-500 text-sm flex items-center bg-light-200 dark:bg-dark-200 rounded-lg p-2 cursor-pointer",
              onClick: clearCustomSource
            }, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex items-center justify-center w-6 h-6 mr-3 text-lg" }, [
                createBaseVNode("i", { class: "ri-close-circle-line" })
              ], -1)),
              createBaseVNode("div", null, toDisplayString(unref(t)("player.reparse.clear")), 1)
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const ReparsePopover = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1d250e90"]]);
const _hoisted_1 = { class: "music-time custom-slider" };
const _hoisted_2 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_3 = { class: "hover-arrow" };
const _hoisted_4 = { class: "hover-content" };
const _hoisted_5 = { class: "hover-text" };
const _hoisted_6 = { class: "music-content" };
const _hoisted_7 = { class: "music-content-title flex items-center" };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = {
  key: 0,
  class: "playback-rate-badge"
};
const _hoisted_10 = { class: "music-content-name" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "music-buttons" };
const _hoisted_13 = { class: "audio-button" };
const _hoisted_14 = { class: "volume-slider" };
const _hoisted_15 = { class: "volume-percentage" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PlayBar",
  setup(__props) {
    const playerStore = usePlayerStore();
    const settingsStore = useSettingsStore();
    const { t } = useI18n();
    const message = useMessage();
    const play = computed(() => playerStore.isPlay);
    const background = ref("#000");
    watch(
      () => playerStore.playMusic,
      async () => {
        if (playMusic && playMusic.value && playMusic.value.backgroundColor) {
          background.value = playMusic.value.backgroundColor;
        }
      },
      { immediate: true, deep: true }
    );
    const throttledSeek = useThrottleFn((value) => {
      audioService.seek(value);
      nowTime.value = value;
    }, 50);
    const dragValue = ref(0);
    const isDragging = ref(false);
    const timeSlider = computed({
      get: () => isDragging.value ? dragValue.value : nowTime.value,
      set: (value) => {
        if (isDragging.value) {
          dragValue.value = value;
          return;
        }
        throttledSeek(value);
      }
    });
    const handleSliderDragStart = () => {
      isDragging.value = true;
      dragValue.value = nowTime.value;
    };
    const handleSliderDragEnd = () => {
      isDragging.value = false;
      audioService.seek(dragValue.value);
      nowTime.value = dragValue.value;
    };
    const formatTooltip = (value) => {
      return `${secondToMinute(value)} / ${secondToMinute(allTime.value)}`;
    };
    const getVolumeIcon = computed(() => {
      if (playerStore.volume === 0) {
        return "ri-volume-mute-line";
      }
      if (playerStore.volume <= 0.5) {
        return "ri-volume-down-line";
      }
      return "ri-volume-up-line";
    });
    const volumeSlider = computed({
      get: () => playerStore.volume * 100,
      set: (value) => {
        playerStore.setVolume(value / 100);
      }
    });
    const mute = () => {
      if (volumeSlider.value === 0) {
        volumeSlider.value = 30;
      } else {
        volumeSlider.value = 0;
      }
    };
    const handleVolumeWheel = (e) => {
      const delta = e.deltaY < 0 ? 5 : -5;
      const newValue = Math.min(Math.max(volumeSlider.value + delta, 0), 100);
      volumeSlider.value = newValue;
    };
    const { playMode, playModeIcon, playModeText, togglePlayMode } = usePlayMode();
    const { playbackRate } = storeToRefs(playerStore);
    function handleNext() {
      playerStore.nextPlay();
    }
    function handlePrev() {
      playerStore.prevPlay();
    }
    const MusicFullRef = ref(null);
    const showSliderTooltip = ref(false);
    const playMusicEvent = async () => {
      try {
        const result = await playerStore.setPlay({ ...playMusic.value });
        if (result) {
          playerStore.setPlayMusic(true);
        }
      } catch (error) {
        console.error("重新获取播放链接失败:", error);
        message.error(t("player.playFailed"));
      }
    };
    const musicFullVisible = computed({
      get: () => playerStore.musicFull,
      set: (value) => {
        playerStore.setMusicFull(value);
      }
    });
    const setMusicFull = () => {
      musicFullVisible.value = !musicFullVisible.value;
      playerStore.setMusicFull(musicFullVisible.value);
      if (musicFullVisible.value) {
        settingsStore.showArtistDrawer = false;
      }
    };
    const isFavorite = computed(() => {
      if (!playMusic || !playMusic.value) return false;
      if (playMusic.value.source === "bilibili" && playMusic.value.bilibiliData?.bvid) {
        return playerStore.favoriteList.some((id) => isBilibiliIdMatch(id, playMusic.value.id));
      }
      return playerStore.favoriteList.includes(playMusic.value.id);
    });
    const toggleFavorite = async (e) => {
      console.log("playMusic.value", playMusic.value);
      e.stopPropagation();
      let favoriteId = playMusic.value.id;
      if (playMusic.value.source === "bilibili" && playMusic.value.bilibiliData?.bvid) {
        if (!String(favoriteId).includes("--")) {
          favoriteId = `${playMusic.value.bilibiliData.bvid}--${playMusic.value.song?.ar?.[0]?.id || 0}--${playMusic.value.bilibiliData.cid}`;
        }
      }
      if (isFavorite.value) {
        playerStore.removeFromFavorite(favoriteId);
      } else {
        playerStore.addToFavorite(favoriteId);
      }
    };
    const openLyricWindow = () => {
      openLyric();
    };
    const { navigateToArtist } = useArtist();
    const handleArtistClick = (id) => {
      musicFullVisible.value = false;
      navigateToArtist(id);
    };
    const openPlayListDrawer = () => {
      playerStore.setPlayListDrawerVisible(true);
    };
    return (_ctx, _cache) => {
      const _component_n_slider = __unplugin_components_0;
      const _component_n_image = NImage;
      const _component_n_ellipsis = __unplugin_components_2$2;
      const _component_n_tooltip = __unplugin_components_7;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["music-play-bar", [
          unref(setAnimationClass)("animate__bounceInUp"),
          musicFullVisible.value ? "play-bar-opcity" : "",
          musicFullVisible.value && MusicFullRef.value?.musicFullRef?.config?.hidePlayBar ? "animate__animated animate__slideOutDown" : ""
        ]]),
        style: normalizeStyle({
          color: musicFullVisible.value ? unref(textColors).theme === "dark" ? "#000000" : "#ffffff" : unref(settingsStore).theme === "dark" ? "#ffffff" : "#000000"
        })
      }, [
        createBaseVNode("div", _hoisted_1, [
          createVNode(_component_n_slider, {
            value: timeSlider.value,
            "onUpdate:value": _cache[0] || (_cache[0] = ($event) => timeSlider.value = $event),
            step: 1,
            max: unref(allTime),
            min: 0,
            "format-tooltip": formatTooltip,
            "show-tooltip": showSliderTooltip.value,
            onMouseenter: _cache[1] || (_cache[1] = ($event) => showSliderTooltip.value = true),
            onMouseleave: _cache[2] || (_cache[2] = ($event) => showSliderTooltip.value = false),
            onDragstart: handleSliderDragStart,
            onDragend: handleSliderDragEnd
          }, null, 8, ["value", "max", "show-tooltip"])
        ]),
        createBaseVNode("div", {
          class: "play-bar-img-wrapper",
          onClick: setMusicFull
        }, [
          createVNode(_component_n_image, {
            src: unref(getImgUrl)(unref(playMusic)?.picUrl, "100y100"),
            class: "play-bar-img",
            lazy: "",
            "preview-disabled": ""
          }, null, 8, ["src"]),
          unref(playMusic)?.playLoading ? (openBlock(), createElementBlock("div", _hoisted_2, [..._cache[7] || (_cache[7] = [
            createBaseVNode("i", { class: "ri-loader-4-line loading-icon" }, null, -1)
          ])])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("i", {
                class: normalizeClass(["text-3xl", musicFullVisible.value ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"])
              }, null, 2),
              createBaseVNode("span", _hoisted_5, toDisplayString(musicFullVisible.value ? unref(t)("player.playBar.collapse") : unref(t)("player.playBar.expand")), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, [
            createVNode(_component_n_ellipsis, {
              class: "text-ellipsis",
              "line-clamp": "1"
            }, {
              default: withCtx(() => [
                createBaseVNode("p", {
                  innerHTML: unref(playMusic)?.name || ""
                }, null, 8, _hoisted_8)
              ]),
              _: 1
            }),
            unref(playbackRate) !== 1 ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(unref(playbackRate)) + "x ", 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_10, [
            createVNode(_component_n_ellipsis, {
              class: "text-ellipsis",
              "line-clamp": "1",
              tooltip: {
                contentStyle: { maxWidth: "600px" },
                zIndex: 99999
              }
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(artistList), (artists, artistsindex) => {
                  return openBlock(), createElementBlock("span", {
                    key: artistsindex,
                    class: "cursor-pointer hover:text-green-500",
                    onClick: ($event) => handleArtistClick(artists.id)
                  }, toDisplayString(artists.name) + toDisplayString(artistsindex < unref(artistList).length - 1 ? " / " : ""), 9, _hoisted_11);
                }), 128))
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", {
            class: "music-buttons-prev",
            onClick: handlePrev
          }, [..._cache[8] || (_cache[8] = [
            createBaseVNode("i", { class: "iconfont icon-prev" }, null, -1)
          ])]),
          createBaseVNode("div", {
            class: "music-buttons-play",
            onClick: playMusicEvent
          }, [
            createBaseVNode("i", {
              class: normalizeClass(["iconfont icon", play.value ? "icon-stop" : "icon-play"])
            }, null, 2)
          ]),
          createBaseVNode("div", {
            class: "music-buttons-next",
            onClick: handleNext
          }, [..._cache[9] || (_cache[9] = [
            createBaseVNode("i", { class: "iconfont icon-next" }, null, -1)
          ])])
        ]),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("div", {
            class: "audio-volume custom-slider",
            onWheel: withModifiers(handleVolumeWheel, ["prevent"])
          }, [
            createBaseVNode("div", {
              class: "volume-icon",
              onClick: mute
            }, [
              createBaseVNode("i", {
                class: normalizeClass(["iconfont", getVolumeIcon.value])
              }, null, 2)
            ]),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, toDisplayString(Math.round(volumeSlider.value)) + "%", 1),
              createVNode(_component_n_slider, {
                value: volumeSlider.value,
                "onUpdate:value": _cache[3] || (_cache[3] = ($event) => volumeSlider.value = $event),
                step: 0.01,
                tooltip: false,
                vertical: ""
              }, null, 8, ["value"])
            ])
          ], 32),
          !unref(isMobile) ? (openBlock(), createBlock(_component_n_tooltip, {
            key: 0,
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              createBaseVNode("i", {
                class: normalizeClass(["iconfont", [unref(playModeIcon), { "intelligence-active": unref(playMode) === 3 }]]),
                onClick: _cache[4] || (_cache[4] = //@ts-ignore
                (...args) => unref(togglePlayMode) && unref(togglePlayMode)(...args))
              }, null, 2)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(playModeText)), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          !unref(isMobile) ? (openBlock(), createBlock(_component_n_tooltip, {
            key: 1,
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              createBaseVNode("i", {
                class: normalizeClass(["iconfont", {
                  "like-active": isFavorite.value,
                  "ri-heart-3-fill": isFavorite.value,
                  "ri-heart-3-line": !isFavorite.value
                }]),
                onClick: toggleFavorite
              }, null, 2)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("player.playBar.like")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          unref(isElectron) ? (openBlock(), createBlock(_component_n_tooltip, {
            key: 2,
            class: "music-lyric",
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              createBaseVNode("i", {
                class: normalizeClass(["iconfont ri-netease-cloud-music-line", { "text-green-500": unref(isLyricWindowOpen), "disabled-icon": !unref(playMusic)?.id }]),
                onClick: _cache[5] || (_cache[5] = ($event) => unref(playMusic)?.id && openLyricWindow())
              }, null, 2)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(playMusic)?.id ? unref(t)("player.playBar.lyric") : unref(t)("player.playBar.noSongPlaying")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          unref(playMusic)?.id && unref(isElectron) ? (openBlock(), createBlock(_component_n_tooltip, {
            key: 3,
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              unref(playMusic)?.id ? (openBlock(), createBlock(ReparsePopover, { key: 0 })) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("player.playBar.reparse")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(AdvancedControlsPopover),
          createVNode(_component_n_tooltip, {
            trigger: "hover",
            "z-index": 9999999
          }, {
            trigger: withCtx(() => [
              createBaseVNode("i", {
                class: "iconfont icon-list text-2xl hover:text-green-500 transition-colors cursor-pointer",
                onClick: openPlayListDrawer
              })
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("player.playBar.playList")), 1)
            ]),
            _: 1
          })
        ]),
        createVNode(_sfc_main$5, {
          ref_key: "MusicFullRef",
          ref: MusicFullRef,
          modelValue: musicFullVisible.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => musicFullVisible.value = $event),
          background: background.value
        }, null, 8, ["modelValue", "background"])
      ], 6);
    };
  }
});
const PlayBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82beec20"]]);
export {
  PlayBar as default
};
