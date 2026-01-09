import { d as defineComponent, a2 as useI18n, aO as usePlayerStore, bd as useMessage, s as ref, v as computed, U as watch, an as onMounted, bl as isElectron, a4 as createElementBlock, a7 as createBaseVNode, aa as createCommentVNode, ag as createVNode, a8 as toDisplayString, a9 as unref, ap as withCtx, aZ as createTextVNode, a0 as Button, a6 as normalizeClass, L as withDirectives, a3 as vShow, ab as Fragment, ad as normalizeStyle, ac as renderList, a5 as withModifiers, cJ as __unplugin_components_5, ak as openBlock, cK as __unplugin_components_6, a$ as getMusicDetail, aM as getImgUrl, am as _export_sfc } from "./index-DEM82Ldr.js";
import { _ as __unplugin_components_1 } from "./Input-D3IxH167.js";
const _hoisted_1 = { class: "download-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-title" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "segment-control" };
const _hoisted_6 = { class: "page-content" };
const _hoisted_7 = { class: "tab-content" };
const _hoisted_8 = { class: "download-list" };
const _hoisted_9 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_10 = { class: "empty-title" };
const _hoisted_11 = { class: "total-progress" };
const _hoisted_12 = { class: "progress-header" };
const _hoisted_13 = { class: "progress-title" };
const _hoisted_14 = { class: "progress-info" };
const _hoisted_15 = { class: "progress-bar-wrapper" };
const _hoisted_16 = { class: "progress-bar" };
const _hoisted_17 = { class: "download-items" };
const _hoisted_18 = { class: "item-left flex items-center gap-3" };
const _hoisted_19 = { class: "item-cover" };
const _hoisted_20 = ["src"];
const _hoisted_21 = { class: "item-info flex items-center gap-4 w-full" };
const _hoisted_22 = ["title"];
const _hoisted_23 = { class: "item-artist min-w-[120px] max-w-[120px] truncate" };
const _hoisted_24 = { class: "item-progress flex-1 min-w-0" };
const _hoisted_25 = { class: "progress-bar" };
const _hoisted_26 = { class: "item-details min-w-[120px] max-w-[120px] flex flex-col items-end" };
const _hoisted_27 = { class: "item-size" };
const _hoisted_28 = { class: "tab-content" };
const _hoisted_29 = { class: "downloaded-list" };
const _hoisted_30 = {
  key: 0,
  class: "loading-state"
};
const _hoisted_31 = { class: "loading-text" };
const _hoisted_32 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_33 = { class: "empty-title" };
const _hoisted_34 = { class: "empty-text" };
const _hoisted_35 = { class: "downloaded-header" };
const _hoisted_36 = { class: "header-info" };
const _hoisted_37 = { class: "downloaded-items" };
const _hoisted_38 = { class: "item-cover" };
const _hoisted_39 = ["src"];
const _hoisted_40 = { class: "item-info flex items-center gap-4 w-full" };
const _hoisted_41 = ["title"];
const _hoisted_42 = { class: "item-artist min-w-[120px] max-w-[120px] flex items-center gap-1 truncate" };
const _hoisted_43 = { class: "item-size min-w-[80px] max-w-[80px] flex items-center gap-1" };
const _hoisted_44 = ["title"];
const _hoisted_45 = ["onClick"];
const _hoisted_46 = { class: "item-actions flex gap-1 ml-2" };
const _hoisted_47 = ["onClick"];
const _hoisted_48 = ["onClick"];
const _hoisted_49 = ["onClick"];
const _hoisted_50 = { class: "modal-header" };
const _hoisted_51 = { class: "modal-body" };
const _hoisted_52 = { class: "modal-footer" };
const _hoisted_53 = { class: "modal-header" };
const _hoisted_54 = { class: "modal-body" };
const _hoisted_55 = { class: "modal-footer" };
const _hoisted_56 = { class: "flex items-center justify-between" };
const _hoisted_57 = { class: "text-lg font-bold" };
const _hoisted_58 = { class: "download-settings" };
const _hoisted_59 = { class: "setting-item" };
const _hoisted_60 = { class: "setting-title" };
const _hoisted_61 = { class: "setting-desc" };
const _hoisted_62 = { class: "flex flex-col gap-2 mt-2" };
const _hoisted_63 = { class: "flex items-center gap-2" };
const _hoisted_64 = { class: "setting-item" };
const _hoisted_65 = { class: "setting-title" };
const _hoisted_66 = { class: "setting-desc" };
const _hoisted_67 = { class: "flex gap-2 my-2" };
const _hoisted_68 = { class: "my-3" };
const _hoisted_69 = { class: "text-sm text-gray-500 mb-2" };
const _hoisted_70 = { class: "flex items-center gap-2" };
const _hoisted_71 = { class: "my-3" };
const _hoisted_72 = { class: "text-sm text-gray-500 mb-2" };
const _hoisted_73 = { class: "format-components" };
const _hoisted_74 = { class: "flex items-center justify-between w-full" };
const _hoisted_75 = { class: "flex items-center" };
const _hoisted_76 = { class: "mt-2 flex gap-2" };
const _hoisted_77 = { class: "my-3" };
const _hoisted_78 = { class: "text-sm text-gray-500 mb-2" };
const _hoisted_79 = { class: "mt-2 text-xs text-amber-500" };
const _hoisted_80 = { class: "format-preview mt-3 bg-gray-100 dark:bg-dark-300 p-2 rounded" };
const _hoisted_81 = { class: "text-xs text-gray-500 mb-1" };
const _hoisted_82 = { class: "preview-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DownloadPage",
  setup(__props) {
    const { t } = useI18n();
    const playerStore = usePlayerStore();
    const message = useMessage();
    const tabName = ref("downloading");
    const downloadList = ref([]);
    const downloadedList = ref(
      JSON.parse(localStorage.getItem("downloadedList") || "[]")
    );
    const downList = computed(() => downloadedList.value);
    const totalProgress = computed(() => {
      if (downloadList.value.length === 0) return 0;
      const total = downloadList.value.reduce((sum, item) => sum + item.progress, 0);
      return total / downloadList.value.length;
    });
    watch(totalProgress, (newVal) => {
      if (newVal === 100) {
        refreshDownloadedList();
      }
    });
    const getStatusText = (item) => {
      switch (item.status) {
        case "downloading":
          return t("download.status.downloading");
        case "completed":
          return t("download.status.completed");
        case "error":
          return t("download.status.failed");
        default:
          return t("download.status.unknown");
      }
    };
    const formatSize = (bytes) => {
      if (!bytes) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${(bytes / k ** i).toFixed(1)} ${sizes[i]}`;
    };
    const copyPath = (path) => {
      navigator.clipboard.writeText(path).then(() => {
        message.success(t("download.path.copied"));
      }).catch((err) => {
        console.error("复制失败:", err);
        message.error(t("download.path.copyFailed"));
      });
    };
    const shortenPath = (path) => {
      if (!path) return "";
      const parts = path.split(/[/\\]/);
      const fileName = parts.pop() || "";
      if (path.length < 30) return path;
      if (parts.length <= 2) return path;
      const start = parts.slice(0, 1).join("/");
      const end = parts.slice(-1).join("/");
      return `${start}/.../${end}/${fileName}`;
    };
    const getLocalFilePath = (path) => {
      if (!path) return "";
      return `local:///${encodeURIComponent(path)}`;
    };
    const openDirectory = (path) => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      window.electron.ipcRenderer.send("open-directory", path);
    };
    const handlePlayMusic = async (item) => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      try {
        const fileExists = await window.electron.ipcRenderer.invoke("check-file-exists", item.path);
        if (!fileExists) {
          message.error(t("download.delete.fileNotFound", { name: item.displayName || item.filename }));
          return;
        }
        const song = {
          id: item.id,
          name: item.displayName || item.filename,
          ar: item.ar?.map((a) => ({
            id: 0,
            name: a.name,
            picId: 0,
            img1v1Id: 0,
            briefDesc: "",
            picUrl: "",
            img1v1Url: "",
            albumSize: 0,
            alias: [],
            trans: "",
            musicSize: 0,
            topicPerson: 0
          })) || [],
          al: {
            name: item.filename,
            id: 0,
            picUrl: item.picUrl,
            pic: 0,
            picId: 0
          },
          picUrl: item.picUrl,
          // 使用本地文件协议
          playMusicUrl: getLocalFilePath(item.path),
          source: "netease",
          count: 0
        };
        console.log("开始播放本地音乐:", song.name, "路径:", song.playMusicUrl);
        await playerStore.setPlay(song);
        playerStore.setPlayMusic(true);
        playerStore.setIsPlay(true);
        message.success(t("download.playStarted", { name: item.displayName || item.filename }));
      } catch (error) {
        console.error("播放音乐失败:", error);
        message.error(t("download.playFailed", { name: item.displayName || item.filename }));
      }
    };
    const showDeleteConfirm = ref(false);
    const itemToDelete = ref(null);
    const handleDelete = (item) => {
      itemToDelete.value = item;
      showDeleteConfirm.value = true;
    };
    const confirmDelete = async () => {
      const item = itemToDelete.value;
      if (!item) return;
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      try {
        const success = await window.electron.ipcRenderer.invoke("delete-downloaded-music", item.path);
        if (success) {
          const newList = downloadedList.value.filter((i) => i.id !== item.id);
          downloadedList.value = newList;
          localStorage.setItem("downloadedList", JSON.stringify(newList));
          message.success(t("download.delete.success"));
        } else {
          message.warning(t("download.delete.fileNotFound"));
        }
      } catch (error) {
        console.error("Failed to delete music:", error);
        message.warning(t("download.delete.recordRemoved"));
      } finally {
        showDeleteConfirm.value = false;
        itemToDelete.value = null;
      }
    };
    const showClearConfirm = ref(false);
    const clearDownloadRecords = async () => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      try {
        downloadedList.value = [];
        localStorage.setItem("downloadedList", "[]");
        await window.electron.ipcRenderer.invoke("clear-downloaded-music");
        message.success(t("download.clear.success"));
      } catch (error) {
        console.error("Failed to clear download records:", error);
        message.error(t("download.clear.failed"));
      } finally {
        showClearConfirm.value = false;
      }
    };
    const isLoadingDownloaded = ref(false);
    const formatSongName = (songInfo) => {
      if (!songInfo) return "";
      const nameFormat = downloadSettings.value.nameFormat || "{songName} - {artistName}";
      const artistName = songInfo.ar?.map((a) => a.name).join("/") || "未知艺术家";
      const songName = songInfo.name || songInfo.filename || "未知歌曲";
      const albumName = songInfo.al?.name || "未知专辑";
      return nameFormat.replace(/\{songName\}/g, songName).replace(/\{artistName\}/g, artistName).replace(/\{albumName\}/g, albumName);
    };
    const refreshDownloadedList = async () => {
      if (isLoadingDownloaded.value) return;
      if (!isElectron || !window.electron?.ipcRenderer) {
        downloadedList.value = [];
        localStorage.setItem("downloadedList", "[]");
        return;
      }
      try {
        isLoadingDownloaded.value = true;
        const list = await window.electron.ipcRenderer.invoke("get-downloaded-music");
        if (!Array.isArray(list) || list.length === 0) {
          downloadedList.value = [];
          localStorage.setItem("downloadedList", "[]");
          return;
        }
        const songIds = list.filter((item) => item.id).map((item) => item.id);
        if (songIds.length === 0) {
          const updatedList = list.map((item) => ({
            ...item,
            displayName: formatSongName(item) || item.filename
          }));
          downloadedList.value = updatedList;
          localStorage.setItem("downloadedList", JSON.stringify(updatedList));
          return;
        }
        try {
          const detailRes = await getMusicDetail(songIds);
          const songDetails = detailRes.data.songs.reduce((acc, song) => {
            acc[song.id] = song;
            return acc;
          }, {});
          const updatedList = list.map((item) => {
            const songDetail = songDetails[item.id];
            const updatedItem = {
              ...item,
              picUrl: songDetail?.al?.picUrl || item.picUrl || "/images/default_cover.png",
              ar: songDetail?.ar || item.ar || [{ name: t("download.localMusic") }],
              name: songDetail?.name || item.name || item.filename
            };
            updatedItem.displayName = formatSongName(updatedItem) || updatedItem.filename;
            return updatedItem;
          });
          downloadedList.value = updatedList;
          localStorage.setItem("downloadedList", JSON.stringify(updatedList));
        } catch (error) {
          console.error("Failed to get music details:", error);
          const updatedList = list.map((item) => ({
            ...item,
            displayName: formatSongName(item) || item.filename
          }));
          downloadedList.value = updatedList;
          localStorage.setItem("downloadedList", JSON.stringify(updatedList));
        }
      } catch (error) {
        console.error("Failed to get downloaded music list:", error);
        downloadedList.value = [];
        localStorage.setItem("downloadedList", "[]");
      } finally {
        isLoadingDownloaded.value = false;
      }
    };
    watch(
      () => tabName.value,
      (newVal) => {
        if (newVal) {
          refreshDownloadedList();
        }
      }
    );
    onMounted(() => {
      refreshDownloadedList();
      if (!isElectron || !window.electron?.ipcRenderer) {
        return;
      }
      const processedDownloads = /* @__PURE__ */ new Set();
      window.electron.ipcRenderer.on("music-download-progress", (_, data) => {
        const existingItem = downloadList.value.find((item) => item.filename === data.filename);
        if (data.progress === 100) {
          data.status = "completed";
        }
        if (existingItem) {
          Object.assign(existingItem, {
            ...data,
            songInfo: data.songInfo || existingItem.songInfo
          });
          if (data.status === "completed") {
            downloadList.value = downloadList.value.filter((item) => item.filename !== data.filename);
          }
        } else {
          downloadList.value.push({
            ...data,
            songInfo: data.songInfo
          });
        }
      });
      window.electron.ipcRenderer.on("music-download-complete", async (_, data) => {
        if (processedDownloads.has(data.filename)) {
          return;
        }
        processedDownloads.add(data.filename);
        if (data.success) {
          downloadList.value = downloadList.value.filter((item) => item.filename !== data.filename);
          setTimeout(() => refreshDownloadedList(), 500);
          message.success(t("download.message.downloadComplete", { filename: data.filename }));
          setTimeout(() => {
            processedDownloads.delete(data.filename);
          }, 1e4);
        } else {
          const existingItem = downloadList.value.find((item) => item.filename === data.filename);
          if (existingItem) {
            Object.assign(existingItem, {
              status: "error",
              error: data.error,
              progress: 0
            });
            setTimeout(() => {
              downloadList.value = downloadList.value.filter((item) => item.filename !== data.filename);
              processedDownloads.delete(data.filename);
            }, 3e3);
          }
          message.error(
            t("download.message.downloadFailed", { filename: data.filename, error: data.error })
          );
        }
      });
      window.electron.ipcRenderer.on("music-download-queued", (_, data) => {
        const existingItem = downloadList.value.find((item) => item.filename === data.filename);
        if (!existingItem) {
          downloadList.value.push({
            filename: data.filename,
            progress: 0,
            loaded: 0,
            total: 0,
            path: "",
            status: "downloading",
            songInfo: data.songInfo
          });
        }
      });
    });
    const showSettingsDrawer = ref(false);
    const downloadSettings = ref({
      path: "",
      nameFormat: "{songName} - {artistName}",
      separator: " - "
    });
    const formatComponents = ref([
      { id: 1, type: "songName" },
      { id: 2, type: "artistName" }
    ]);
    const handleMoveUp = (index) => {
      if (index > 0) {
        const temp = formatComponents.value.splice(index, 1)[0];
        formatComponents.value.splice(index - 1, 0, temp);
      }
    };
    const handleMoveDown = (index) => {
      if (index < formatComponents.value.length - 1) {
        const temp = formatComponents.value.splice(index, 1)[0];
        formatComponents.value.splice(index + 1, 0, temp);
      }
    };
    const addFormatComponent = (type) => {
      if (!formatComponents.value.some((item) => item.type === type)) {
        formatComponents.value.push({
          id: Date.now(),
          type
        });
      }
    };
    const removeFormatComponent = (index) => {
      formatComponents.value.splice(index, 1);
    };
    watch(
      formatComponents,
      (newComponents) => {
        let format = "";
        newComponents.forEach((component, index) => {
          format += `{${component.type}}`;
          if (index < newComponents.length - 1) {
            format += downloadSettings.value.separator;
          }
        });
        downloadSettings.value.nameFormat = format;
      },
      { deep: true }
    );
    watch(
      () => downloadSettings.value.separator,
      (newSeparator) => {
        if (formatComponents.value.length > 1) {
          let format = "";
          formatComponents.value.forEach((component, index) => {
            format += `{${component.type}}`;
            if (index < formatComponents.value.length - 1) {
              format += newSeparator;
            }
          });
          downloadSettings.value.nameFormat = format;
        }
      }
    );
    const formatNamePreview = computed(() => {
      const format = downloadSettings.value.nameFormat;
      return format.replace(/\{songName\}/g, "莫失莫忘").replace(/\{artistName\}/g, "香蜜沉沉烬如霜").replace(/\{albumName\}/g, "电视剧原声带");
    });
    const selectDownloadPath = async () => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      const result = await window.electron.ipcRenderer.invoke("select-directory");
      if (result && !result.canceled && result.filePaths.length > 0) {
        downloadSettings.value.path = result.filePaths[0];
      }
    };
    const openDownloadPath = () => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      if (downloadSettings.value.path) {
        window.electron.ipcRenderer.send("open-directory", downloadSettings.value.path);
      } else {
        message.warning(t("download.settingsPanel.noPathSelected"));
      }
    };
    const saveDownloadSettings = () => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        message.warning(t("download.desktopOnly"));
        return;
      }
      window.electron.ipcRenderer.send(
        "set-store-value",
        "set.downloadPath",
        downloadSettings.value.path
      );
      window.electron.ipcRenderer.send(
        "set-store-value",
        "set.downloadNameFormat",
        downloadSettings.value.nameFormat
      );
      window.electron.ipcRenderer.send(
        "set-store-value",
        "set.downloadSeparator",
        downloadSettings.value.separator
      );
      if (tabName.value === "downloaded") {
        refreshDownloadedList();
      }
      message.success(t("download.settingsPanel.saveSuccess"));
      showSettingsDrawer.value = false;
    };
    const initDownloadSettings = async () => {
      if (!isElectron || !window.electron?.ipcRenderer) {
        return;
      }
      const path = await window.electron.ipcRenderer.invoke("get-store-value", "set.downloadPath");
      const nameFormat = await window.electron.ipcRenderer.invoke(
        "get-store-value",
        "set.downloadNameFormat"
      );
      const separator = await window.electron.ipcRenderer.invoke(
        "get-store-value",
        "set.downloadSeparator"
      );
      downloadSettings.value = {
        path: path || await window.electron.ipcRenderer.invoke("get-downloads-path"),
        nameFormat: nameFormat || "{songName} - {artistName}",
        separator: separator || " - "
      };
      updateFormatComponents();
    };
    const updateFormatComponents = () => {
      const format = downloadSettings.value.nameFormat;
      const matches = Array.from(format.matchAll(/\{(\w+)\}/g));
      if (matches.length === 0) {
        formatComponents.value = [
          { id: 1, type: "songName" },
          { id: 2, type: "artistName" }
        ];
        return;
      }
      formatComponents.value = matches.map((match, index) => ({
        id: index + 1,
        type: match[1]
      }));
    };
    watch(() => downloadSettings.value.nameFormat, updateFormatComponents);
    watch(
      () => downloadSettings.value.nameFormat,
      () => {
        if (downloadedList.value.length > 0) {
          downloadedList.value = downloadedList.value.map((item) => ({
            ...item,
            displayName: formatSongName(item) || item.filename
          }));
          localStorage.setItem("downloadedList", JSON.stringify(downloadedList.value));
        }
      }
    );
    onMounted(() => {
      initDownloadSettings();
    });
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      const _component_n_input = __unplugin_components_1;
      const _component_n_drawer_content = __unplugin_components_5;
      const _component_n_drawer = __unplugin_components_6;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h1", _hoisted_3, toDisplayString(unref(t)("download.title")), 1),
            createBaseVNode("div", _hoisted_4, [
              createVNode(_component_n_button, {
                size: "small",
                onClick: _cache[0] || (_cache[0] = ($event) => showSettingsDrawer.value = true)
              }, {
                icon: withCtx(() => [..._cache[23] || (_cache[23] = [
                  createBaseVNode("i", { class: "iconfont ri-settings-3-line" }, null, -1)
                ])]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("download.settings")), 1)
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", {
                  class: normalizeClass(["segment-item", { active: tabName.value === "downloading" }]),
                  onClick: _cache[1] || (_cache[1] = ($event) => tabName.value = "downloading")
                }, toDisplayString(unref(t)("download.tabs.downloading")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["segment-item", { active: tabName.value === "downloaded" }]),
                  onClick: _cache[2] || (_cache[2] = ($event) => tabName.value = "downloaded")
                }, toDisplayString(unref(t)("download.tabs.downloaded")), 3)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            withDirectives(createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                downloadList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
                  _cache[24] || (_cache[24] = createBaseVNode("div", { class: "empty-icon" }, [
                    createBaseVNode("i", { class: "iconfont ri-download-cloud-2-line" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_10, toDisplayString(unref(t)("download.empty.noTasks")), 1)
                ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", _hoisted_13, toDisplayString(unref(t)("download.progress.total", { progress: totalProgress.value.toFixed(1) })), 1),
                      createBaseVNode("div", _hoisted_14, toDisplayString(downloadList.value.length) + " " + toDisplayString(unref(t)("download.items")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_15, [
                      createBaseVNode("div", _hoisted_16, [
                        createBaseVNode("div", {
                          class: "progress-fill",
                          style: normalizeStyle({ width: `${totalProgress.value}%` })
                        }, null, 4)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_17, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(downloadList.value, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.path,
                        class: "download-item"
                      }, [
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", _hoisted_19, [
                            createBaseVNode("img", {
                              src: unref(getImgUrl)(item.songInfo?.picUrl, "200y200"),
                              alt: "Cover"
                            }, null, 8, _hoisted_20)
                          ]),
                          createBaseVNode("div", _hoisted_21, [
                            createBaseVNode("div", {
                              class: "item-name min-w-[160px] max-w-[160px] truncate",
                              title: item.filename
                            }, toDisplayString(item.filename), 9, _hoisted_22),
                            createBaseVNode("div", _hoisted_23, toDisplayString(item.songInfo?.ar?.map((a) => a.name).join(", ") || unref(t)("download.artist.unknown")), 1),
                            createBaseVNode("div", _hoisted_24, [
                              createBaseVNode("div", _hoisted_25, [
                                createBaseVNode("div", {
                                  class: normalizeClass(["progress-fill", [`status-${item.status}`]]),
                                  style: normalizeStyle({ width: `${item.progress}%` })
                                }, null, 6)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_26, [
                              createBaseVNode("span", _hoisted_27, toDisplayString(formatSize(item.loaded)) + " / " + toDisplayString(formatSize(item.total)), 1),
                              createBaseVNode("span", {
                                class: normalizeClass(["item-status-badge", [`status-${item.status}`]])
                              }, toDisplayString(getStatusText(item)), 3)
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ], 64))
              ])
            ], 512), [
              [vShow, tabName.value === "downloading"]
            ]),
            withDirectives(createBaseVNode("div", _hoisted_28, [
              createBaseVNode("div", _hoisted_29, [
                isLoadingDownloaded.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
                  _cache[25] || (_cache[25] = createBaseVNode("div", { class: "spinner" }, null, -1)),
                  createBaseVNode("span", _hoisted_31, toDisplayString(unref(t)("download.loading")), 1)
                ])) : downloadedList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_32, [
                  _cache[26] || (_cache[26] = createBaseVNode("div", { class: "empty-icon" }, [
                    createBaseVNode("i", { class: "iconfont ri-inbox-archive-line" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_33, toDisplayString(unref(t)("download.empty.noDownloaded")), 1),
                  createBaseVNode("p", _hoisted_34, toDisplayString(unref(t)("download.empty.noDownloadedHint")), 1)
                ])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("div", _hoisted_36, [
                      _cache[27] || (_cache[27] = createBaseVNode("i", { class: "iconfont ri-archive-line" }, null, -1)),
                      createBaseVNode("span", null, toDisplayString(unref(t)("download.count", { count: downloadedList.value.length })), 1)
                    ]),
                    createBaseVNode("button", {
                      class: "clear-button",
                      onClick: _cache[3] || (_cache[3] = ($event) => showClearConfirm.value = true)
                    }, [
                      _cache[28] || (_cache[28] = createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)),
                      createBaseVNode("span", null, toDisplayString(unref(t)("download.clearAll")), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(downList.value, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.path,
                        class: "downloaded-item"
                      }, [
                        createBaseVNode("div", _hoisted_38, [
                          createBaseVNode("img", {
                            src: unref(getImgUrl)(item.picUrl, "200y200"),
                            alt: "Cover"
                          }, null, 8, _hoisted_39)
                        ]),
                        createBaseVNode("div", _hoisted_40, [
                          createBaseVNode("div", {
                            class: "item-name min-w-[160px] max-w-[160px] truncate",
                            title: item.displayName || item.filename
                          }, toDisplayString(item.displayName || item.filename), 9, _hoisted_41),
                          createBaseVNode("div", _hoisted_42, [
                            _cache[29] || (_cache[29] = createBaseVNode("i", { class: "iconfont ri-user-line" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(item.ar?.map((a) => a.name).join(", ")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_43, [
                            _cache[30] || (_cache[30] = createBaseVNode("i", { class: "iconfont ri-file-line" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(formatSize(item.size)), 1)
                          ]),
                          createBaseVNode("div", {
                            class: "item-path min-w-[220px] max-w-[220px] flex items-center gap-1",
                            title: item.path
                          }, [
                            _cache[32] || (_cache[32] = createBaseVNode("i", { class: "iconfont ri-folder-path-line" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(shortenPath(item.path)), 1),
                            createBaseVNode("button", {
                              class: "copy-button",
                              onClick: ($event) => copyPath(item.path)
                            }, [..._cache[31] || (_cache[31] = [
                              createBaseVNode("i", { class: "iconfont ri-file-copy-line" }, null, -1)
                            ])], 8, _hoisted_45)
                          ], 8, _hoisted_44),
                          createBaseVNode("div", _hoisted_46, [
                            createBaseVNode("button", {
                              class: "action-btn play",
                              onClick: ($event) => handlePlayMusic(item)
                            }, [..._cache[33] || (_cache[33] = [
                              createBaseVNode("i", { class: "iconfont ri-play-circle-line" }, null, -1)
                            ])], 8, _hoisted_47),
                            createBaseVNode("button", {
                              class: "action-btn open",
                              onClick: ($event) => openDirectory(item.path)
                            }, [..._cache[34] || (_cache[34] = [
                              createBaseVNode("i", { class: "iconfont ri-folder-open-line" }, null, -1)
                            ])], 8, _hoisted_48),
                            createBaseVNode("button", {
                              class: "action-btn delete",
                              onClick: ($event) => handleDelete(item)
                            }, [..._cache[35] || (_cache[35] = [
                              createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)
                            ])], 8, _hoisted_49)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ], 64))
              ])
            ], 512), [
              [vShow, tabName.value === "downloaded"]
            ])
          ])
        ]),
        showDeleteConfirm.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "modal-overlay",
          onClick: _cache[6] || (_cache[6] = ($event) => showDeleteConfirm.value = false)
        }, [
          createBaseVNode("div", {
            class: "modal-content",
            onClick: _cache[5] || (_cache[5] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", _hoisted_50, [
              _cache[36] || (_cache[36] = createBaseVNode("i", { class: "iconfont ri-error-warning-line" }, null, -1)),
              createBaseVNode("span", null, toDisplayString(unref(t)("download.delete.title")), 1)
            ]),
            createBaseVNode("div", _hoisted_51, toDisplayString(unref(t)("download.delete.message", {
              filename: itemToDelete.value?.displayName || itemToDelete.value?.filename
            })), 1),
            createBaseVNode("div", _hoisted_52, [
              createBaseVNode("button", {
                class: "modal-btn cancel",
                onClick: _cache[4] || (_cache[4] = ($event) => showDeleteConfirm.value = false)
              }, toDisplayString(unref(t)("download.delete.cancel")), 1),
              createBaseVNode("button", {
                class: "modal-btn confirm",
                onClick: confirmDelete
              }, toDisplayString(unref(t)("download.delete.confirm")), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        showClearConfirm.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "modal-overlay",
          onClick: _cache[9] || (_cache[9] = ($event) => showClearConfirm.value = false)
        }, [
          createBaseVNode("div", {
            class: "modal-content",
            onClick: _cache[8] || (_cache[8] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", _hoisted_53, [
              _cache[37] || (_cache[37] = createBaseVNode("i", { class: "iconfont ri-delete-bin-line" }, null, -1)),
              createBaseVNode("span", null, toDisplayString(unref(t)("download.clear.title")), 1)
            ]),
            createBaseVNode("div", _hoisted_54, toDisplayString(unref(t)("download.clear.message")), 1),
            createBaseVNode("div", _hoisted_55, [
              createBaseVNode("button", {
                class: "modal-btn cancel",
                onClick: _cache[7] || (_cache[7] = ($event) => showClearConfirm.value = false)
              }, toDisplayString(unref(t)("download.clear.cancel")), 1),
              createBaseVNode("button", {
                class: "modal-btn confirm",
                onClick: clearDownloadRecords
              }, toDisplayString(unref(t)("download.clear.confirm")), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        createVNode(_component_n_drawer, {
          show: showSettingsDrawer.value,
          "onUpdate:show": _cache[22] || (_cache[22] = ($event) => showSettingsDrawer.value = $event),
          width: 380,
          placement: "right",
          "z-index": 999999999
        }, {
          default: withCtx(() => [
            createVNode(_component_n_drawer_content, { "native-scrollbar": false }, {
              header: withCtx(() => [
                createBaseVNode("div", _hoisted_56, [
                  createBaseVNode("div", _hoisted_57, toDisplayString(unref(t)("download.settingsPanel.title")), 1),
                  createVNode(_component_n_button, {
                    type: "primary",
                    onClick: saveDownloadSettings
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("common.save")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_58, [
                  createBaseVNode("div", _hoisted_59, [
                    createBaseVNode("div", _hoisted_60, toDisplayString(unref(t)("download.settingsPanel.path")), 1),
                    createBaseVNode("div", _hoisted_61, toDisplayString(unref(t)("download.settingsPanel.pathDesc")), 1),
                    createBaseVNode("div", _hoisted_62, [
                      createVNode(_component_n_input, {
                        value: downloadSettings.value.path,
                        "onUpdate:value": _cache[10] || (_cache[10] = ($event) => downloadSettings.value.path = $event),
                        placeholder: unref(t)("download.settingsPanel.pathPlaceholder"),
                        readonly: "",
                        class: "flex-1"
                      }, null, 8, ["value", "placeholder"]),
                      createBaseVNode("div", _hoisted_63, [
                        createVNode(_component_n_button, {
                          class: "flex-1",
                          onClick: selectDownloadPath
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("download.settingsPanel.select")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_n_button, {
                          class: "flex-1",
                          onClick: openDownloadPath
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("download.settingsPanel.open")) + " ", 1),
                            _cache[38] || (_cache[38] = createBaseVNode("i", { class: "iconfont ri-folder-open-line" }, null, -1))
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_64, [
                    createBaseVNode("div", _hoisted_65, toDisplayString(unref(t)("download.settingsPanel.fileFormat")), 1),
                    createBaseVNode("div", _hoisted_66, toDisplayString(unref(t)("download.settingsPanel.fileFormatDesc")), 1),
                    createBaseVNode("div", _hoisted_67, [
                      createVNode(_component_n_button, {
                        size: "small",
                        type: downloadSettings.value.nameFormat === "{songName} - {artistName}" ? "primary" : "default",
                        onClick: _cache[11] || (_cache[11] = ($event) => downloadSettings.value.nameFormat = "{songName} - {artistName}")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("download.settingsPanel.presets.songArtist")), 1)
                        ]),
                        _: 1
                      }, 8, ["type"]),
                      createVNode(_component_n_button, {
                        size: "small",
                        type: downloadSettings.value.nameFormat === "{artistName} - {songName}" ? "primary" : "default",
                        onClick: _cache[12] || (_cache[12] = ($event) => downloadSettings.value.nameFormat = "{artistName} - {songName}")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("download.settingsPanel.presets.artistSong")), 1)
                        ]),
                        _: 1
                      }, 8, ["type"]),
                      createVNode(_component_n_button, {
                        size: "small",
                        type: downloadSettings.value.nameFormat === "{songName}" ? "primary" : "default",
                        onClick: _cache[13] || (_cache[13] = ($event) => downloadSettings.value.nameFormat = "{songName}")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("download.settingsPanel.presets.songOnly")), 1)
                        ]),
                        _: 1
                      }, 8, ["type"])
                    ]),
                    createBaseVNode("div", _hoisted_68, [
                      createBaseVNode("div", _hoisted_69, toDisplayString(unref(t)("download.settingsPanel.separator") || "分隔符"), 1),
                      createBaseVNode("div", _hoisted_70, [
                        createVNode(_component_n_button, {
                          size: "small",
                          type: downloadSettings.value.separator === " - " ? "primary" : "default",
                          onClick: _cache[14] || (_cache[14] = ($event) => downloadSettings.value.separator = " - ")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("download.settingsPanel.separators.dash") || "空格-空格"), 1)
                          ]),
                          _: 1
                        }, 8, ["type"]),
                        createVNode(_component_n_button, {
                          size: "small",
                          type: downloadSettings.value.separator === "_" ? "primary" : "default",
                          onClick: _cache[15] || (_cache[15] = ($event) => downloadSettings.value.separator = "_")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("download.settingsPanel.separators.underscore") || "下划线"), 1)
                          ]),
                          _: 1
                        }, 8, ["type"]),
                        createVNode(_component_n_button, {
                          size: "small",
                          type: downloadSettings.value.separator === " " ? "primary" : "default",
                          onClick: _cache[16] || (_cache[16] = ($event) => downloadSettings.value.separator = " ")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("download.settingsPanel.separators.space") || "空格"), 1)
                          ]),
                          _: 1
                        }, 8, ["type"]),
                        createVNode(_component_n_input, {
                          value: downloadSettings.value.separator,
                          "onUpdate:value": _cache[17] || (_cache[17] = ($event) => downloadSettings.value.separator = $event),
                          size: "small",
                          style: { "width": "100px" },
                          placeholder: "自定义"
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_71, [
                      createBaseVNode("div", _hoisted_72, toDisplayString(unref(t)("download.settingsPanel.dragToArrange")), 1),
                      createBaseVNode("div", _hoisted_73, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(formatComponents.value, (component, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: component.id,
                            class: "format-item"
                          }, [
                            createBaseVNode("div", _hoisted_74, [
                              createBaseVNode("span", null, toDisplayString(unref(t)(`download.settingsPanel.components.${component.type}`)), 1),
                              createBaseVNode("div", _hoisted_75, [
                                createVNode(_component_n_button, {
                                  quaternary: "",
                                  circle: "",
                                  size: "small",
                                  onClick: ($event) => handleMoveUp(index),
                                  disabled: index === 0
                                }, {
                                  icon: withCtx(() => [..._cache[39] || (_cache[39] = [
                                    createBaseVNode("i", { class: "iconfont ri-arrow-up-s-line" }, null, -1)
                                  ])]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_n_button, {
                                  quaternary: "",
                                  circle: "",
                                  size: "small",
                                  onClick: ($event) => handleMoveDown(index),
                                  disabled: index === formatComponents.value.length - 1
                                }, {
                                  icon: withCtx(() => [..._cache[40] || (_cache[40] = [
                                    createBaseVNode("i", { class: "iconfont ri-arrow-down-s-line" }, null, -1)
                                  ])]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_n_button, {
                                  quaternary: "",
                                  circle: "",
                                  size: "small",
                                  onClick: ($event) => removeFormatComponent(index),
                                  disabled: formatComponents.value.length <= 1
                                }, {
                                  icon: withCtx(() => [..._cache[41] || (_cache[41] = [
                                    createBaseVNode("i", { class: "iconfont ri-close-line" }, null, -1)
                                  ])]),
                                  _: 1
                                }, 8, ["onClick", "disabled"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        createBaseVNode("div", _hoisted_76, [
                          createVNode(_component_n_button, {
                            size: "small",
                            onClick: _cache[18] || (_cache[18] = ($event) => addFormatComponent("songName")),
                            disabled: formatComponents.value.some((c) => c.type === "songName")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" +" + toDisplayString(unref(t)("download.settingsPanel.components.songName")), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(_component_n_button, {
                            size: "small",
                            onClick: _cache[19] || (_cache[19] = ($event) => addFormatComponent("artistName")),
                            disabled: formatComponents.value.some((c) => c.type === "artistName")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" +" + toDisplayString(unref(t)("download.settingsPanel.components.artistName")), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(_component_n_button, {
                            size: "small",
                            onClick: _cache[20] || (_cache[20] = ($event) => addFormatComponent("albumName")),
                            disabled: formatComponents.value.some((c) => c.type === "albumName")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" +" + toDisplayString(unref(t)("download.settingsPanel.components.albumName")), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_77, [
                      createBaseVNode("div", _hoisted_78, toDisplayString(unref(t)("download.settingsPanel.customFormat")), 1),
                      createVNode(_component_n_input, {
                        value: downloadSettings.value.nameFormat,
                        "onUpdate:value": _cache[21] || (_cache[21] = ($event) => downloadSettings.value.nameFormat = $event),
                        placeholder: "{artistName} - {songName} - {albumName}"
                      }, null, 8, ["value"])
                    ]),
                    createBaseVNode("div", _hoisted_79, [
                      _cache[42] || (_cache[42] = createBaseVNode("i", { class: "iconfont ri-information-line" }, null, -1)),
                      createTextVNode(" " + toDisplayString(unref(t)("download.settingsPanel.formatVariables")) + ":", 1),
                      _cache[43] || (_cache[43] = createBaseVNode("br", null, null, -1)),
                      _cache[44] || (_cache[44] = createTextVNode(" {songName}, {artistName}, {albumName} ", -1))
                    ]),
                    createBaseVNode("div", _hoisted_80, [
                      createBaseVNode("div", _hoisted_81, toDisplayString(unref(t)("download.settingsPanel.preview")), 1),
                      createBaseVNode("div", _hoisted_82, toDisplayString(formatNamePreview.value), 1)
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["show"])
      ], 64);
    };
  }
});
const DownloadPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97ea95b7"]]);
export {
  DownloadPage as default
};
