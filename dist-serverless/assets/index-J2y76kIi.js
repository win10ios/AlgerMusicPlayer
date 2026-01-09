import { d as defineComponent, a2 as useI18n, aI as useRouter, z as inject, s as ref, v as computed, an as onMounted, a1 as nextTick, a4 as createElementBlock, a7 as createBaseVNode, L as withDirectives, aa as createCommentVNode, af as vModelText, ae as withKeys, a8 as toDisplayString, a9 as unref, a6 as normalizeClass, ab as Fragment, ac as renderList, df as getSearchKeyword, b3 as getHotSearch, cF as useDebounceFn, ak as openBlock, am as _export_sfc } from "./index-DEM82Ldr.js";
import { u as useSearchStore, a as SEARCH_TYPES, b as getSearchSuggestions } from "./bar-const-B2YDcXVm.js";
const _hoisted_1 = { class: "mobile-search-page" };
const _hoisted_2 = { class: "search-input-wrapper" };
const _hoisted_3 = ["placeholder"];
const _hoisted_4 = { class: "search-types" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "search-content" };
const _hoisted_7 = {
  key: 0,
  class: "search-section"
};
const _hoisted_8 = { class: "section-title" };
const _hoisted_9 = { class: "suggestion-list" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = {
  key: 1,
  class: "search-section"
};
const _hoisted_12 = { class: "section-header" };
const _hoisted_13 = { class: "section-title" };
const _hoisted_14 = { class: "history-tags" };
const _hoisted_15 = ["onClick"];
const _hoisted_16 = {
  key: 2,
  class: "search-section"
};
const _hoisted_17 = { class: "section-title" };
const _hoisted_18 = { class: "hot-list" };
const _hoisted_19 = ["onClick"];
const _hoisted_20 = { class: "hot-word" };
const _hoisted_21 = {
  key: 0,
  class: "hot-icon"
};
const _hoisted_22 = ["src"];
const HISTORY_KEY = "mobile_search_history";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const { t, locale } = useI18n();
    const router = useRouter();
    const searchStore = useSearchStore();
    const hasSafeArea = inject("hasSafeArea", false);
    const searchValue = ref("");
    const searchInputRef = ref(null);
    const hotSearchKeyword = ref("搜索音乐、歌手、歌单");
    const searchType = ref(searchStore.searchType || 1);
    const searchTypes = computed(() => {
      locale.value;
      return SEARCH_TYPES.map((type) => ({
        label: t(type.label),
        key: type.key
      }));
    });
    const suggestions = ref([]);
    const searchHistory = ref([]);
    const hotSearchList = ref([]);
    const loadHotSearchKeyword = async () => {
      try {
        const { data } = await getSearchKeyword();
        hotSearchKeyword.value = data.data.showKeyword;
      } catch (e) {
        console.error("加载热门搜索关键词失败:", e);
      }
    };
    const loadHotSearchList = async () => {
      try {
        const { data } = await getHotSearch();
        hotSearchList.value = data.data || [];
      } catch (e) {
        console.error("加载热门搜索失败:", e);
      }
    };
    const loadSearchHistory = () => {
      try {
        const history = localStorage.getItem(HISTORY_KEY);
        searchHistory.value = history ? JSON.parse(history) : [];
      } catch (e) {
        console.error("加载搜索历史失败:", e);
        searchHistory.value = [];
      }
    };
    const saveSearchHistory = (keyword) => {
      if (!keyword.trim()) return;
      const history = searchHistory.value.filter((item) => item !== keyword);
      history.unshift(keyword);
      searchHistory.value = history.slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value));
    };
    const clearHistory = () => {
      searchHistory.value = [];
      localStorage.removeItem(HISTORY_KEY);
    };
    const debouncedGetSuggestions = useDebounceFn(async (keyword) => {
      if (!keyword.trim()) {
        suggestions.value = [];
        return;
      }
      suggestions.value = await getSearchSuggestions(keyword);
    }, 300);
    const handleInput = () => {
      debouncedGetSuggestions(searchValue.value);
    };
    const clearSearch = () => {
      searchValue.value = "";
      suggestions.value = [];
    };
    const selectType = (type) => {
      searchType.value = type;
      searchStore.searchType = type;
    };
    const selectSuggestion = (keyword) => {
      searchValue.value = keyword;
      handleSearch();
    };
    const handleSearch = () => {
      const keyword = searchValue.value.trim();
      if (!keyword) return;
      saveSearchHistory(keyword);
      router.push({
        path: "/mobile-search-result",
        query: {
          keyword,
          type: searchType.value
        }
      });
    };
    const goBack = () => {
      router.back();
    };
    onMounted(() => {
      loadHotSearchKeyword();
      loadHotSearchList();
      loadSearchHistory();
      nextTick(() => {
        searchInputRef.value?.focus();
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["search-header", { "safe-area-top": unref(hasSafeArea) }])
        }, [
          createBaseVNode("div", {
            class: "header-back",
            onClick: goBack
          }, [..._cache[1] || (_cache[1] = [
            createBaseVNode("i", { class: "ri-arrow-left-s-line" }, null, -1)
          ])]),
          createBaseVNode("div", _hoisted_2, [
            _cache[2] || (_cache[2] = createBaseVNode("i", { class: "ri-search-line search-icon" }, null, -1)),
            withDirectives(createBaseVNode("input", {
              ref_key: "searchInputRef",
              ref: searchInputRef,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
              type: "text",
              class: "search-input",
              placeholder: hotSearchKeyword.value,
              onInput: handleInput,
              onKeydown: withKeys(handleSearch, ["enter"])
            }, null, 40, _hoisted_3), [
              [vModelText, searchValue.value]
            ]),
            searchValue.value ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: "ri-close-circle-fill clear-icon",
              onClick: clearSearch
            })) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: "search-button",
            onClick: handleSearch
          }, toDisplayString(unref(t)("common.search")), 1)
        ], 2),
        createBaseVNode("div", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(searchTypes.value, (type) => {
            return openBlock(), createElementBlock("div", {
              key: type.key,
              class: normalizeClass(["type-tag", { active: searchType.value === type.key }]),
              onClick: ($event) => selectType(type.key)
            }, toDisplayString(type.label), 11, _hoisted_5);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_6, [
          suggestions.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, toDisplayString(unref(t)("search.suggestions")), 1),
            createBaseVNode("div", _hoisted_9, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(suggestions.value, (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: index2,
                  class: "suggestion-item",
                  onClick: ($event) => selectSuggestion(item)
                }, [
                  _cache[3] || (_cache[3] = createBaseVNode("i", { class: "ri-search-line" }, null, -1)),
                  createBaseVNode("span", null, toDisplayString(item), 1)
                ], 8, _hoisted_10);
              }), 128))
            ])
          ])) : searchHistory.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("search.history")), 1),
              createBaseVNode("span", {
                class: "clear-history",
                onClick: clearHistory
              }, toDisplayString(unref(t)("common.clear")), 1)
            ]),
            createBaseVNode("div", _hoisted_14, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(searchHistory.value, (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: index2,
                  class: "history-tag",
                  onClick: ($event) => selectSuggestion(item)
                }, toDisplayString(item), 9, _hoisted_15);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          hotSearchList.value.length > 0 && !searchValue.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createBaseVNode("div", _hoisted_17, toDisplayString(unref(t)("search.hot")), 1),
            createBaseVNode("div", _hoisted_18, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(hotSearchList.value, (item, index2) => {
                return openBlock(), createElementBlock("div", {
                  key: index2,
                  class: "hot-item",
                  onClick: ($event) => selectSuggestion(item.searchWord)
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["hot-rank", { top: index2 < 3 }])
                  }, toDisplayString(index2 + 1), 3),
                  createBaseVNode("span", _hoisted_20, toDisplayString(item.searchWord), 1),
                  item.iconUrl ? (openBlock(), createElementBlock("span", _hoisted_21, [
                    createBaseVNode("img", {
                      src: item.iconUrl,
                      alt: ""
                    }, null, 8, _hoisted_22)
                  ])) : createCommentVNode("", true)
                ], 8, _hoisted_19);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fa429ab"]]);
export {
  index as default
};
