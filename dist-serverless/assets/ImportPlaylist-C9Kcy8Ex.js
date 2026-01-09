import { cL as request, d as defineComponent, a2 as useI18n, bd as useMessage, s as ref, v as computed, an as onMounted, ao as onUnmounted, a4 as createElementBlock, a7 as createBaseVNode, a8 as toDisplayString, a9 as unref, a6 as normalizeClass, aJ as setAnimationClass, ag as createVNode, aW as createBlock, aa as createCommentVNode, ap as withCtx, ak as openBlock, ab as Fragment, ac as renderList, a0 as Button, aZ as createTextVNode, bm as __unplugin_components_1$1, cV as __unplugin_components_5, b2 as __unplugin_components_2, am as _export_sfc } from "./index-DEM82Ldr.js";
import { _ as __unplugin_components_3, b as __unplugin_components_3$1 } from "./Tabs-DoLYi2VM.js";
import { _ as __unplugin_components_1 } from "./Input-D3IxH167.js";
import "./Add-CBMT917P.js";
function importPlaylist(params) {
  return request.post("/playlist/import/name/task/create", params);
}
function getImportTaskStatus(id) {
  return request({
    url: "/playlist/import/task/status",
    method: "get",
    params: { id }
  });
}
const _hoisted_1 = { class: "import-playlist-page" };
const _hoisted_2 = { class: "import-header-left" };
const _hoisted_3 = { class: "import-desc" };
const _hoisted_4 = { class: "tab-content" };
const _hoisted_5 = { class: "link-inputs" };
const _hoisted_6 = { class: "link-actions" };
const _hoisted_7 = { class: "link-tips" };
const _hoisted_8 = { class: "action-buttons" };
const _hoisted_9 = { class: "tab-content" };
const _hoisted_10 = { class: "text-tips" };
const _hoisted_11 = { class: "text-format" };
const _hoisted_12 = { class: "action-buttons" };
const _hoisted_13 = { class: "tab-content" };
const _hoisted_14 = { class: "metadata-inputs" };
const _hoisted_15 = { class: "metadata-actions" };
const _hoisted_16 = { class: "local-tips" };
const _hoisted_17 = { class: "action-buttons" };
const _hoisted_18 = { class: "status-header" };
const _hoisted_19 = { class: "status-content" };
const _hoisted_20 = { class: "status-item" };
const _hoisted_21 = { class: "status-label" };
const _hoisted_22 = { class: "status-value" };
const _hoisted_23 = { class: "status-item" };
const _hoisted_24 = { class: "status-label" };
const _hoisted_25 = {
  key: 0,
  class: "status-item"
};
const _hoisted_26 = { class: "status-label" };
const _hoisted_27 = { class: "status-value success-count" };
const _hoisted_28 = {
  key: 1,
  class: "status-item"
};
const _hoisted_29 = { class: "status-label" };
const _hoisted_30 = { class: "status-value fail-reason" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImportPlaylist",
  setup(__props) {
    const { t } = useI18n();
    const message = useMessage();
    const linkInputs = ref([{ value: "" }]);
    const textInput = ref("");
    const localMetadata = ref([{ name: "", artist: "", album: "" }]);
    const playlistName = ref("");
    const importToStarPlaylist = ref(false);
    const addLinkRow = () => {
      linkInputs.value.push({ value: "" });
    };
    const removeLinkRow = (index) => {
      linkInputs.value.splice(index, 1);
    };
    const isLinkInputValid = computed(() => {
      return linkInputs.value.some((item) => item.value.trim() !== "");
    });
    const addMetadataRow = () => {
      localMetadata.value.push({ name: "", artist: "", album: "" });
    };
    const removeMetadataRow = (index) => {
      localMetadata.value.splice(index, 1);
    };
    const isLocalMetadataValid = computed(() => {
      return localMetadata.value.some((item) => item.name.trim() !== "");
    });
    const importing = ref(false);
    const taskId = ref("");
    const taskStatus = ref("");
    const successCount = ref(0);
    const failReason = ref("");
    const checkingStatus = ref(false);
    const statusCheckInterval = ref(null);
    const handleImportByLink = async () => {
      if (!isLinkInputValid.value) {
        message.warning(t("comp.playlist.import.emptyLinkWarning"));
        return;
      }
      try {
        importing.value = true;
        const links = linkInputs.value.filter((link) => link.value.trim()).map((link) => link.value.trim());
        const encodedLinks = JSON.stringify(links);
        const params = {
          link: encodedLinks
        };
        if (importToStarPlaylist.value) {
          params.importStarPlaylist = true;
        } else if (playlistName.value) {
          params.playlistName = playlistName.value;
        }
        const res = await importPlaylist(params);
        if (res.data.code === 200) {
          message.success(t("comp.playlist.import.importSuccess"));
          taskId.value = res.data.data.taskId;
          startStatusCheck();
        } else {
          message.error(res.data.message || t("comp.playlist.import.importFailed"));
        }
      } catch (error) {
        console.error("导入歌单失败:", error);
        message.error(t("comp.playlist.import.importFailed"));
      } finally {
        importing.value = false;
      }
    };
    const handleImportByText = async () => {
      if (!textInput.value.trim()) {
        message.warning(t("comp.playlist.import.emptyTextWarning"));
        return;
      }
      try {
        importing.value = true;
        const encodedText = encodeURIComponent(textInput.value);
        const params = {
          text: encodedText
        };
        if (importToStarPlaylist.value) {
          params.importStarPlaylist = true;
        } else if (playlistName.value) {
          params.playlistName = playlistName.value;
        }
        const res = await importPlaylist(params);
        if (res.data.code === 200) {
          message.success(t("comp.playlist.import.importSuccess"));
          taskId.value = res.data.data.taskId;
          startStatusCheck();
        } else {
          message.error(res.data.message || t("comp.playlist.import.importFailed"));
        }
      } catch (error) {
        console.error("导入歌单失败:", error);
        message.error(t("comp.playlist.import.importFailed"));
      } finally {
        importing.value = false;
      }
    };
    const handleImportByLocal = async () => {
      if (!isLocalMetadataValid.value) {
        message.warning(t("comp.playlist.import.emptyLocalWarning"));
        return;
      }
      try {
        importing.value = true;
        const filteredData = localMetadata.value.filter((item) => item.name.trim() !== "");
        const encodedLocal = JSON.stringify(filteredData);
        const params = {
          local: encodedLocal
        };
        if (importToStarPlaylist.value) {
          params.importStarPlaylist = true;
        } else if (playlistName.value) {
          params.playlistName = playlistName.value;
        }
        const res = await importPlaylist(params);
        if (res.data.code === 200) {
          message.success(t("comp.playlist.import.importSuccess"));
          taskId.value = res.data.data.taskId;
          startStatusCheck();
        } else {
          message.error(res.data.message || t("comp.playlist.import.importFailed"));
        }
      } catch (error) {
        console.error("导入歌单失败:", error);
        message.error(t("comp.playlist.import.importFailed"));
      } finally {
        importing.value = false;
      }
    };
    const startStatusCheck = () => {
      if (statusCheckInterval.value) {
        clearInterval(statusCheckInterval.value);
      }
      checkTaskStatus();
      statusCheckInterval.value = window.setInterval(() => {
        checkTaskStatus();
      }, 3e3);
    };
    const checkTaskStatus = async () => {
      if (!taskId.value) return;
      try {
        checkingStatus.value = true;
        const res = await getImportTaskStatus(taskId.value);
        if (res.data.code === 200) {
          if (res.data.data.tasks && res.data.data.tasks.length > 0) {
            const taskData = res.data.data.tasks[0];
            const statusMap = {
              PENDING: "pending",
              PROCESSING: "processing",
              COMPLETE: "success",
              FAILED: "failed"
            };
            taskStatus.value = statusMap[taskData.status] || "pending";
            if (taskStatus.value === "success") {
              successCount.value = taskData.succCount || 0;
              if (statusCheckInterval.value) {
                clearInterval(statusCheckInterval.value);
                statusCheckInterval.value = null;
              }
            } else if (taskStatus.value === "failed") {
              failReason.value = taskData.msg || t("comp.playlist.import.unknownError");
              if (statusCheckInterval.value) {
                clearInterval(statusCheckInterval.value);
                statusCheckInterval.value = null;
              }
            }
          }
        }
      } catch (error) {
        console.error("检查任务状态失败:", error);
      } finally {
        checkingStatus.value = false;
      }
    };
    const refreshStatus = () => {
      checkTaskStatus();
    };
    const getStatusText = (status) => {
      switch (status) {
        case "pending":
          return t("comp.playlist.import.statusPending");
        case "processing":
          return t("comp.playlist.import.statusProcessing");
        case "success":
          return t("comp.playlist.import.statusSuccess");
        case "failed":
          return t("comp.playlist.import.statusFailed");
        default:
          return t("comp.playlist.import.statusUnknown");
      }
    };
    onMounted(() => {
      if (taskId.value) {
        startStatusCheck();
      }
    });
    onUnmounted(() => {
      if (statusCheckInterval.value) {
        clearInterval(statusCheckInterval.value);
        statusCheckInterval.value = null;
      }
    });
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_button = Button;
      const _component_n_checkbox = __unplugin_components_1$1;
      const _component_n_tab_pane = __unplugin_components_3$1;
      const _component_n_tabs = __unplugin_components_3;
      const _component_n_card = __unplugin_components_5;
      const _component_n_spin = __unplugin_components_2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["import-header", unref(setAnimationClass)("animate__fadeInLeft")])
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h2", null, toDisplayString(unref(t)("comp.playlist.import.title")), 1),
            createBaseVNode("div", _hoisted_3, toDisplayString(unref(t)("comp.playlist.import.description")), 1)
          ])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["import-content", unref(setAnimationClass)("animate__fadeInUp")])
        }, [
          createVNode(_component_n_card, { class: "import-card" }, {
            default: withCtx(() => [
              createVNode(_component_n_tabs, {
                type: "line",
                animated: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_tab_pane, {
                    name: "link",
                    tab: unref(t)("comp.playlist.import.linkTab")
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_4, [
                        createBaseVNode("div", _hoisted_5, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(linkInputs.value, (link, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: index,
                              class: "link-row"
                            }, [
                              createVNode(_component_n_input, {
                                value: link.value,
                                "onUpdate:value": ($event) => link.value = $event,
                                placeholder: unref(t)("comp.playlist.import.linkPlaceholder"),
                                class: "link-input"
                              }, null, 8, ["value", "onUpdate:value", "placeholder"]),
                              linkInputs.value.length > 1 ? (openBlock(), createBlock(_component_n_button, {
                                key: 0,
                                quaternary: "",
                                circle: "",
                                type: "error",
                                onClick: ($event) => removeLinkRow(index)
                              }, {
                                icon: withCtx(() => [..._cache[7] || (_cache[7] = [
                                  createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)
                                ])]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ]);
                          }), 128)),
                          createBaseVNode("div", _hoisted_6, [
                            createVNode(_component_n_button, {
                              onClick: addLinkRow,
                              secondary: "",
                              size: "small"
                            }, {
                              icon: withCtx(() => [..._cache[8] || (_cache[8] = [
                                createBaseVNode("i", { class: "iconfont ri-add-line" }, null, -1)
                              ])]),
                              default: withCtx(() => [
                                createTextVNode(" " + toDisplayString(unref(t)("comp.playlist.import.addLinkButton")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_7, [
                          createBaseVNode("p", null, toDisplayString(unref(t)("comp.playlist.import.linkTips")), 1),
                          createBaseVNode("ul", null, [
                            createBaseVNode("li", null, toDisplayString(unref(t)("comp.playlist.import.linkTip1")), 1),
                            createBaseVNode("li", null, toDisplayString(unref(t)("comp.playlist.import.linkTip2")), 1),
                            createBaseVNode("li", null, toDisplayString(unref(t)("comp.playlist.import.linkTip3")), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_8, [
                          createVNode(_component_n_checkbox, {
                            checked: importToStarPlaylist.value,
                            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => importToStarPlaylist.value = $event)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importToStarPlaylist")), 1)
                            ]),
                            _: 1
                          }, 8, ["checked"]),
                          !importToStarPlaylist.value ? (openBlock(), createBlock(_component_n_input, {
                            key: 0,
                            value: playlistName.value,
                            "onUpdate:value": _cache[1] || (_cache[1] = ($event) => playlistName.value = $event),
                            placeholder: unref(t)("comp.playlist.import.playlistNamePlaceholder"),
                            class: "playlist-name-input"
                          }, null, 8, ["value", "placeholder"])) : createCommentVNode("", true),
                          createVNode(_component_n_button, {
                            type: "primary",
                            loading: importing.value,
                            disabled: !isLinkInputValid.value,
                            onClick: handleImportByLink
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importButton")), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["tab"]),
                  createVNode(_component_n_tab_pane, {
                    name: "text",
                    tab: unref(t)("comp.playlist.import.textTab")
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9, [
                        createVNode(_component_n_input, {
                          value: textInput.value,
                          "onUpdate:value": _cache[2] || (_cache[2] = ($event) => textInput.value = $event),
                          type: "textarea",
                          placeholder: unref(t)("comp.playlist.import.textPlaceholder"),
                          rows: 6
                        }, null, 8, ["value", "placeholder"]),
                        createBaseVNode("div", _hoisted_10, [
                          createBaseVNode("p", null, toDisplayString(unref(t)("comp.playlist.import.textTips")), 1),
                          createBaseVNode("p", _hoisted_11, toDisplayString(unref(t)("comp.playlist.import.textFormat")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_12, [
                          createVNode(_component_n_checkbox, {
                            checked: importToStarPlaylist.value,
                            "onUpdate:checked": _cache[3] || (_cache[3] = ($event) => importToStarPlaylist.value = $event)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importToStarPlaylist")), 1)
                            ]),
                            _: 1
                          }, 8, ["checked"]),
                          !importToStarPlaylist.value ? (openBlock(), createBlock(_component_n_input, {
                            key: 0,
                            value: playlistName.value,
                            "onUpdate:value": _cache[4] || (_cache[4] = ($event) => playlistName.value = $event),
                            placeholder: unref(t)("comp.playlist.import.playlistNamePlaceholder"),
                            class: "playlist-name-input"
                          }, null, 8, ["value", "placeholder"])) : createCommentVNode("", true),
                          createVNode(_component_n_button, {
                            type: "primary",
                            loading: importing.value,
                            disabled: !textInput.value.trim(),
                            onClick: handleImportByText
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importButton")), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["tab"]),
                  createVNode(_component_n_tab_pane, {
                    name: "local",
                    tab: unref(t)("comp.playlist.import.localTab")
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_13, [
                        createBaseVNode("div", _hoisted_14, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(localMetadata.value, (item, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: index,
                              class: "metadata-row"
                            }, [
                              createVNode(_component_n_input, {
                                value: item.name,
                                "onUpdate:value": ($event) => item.name = $event,
                                placeholder: unref(t)("comp.playlist.import.songNamePlaceholder"),
                                class: "metadata-input"
                              }, null, 8, ["value", "onUpdate:value", "placeholder"]),
                              createVNode(_component_n_input, {
                                value: item.artist,
                                "onUpdate:value": ($event) => item.artist = $event,
                                placeholder: unref(t)("comp.playlist.import.artistNamePlaceholder"),
                                class: "metadata-input"
                              }, null, 8, ["value", "onUpdate:value", "placeholder"]),
                              createVNode(_component_n_input, {
                                value: item.album,
                                "onUpdate:value": ($event) => item.album = $event,
                                placeholder: unref(t)("comp.playlist.import.albumNamePlaceholder"),
                                class: "metadata-input"
                              }, null, 8, ["value", "onUpdate:value", "placeholder"]),
                              localMetadata.value.length > 1 ? (openBlock(), createBlock(_component_n_button, {
                                key: 0,
                                quaternary: "",
                                circle: "",
                                type: "error",
                                onClick: ($event) => removeMetadataRow(index)
                              }, {
                                icon: withCtx(() => [..._cache[9] || (_cache[9] = [
                                  createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)
                                ])]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ]);
                          }), 128)),
                          createBaseVNode("div", _hoisted_15, [
                            createVNode(_component_n_button, {
                              onClick: addMetadataRow,
                              secondary: "",
                              size: "small"
                            }, {
                              icon: withCtx(() => [..._cache[10] || (_cache[10] = [
                                createBaseVNode("i", { class: "iconfont ri-add-line" }, null, -1)
                              ])]),
                              default: withCtx(() => [
                                createTextVNode(" " + toDisplayString(unref(t)("comp.playlist.import.addSongButton")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_16, [
                          createBaseVNode("p", null, toDisplayString(unref(t)("comp.playlist.import.localTips")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_17, [
                          createVNode(_component_n_checkbox, {
                            checked: importToStarPlaylist.value,
                            "onUpdate:checked": _cache[5] || (_cache[5] = ($event) => importToStarPlaylist.value = $event)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importToStarPlaylist")), 1)
                            ]),
                            _: 1
                          }, 8, ["checked"]),
                          !importToStarPlaylist.value ? (openBlock(), createBlock(_component_n_input, {
                            key: 0,
                            value: playlistName.value,
                            "onUpdate:value": _cache[6] || (_cache[6] = ($event) => playlistName.value = $event),
                            placeholder: unref(t)("comp.playlist.import.playlistNamePlaceholder"),
                            class: "playlist-name-input"
                          }, null, 8, ["value", "placeholder"])) : createCommentVNode("", true),
                          createVNode(_component_n_button, {
                            type: "primary",
                            loading: importing.value,
                            disabled: !isLocalMetadataValid.value,
                            onClick: handleImportByLocal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlist.import.importButton")), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["tab"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          taskId.value ? (openBlock(), createBlock(_component_n_card, {
            key: 0,
            class: "import-status-card"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("h3", null, toDisplayString(unref(t)("comp.playlist.import.importStatus")), 1),
                createVNode(_component_n_button, {
                  text: "",
                  onClick: refreshStatus
                }, {
                  icon: withCtx(() => [..._cache[11] || (_cache[11] = [
                    createBaseVNode("i", { class: "iconfont ri-refresh-line" }, null, -1)
                  ])]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(unref(t)("comp.playlist.import.refresh")), 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_n_spin, { show: checkingStatus.value }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("comp.playlist.import.taskId")) + ":", 1),
                      createBaseVNode("span", _hoisted_22, toDisplayString(taskId.value), 1)
                    ]),
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("span", _hoisted_24, toDisplayString(unref(t)("comp.playlist.import.status")) + ":", 1),
                      createBaseVNode("span", {
                        class: normalizeClass(["status-value", `status-${taskStatus.value}`])
                      }, toDisplayString(getStatusText(taskStatus.value)), 3)
                    ]),
                    taskStatus.value === "success" ? (openBlock(), createElementBlock("div", _hoisted_25, [
                      createBaseVNode("span", _hoisted_26, toDisplayString(unref(t)("comp.playlist.import.successCount")) + ":", 1),
                      createBaseVNode("span", _hoisted_27, toDisplayString(successCount.value), 1)
                    ])) : createCommentVNode("", true),
                    taskStatus.value === "failed" ? (openBlock(), createElementBlock("div", _hoisted_28, [
                      createBaseVNode("span", _hoisted_29, toDisplayString(unref(t)("comp.playlist.import.failReason")) + ":", 1),
                      createBaseVNode("span", _hoisted_30, toDisplayString(failReason.value), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }, 8, ["show"])
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 2)
      ]);
    };
  }
});
const ImportPlaylist = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf97f042"]]);
export {
  ImportPlaylist as default
};
