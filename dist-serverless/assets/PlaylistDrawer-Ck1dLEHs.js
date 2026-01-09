import { d as defineComponent, aS as useUserStore, a2 as useI18n, bd as useMessage, s as ref, v as computed, U as watch, aW as createBlock, ap as withCtx, ag as createVNode, cJ as __unplugin_components_5, a9 as unref, b0 as Scrollbar, a7 as createBaseVNode, a6 as normalizeClass, a8 as toDisplayString, aZ as createTextVNode, a0 as Button, a4 as createElementBlock, ak as openBlock, ab as Fragment, ac as renderList, aN as NImage, aM as getImgUrl, cK as __unplugin_components_6, cQ as hasPermission, cR as getLoginErrorMessage, cP as updatePlaylistTracks, eb as createPlaylist, a_ as getUserPlaylist, am as _export_sfc } from "./index-0n6GrGnT.js";
import { _ as __unplugin_components_1 } from "./Input-7E-mN3xR.js";
import { _ as __unplugin_components_8 } from "./Switch-CZwUpBrq.js";
const _hoisted_1 = { class: "playlist-drawer" };
const _hoisted_2 = { class: "create-playlist-section" };
const _hoisted_3 = { class: "create-playlist-icon" };
const _hoisted_4 = { class: "create-playlist-text" };
const _hoisted_5 = { class: "privacy-switch" };
const _hoisted_6 = { class: "privacy-label" };
const _hoisted_7 = { class: "form-actions" };
const _hoisted_8 = { class: "playlist-list" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "playlist-item-info" };
const _hoisted_11 = { class: "playlist-item-name" };
const _hoisted_12 = { class: "playlist-item-count" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PlaylistDrawer",
  props: {
    modelValue: { type: Boolean },
    songId: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const store = useUserStore();
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const message = useMessage();
    const playlists = ref([]);
    const creating = ref(false);
    const isCreating = ref(false);
    const formValue = ref({
      name: "",
      privacy: false
    });
    const inputError = computed(() => {
      return isCreating.value && !formValue.value.name;
    });
    const toggleCreateForm = () => {
      if (creating.value) return;
      isCreating.value = !isCreating.value;
      if (!isCreating.value) {
        formValue.value.name = "";
        formValue.value.privacy = false;
      }
    };
    const fetchUserPlaylists = async () => {
      try {
        const { user } = store;
        if (!user?.userId) {
          message.error(t("comp.playlistDrawer.loginFirst"));
          emit("update:modelValue", false);
          return;
        }
        if (!hasPermission(true)) {
          message.error(getLoginErrorMessage(true));
          emit("update:modelValue", false);
          return;
        }
        const res = await getUserPlaylist(user.userId, 999);
        if (res.data?.playlist) {
          playlists.value = res.data.playlist.filter((item) => item.userId === user.userId);
        }
      } catch (error) {
        console.error("获取歌单失败:", error);
        message.error(t("comp.playlistDrawer.getPlaylistFailed"));
      }
    };
    const handleAddToPlaylist = async (playlist) => {
      if (!props.songId) return;
      if (!hasPermission(true)) {
        message.error(getLoginErrorMessage(true));
        return;
      }
      try {
        const res = await updatePlaylistTracks({
          op: "add",
          pid: playlist.id,
          tracks: props.songId.toString()
        });
        console.log("res.data", res.data);
        if (res.status === 200) {
          message.success(t("comp.playlistDrawer.addSuccess"));
          emit("update:modelValue", false);
        } else {
          throw new Error(res.data?.msg || t("comp.playlistDrawer.addFailed"));
        }
      } catch (error) {
        console.error("添加到歌单失败:", error);
        message.error(error.message || t("comp.playlistDrawer.addFailed"));
      }
    };
    const handleCreatePlaylist = async () => {
      if (!formValue.value.name) {
        message.error(t("comp.playlistDrawer.inputPlaylistName"));
        return;
      }
      if (!hasPermission(true)) {
        message.error(getLoginErrorMessage(true));
        return;
      }
      try {
        creating.value = true;
        const res = await createPlaylist({
          name: formValue.value.name,
          privacy: formValue.value.privacy ? 10 : 0
        });
        if (res.data?.id) {
          message.success(t("comp.playlistDrawer.createSuccess"));
          isCreating.value = false;
          formValue.value.name = "";
          formValue.value.privacy = false;
          await fetchUserPlaylists();
        }
      } catch (error) {
        console.error("创建歌单失败:", error);
        message.error(t("comp.playlistDrawer.createFailed"));
      } finally {
        creating.value = false;
      }
    };
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          fetchUserPlaylists();
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n_input = __unplugin_components_1;
      const _component_n_switch = __unplugin_components_8;
      const _component_n_button = Button;
      const _component_n_image = NImage;
      const _component_n_scrollbar = Scrollbar;
      const _component_n_drawer_content = __unplugin_components_5;
      const _component_n_drawer = __unplugin_components_6;
      return openBlock(), createBlock(_component_n_drawer, {
        show: __props.modelValue,
        width: 400,
        placement: "right",
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.$emit("update:modelValue", $event)),
        "unstable-show-mask": false,
        "show-mask": false
      }, {
        default: withCtx(() => [
          createVNode(_component_n_drawer_content, {
            title: unref(t)("comp.playlistDrawer.title"),
            class: "mac-style-drawer"
          }, {
            default: withCtx(() => [
              createVNode(_component_n_scrollbar, { class: "h-full" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createBaseVNode("div", _hoisted_2, [
                      createBaseVNode("div", {
                        class: normalizeClass(["create-playlist-button", { "is-expanded": isCreating.value }]),
                        onClick: toggleCreateForm
                      }, [
                        createBaseVNode("div", _hoisted_3, [
                          createBaseVNode("i", {
                            class: normalizeClass(["iconfont", isCreating.value ? "ri-close-line" : "ri-add-line"])
                          }, null, 2)
                        ]),
                        createBaseVNode("div", _hoisted_4, toDisplayString(isCreating.value ? unref(t)("comp.playlistDrawer.cancelCreate") : unref(t)("comp.playlistDrawer.createPlaylist")), 1)
                      ], 2),
                      createBaseVNode("div", {
                        class: normalizeClass(["create-playlist-form", { "is-visible": isCreating.value }])
                      }, [
                        createVNode(_component_n_input, {
                          value: formValue.value.name,
                          "onUpdate:value": _cache[0] || (_cache[0] = ($event) => formValue.value.name = $event),
                          placeholder: unref(t)("comp.playlistDrawer.playlistName"),
                          maxlength: "40",
                          class: "mac-style-input",
                          status: inputError.value ? "error" : void 0
                        }, {
                          prefix: withCtx(() => [..._cache[3] || (_cache[3] = [
                            createBaseVNode("i", { class: "iconfont ri-music-2-line" }, null, -1)
                          ])]),
                          _: 1
                        }, 8, ["value", "placeholder", "status"]),
                        createBaseVNode("div", _hoisted_5, [
                          createBaseVNode("div", _hoisted_6, [
                            createBaseVNode("i", {
                              class: normalizeClass(["iconfont", formValue.value.privacy ? "ri-lock-line" : "ri-earth-line"])
                            }, null, 2),
                            createBaseVNode("span", null, toDisplayString(formValue.value.privacy ? unref(t)("comp.playlistDrawer.privatePlaylist") : unref(t)("comp.playlistDrawer.publicPlaylist")), 1)
                          ]),
                          createVNode(_component_n_switch, {
                            value: formValue.value.privacy,
                            "onUpdate:value": _cache[1] || (_cache[1] = ($event) => formValue.value.privacy = $event),
                            class: "mac-style-switch"
                          }, {
                            checked: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlistDrawer.private")), 1)
                            ]),
                            unchecked: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlistDrawer.public")), 1)
                            ]),
                            _: 1
                          }, 8, ["value"])
                        ]),
                        createBaseVNode("div", _hoisted_7, [
                          createVNode(_component_n_button, {
                            type: "primary",
                            quaternary: "",
                            class: "mac-style-button",
                            loading: creating.value,
                            disabled: !formValue.value.name,
                            onClick: handleCreatePlaylist
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(t)("comp.playlistDrawer.create")), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ])
                      ], 2)
                    ]),
                    createBaseVNode("div", _hoisted_8, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(playlists.value, (playlist) => {
                        return openBlock(), createElementBlock("div", {
                          key: playlist.id,
                          class: "playlist-item",
                          onClick: ($event) => handleAddToPlaylist(playlist)
                        }, [
                          createVNode(_component_n_image, {
                            src: unref(getImgUrl)(playlist.coverImgUrl || playlist.picUrl, "100y100"),
                            class: "playlist-item-img",
                            "preview-disabled": "",
                            "img-props": {
                              crossorigin: "anonymous"
                            }
                          }, null, 8, ["src"]),
                          createBaseVNode("div", _hoisted_10, [
                            createBaseVNode("div", _hoisted_11, toDisplayString(playlist.name), 1),
                            createBaseVNode("div", _hoisted_12, toDisplayString(playlist.trackCount) + " " + toDisplayString(unref(t)("comp.playlistDrawer.count")), 1)
                          ]),
                          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "playlist-item-action" }, [
                            createBaseVNode("i", { class: "iconfont ri-add-line" })
                          ], -1))
                        ], 8, _hoisted_9);
                      }), 128))
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["title"])
        ]),
        _: 1
      }, 8, ["show"]);
    };
  }
});
const PlaylistDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6acd475e"]]);
export {
  PlaylistDrawer as default
};
