import { dg as defineStore, s as ref, cL as request, bl as isElectron } from "./index-9WtWgwAm.js";
const useSearchStore = defineStore("search", () => {
  const searchValue = ref("");
  const searchType = ref(1);
  const setSearchValue = (value) => {
    searchValue.value = value;
  };
  const setSearchType = (type) => {
    searchType.value = type;
  };
  return {
    searchValue,
    searchType,
    setSearchValue,
    setSearchType
  };
});
const getSearch = (params) => {
  return request.get("/cloudsearch", {
    params
  });
};
const getSearchSuggestions = async (keyword) => {
  console.log("[API] getSearchSuggestions: 开始执行");
  if (!keyword || !keyword.trim()) {
    return Promise.resolve([]);
  }
  console.log(`[API] getSearchSuggestions: 准备请求，关键词: "${keyword}"`);
  try {
    let responseData;
    if (isElectron) {
      console.log("[API] Running in Electron, using IPC proxy.");
      responseData = await window.api.getSearchSuggestions(keyword);
    } else {
      const res = await request.get("/search/suggest", {
        params: { keywords: keyword }
      });
      const result = res?.data?.result || {};
      const names = [];
      if (Array.isArray(result.songs)) names.push(...result.songs.map((s) => s.name));
      if (Array.isArray(result.artists)) names.push(...result.artists.map((a) => a.name));
      if (Array.isArray(result.albums)) names.push(...result.albums.map((al) => al.name));
      const unique = Array.from(new Set(names)).slice(0, 10);
      console.log("[API] getSearchSuggestions: 网易云建议解析成功:", unique);
      return unique;
    }
    if (responseData && Array.isArray(responseData.data)) {
      const suggestions = responseData.data.map((item) => item.keyword).slice(0, 10);
      console.log("[API] getSearchSuggestions: 成功解析建议:", suggestions);
      return suggestions;
    }
    console.warn("[API] getSearchSuggestions: 响应数据格式不正确，返回空数组。");
    return [];
  } catch (error) {
    console.error("[API] getSearchSuggestions: 请求失败，错误信息:", error);
    return [];
  }
};
const USER_SET_OPTIONS = [
  // {
  //   label: '打卡',
  //   key: 'card',
  // },
  // {
  //   label: '听歌升级',
  //   key: 'card_music',
  // },
  // {
  //   label: '歌曲次数',
  //   key: 'listen',
  // },
  {
    label: "退出登录",
    key: "logout"
  },
  {
    label: "设置",
    key: "set"
  }
];
const SEARCH_TYPES = [
  {
    label: "search.search.single",
    // 单曲
    key: 1
  },
  {
    label: "search.search.album",
    // 专辑
    key: 10
  },
  {
    label: "search.search.playlist",
    // 歌单
    key: 1e3
  },
  {
    label: "search.search.mv",
    // MV
    key: 1004
  },
  {
    label: "search.search.bilibili",
    // B站
    key: 2e3
  }
];
const SEARCH_TYPE = {
  MUSIC: 1,
  // 单曲
  ALBUM: 10,
  // 专辑
  ARTIST: 100,
  // 歌手
  PLAYLIST: 1e3,
  // 歌单
  MV: 1004,
  // MV
  BILIBILI: 2e3
  // B站视频
};
export {
  SEARCH_TYPE as S,
  USER_SET_OPTIONS as U,
  SEARCH_TYPES as a,
  getSearchSuggestions as b,
  getSearch as g,
  useSearchStore as u
};
