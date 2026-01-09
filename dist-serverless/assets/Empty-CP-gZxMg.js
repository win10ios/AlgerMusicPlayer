import { d as defineComponent, h, c as cB, b as cE, a as c, bM as NBaseIcon, u as useConfig, P as useTheme, O as useLocale, v as computed, W as createKey, X as useThemeClass, d6 as emptyLight } from "./index-0n6GrGnT.js";
const EmptyIcon = defineComponent({
  name: "Empty",
  render() {
    return h("svg", {
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, h("path", {
      d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
      fill: "currentColor"
    }), h("path", {
      d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
      fill: "currentColor"
    }));
  }
});
const style = cB("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [cE("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [c("+", [cE("description", `
 margin-top: 8px;
 `)])]), cE("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), cE("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]);
const emptyProps = Object.assign(Object.assign({}, useTheme.props), {
  description: String,
  showDescription: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "medium"
  },
  renderIcon: Function
});
const __unplugin_components_3 = defineComponent({
  name: "Empty",
  props: emptyProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme("Empty", "-empty", style, emptyLight, props, mergedClsPrefixRef);
    const {
      localeRef
    } = useLocale("Empty");
    const mergedDescriptionRef = computed(() => {
      var _a, _b, _c;
      return (_a = props.description) !== null && _a !== void 0 ? _a : (_c = (_b = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _b === void 0 ? void 0 : _b.Empty) === null || _c === void 0 ? void 0 : _c.description;
    });
    const mergedRenderIconRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Empty) === null || _b === void 0 ? void 0 : _b.renderIcon) || (() => h(EmptyIcon, null));
    });
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          [createKey("iconSize", size)]: iconSize,
          [createKey("fontSize", size)]: fontSize,
          textColor,
          iconColor,
          extraTextColor
        }
      } = themeRef.value;
      return {
        "--n-icon-size": iconSize,
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-text-color": textColor,
        "--n-icon-color": iconColor,
        "--n-extra-text-color": extraTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("empty", computed(() => {
      let hash = "";
      const {
        size
      } = props;
      hash += size[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description;
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? h("div", {
      class: `${mergedClsPrefix}-empty__icon`
    }, $slots.icon ? $slots.icon() : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? h("div", {
      class: `${mergedClsPrefix}-empty__description`
    }, $slots.default ? $slots.default() : this.localizedDescription) : null, $slots.extra ? h("div", {
      class: `${mergedClsPrefix}-empty__extra`
    }, $slots.extra()) : null);
  }
});
export {
  __unplugin_components_3 as _
};
