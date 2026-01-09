import { cU as useLocalStorage, s as ref, U as watch } from "./index-0n6GrGnT.js";
const useAlbumHistory = () => {
  const albumHistory = useLocalStorage("albumHistory", []);
  const addAlbum = (album) => {
    const index = albumHistory.value.findIndex((item) => item.id === album.id);
    const now = Date.now();
    if (index !== -1) {
      albumHistory.value[index].count = (albumHistory.value[index].count || 0) + 1;
      albumHistory.value[index].lastPlayTime = now;
      albumHistory.value.unshift(albumHistory.value.splice(index, 1)[0]);
    } else {
      albumHistory.value.unshift({
        ...album,
        count: 1,
        lastPlayTime: now
      });
    }
  };
  const delAlbum = (album) => {
    const index = albumHistory.value.findIndex((item) => item.id === album.id);
    if (index !== -1) {
      albumHistory.value.splice(index, 1);
    }
  };
  const albumList = ref(albumHistory.value);
  watch(
    () => albumHistory.value,
    () => {
      albumList.value = albumHistory.value;
    },
    { deep: true }
  );
  return {
    albumHistory,
    albumList,
    addAlbum,
    delAlbum
  };
};
const usePlaylistHistory = () => {
  const playlistHistory = useLocalStorage("playlistHistory", []);
  const addPlaylist = (playlist) => {
    const index = playlistHistory.value.findIndex((item) => item.id === playlist.id);
    const now = Date.now();
    if (index !== -1) {
      playlistHistory.value[index].count = (playlistHistory.value[index].count || 0) + 1;
      playlistHistory.value[index].lastPlayTime = now;
      playlistHistory.value.unshift(playlistHistory.value.splice(index, 1)[0]);
    } else {
      playlistHistory.value.unshift({
        ...playlist,
        count: 1,
        lastPlayTime: now
      });
    }
  };
  const delPlaylist = (playlist) => {
    const index = playlistHistory.value.findIndex((item) => item.id === playlist.id);
    if (index !== -1) {
      playlistHistory.value.splice(index, 1);
    }
  };
  const playlistList = ref(playlistHistory.value);
  watch(
    () => playlistHistory.value,
    () => {
      playlistList.value = playlistHistory.value;
    },
    { deep: true }
  );
  return {
    playlistHistory,
    playlistList,
    addPlaylist,
    delPlaylist
  };
};
export {
  useAlbumHistory as a,
  usePlaylistHistory as u
};
