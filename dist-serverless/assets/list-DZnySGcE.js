import { cL as request } from "./index-DEM82Ldr.js";
function getListByCat(params) {
  return request.get("/top/playlist", {
    params
  });
}
function getListDetail(id) {
  return request.get("/playlist/detail", { params: { id } });
}
function getAlbum(id) {
  return request.get("/album", { params: { id } });
}
function getToplist() {
  return request.get("/toplist");
}
export {
  getListDetail as a,
  getListByCat as b,
  getToplist as c,
  getAlbum as g
};
