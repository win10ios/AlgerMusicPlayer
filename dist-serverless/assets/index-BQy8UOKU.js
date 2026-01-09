import { d as defineComponent, s as ref, aI as useRouter, an as onMounted, aP as resolveDirective, a4 as createElementBlock, ag as createVNode, ap as withCtx, L as withDirectives, ak as openBlock, ab as Fragment, ac as renderList, a9 as unref, a5 as withModifiers, ad as normalizeStyle, a6 as normalizeClass, aJ as setAnimationClass, a7 as createBaseVNode, aN as NImage, aM as getImgUrl, a8 as toDisplayString, ba as formatNumber, b0 as Scrollbar, aH as setAnimationDelay, am as _export_sfc } from "./index-9WtWgwAm.js";
import { a as getListDetail, c as getToplist } from "./list-DzAptV9H.js";
import { n as navigateToMusicList } from "./MusicListNavigator-DBgBAyka.js";
import "./music-B9G-sT9a.js";
const _hoisted_1 = { class: "toplist-page" };
const _hoisted_2 = { class: "toplist-list" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "toplist-item-img" };
const _hoisted_5 = { class: "top" };
const _hoisted_6 = { class: "play-count" };
const _hoisted_7 = { class: "toplist-item-title" };
const _hoisted_8 = { class: "toplist-item-desc" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Toplist"
  },
  __name: "index",
  setup(__props) {
    const topList = ref([]);
    const getItemAnimationDelay = (index2) => {
      return setAnimationDelay(index2, 30);
    };
    const listDetail = ref();
    const listLoading = ref(true);
    const router = useRouter();
    const openToplist = (item) => {
      listLoading.value = true;
      getListDetail(item.id).then((res) => {
        listDetail.value = res.data;
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
    const loading = ref(false);
    const loadToplist = async () => {
      loading.value = true;
      try {
        const { data } = await getToplist();
        topList.value = data.list || [];
      } catch (error) {
        console.error("加载排行榜列表失败:", error);
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      loadToplist();
    });
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      const _component_n_scrollbar = Scrollbar;
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n_scrollbar, {
          class: "toplist-container",
          style: { "height": "100%" },
          size: 100
        }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createElementBlock("div", _hoisted_2, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(topList), (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: normalizeClass(["toplist-item", unref(setAnimationClass)("animate__bounceIn")]),
                  style: normalizeStyle(getItemAnimationDelay(index2)),
                  onClick: withModifiers(($event) => openToplist(item), ["stop"])
                }, [
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(_component_n_image, {
                      class: "toplist-item-img-img",
                      src: unref(getImgUrl)(item.coverImgUrl, "300y300"),
                      width: "200",
                      height: "200",
                      lazy: "",
                      "preview-disabled": ""
                    }, null, 8, ["src"]),
                    createBaseVNode("div", _hoisted_5, [
                      createBaseVNode("div", _hoisted_6, toDisplayString(unref(formatNumber)(item.playCount)), 1),
                      _cache[0] || (_cache[0] = createBaseVNode("i", { class: "iconfont icon-videofill" }, null, -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_7, toDisplayString(item.name), 1),
                  createBaseVNode("div", _hoisted_8, toDisplayString(item.updateFrequency || ""), 1)
                ], 14, _hoisted_3);
              }), 128))
            ])), [
              [_directive_loading, unref(loading)]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dda57ee2"]]);
export {
  index as default
};
