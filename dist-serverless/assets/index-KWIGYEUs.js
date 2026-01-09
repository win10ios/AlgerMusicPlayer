import { d as defineComponent, a2 as useI18n, bd as useMessage, s as ref, an as onMounted, bl as isElectron, az as onBeforeUnmount, a4 as createElementBlock, a6 as normalizeClass, a9 as unref, aJ as setAnimationClass, a7 as createBaseVNode, ag as createVNode, aW as createBlock, aa as createCommentVNode, a8 as toDisplayString, L as withDirectives, af as vModelText, bw as isRef, a0 as Button, ap as withCtx, aZ as createTextVNode, bx as getUserDetail, ak as openBlock, am as _export_sfc, ao as onUnmounted, b2 as __unplugin_components_2, by as getQrKey, bz as createQr, bA as checkQr, ae as withKeys, bB as loginByUid, aI as useRouter, aS as useUserStore, v as computed, ab as Fragment, ac as renderList, T as Transition, bC as loginByCellphone } from "./index-0n6GrGnT.js";
const _hoisted_1$3 = { class: "login-title" };
const _hoisted_2$3 = { class: "phone-page" };
const _hoisted_3$3 = ["placeholder"];
const _hoisted_4$3 = { class: "text" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    name: "CookieLogin"
  },
  __name: "CookieLogin",
  emits: ["loginSuccess", "loginError"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const message = useMessage();
    const token = ref("");
    const loginByToken = async () => {
      if (!token.value.trim()) {
        const errorMsg = t("login.message.tokenRequired");
        message.error(errorMsg);
        emit("loginError", errorMsg);
        return;
      }
      try {
        localStorage.setItem("token", token.value.trim());
        const user = await getUserDetail();
        if (user.data && user.data.profile) {
          const successMsg = t("login.message.tokenLoginSuccess");
          message.success(successMsg);
          emit("loginSuccess", user.data.profile, "cookie");
        } else {
          localStorage.removeItem("token");
          const errorMsg = t("login.message.tokenInvalid");
          message.error(errorMsg);
          emit("loginError", errorMsg);
        }
      } catch (error) {
        localStorage.removeItem("token");
        const errorMsg = t("login.message.tokenInvalid");
        message.error(errorMsg);
        emit("loginError", errorMsg);
        console.error("Token登录失败:", error);
      }
    };
    const autoGetCookie = () => {
      if (!isElectron) {
        message.error("此功能仅在桌面版中可用");
        return;
      }
      message.info(t("login.message.autoGetCookieTip"));
      window.electron.ipcRenderer.send("open-login");
    };
    const handleCookieReceived = async (_event, cookieValue) => {
      try {
        localStorage.setItem("token", cookieValue);
        const user = await getUserDetail();
        if (user.data && user.data.profile) {
          const successMsg = t("login.message.autoGetCookieSuccess");
          message.success(successMsg);
          emit("loginSuccess", user.data.profile, "cookie");
        } else {
          localStorage.removeItem("token");
          const errorMsg = t("login.message.autoGetCookieFailed");
          message.error(errorMsg);
          emit("loginError", errorMsg);
        }
      } catch (error) {
        localStorage.removeItem("token");
        const errorMsg = t("login.message.autoGetCookieFailed");
        message.error(errorMsg);
        emit("loginError", errorMsg);
        console.error("自动获取Cookie失败:", error);
      }
    };
    onMounted(() => {
      if (isElectron) {
        window.electron.ipcRenderer.on("send-cookies", handleCookieReceived);
      }
    });
    onBeforeUnmount(() => {
      if (isElectron) {
        window.electron.ipcRenderer.removeAllListeners("send-cookies");
      }
    });
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["cookie-login", unref(setAnimationClass)("animate__fadeInUp")])
      }, [
        createBaseVNode("div", _hoisted_1$3, toDisplayString(unref(t)("login.title.cookie")), 1),
        createBaseVNode("div", _hoisted_2$3, [
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(token) ? token.value = $event : null),
            class: "token-input",
            placeholder: unref(t)("login.placeholder.cookie"),
            rows: "4"
          }, null, 8, _hoisted_3$3), [
            [vModelText, unref(token)]
          ])
        ]),
        createBaseVNode("div", _hoisted_4$3, toDisplayString(unref(t)("login.tokenTip")), 1),
        createVNode(_component_n_button, {
          class: "btn-login",
          onClick: _cache[1] || (_cache[1] = ($event) => loginByToken())
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("login.button.cookieLogin")), 1)
          ]),
          _: 1
        }),
        unref(isElectron) ? (openBlock(), createBlock(_component_n_button, {
          key: 0,
          class: "btn-auto-cookie",
          onClick: _cache[2] || (_cache[2] = ($event) => autoGetCookie()),
          type: "info"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("login.button.autoGetCookie")), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const CookieLogin = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7cccb029"]]);
const _hoisted_1$2 = { class: "login-title" };
const _hoisted_2$2 = { class: "qr-container" };
const _hoisted_3$2 = {
  key: 0,
  class: "qr-loading"
};
const _hoisted_4$2 = { class: "loading-text" };
const _hoisted_5$2 = ["src"];
const _hoisted_6$2 = {
  key: 0,
  class: "expired-overlay"
};
const _hoisted_7$1 = { class: "expired-text" };
const _hoisted_8$1 = {
  key: 1,
  class: "scanned-overlay"
};
const _hoisted_9$1 = { class: "scanned-text" };
const _hoisted_10$1 = {
  key: 0,
  class: "refresh-area"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "QrLogin"
  },
  __name: "QrLogin",
  emits: ["loginSuccess", "loginError"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const message = useMessage();
    const qrUrl = ref();
    const timerRef = ref(null);
    const qrStatus = ref("loading");
    const isRefreshing = ref(false);
    const loadLogin = async () => {
      try {
        isRefreshing.value = true;
        qrStatus.value = "loading";
        if (timerRef.value) {
          clearInterval(timerRef.value);
          timerRef.value = null;
        }
        const qrKey = await getQrKey();
        const key = qrKey.data.data.unikey;
        const { data } = await createQr(key);
        qrUrl.value = data.data.qrimg;
        qrStatus.value = "active";
        const timer = timerIsQr(key);
        timerRef.value = timer;
      } catch (error) {
        console.error(t("login.message.loadError"), error);
        qrStatus.value = "expired";
        const errorMsg = t("login.message.loadError");
        message.error(errorMsg);
        emit("loginError", errorMsg);
      } finally {
        isRefreshing.value = false;
      }
    };
    const timerIsQr = (key) => {
      const timer = setInterval(async () => {
        try {
          const { data } = await checkQr(key);
          if (data.code === 800) {
            qrStatus.value = "expired";
            clearInterval(timer);
            timerRef.value = null;
            message.warning(t("login.message.qrExpiredWarning"));
            return;
          }
          if (data.code === 801) {
            qrStatus.value = "active";
            return;
          }
          if (data.code === 802) {
            qrStatus.value = "scanned";
            message.info(t("login.message.qrScannedInfo"));
            return;
          }
          if (data.code === 803) {
            qrStatus.value = "confirmed";
            localStorage.setItem("token", data.cookie);
            const user = await getUserDetail();
            const successMsg = t("login.message.loginSuccess");
            message.success(successMsg);
            emit("loginSuccess", user.data.profile, "qr");
            clearInterval(timer);
            timerRef.value = null;
          }
        } catch (error) {
          console.error(t("login.message.qrCheckError"), error);
          qrStatus.value = "expired";
          clearInterval(timer);
          timerRef.value = null;
          const errorMsg = t("login.message.qrCheckFailed");
          message.error(errorMsg);
          emit("loginError", errorMsg);
        }
      }, 3e3);
      return timer;
    };
    const refreshQr = () => {
      loadLogin();
    };
    const getStatusText = () => {
      switch (qrStatus.value) {
        case "loading":
          return t("login.message.qrLoading");
        case "active":
          return t("login.qrTip");
        case "expired":
          return t("login.message.qrExpired");
        case "scanned":
          return t("login.message.qrScanned");
        case "confirmed":
          return t("login.message.qrConfirmed");
        default:
          return t("login.qrTip");
      }
    };
    onMounted(() => {
      loadLogin();
    });
    onUnmounted(() => {
      if (timerRef.value) {
        clearInterval(timerRef.value);
        timerRef.value = null;
      }
    });
    return (_ctx, _cache) => {
      const _component_n_spin = __unplugin_components_2;
      const _component_n_button = Button;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["qr-login", unref(setAnimationClass)("animate__fadeInUp")])
      }, [
        createBaseVNode("div", _hoisted_1$2, toDisplayString(unref(t)("login.title.qr")), 1),
        createBaseVNode("div", _hoisted_2$2, [
          unref(qrStatus) === "loading" ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            createVNode(_component_n_spin, { size: "large" }),
            createBaseVNode("div", _hoisted_4$2, toDisplayString(unref(t)("login.message.qrGenerating")), 1)
          ])) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["qr-image-wrapper", { expired: unref(qrStatus) === "expired" }])
          }, [
            createBaseVNode("img", {
              class: "qr-img",
              src: unref(qrUrl)
            }, null, 8, _hoisted_5$2),
            unref(qrStatus) === "expired" ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
              createBaseVNode("div", _hoisted_7$1, toDisplayString(unref(t)("login.message.qrExpiredShort")), 1),
              createVNode(_component_n_button, {
                class: "refresh-btn",
                type: "primary",
                onClick: refreshQr,
                loading: unref(isRefreshing)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(isRefreshing) ? unref(t)("login.button.refreshing") : unref(t)("login.button.refresh")), 1)
                ]),
                _: 1
              }, 8, ["loading"])
            ])) : createCommentVNode("", true),
            unref(qrStatus) === "scanned" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "scanned-icon" }, "✓", -1)),
              createBaseVNode("div", _hoisted_9$1, toDisplayString(unref(t)("login.message.qrScannedShort")), 1)
            ])) : createCommentVNode("", true)
          ], 2))
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["text", { expired: unref(qrStatus) === "expired", scanned: unref(qrStatus) === "scanned" }])
        }, toDisplayString(getStatusText()), 3),
        unref(qrStatus) === "active" ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
          createVNode(_component_n_button, {
            text: "",
            class: "manual-refresh",
            onClick: refreshQr,
            loading: unref(isRefreshing)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("login.button.refreshQr")), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const QrLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a71991b9"]]);
const _hoisted_1$1 = { class: "uid-login" };
const _hoisted_2$1 = { class: "login-title" };
const _hoisted_3$1 = { class: "uid-page" };
const _hoisted_4$1 = ["placeholder"];
const _hoisted_5$1 = { class: "text" };
const _hoisted_6$1 = { class: "warning-text" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "UidLogin"
  },
  __name: "UidLogin",
  props: {
    disabled: { type: Boolean, default: false }
  },
  emits: ["loginSuccess", "loginError"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const message = useMessage();
    const uid = ref("");
    const loading = ref(false);
    const handleLogin = async () => {
      if (props.disabled || loading.value) return;
      if (!uid.value.trim()) {
        const errorMsg = t("login.message.uidRequired");
        message.error(errorMsg);
        emit("loginError", errorMsg);
        return;
      }
      try {
        loading.value = true;
        const { data } = await loginByUid(uid.value);
        if (data && data.profile) {
          const successMsg = t("login.message.uidLoginSuccess");
          message.success(successMsg);
          emit("loginSuccess", data.profile, "uid");
        } else {
          const errorMsg = t("login.message.uidInvalid");
          message.error(errorMsg);
          emit("loginError", errorMsg);
        }
      } catch (error) {
        console.error("UID登录失败:", error);
        let errorMsg = t("login.message.uidLoginFailed");
        if (error.response?.status === 404 || error.response?.data?.code === 404) {
          errorMsg = t("login.message.uidInvalid");
        }
        message.error(errorMsg);
        emit("loginError", errorMsg);
      } finally {
        loading.value = false;
      }
    };
    const reset = () => {
      uid.value = "";
      loading.value = false;
    };
    __expose({
      reset
    });
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, toDisplayString(unref(t)("login.title.uid")), 1),
        createBaseVNode("div", _hoisted_3$1, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(uid) ? uid.value = $event : null),
            class: "uid-input",
            type: "text",
            placeholder: unref(t)("login.placeholder.uid"),
            onKeyup: withKeys(handleLogin, ["enter"])
          }, null, 40, _hoisted_4$1), [
            [vModelText, unref(uid)]
          ])
        ]),
        createBaseVNode("div", _hoisted_5$1, toDisplayString(unref(t)("login.uidTip")), 1),
        createBaseVNode("div", _hoisted_6$1, toDisplayString(unref(t)("login.uidWarning")), 1),
        createVNode(_component_n_button, {
          class: "btn-login",
          loading: unref(loading),
          onClick: handleLogin
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("login.button.login")), 1)
          ]),
          _: 1
        }, 8, ["loading"])
      ]);
    };
  }
});
const UidLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-15c4dc4d"]]);
const _hoisted_1 = { class: "login-page" };
const _hoisted_2 = { class: "content" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "login-content" };
const _hoisted_5 = {
  key: "qr",
  class: "phone"
};
const _hoisted_6 = {
  key: "phone",
  class: "phone"
};
const _hoisted_7 = { class: "login-title" };
const _hoisted_8 = { class: "phone-page" };
const _hoisted_9 = ["placeholder"];
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = { class: "text" };
const _hoisted_12 = {
  key: "uid",
  class: "phone"
};
const _hoisted_13 = {
  key: "token",
  class: "phone"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Login"
  },
  __name: "index",
  setup(__props) {
    const { t } = useI18n();
    const message = useMessage();
    const router = useRouter();
    const userStore = useUserStore();
    const activeMode = ref(
      "cookie"
      /* COOKIE */
    );
    const isTransitioning = ref(false);
    const loginTabs = computed(() => [
      { key: "cookie", label: t("login.title.cookie") },
      { key: "uid", label: t("login.title.uid") },
      { key: "qr", label: t("login.title.qr") }
    ]);
    const phone = ref("");
    const password = ref("");
    const loginPhone = async () => {
      try {
        if (!phone.value.trim()) {
          message.error(t("login.message.phoneRequired"));
          return;
        }
        if (!password.value.trim()) {
          message.error(t("login.message.passwordRequired"));
          return;
        }
        const { data } = await loginByCellphone(phone.value, password.value);
        if (data.code === 200) {
          message.success(t("login.message.loginSuccess"));
          userStore.setUser(data.profile);
          localStorage.setItem("token", data.cookie);
          setTimeout(() => {
            router.push("/user");
          }, 1e3);
        } else {
          message.error(t("login.message.phoneLoginFailed"));
        }
      } catch (error) {
        message.error(t("login.message.phoneLoginFailed"));
        console.error(t("login.message.loginFailed") + ":", error);
      }
    };
    const switchToMode = (mode) => {
      if (mode === activeMode.value) return;
      isTransitioning.value = true;
      setTimeout(() => {
        activeMode.value = mode;
        setTimeout(() => {
          isTransitioning.value = false;
        }, 50);
      }, 150);
    };
    const handleLoginSuccess = (userProfile, loginType) => {
      userStore.setUser(userProfile);
      userStore.setLoginType(loginType);
      const token = loginType !== "uid" ? localStorage.getItem("token") : void 0;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (loginType === "uid") {
        localStorage.setItem("uidLogin", "true");
      }
      setTimeout(() => {
        router.push("/user");
      }, 1e3);
    };
    const handleLoginError = (error) => {
      console.error(t("login.message.loginFailed") + ":", error);
    };
    return (_ctx, _cache) => {
      const _component_n_button = Button;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["phone-login", unref(setAnimationClass)("animate__fadeInDown")])
        }, [
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "bg" }, null, -1)),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", {
              class: normalizeClass(["login-tabs", unref(setAnimationClass)("animate__fadeInUp")])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(loginTabs), (tab) => {
                return openBlock(), createElementBlock("div", {
                  key: tab.key,
                  class: normalizeClass(["tab-item", { active: unref(activeMode) === tab.key }]),
                  onClick: ($event) => switchToMode(tab.key)
                }, toDisplayString(tab.label), 11, _hoisted_3);
              }), 128))
            ], 2),
            createBaseVNode("div", _hoisted_4, [
              createVNode(Transition, {
                name: "login-content",
                mode: "out-in",
                "enter-active-class": "animate__animated animate__fadeIn",
                "leave-active-class": "animate__animated animate__fadeOut"
              }, {
                default: withCtx(() => [
                  unref(activeMode) === "qr" && !unref(isTransitioning) ? (openBlock(), createElementBlock("div", _hoisted_5, [
                    createVNode(QrLogin, {
                      onLoginSuccess: handleLoginSuccess,
                      onLoginError: handleLoginError
                    })
                  ])) : unref(activeMode) === "phone" && !unref(isTransitioning) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, toDisplayString(unref(t)("login.title.phone")), 1),
                    createBaseVNode("div", _hoisted_8, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(phone) ? phone.value = $event : null),
                        class: "phone-input",
                        type: "text",
                        placeholder: unref(t)("login.placeholder.phone")
                      }, null, 8, _hoisted_9), [
                        [vModelText, unref(phone)]
                      ]),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(password) ? password.value = $event : null),
                        class: "phone-input",
                        type: "password",
                        placeholder: unref(t)("login.placeholder.password")
                      }, null, 8, _hoisted_10), [
                        [vModelText, unref(password)]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_11, toDisplayString(unref(t)("login.phoneTip")), 1),
                    createVNode(_component_n_button, {
                      class: "btn-login",
                      onClick: _cache[2] || (_cache[2] = ($event) => loginPhone())
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("login.button.login")), 1)
                      ]),
                      _: 1
                    })
                  ])) : unref(activeMode) === "uid" && !unref(isTransitioning) ? (openBlock(), createElementBlock("div", _hoisted_12, [
                    createVNode(UidLogin, {
                      onLoginSuccess: handleLoginSuccess,
                      onLoginError: handleLoginError
                    })
                  ])) : unref(activeMode) === "cookie" && !unref(isTransitioning) ? (openBlock(), createElementBlock("div", _hoisted_13, [
                    createVNode(CookieLogin, {
                      onLoginSuccess: handleLoginSuccess,
                      onLoginError: handleLoginError
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ])
          ])
        ], 2)
      ]);
    };
  }
});
const LoginComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bfc26111"]]);
export {
  LoginComponent as default
};
