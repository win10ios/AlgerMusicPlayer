import { l } from "./main-Bco1MTsi.js";
import { d as defineComponent, a2 as useI18n, b1 as useRoute, aI as useRouter, aO as usePlayerStore, aT as useRecommendStore, aS as useUserStore, bd as useMessage, s as ref, v as computed, aY as isMobile, an as onMounted, U as watch, ao as onUnmounted, bk as useDownload, a4 as createElementBlock, a7 as createBaseVNode, ag as createVNode, ap as withCtx, a8 as toDisplayString, bc as __unplugin_components_2, aW as createBlock, aa as createCommentVNode, aZ as createTextVNode, a9 as unref, cA as __unplugin_components_7, a6 as normalizeClass, bl as isElectron, bm as __unplugin_components_1, aJ as setAnimationClass, aM as getImgUrl, aN as NImage, a0 as Button, ak as openBlock, b0 as Scrollbar, aR as _sfc_main$1, b2 as __unplugin_components_2$1, bn as PlayBottom, a1 as nextTick, cP as updatePlaylistTracks, cQ as hasPermission, cR as getLoginErrorMessage, cS as subscribeAlbum, cT as subscribePlaylist, a$ as getMusicDetail, am as _export_sfc } from "./index-9WtWgwAm.js";
import { u as usePlaylistHistory, a as useAlbumHistory } from "./PlaylistHistoryHook-CYHM_BRl.js";
import { u as useMusicStore } from "./music-B9G-sT9a.js";
import { _ as __unplugin_components_5 } from "./Avatar-Bj10BTlg.js";
import { _ as __unplugin_components_1$1 } from "./VirtualList-BfnollVL.js";
import { _ as __unplugin_components_1$2 } from "./Input-BWrKoNPd.js";
import "./Tag-Dm9hxVfu.js";
import "./VirtualList-DgLSbW2u.js";
const _hoisted_1 = { class: "music-page" };
const _hoisted_2 = { class: "music-header h-12 flex items-center justify-between" };
const _hoisted_3 = { class: "music-title" };
const _hoisted_4 = { class: "flex-grow flex-1 flex items-center justify-end gap-2" };
const _hoisted_5 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_6 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_7 = {
  key: 2,
  class: "layout-toggle"
};
const _hoisted_8 = { class: "music-content" };
const _hoisted_9 = { class: "music-info" };
const _hoisted_10 = { class: "music-cover" };
const _hoisted_11 = {
  key: 0,
  class: "history-recommend-btn"
};
const _hoisted_12 = {
  key: 0,
  class: "creator-info"
};
const _hoisted_13 = { class: "creator-name" };
const _hoisted_14 = {
  key: 1,
  class: "creator-info"
};
const _hoisted_15 = { class: "creator-name" };
const _hoisted_16 = {
  key: 2,
  class: "music-total"
};
const _hoisted_17 = {
  key: 0,
  class: "music-desc"
};
const _hoisted_18 = { class: "music-list-container" };
const _hoisted_19 = { class: "music-list" };
const _hoisted_20 = { class: "music-list-content" };
const _hoisted_21 = {
  key: 0,
  class: "no-result"
};
const _hoisted_22 = { class: "double-item" };
const _hoisted_23 = {
  key: 0,
  class: "h-36"
};
const pageSize = 40;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "MusicList"
  },
  __name: "MusicListPage",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const playerStore = usePlayerStore();
    const musicStore = useMusicStore();
    const recommendStore = useRecommendStore();
    const userStore = useUserStore();
    const message = useMessage();
    const { addPlaylist } = usePlaylistHistory();
    const { addAlbum } = useAlbumHistory();
    const loading = ref(false);
    const isDailyRecommend = computed(() => route.query.type === "dailyRecommend");
    const isAlbum = computed(() => route.query.type === "album");
    const name = computed(() => {
      if (isDailyRecommend.value) {
        return t("comp.recommendSinger.songlist");
      }
      return musicStore.currentMusicListName || "";
    });
    const songList = computed(() => {
      if (isDailyRecommend.value) {
        return recommendStore.dailyRecommendSongs;
      }
      return musicStore.currentMusicList || [];
    });
    const listInfo = computed(() => {
      if (isDailyRecommend.value) {
        return null;
      }
      return musicStore.currentListInfo || null;
    });
    const canRemove = computed(() => {
      if (isDailyRecommend.value) {
        return false;
      }
      return musicStore.canRemoveSong || false;
    });
    const canCollect = ref(false);
    const isCollected = ref(false);
    const page = ref(0);
    const isLoadingMore = ref(false);
    const displayedSongs = ref([]);
    const loadingList = ref(false);
    const loadedIds = ref(/* @__PURE__ */ new Set());
    const isPlaylistLoading = ref(false);
    const completePlaylist = ref([]);
    const hasMore = ref(true);
    const searchKeyword = ref("");
    const isFullPlaylistLoaded = ref(false);
    const isSearchVisible = ref(false);
    const isCompactLayout = ref(
      isMobile.value ? false : localStorage.getItem("musicListLayout") === "compact"
    );
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
    const total = computed(() => {
      if (listInfo.value?.trackIds) {
        return listInfo.value.trackIds.length;
      }
      return songList.value.length;
    });
    onMounted(() => {
      checkCollectionStatus();
    });
    const getCoverImgUrl = computed(() => {
      const coverImgUrl = listInfo.value?.coverImgUrl || listInfo.value?.picUrl;
      if (coverImgUrl) {
        return coverImgUrl;
      }
      const song = songList.value[0];
      if (song?.picUrl) {
        return song.picUrl;
      }
      if (song?.al?.picUrl) {
        return song.al.picUrl;
      }
      if (song?.album?.picUrl) {
        return song.album.picUrl;
      }
      return "";
    });
    const filteredSongs = computed(() => {
      const sourceList = isDailyRecommend.value ? songList.value : displayedSongs.value;
      const dislikeFilteredList = sourceList.filter(
        (song) => !playerStore.dislikeList.includes(song.id)
      );
      if (!searchKeyword.value) {
        return dislikeFilteredList;
      }
      const keyword = searchKeyword.value.toLowerCase().trim();
      return dislikeFilteredList.filter((song) => {
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
    const resetListState = () => {
      page.value = 0;
      loadedIds.value.clear();
      displayedSongs.value = [];
      completePlaylist.value = [];
      hasMore.value = true;
      loadingList.value = false;
      searchKeyword.value = "";
      isFullPlaylistLoaded.value = false;
    };
    const formatSong = (item) => {
      if (!item) {
        return null;
      }
      return {
        ...item,
        picUrl: item.al?.picUrl || item.picUrl,
        song: {
          artists: item.ar || item.artists,
          name: item.al?.name || item.name,
          id: item.al?.id || item.id
        }
      };
    };
    const loadSongs = async (ids, appendToList = true, updateComplete = false) => {
      if (ids.length === 0) return [];
      try {
        console.log(`请求歌曲详情，ID数量: ${ids.length}`);
        const { data } = await getMusicDetail(ids);
        if (data?.songs) {
          console.log(`API返回歌曲数量: ${data.songs.length}`);
          const { songs } = data;
          let newSongs = songs;
          if (!updateComplete) {
            newSongs = songs.filter((song) => !loadedIds.value.has(song.id));
            console.log(`过滤已加载ID后剩余歌曲数量: ${newSongs.length}`);
          }
          songs.forEach((song) => {
            loadedIds.value.add(song.id);
          });
          if (appendToList) {
            displayedSongs.value.push(...newSongs);
          }
          if (updateComplete) {
            completePlaylist.value.push(...songs);
            console.log(`已添加到完整播放列表，当前完整列表长度: ${completePlaylist.value.length}`);
          }
          return updateComplete ? songs : newSongs;
        }
        console.log("API返回无歌曲数据");
        return [];
      } catch (error) {
        console.error("加载歌曲失败:", error);
      }
      return [];
    };
    const loadFullPlaylist = async () => {
      if (isPlaylistLoading.value || isFullPlaylistLoaded.value) return;
      isPlaylistLoading.value = true;
      const startTime = Date.now();
      console.log(`开始加载完整播放列表，当前显示列表长度: ${displayedSongs.value.length}`);
      try {
        if (!listInfo.value?.trackIds) {
          isFullPlaylistLoaded.value = true;
          console.log("无trackIds信息，使用当前列表作为完整列表");
          return;
        }
        const allIds = listInfo.value.trackIds.map((item) => item.id);
        console.log(`歌单共有歌曲ID: ${allIds.length}首`);
        completePlaylist.value = [];
        const loadedSongIds = /* @__PURE__ */ new Set();
        displayedSongs.value.forEach((song) => {
          loadedSongIds.add(song.id);
          completePlaylist.value.push(song);
        });
        console.log(
          `已有显示歌曲: ${displayedSongs.value.length}首，已有ID数量: ${loadedSongIds.size}`
        );
        const unloadedIds = allIds.filter((id) => !loadedSongIds.has(id));
        console.log(`还需要加载的歌曲ID数量: ${unloadedIds.length}`);
        if (unloadedIds.length === 0) {
          console.log("所有歌曲已加载，无需再次加载");
          isFullPlaylistLoaded.value = true;
          hasMore.value = false;
          return;
        }
        const batchSize = 500;
        for (let i = 0; i < unloadedIds.length; i += batchSize) {
          const batchIds = unloadedIds.slice(i, i + batchSize);
          if (batchIds.length === 0) continue;
          console.log(`请求第${Math.floor(i / batchSize) + 1}批歌曲，数量: ${batchIds.length}`);
          const loadedBatch = await loadSongs(batchIds, false, false);
          if (loadedBatch.length > 0) {
            const newSongs = loadedBatch.filter((song) => !loadedSongIds.has(song.id));
            newSongs.forEach((song) => {
              loadedSongIds.add(song.id);
            });
            console.log(`新增${newSongs.length}首歌曲到显示列表`);
            if (newSongs.length > 0) {
              displayedSongs.value = [...displayedSongs.value, ...newSongs];
              completePlaylist.value.push(...newSongs);
              const currentPlaylist = playerStore.playList;
              if (currentPlaylist.length > 0 && currentPlaylist[0].id === displayedSongs.value[0]?.id) {
                console.log("实时更新当前播放列表");
                playerStore.setPlayList(displayedSongs.value.map(formatSong));
              }
            }
          }
          if (i + batchSize < unloadedIds.length) {
            await new Promise((resolve) => {
              setTimeout(() => resolve(), 100);
            });
          }
        }
        isFullPlaylistLoaded.value = true;
        hasMore.value = false;
        const endTime = Date.now();
        const timeUsed = Math.round((endTime - startTime) / 1e3 * 100) / 100;
        console.log(
          `完整播放列表加载完成，共加载${displayedSongs.value.length}首歌曲，耗时${timeUsed}秒`
        );
        console.log(`歌单应有${allIds.length}首歌，实际加载${displayedSongs.value.length}首`);
        if (displayedSongs.value.length !== allIds.length) {
          console.warn(
            `警告: 加载的歌曲数量(${displayedSongs.value.length})与歌单应有数量(${allIds.length})不符`
          );
          if (displayedSongs.value.length < allIds.length) {
            const loadedIds2 = new Set(displayedSongs.value.map((song) => song.id));
            const missingIds = allIds.filter((id) => !loadedIds2.has(id));
            console.warn(`缺失的歌曲ID: ${missingIds.join(", ")}`);
          }
        }
      } catch (error) {
        console.error("加载完整播放列表失败:", error);
      } finally {
        isPlaylistLoading.value = false;
      }
    };
    const handlePlay = async () => {
      if (searchKeyword.value) {
        playerStore.setPlayList(filteredSongs.value.map(formatSong));
        return;
      }
      saveHistory();
      if (isFullPlaylistLoaded.value && completePlaylist.value.length > 0) {
        playerStore.setPlayList(completePlaylist.value.map(formatSong));
        return;
      }
      playerStore.setPlayList(displayedSongs.value.map(formatSong));
      if (isPlaylistLoading.value) {
        return;
      }
      if (!isFullPlaylistLoaded.value) {
        console.log("播放时继续在后台加载完整列表");
        loadFullPlaylist();
      }
    };
    const handleRemoveSong = async (songId) => {
      if (!listInfo.value?.id || !canRemove.value) return;
      try {
        const res = await updatePlaylistTracks({
          op: "del",
          pid: listInfo.value.id,
          tracks: songId.toString()
        });
        if (res.status === 200) {
          message.success(t("user.message.deleteSuccess"));
          displayedSongs.value = displayedSongs.value.filter((song) => song.id !== songId);
          completePlaylist.value = completePlaylist.value.filter((song) => song.id !== songId);
          const currentPlaylist = playerStore.playList;
          if (currentPlaylist.length > 0 && currentPlaylist[0].id === displayedSongs.value[0]?.id) {
            playerStore.setPlayList(displayedSongs.value.map(formatSong));
          }
          if (musicStore.currentMusicList) {
            musicStore.removeSongFromList(songId);
          }
        } else {
          throw new Error(res.data?.msg || t("user.message.deleteFailed"));
        }
      } catch (error) {
        console.error("删除歌曲失败:", error);
        message.error(error.message || t("user.message.deleteFailed"));
      }
    };
    const loadMoreSongs = async () => {
      if (isFullPlaylistLoaded.value) {
        hasMore.value = false;
        return;
      }
      if (searchKeyword.value) {
        return;
      }
      if (isLoadingMore.value || displayedSongs.value.length >= total.value) {
        hasMore.value = false;
        return;
      }
      isLoadingMore.value = true;
      try {
        const start = displayedSongs.value.length;
        const end = Math.min(start + pageSize, total.value);
        if (listInfo.value?.trackIds) {
          const trackIdsToLoad = listInfo.value.trackIds.slice(start, end).map((item) => item.id).filter((id) => !loadedIds.value.has(id));
          if (trackIdsToLoad.length > 0) {
            await loadSongs(trackIdsToLoad, true, false);
          }
        } else if (start < songList.value.length) {
          const newSongs = songList.value.slice(start, end);
          newSongs.forEach((song) => {
            if (!loadedIds.value.has(song.id)) {
              loadedIds.value.add(song.id);
              displayedSongs.value.push(song);
            }
          });
        }
        hasMore.value = displayedSongs.value.length < total.value;
      } catch (error) {
        console.error("加载更多歌曲失败:", error);
      } finally {
        isLoadingMore.value = false;
        loadingList.value = false;
      }
    };
    const handleVirtualScroll = (e) => {
      if (!e || !e.target) return;
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const threshold = 200;
      if (scrollHeight - scrollTop - clientHeight < threshold && !isLoadingMore.value && hasMore.value && !searchKeyword.value) {
        loadMoreSongs();
      }
    };
    const initSongList = (songs) => {
      if (songs.length > 0) {
        displayedSongs.value = [...songs];
        songs.forEach((song) => loadedIds.value.add(song.id));
        page.value = Math.ceil(songs.length / pageSize);
      }
      hasMore.value = displayedSongs.value.length < total.value;
    };
    watch(
      () => listInfo.value,
      (newListInfo) => {
        if (newListInfo?.trackIds) {
          loadFullPlaylist();
        }
      },
      { deep: true }
    );
    watch(searchKeyword, () => {
      if (!searchKeyword.value && hasMore.value && displayedSongs.value.length < total.value) {
        loadMoreSongs();
      }
    });
    watch(
      songList,
      (newSongs) => {
        resetListState();
        initSongList(newSongs);
        if (hasMore.value && listInfo.value?.trackIds) {
          setTimeout(() => {
            loadMoreSongs();
          }, 300);
        }
      },
      { immediate: true }
    );
    onUnmounted(() => {
      isPlaylistLoading.value = false;
    });
    const toggleLayout = () => {
      isCompactLayout.value = !isCompactLayout.value;
      localStorage.setItem("musicListLayout", isCompactLayout.value ? "compact" : "normal");
    };
    const checkCollectionStatus = () => {
      const type = route.query.type;
      if (type === "playlist" && listInfo.value?.id) {
        canCollect.value = true;
        isCollected.value = listInfo.value.subscribed || false;
      } else if (type === "album" && listInfo.value?.id) {
        canCollect.value = true;
        isCollected.value = userStore.isAlbumCollected(listInfo.value.id);
      } else {
        canCollect.value = false;
        isCollected.value = false;
      }
    };
    const toggleCollect = async () => {
      if (!listInfo.value?.id) return;
      if (!hasPermission(true)) {
        message.error(getLoginErrorMessage(true));
        return;
      }
      const type = route.query.type;
      try {
        loadingList.value = true;
        const tVal = isCollected.value ? 2 : 1;
        const response = type === "album" ? await subscribeAlbum({
          t: tVal,
          id: listInfo.value.id
        }) : await subscribePlaylist({
          t: tVal,
          id: listInfo.value.id
        });
        const res = response.data;
        if (res.code === 200) {
          isCollected.value = !isCollected.value;
          const msgKey = isCollected.value ? "comp.musicList.collectSuccess" : "comp.musicList.cancelCollectSuccess";
          message.success(t(msgKey));
          if (type === "album") {
            if (isCollected.value) {
              userStore.addCollectedAlbum(listInfo.value.id);
              const albumData = {
                id: listInfo.value.id,
                name: listInfo.value.name,
                picUrl: listInfo.value.picUrl || listInfo.value.coverImgUrl,
                size: listInfo.value.size,
                artist: listInfo.value.artist || listInfo.value.artists?.[0]
              };
              userStore.albumList.unshift(albumData);
            } else {
              userStore.removeCollectedAlbum(listInfo.value.id);
              const index = userStore.albumList.findIndex((album) => album.id === listInfo.value.id);
              if (index !== -1) {
                userStore.albumList.splice(index, 1);
              }
            }
            listInfo.value.isSub = isCollected.value;
          } else {
            listInfo.value.subscribed = isCollected.value;
          }
        } else {
          throw new Error(res.msg || t("comp.musicList.operationFailed"));
        }
      } catch (error) {
        console.error(`收藏${type === "album" ? "专辑" : "歌单"}失败:`, error);
        message.error(t("comp.musicList.operationFailed"));
      } finally {
        loadingList.value = false;
      }
    };
    const handlePlayAll = () => {
      if (displayedSongs.value.length === 0) return;
      saveHistory();
      if (searchKeyword.value) {
        playerStore.setPlayList(filteredSongs.value.map(formatSong));
        playerStore.setPlay(formatSong(filteredSongs.value[0]));
        return;
      }
      playerStore.setPlayList(displayedSongs.value.map(formatSong));
      playerStore.setPlay(formatSong(displayedSongs.value[0]));
    };
    const saveHistory = () => {
      if (listInfo.value?.id) {
        if (isAlbum.value) {
          addAlbum({
            id: listInfo.value.id,
            name: listInfo.value.name || "",
            picUrl: listInfo.value.picUrl || listInfo.value.coverImgUrl || "",
            size: listInfo.value.size || displayedSongs.value.length,
            artist: listInfo.value.artist || listInfo.value.artists?.[0]
          });
        } else if (route.query.type === "playlist") {
          addPlaylist({
            id: listInfo.value.id,
            name: listInfo.value.name || "",
            coverImgUrl: listInfo.value.coverImgUrl || listInfo.value.picUrl || "",
            trackCount: listInfo.value.trackCount || displayedSongs.value.length,
            playCount: listInfo.value.playCount,
            creator: listInfo.value.creator
          });
        }
      }
    };
    const addToPlaylist = () => {
      if (displayedSongs.value.length === 0) return;
      const currentList = playerStore.playList;
      const songsToAdd = searchKeyword.value ? filteredSongs.value : displayedSongs.value;
      const newSongs = songsToAdd.filter((song) => !currentList.some((item) => item.id === song.id));
      if (newSongs.length === 0) {
        message.info(t("comp.musicList.songsAlreadyInPlaylist"));
        return;
      }
      const newList = [...currentList, ...newSongs.map(formatSong)];
      playerStore.setPlayList(newList);
      message.success(t("comp.musicList.addToPlaylistSuccess", { count: newSongs.length }));
    };
    const isSelecting = ref(false);
    const selectedSongs = ref([]);
    const { isDownloading, batchDownloadMusic } = useDownload();
    const startSelect = () => {
      isSelecting.value = true;
      selectedSongs.value = [];
    };
    const cancelSelect = () => {
      isSelecting.value = false;
      selectedSongs.value = [];
    };
    const handleSelect = (songId, selected) => {
      if (selected) {
        selectedSongs.value.push(songId);
      } else {
        selectedSongs.value = selectedSongs.value.filter((id) => id !== songId);
      }
    };
    const isAllSelected = computed(() => {
      return filteredSongs.value.length > 0 && selectedSongs.value.length === filteredSongs.value.length;
    });
    const isIndeterminate = computed(() => {
      return selectedSongs.value.length > 0 && selectedSongs.value.length < filteredSongs.value.length;
    });
    const handleSelectAll = (checked) => {
      if (checked) {
        selectedSongs.value = filteredSongs.value.map((song) => song.id);
      } else {
        selectedSongs.value = [];
      }
    };
    const handleBatchDownload = async () => {
      const selectedSongsList = selectedSongs.value.map((songId) => filteredSongs.value.find((s) => s.id === songId)).filter((song) => song);
      await batchDownloadMusic(selectedSongsList);
      cancelSelect();
    };
    const goToHistoryRecommend = () => {
      router.push({ name: "historyRecommend" });
    };
    return (_ctx, _cache) => {
      const _component_n_ellipsis = __unplugin_components_2;
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_checkbox = __unplugin_components_1;
      const _component_n_input = __unplugin_components_1$2;
      const _component_n_image = NImage;
      const _component_n_button = Button;
      const _component_n_avatar = __unplugin_components_5;
      const _component_n_scrollbar = Scrollbar;
      const _component_n_virtual_list = __unplugin_components_1$1;
      const _component_n_spin = __unplugin_components_2$1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_n_ellipsis, {
            "line-clamp": 1,
            class: "flex-shrink-0 mr-3"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, toDisplayString(name.value), 1)
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_n_tooltip, {
              placement: "bottom",
              trigger: "hover"
            }, {
              trigger: withCtx(() => [
                createBaseVNode("div", {
                  class: "action-button hover-green",
                  onClick: handlePlayAll
                }, [..._cache[3] || (_cache[3] = [
                  createBaseVNode("i", { class: "icon iconfont ri-play-fill" }, null, -1)
                ])])
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.playAll")), 1)
              ]),
              _: 1
            }),
            canCollect.value ? (openBlock(), createBlock(_component_n_tooltip, {
              key: 0,
              placement: "bottom",
              trigger: "hover"
            }, {
              trigger: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(["action-button", isCollected.value ? "collected" : "hover-green"]),
                  onClick: toggleCollect
                }, [
                  createBaseVNode("i", {
                    class: normalizeClass(["icon iconfont", isCollected.value ? "ri-heart-fill" : "ri-heart-line"])
                  }, null, 2)
                ], 2)
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(isCollected.value ? unref(t)("comp.musicList.cancelCollect") : unref(t)("comp.musicList.collect")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createVNode(_component_n_tooltip, {
              placement: "bottom",
              trigger: "hover"
            }, {
              trigger: withCtx(() => [
                createBaseVNode("div", {
                  class: "action-button hover-green",
                  onClick: addToPlaylist
                }, [..._cache[4] || (_cache[4] = [
                  createBaseVNode("i", { class: "icon iconfont ri-add-line" }, null, -1)
                ])])
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.addToPlaylist")), 1)
              ]),
              _: 1
            }),
            filteredSongs.value.length > 0 && unref(isElectron) ? (openBlock(), createElementBlock("div", _hoisted_5, [
              !isSelecting.value ? (openBlock(), createBlock(_component_n_tooltip, {
                key: 0,
                placement: "bottom",
                trigger: "hover"
              }, {
                trigger: withCtx(() => [
                  createBaseVNode("div", {
                    class: "action-button hover-green",
                    onClick: startSelect
                  }, [..._cache[5] || (_cache[5] = [
                    createBaseVNode("i", { class: "icon iconfont ri-checkbox-multiple-line" }, null, -1)
                  ])])
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("favorite.batchDownload")), 1)
                ]),
                _: 1
              })) : (openBlock(), createElementBlock("div", _hoisted_6, [
                createVNode(_component_n_checkbox, {
                  checked: isAllSelected.value,
                  indeterminate: isIndeterminate.value,
                  "onUpdate:checked": handleSelectAll
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.selectAll")), 1)
                  ]),
                  _: 1
                }, 8, ["checked", "indeterminate"]),
                createVNode(_component_n_tooltip, {
                  placement: "bottom",
                  trigger: "hover"
                }, {
                  trigger: withCtx(() => [
                    createBaseVNode("div", {
                      class: normalizeClass(["action-button hover-green", {
                        "opacity-50 pointer-events-none": selectedSongs.value.length === 0 || unref(isDownloading)
                      }]),
                      onClick: _cache[0] || (_cache[0] = ($event) => selectedSongs.value.length && !unref(isDownloading) && handleBatchDownload())
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["icon iconfont ri-download-line", { "animate-spin": unref(isDownloading) }])
                      }, null, 2)
                    ], 2)
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(unref(t)("favorite.download", { count: selectedSongs.value.length })), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_n_tooltip, {
                  placement: "bottom",
                  trigger: "hover"
                }, {
                  trigger: withCtx(() => [
                    createBaseVNode("div", {
                      class: "action-button",
                      onClick: cancelSelect
                    }, [..._cache[6] || (_cache[6] = [
                      createBaseVNode("i", { class: "icon iconfont ri-close-line" }, null, -1)
                    ])])
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(unref(t)("common.cancel")), 1)
                  ]),
                  _: 1
                })
              ]))
            ])) : createCommentVNode("", true),
            !unref(isMobile) ? (openBlock(), createElementBlock("div", _hoisted_7, [
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
                "onUpdate:value": _cache[1] || (_cache[1] = ($event) => searchKeyword.value = $event),
                placeholder: unref(t)("comp.musicList.searchSongs"),
                clearable: "",
                round: "",
                size: "small",
                onBlur: handleSearchBlur
              }, {
                prefix: withCtx(() => [..._cache[7] || (_cache[7] = [
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
                  }, [..._cache[8] || (_cache[8] = [
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
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createVNode(_component_n_image, {
                src: unref(getImgUrl)(getCoverImgUrl.value, "500y500"),
                class: normalizeClass(["cover-img", unref(setAnimationClass)("animate__fadeIn")]),
                "preview-disabled": "",
                "object-fit": "cover"
              }, null, 8, ["src", "class"]),
              isDailyRecommend.value && unref(userStore).isVip ? (openBlock(), createElementBlock("div", _hoisted_11, [
                createVNode(_component_n_button, {
                  tertiary: "",
                  round: "",
                  type: "primary",
                  size: "small",
                  onClick: goToHistoryRecommend
                }, {
                  icon: withCtx(() => [..._cache[9] || (_cache[9] = [
                    createBaseVNode("i", { class: "icon iconfont ri-history-line" }, null, -1)
                  ])]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(unref(t)("comp.musicList.historyRecommend")), 1)
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            isAlbum.value && listInfo.value?.artist ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createVNode(_component_n_avatar, {
                round: "",
                size: 24,
                src: unref(getImgUrl)(listInfo.value.artist.picUrl, "50y50")
              }, null, 8, ["src"]),
              createBaseVNode("span", _hoisted_13, toDisplayString(listInfo.value.artist.name), 1)
            ])) : !isAlbum.value && listInfo.value?.creator ? (openBlock(), createElementBlock("div", _hoisted_14, [
              createVNode(_component_n_avatar, {
                round: "",
                size: 24,
                src: unref(getImgUrl)(listInfo.value.creator.avatarUrl, "50y50")
              }, null, 8, ["src"]),
              createBaseVNode("span", _hoisted_15, toDisplayString(listInfo.value.creator.nickname), 1)
            ])) : createCommentVNode("", true),
            total.value ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(unref(t)("player.songNum", { num: total.value })), 1)) : createCommentVNode("", true),
            createVNode(_component_n_scrollbar, { style: { "max-height": "200px" } }, {
              default: withCtx(() => [
                listInfo.value?.description ? (openBlock(), createElementBlock("div", _hoisted_17, toDisplayString(listInfo.value.description), 1)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              createVNode(_component_n_spin, {
                show: loadingList.value || loading.value
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_20, [
                    filteredSongs.value.length === 0 && searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(unref(t)("comp.musicList.noSearchResults")), 1)) : createCommentVNode("", true),
                    createVNode(_component_n_virtual_list, {
                      ref: "songListRef",
                      class: "song-virtual-list",
                      style: { "max-height": "calc(100vh - 130px)" },
                      items: filteredSongs.value,
                      "item-size": isCompactLayout.value ? 50 : 70,
                      "item-resizable": "",
                      "key-field": "id",
                      onScroll: handleVirtualScroll
                    }, {
                      default: withCtx(({ item, index }) => [
                        createBaseVNode("div", null, [
                          createBaseVNode("div", _hoisted_22, [
                            createVNode(_sfc_main$1, {
                              index,
                              compact: isCompactLayout.value,
                              item: formatSong(item),
                              "can-remove": canRemove.value,
                              selectable: isSelecting.value,
                              selected: selectedSongs.value.includes(item.id),
                              onPlay: handlePlay,
                              onRemoveSong: handleRemoveSong,
                              onSelect: _cache[2] || (_cache[2] = (id, selected) => handleSelect(id, selected))
                            }, null, 8, ["index", "compact", "item", "can-remove", "selectable", "selected"])
                          ]),
                          index === filteredSongs.value.length - 1 ? (openBlock(), createElementBlock("div", _hoisted_23)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }, 8, ["items", "item-size"])
                  ])
                ]),
                _: 1
              }, 8, ["show"])
            ])
          ])
        ]),
        createVNode(PlayBottom)
      ]);
    };
  }
});
const MusicListPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f93508bb"]]);
export {
  MusicListPage as default
};
