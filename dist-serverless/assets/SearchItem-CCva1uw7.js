import { d as defineComponent, s as ref, aO as usePlayerStore, aI as useRouter, a4 as createElementBlock, a6 as normalizeClass, a7 as createBaseVNode, aa as createCommentVNode, aW as createBlock, ag as createVNode, a9 as unref, aM as getImgUrl, aN as NImage, a8 as toDisplayString, bw as isRef, ak as openBlock, am as _export_sfc } from "./index-9WtWgwAm.js";
import { g as getAlbum, a as getListDetail } from "./list-DzAptV9H.js";
import { M as MvPlayer } from "./MvPlayer-B580IO2v.js";
import { u as useMusicStore } from "./music-B9G-sT9a.js";
const _hoisted_1 = { class: "search-item-img" };
const _hoisted_2 = {
  key: 0,
  class: "play"
};
const _hoisted_3 = { class: "search-item-info" };
const _hoisted_4 = { class: "search-item-name" };
const _hoisted_5 = { class: "search-item-artist" };
const _hoisted_6 = {
  key: 0,
  class: "search-item-size"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchItem",
  props: {
    shape: { default: "rectangle" },
    zIndex: {},
    item: {}
  },
  setup(__props) {
    const props = __props;
    const songList = ref([]);
    const showPop = ref(false);
    const listInfo = ref(null);
    const playerStore = usePlayerStore();
    const router = useRouter();
    const musicStore = useMusicStore();
    const getCurrentMv = () => {
      return {
        id: props.item.id,
        name: props.item.name
      };
    };
    const handleClick = async () => {
      listInfo.value = null;
      if (props.item.type === "专辑") {
        const res = await getAlbum(props.item.id);
        songList.value = res.data.songs.map((song) => {
          song.al.picUrl = song.al.picUrl || props.item.picUrl;
          return song;
        });
        listInfo.value = {
          ...res.data.album,
          creator: {
            avatarUrl: res.data.album.artist.img1v1Url,
            nickname: `${res.data.album.artist.name} - ${res.data.album.company}`
          },
          description: res.data.album.description
        };
        musicStore.setCurrentMusicList(songList.value, props.item.name, listInfo.value, false);
        router.push({
          name: "musicList",
          params: { id: props.item.id },
          query: { type: "album" }
        });
      } else if (props.item.type === "playlist") {
        const res = await getListDetail(props.item.id);
        songList.value = res.data.playlist.tracks;
        listInfo.value = res.data.playlist;
        musicStore.setCurrentMusicList(songList.value, props.item.name, listInfo.value, false);
        router.push({
          name: "musicList",
          params: { id: props.item.id },
          query: { type: "playlist" }
        });
      } else if (props.item.type === "mv") {
        handleShowMv();
      }
    };
    const handleShowMv = async () => {
      playerStore.handlePause();
      showPop.value = true;
    };
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["search-item", [__props.shape, __props.item.type]]),
        onClick: handleClick
      }, [
        createBaseVNode("div", _hoisted_1, [
          createVNode(_component_n_image, {
            class: "w-full h-full",
            src: unref(getImgUrl)(__props.item.picUrl, __props.item.type === "mv" ? "320y180" : "200y200"),
            lazy: "",
            "preview-disabled": ""
          }, null, 8, ["src"]),
          __props.item.type === "mv" ? (openBlock(), createElementBlock("div", _hoisted_2, [..._cache[1] || (_cache[1] = [
            createBaseVNode("i", { class: "iconfont icon icon-play" }, null, -1)
          ])])) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("p", _hoisted_4, toDisplayString(__props.item.name), 1),
          createBaseVNode("p", _hoisted_5, toDisplayString(__props.item.desc), 1)
        ]),
        __props.item.type === "专辑" ? (openBlock(), createElementBlock("div", _hoisted_6, [
          _cache[2] || (_cache[2] = createBaseVNode("i", { class: "ri-music-2-line" }, null, -1)),
          createBaseVNode("span", null, toDisplayString(__props.item.size), 1)
        ])) : createCommentVNode("", true),
        __props.item.type === "mv" ? (openBlock(), createBlock(MvPlayer, {
          key: 1,
          show: unref(showPop),
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => isRef(showPop) ? showPop.value = $event : null),
          "current-mv": getCurrentMv(),
          "no-list": ""
        }, null, 8, ["show", "current-mv"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const SearchItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8e554b5f"]]);
export {
  SearchItem as S
};
