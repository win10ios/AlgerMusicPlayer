import { d as defineComponent, a2 as useI18n, aS as useUserStore, aI as useRouter, bd as useMessage, b1 as useRoute, s as ref, v as computed, an as onMounted, U as watch, a4 as createElementBlock, a7 as createBaseVNode, aW as createBlock, a8 as toDisplayString, a9 as unref, ap as withCtx, aa as createCommentVNode, ak as openBlock, a6 as normalizeClass, aJ as setAnimationClass, ab as Fragment, ac as renderList, ad as normalizeStyle, aH as setAnimationDelay, ag as createVNode, aM as getImgUrl, aZ as createTextVNode, cA as __unplugin_components_7, b2 as __unplugin_components_2$1, a0 as Button, br as checkLoginStatus, cI as getUserFollowers, b0 as Scrollbar, am as _export_sfc } from "./index-0n6GrGnT.js";
import { _ as __unplugin_components_5 } from "./Avatar-Bk-ldh6m.js";
import { _ as __unplugin_components_2 } from "./Space-Dlklsu7P.js";
import "./Tag-BdXWLWWk.js";
const _hoisted_1 = { class: "followers-page" };
const _hoisted_2 = { class: "content-wrapper" };
const _hoisted_3 = {
  key: 0,
  class: "page-title"
};
const _hoisted_4 = {
  key: 1,
  class: "page-title"
};
const _hoisted_5 = {
  key: 0,
  class: "empty-follower"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "follower-item-inner" };
const _hoisted_8 = { class: "follower-avatar" };
const _hoisted_9 = {
  key: 0,
  class: "artist-badge"
};
const _hoisted_10 = { class: "follower-info" };
const _hoisted_11 = { class: "follower-signature" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "UserFollowers"
  },
  __name: "followers",
  setup(__props) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const router = useRouter();
    const message = useMessage();
    const route = useRoute();
    const followerList = ref([]);
    const followerOffset = ref(0);
    const followerLimit = ref(30);
    const hasMoreFollowers = ref(false);
    const followerListLoading = ref(false);
    const targetUserId = ref(null);
    const targetUserName = ref("");
    const user = computed(() => userStore.user);
    const checkTargetUser = () => {
      const uid = route.query.uid;
      const name = route.query.name;
      if (uid && typeof uid === "string") {
        targetUserId.value = parseInt(uid);
        targetUserName.value = typeof name === "string" ? name : "";
        return true;
      }
      return checkLoginStatus$1();
    };
    const checkLoginStatus$1 = () => {
      const loginInfo = checkLoginStatus();
      if (!loginInfo.isLoggedIn) {
        router.push("/login");
        return false;
      }
      if (!userStore.user && loginInfo.user) {
        userStore.setUser(loginInfo.user);
      }
      return true;
    };
    const loadFollowerList = async () => {
      const userId = targetUserId.value || user.value?.userId;
      if (!userId) return;
      try {
        followerListLoading.value = true;
        const { data } = await getUserFollowers(userId, followerLimit.value, followerOffset.value);
        if (!data || !data.followeds) {
          hasMoreFollowers.value = false;
          return;
        }
        const newFollowers = data.followeds;
        followerList.value = [...followerList.value, ...newFollowers];
        hasMoreFollowers.value = newFollowers.length >= followerLimit.value;
      } catch (error) {
        console.error("加载粉丝列表失败:", error);
        message.error(t("user.follower.loadFailed"));
      } finally {
        followerListLoading.value = false;
      }
    };
    const loadMoreFollowers = async () => {
      followerOffset.value += followerLimit.value;
      await loadFollowerList();
    };
    const viewUserDetail = (userId, nickname) => {
      router.push({
        path: `/user/detail/${userId}`,
        query: { name: nickname }
      });
    };
    const isArtist = (user2) => {
      return user2.userType === 4 || user2.userType === 2 || user2.accountType === 2;
    };
    onMounted(() => {
      if (checkTargetUser()) {
        loadFollowerList();
      }
    });
    watch(
      () => route.query,
      (newQuery) => {
        if (newQuery.uid && newQuery.uid !== targetUserId.value?.toString()) {
          followerList.value = [];
          followerOffset.value = 0;
          checkTargetUser();
          loadFollowerList();
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n_spin = __unplugin_components_2$1;
      const _component_n_avatar = __unplugin_components_5;
      const _component_n_tooltip = __unplugin_components_7;
      const _component_n_space = __unplugin_components_2;
      const _component_n_button = Button;
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          targetUserName.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(targetUserName.value + unref(t)("user.follower.userFollowersTitle")), 1)) : (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(unref(t)("user.follower.myFollowersTitle")), 1)),
          followerListLoading.value && followerList.value.length === 0 ? (openBlock(), createBlock(_component_n_spin, {
            key: 2,
            size: "large"
          })) : (openBlock(), createBlock(_component_n_scrollbar, {
            key: 3,
            class: "scrollbar-container"
          }, {
            default: withCtx(() => [
              followerList.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(unref(t)("user.follower.noFollowers")), 1)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass(["follower-grid", unref(setAnimationClass)("animate__fadeInUp")])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(followerList.value, (item, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: normalizeClass(["follower-item", unref(setAnimationClass)("animate__fadeInUp")]),
                    style: normalizeStyle(unref(setAnimationDelay)(index, 30)),
                    onClick: ($event) => viewUserDetail(item.userId, item.nickname)
                  }, [
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createVNode(_component_n_avatar, {
                          round: "",
                          size: 70,
                          src: unref(getImgUrl)(item.avatarUrl, "70y70")
                        }, null, 8, ["src"]),
                        isArtist(item) ? (openBlock(), createElementBlock("div", _hoisted_9, [..._cache[0] || (_cache[0] = [
                          createBaseVNode("i", { class: "ri-verified-badge-fill" }, null, -1)
                        ])])) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", {
                          class: normalizeClass(["follower-name", { "is-artist": isArtist(item) }])
                        }, [
                          createTextVNode(toDisplayString(item.nickname) + " ", 1),
                          isArtist(item) ? (openBlock(), createBlock(_component_n_tooltip, {
                            key: 0,
                            trigger: "hover"
                          }, {
                            trigger: withCtx(() => [..._cache[1] || (_cache[1] = [
                              createBaseVNode("i", { class: "ri-verified-badge-fill artist-icon" }, null, -1)
                            ])]),
                            default: withCtx(() => [
                              _cache[2] || (_cache[2] = createTextVNode(" 歌手 ", -1))
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ], 2),
                        createBaseVNode("div", _hoisted_11, toDisplayString(item.signature || "这个人很懒，什么都没留下"), 1)
                      ])
                    ])
                  ], 14, _hoisted_6);
                }), 128))
              ], 2),
              followerListLoading.value ? (openBlock(), createBlock(_component_n_space, {
                key: 1,
                justify: "center",
                class: "loading-more"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_spin, { size: "small" })
                ]),
                _: 1
              })) : hasMoreFollowers.value ? (openBlock(), createBlock(_component_n_button, {
                key: 2,
                class: "load-more-btn",
                secondary: "",
                block: "",
                onClick: loadMoreFollowers
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("user.follower.loadMore")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }))
        ])
      ]);
    };
  }
});
const followers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76fbf08f"]]);
export {
  followers as default
};
