import { at as upperFirst, au as toString, av as createCompounder, z as inject, aw as throwError, y as createInjectionKey, Q as provide, d as defineComponent, h, u as useConfig, ax as indexMap, s as ref, ay as onBeforeUpdate, v as computed, an as onMounted, az as onBeforeUnmount, c as cB, b as cE, H as cM, a as c, aA as cloneVNode, aB as flatten, aC as VResizeObserver, aD as resolveSlotWithTypedProps, L as withDirectives, a3 as vShow, T as Transition, aE as keep, S as useMergedState, R as toRef, A as watchEffect, aF as onUpdated, U as watch, P as useTheme, X as useThemeClass, Z as getPreciseEventTarget, w as on, a1 as nextTick, x as off, aG as carouselLight, ad as normalizeStyle, a2 as useI18n, aH as setAnimationDelay, aI as useRouter, a4 as createElementBlock, a7 as createBaseVNode, a8 as toDisplayString, a9 as unref, a6 as normalizeClass, aJ as setAnimationClass, ab as Fragment, ac as renderList, aK as getPlaylistCategory, ak as openBlock, am as _export_sfc, aL as getNewAlbum, aa as createCommentVNode, ag as createVNode, aM as getImgUrl, aN as NImage, aO as usePlayerStore, aP as resolveDirective, aQ as getRecommendMusic, aR as _sfc_main$5, aS as useUserStore, aT as useRecommendStore, aU as useArtist, aV as getHotSinger, aW as createBlock, ap as withCtx, aX as setBackgroundImg, aY as isMobile, aZ as createTextVNode, a5 as withModifiers, a_ as getUserPlaylist, a$ as getMusicDetail, b0 as Scrollbar } from "./index-0n6GrGnT.js";
import { g as getAlbum, a as getListDetail } from "./list-DpMGK7Ii.js";
import { n as navigateToMusicList } from "./MusicListNavigator-vskRI2hR.js";
import { F as Favorite } from "./index-DISoGkUz.js";
import "./music-DbKR7Lte.js";
import "./ButtonGroup-cMFcADml.js";
import "./Empty-CP-gZxMg.js";
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}
var camelCase = createCompounder(function(result, word, index2) {
  word = word.toLowerCase();
  return result + (index2 ? capitalize(word) : word);
});
const carouselMethodsInjectionKey = createInjectionKey("n-carousel-methods");
function provideCarouselContext(contextValue) {
  provide(carouselMethodsInjectionKey, contextValue);
}
function useCarouselContext(location = "unknown", component = "component") {
  const CarouselContext = inject(carouselMethodsInjectionKey);
  if (!CarouselContext) {
    throwError(location, `\`${component}\` must be placed inside \`n-carousel\`.`);
  }
  return CarouselContext;
}
function renderBackwardIcon() {
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none"
  }, h("path", {
    d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z",
    fill: "currentColor"
  })));
}
function renderForwardIcon() {
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none"
  }, h("path", {
    d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z",
    fill: "currentColor"
  })));
}
const NCarouselArrow = defineComponent({
  name: "CarouselArrow",
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const {
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    } = useCarouselContext();
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-carousel__arrow-group`
    }, h("div", {
      class: [`${mergedClsPrefix}-carousel__arrow`, this.isPrevDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`],
      role: "button",
      onClick: this.prev
    }, renderBackwardIcon()), h("div", {
      class: [`${mergedClsPrefix}-carousel__arrow`, this.isNextDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`],
      role: "button",
      onClick: this.next
    }, renderForwardIcon()));
  }
});
const carouselDotsProps = {
  total: {
    type: Number,
    default: 0
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  dotType: {
    type: String,
    default: "dot"
  },
  trigger: {
    type: String,
    default: "click"
  },
  keyboard: Boolean
};
const NCarouselDots = defineComponent({
  name: "CarouselDots",
  props: carouselDotsProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const dotElsRef = ref([]);
    const NCarousel = useCarouselContext();
    function handleKeydown(e, current) {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          NCarousel.to(current);
          return;
      }
      if (props.keyboard) {
        handleKeyboard(e);
      }
    }
    function handleMouseenter(current) {
      if (props.trigger === "hover") {
        NCarousel.to(current);
      }
    }
    function handleClick(current) {
      if (props.trigger === "click") {
        NCarousel.to(current);
      }
    }
    function handleKeyboard(e) {
      var _a;
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }
      const nodeName = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase();
      if (nodeName === "input" || nodeName === "textarea") {
        return;
      }
      const {
        code: keycode
      } = e;
      const isVerticalNext = keycode === "PageUp" || keycode === "ArrowUp";
      const isVerticalPrev = keycode === "PageDown" || keycode === "ArrowDown";
      const isHorizontalNext = keycode === "PageUp" || keycode === "ArrowRight";
      const isHorizontalPrev = keycode === "PageDown" || keycode === "ArrowLeft";
      const vertical = NCarousel.isVertical();
      const wantToNext = vertical ? isVerticalNext : isHorizontalNext;
      const wantToPrev = vertical ? isVerticalPrev : isHorizontalPrev;
      if (!wantToNext && !wantToPrev) {
        return;
      }
      e.preventDefault();
      if (wantToNext && !NCarousel.isNextDisabled()) {
        NCarousel.next();
        focusDot(NCarousel.currentIndexRef.value);
      } else if (wantToPrev && !NCarousel.isPrevDisabled()) {
        NCarousel.prev();
        focusDot(NCarousel.currentIndexRef.value);
      }
    }
    function focusDot(index2) {
      var _a;
      (_a = dotElsRef.value[index2]) === null || _a === void 0 ? void 0 : _a.focus();
    }
    onBeforeUpdate(() => dotElsRef.value.length = 0);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      dotEls: dotElsRef,
      handleKeydown,
      handleMouseenter,
      handleClick
    };
  },
  render() {
    const {
      mergedClsPrefix,
      dotEls
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-carousel__dots`, `${mergedClsPrefix}-carousel__dots--${this.dotType}`],
      role: "tablist"
    }, indexMap(this.total, (i) => {
      const selected = i === this.currentIndex;
      return h("div", {
        "aria-selected": selected,
        ref: (el) => dotEls.push(el),
        role: "button",
        tabindex: "0",
        class: [`${mergedClsPrefix}-carousel__dot`, selected && `${mergedClsPrefix}-carousel__dot--active`],
        key: i,
        onClick: () => {
          this.handleClick(i);
        },
        onMouseenter: () => {
          this.handleMouseenter(i);
        },
        onKeydown: (e) => {
          this.handleKeydown(e, i);
        }
      });
    }));
  }
});
const CarouselItemName = "CarouselItem";
function isCarouselItem(child) {
  var _a;
  return ((_a = child.type) === null || _a === void 0 ? void 0 : _a.name) === CarouselItemName;
}
const __unplugin_components_0 = defineComponent({
  name: CarouselItemName,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const NCarousel = useCarouselContext(camelCase(CarouselItemName), `n-${camelCase(CarouselItemName)}`);
    const selfElRef = ref();
    const indexRef = computed(() => {
      const {
        value: selfEl
      } = selfElRef;
      return selfEl ? NCarousel.getSlideIndex(selfEl) : -1;
    });
    const isPrevRef = computed(() => NCarousel.isPrev(indexRef.value));
    const isNextRef = computed(() => NCarousel.isNext(indexRef.value));
    const isActiveRef = computed(() => NCarousel.isActive(indexRef.value));
    const styleRef = computed(() => NCarousel.getSlideStyle(indexRef.value));
    onMounted(() => {
      NCarousel.addSlide(selfElRef.value);
    });
    onBeforeUnmount(() => {
      NCarousel.removeSlide(selfElRef.value);
    });
    function handleClick(event) {
      const {
        value: index2
      } = indexRef;
      if (index2 !== void 0) {
        NCarousel === null || NCarousel === void 0 ? void 0 : NCarousel.onCarouselItemClick(index2, event);
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef,
      handleClick
    };
  },
  render() {
    var _a;
    const {
      $slots: slots,
      mergedClsPrefix,
      isPrev,
      isNext,
      isActive,
      index: index2,
      style: style2
    } = this;
    const className = [`${mergedClsPrefix}-carousel__slide`, {
      [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
      [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
      [`${mergedClsPrefix}-carousel__slide--next`]: isNext
    }];
    return h("div", {
      ref: "selfElRef",
      class: className,
      role: "option",
      tabindex: "-1",
      "data-index": index2,
      "aria-hidden": !isActive,
      style: style2,
      // We use ts-ignore for vue-tsc, since it seems to patch native event
      // for vue components
      // @ts-expect-error vue's tsx has type for capture events
      onClickCapture: this.handleClick
    }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
      isPrev,
      isNext,
      isActive,
      index: index2
    }));
  }
});
const style = cB("carousel", `
 position: relative;
 width: 100%;
 height: 100%;
 touch-action: pan-y;
 overflow: hidden;
`, [cE("slides", `
 display: flex;
 width: 100%;
 height: 100%;
 transition-timing-function: var(--n-bezier);
 transition-property: transform;
 `, [cE("slide", `
 flex-shrink: 0;
 position: relative;
 width: 100%;
 height: 100%;
 outline: none;
 overflow: hidden;
 `, [c("> img", `
 display: block;
 `)])]), cE("dots", `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `, [cM("dot", [cE("dot", `
 height: var(--n-dot-size);
 width: var(--n-dot-size);
 background-color: var(--n-dot-color);
 border-radius: 50%;
 cursor: pointer;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [c("&:focus", `
 background-color: var(--n-dot-color-focus);
 `), cM("active", `
 background-color: var(--n-dot-color-active);
 `)])]), cM("line", [cE("dot", `
 border-radius: 9999px;
 width: var(--n-dot-line-width);
 height: 4px;
 background-color: var(--n-dot-color);
 cursor: pointer;
 transition:
 width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [c("&:focus", `
 background-color: var(--n-dot-color-focus);
 `), cM("active", `
 width: var(--n-dot-line-width-active);
 background-color: var(--n-dot-color-active);
 `)])])]), cE("arrow", `
 transition: background-color .3s var(--n-bezier);
 cursor: pointer;
 height: 28px;
 width: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: rgba(255, 255, 255, .2);
 color: var(--n-arrow-color);
 border-radius: 8px;
 user-select: none;
 -webkit-user-select: none;
 font-size: 18px;
 `, [c("svg", `
 height: 1em;
 width: 1em;
 `), c("&:hover", `
 background-color: rgba(255, 255, 255, .3);
 `)]), cM("vertical", `
 touch-action: pan-x;
 `, [cE("slides", `
 flex-direction: column;
 `), cM("fade", [cE("slide", `
 top: 50%;
 left: unset;
 transform: translateY(-50%);
 `)]), cM("card", [cE("slide", `
 top: 50%;
 left: unset;
 transform: translateY(-50%) translateZ(-400px);
 `, [cM("current", `
 transform: translateY(-50%) translateZ(0);
 `), cM("prev", `
 transform: translateY(-100%) translateZ(-200px);
 `), cM("next", `
 transform: translateY(0%) translateZ(-200px);
 `)])])]), cM("usercontrol", [cE("slides", [c(">", [c("div", `
 position: absolute;
 top: 50%;
 left: 50%;
 width: 100%;
 height: 100%;
 transform: translate(-50%, -50%);
 `)])])]), cM("left", [cE("dots", `
 transform: translateY(-50%);
 top: 50%;
 left: 12px;
 flex-direction: column;
 `, [cM("line", [cE("dot", `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [cM("active", `
 height: var(--n-dot-line-width-active);
 `)])])]), cE("dot", `
 margin: 4px 0;
 `)]), cE("arrow-group", `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `), cM("vertical", [cE("arrow", `
 transform: rotate(90deg);
 `)]), cM("show-arrow", [cM("bottom", [cE("dots", `
 transform: translateX(0);
 bottom: 18px;
 left: 18px;
 `)]), cM("top", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), cM("left", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), cM("right", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 right: 18px;
 `)])]), cM("left", [cE("arrow-group", `
 bottom: 12px;
 left: 12px;
 flex-direction: column;
 `, [c("> *:first-child", `
 margin-bottom: 12px;
 `)])]), cM("right", [cE("dots", `
 transform: translateY(-50%);
 top: 50%;
 right: 12px;
 flex-direction: column;
 `, [cM("line", [cE("dot", `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [cM("active", `
 height: var(--n-dot-line-width-active);
 `)])])]), cE("dot", `
 margin: 4px 0;
 `), cE("arrow-group", `
 bottom: 12px;
 right: 12px;
 flex-direction: column;
 `, [c("> *:first-child", `
 margin-bottom: 12px;
 `)])]), cM("top", [cE("dots", `
 transform: translateX(-50%);
 top: 12px;
 left: 50%;
 `, [cM("line", [cE("dot", `
 margin: 0 4px;
 `)])]), cE("dot", `
 margin: 0 4px;
 `), cE("arrow-group", `
 top: 12px;
 right: 12px;
 `, [c("> *:first-child", `
 margin-right: 12px;
 `)])]), cM("bottom", [cE("dots", `
 transform: translateX(-50%);
 bottom: 12px;
 left: 50%;
 `, [cM("line", [cE("dot", `
 margin: 0 4px;
 `)])]), cE("dot", `
 margin: 0 4px;
 `), cE("arrow-group", `
 bottom: 12px;
 right: 12px;
 `, [c("> *:first-child", `
 margin-right: 12px;
 `)])]), cM("fade", [cE("slide", `
 position: absolute;
 opacity: 0;
 transition-property: opacity;
 pointer-events: none;
 `, [cM("current", `
 opacity: 1;
 pointer-events: auto;
 `)])]), cM("card", [cE("slides", `
 perspective: 1000px;
 `), cE("slide", `
 position: absolute;
 left: 50%;
 opacity: 0;
 transform: translateX(-50%) translateZ(-400px);
 transition-property: opacity, transform;
 `, [cM("current", `
 opacity: 1;
 transform: translateX(-50%) translateZ(0);
 z-index: 1;
 `), cM("prev", `
 opacity: 0.4;
 transform: translateX(-100%) translateZ(-200px);
 `), cM("next", `
 opacity: 0.4;
 transform: translateX(0%) translateZ(-200px);
 `)])])]);
function addDuplicateSlides(slides) {
  const {
    length
  } = slides;
  if (length > 1) {
    slides.push(duplicateSlide(slides[0], 0, "append"));
    slides.unshift(duplicateSlide(slides[length - 1], length - 1, "prepend"));
    return slides;
  }
  return slides;
}
function duplicateSlide(child, index2, position) {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index2}-${position}`
  });
}
function getDisplayIndex(current, length, duplicatedable) {
  if (length === 1) return 0;
  return !duplicatedable ? current : current === 0 ? length - 3 : current === length - 1 ? 0 : current - 1;
}
function getRealIndex(current, duplicatedable) {
  return !duplicatedable ? current : current + 1;
}
function getPrevIndex(current, length, duplicatedable) {
  if (current < 0) return null;
  return current === 0 ? duplicatedable ? length - 1 : null : current - 1;
}
function getNextIndex(current, length, duplicatedable) {
  if (current > length - 1) return null;
  return current === length - 1 ? duplicatedable ? 0 : null : current + 1;
}
function getDisplayTotalView(total, duplicatedable) {
  return duplicatedable && total > 3 ? total - 2 : total;
}
function isTouchEvent(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}
function calculateSize(element, innerOnly) {
  let {
    offsetWidth: width,
    offsetHeight: height
  } = element;
  if (innerOnly) {
    const style2 = getComputedStyle(element);
    width = width - Number.parseFloat(style2.getPropertyValue("padding-left")) - Number.parseFloat(style2.getPropertyValue("padding-right"));
    height = height - Number.parseFloat(style2.getPropertyValue("padding-top")) - Number.parseFloat(style2.getPropertyValue("padding-bottom"));
  }
  return {
    width,
    height
  };
}
function clampValue(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
function resolveSpeed(value) {
  if (value === void 0) return 0;
  if (typeof value === "number") return value;
  const timeRE = /^((\d+)?\.?\d+?)(ms|s)?$/;
  const match = value.match(timeRE);
  if (match) {
    const [, number, , unit = "ms"] = match;
    return Number(number) * (unit === "ms" ? 1 : 1e3);
  }
  return 0;
}
const transitionProperties = ["transitionDuration", "transitionTimingFunction"];
const carouselProps = Object.assign(Object.assign({}, useTheme.props), {
  defaultIndex: {
    type: Number,
    default: 0
  },
  currentIndex: Number,
  showArrow: Boolean,
  dotType: {
    type: String,
    default: "dot"
  },
  dotPlacement: {
    type: String,
    default: "bottom"
  },
  slidesPerView: {
    type: [Number, String],
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  centeredSlides: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  autoplay: Boolean,
  interval: {
    type: Number,
    default: 5e3
  },
  loop: {
    type: Boolean,
    default: true
  },
  effect: {
    type: String,
    default: "slide"
  },
  showDots: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: "click"
  },
  transitionStyle: {
    type: Object,
    default: () => ({
      transitionDuration: "300ms"
    })
  },
  transitionProps: Object,
  draggable: Boolean,
  prevSlideStyle: [Object, String],
  nextSlideStyle: [Object, String],
  touchable: {
    type: Boolean,
    default: true
  },
  mousewheel: Boolean,
  keyboard: Boolean,
  "onUpdate:currentIndex": Function,
  onUpdateCurrentIndex: Function
});
let globalDragging = false;
const __unplugin_components_1 = defineComponent({
  name: "Carousel",
  props: carouselProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const selfElRef = ref(null);
    const slidesElRef = ref(null);
    const slideElsRef = ref([]);
    const slideVNodesRef = {
      value: []
    };
    const verticalRef = computed(() => props.direction === "vertical");
    const sizeAxisRef = computed(() => verticalRef.value ? "height" : "width");
    const spaceAxisRef = computed(() => verticalRef.value ? "bottom" : "right");
    const sequenceLayoutRef = computed(() => props.effect === "slide");
    const duplicatedableRef = computed(
      // duplicate the copy operation in `slide` mode,
      // because only its DOM is sequence layout
      () => props.loop && props.slidesPerView === 1 && sequenceLayoutRef.value
    );
    const userWantsControlRef = computed(() => props.effect === "custom");
    const displaySlidesPerViewRef = computed(() => !sequenceLayoutRef.value || props.centeredSlides ? 1 : props.slidesPerView);
    const realSlidesPerViewRef = computed(() => userWantsControlRef.value ? 1 : props.slidesPerView);
    const autoSlideSizeRef = computed(() => displaySlidesPerViewRef.value === "auto" || props.slidesPerView === "auto" && props.centeredSlides);
    const perViewSizeRef = ref({
      width: 0,
      height: 0
    });
    const slideSizesTrigger = ref(0);
    const slideSizesRef = computed(() => {
      const {
        value: slidesEls
      } = slideElsRef;
      if (!slidesEls.length) return [];
      slideSizesTrigger.value;
      const {
        value: autoSlideSize
      } = autoSlideSizeRef;
      if (autoSlideSize) {
        return slidesEls.map((slide) => calculateSize(slide));
      }
      const {
        value: slidesPerView
      } = realSlidesPerViewRef;
      const {
        value: perViewSize
      } = perViewSizeRef;
      const {
        value: axis
      } = sizeAxisRef;
      let axisSize = perViewSize[axis];
      if (slidesPerView !== "auto") {
        const {
          spaceBetween
        } = props;
        const remaining = axisSize - (slidesPerView - 1) * spaceBetween;
        const percentage = 1 / Math.max(1, slidesPerView);
        axisSize = remaining * percentage;
      }
      const slideSize = Object.assign(Object.assign({}, perViewSize), {
        [axis]: axisSize
      });
      return slidesEls.map(() => slideSize);
    });
    const slideTranlatesRef = computed(() => {
      const {
        value: slideSizes
      } = slideSizesRef;
      if (!slideSizes.length) return [];
      const {
        centeredSlides,
        spaceBetween
      } = props;
      const {
        value: axis
      } = sizeAxisRef;
      const {
        [axis]: perViewSize
      } = perViewSizeRef.value;
      let previousTranslate2 = 0;
      return slideSizes.map(({
        [axis]: slideSize
      }) => {
        let translate = previousTranslate2;
        if (centeredSlides) {
          translate += (slideSize - perViewSize) / 2;
        }
        previousTranslate2 += slideSize + spaceBetween;
        return translate;
      });
    });
    const isMountedRef = ref(false);
    const transitionStyleRef = computed(() => {
      const {
        transitionStyle
      } = props;
      return transitionStyle ? keep(transitionStyle, transitionProperties) : {};
    });
    const speedRef = computed(() => userWantsControlRef.value ? 0 : resolveSpeed(transitionStyleRef.value.transitionDuration));
    const slideStylesRef = computed(() => {
      const {
        value: slidesEls
      } = slideElsRef;
      if (!slidesEls.length) return [];
      const useComputedSize = !(autoSlideSizeRef.value || realSlidesPerViewRef.value === 1);
      const getSlideSize = (index2) => {
        if (useComputedSize) {
          const {
            value: axis
          } = sizeAxisRef;
          return {
            [axis]: `${slideSizesRef.value[index2][axis]}px`
          };
        }
      };
      if (userWantsControlRef.value) {
        return slidesEls.map((_, i) => getSlideSize(i));
      }
      const {
        effect,
        spaceBetween
      } = props;
      const {
        value: spaceAxis
      } = spaceAxisRef;
      return slidesEls.reduce((styles, _, i) => {
        const style2 = Object.assign(Object.assign({}, getSlideSize(i)), {
          [`margin-${spaceAxis}`]: `${spaceBetween}px`
        });
        styles.push(style2);
        if (isMountedRef.value && (effect === "fade" || effect === "card")) {
          Object.assign(style2, transitionStyleRef.value);
        }
        return styles;
      }, []);
    });
    const totalViewRef = computed(() => {
      const {
        value: slidesPerView
      } = displaySlidesPerViewRef;
      const {
        length: totalSlides
      } = slideElsRef.value;
      if (slidesPerView !== "auto") {
        return Math.max(totalSlides - slidesPerView, 0) + 1;
      } else {
        const {
          value: slideSizes
        } = slideSizesRef;
        const {
          length
        } = slideSizes;
        if (!length) return totalSlides;
        const {
          value: translates
        } = slideTranlatesRef;
        const {
          value: axis
        } = sizeAxisRef;
        const perViewSize = perViewSizeRef.value[axis];
        let lastViewSize = slideSizes[slideSizes.length - 1][axis];
        let i = length;
        while (i > 1 && lastViewSize < perViewSize) {
          i--;
          lastViewSize += translates[i] - translates[i - 1];
        }
        return clampValue(i + 1, 1, length);
      }
    });
    const displayTotalViewRef = computed(() => getDisplayTotalView(totalViewRef.value, duplicatedableRef.value));
    const defaultRealIndex = getRealIndex(props.defaultIndex, duplicatedableRef.value);
    const uncontrolledDisplayIndexRef = ref(getDisplayIndex(defaultRealIndex, totalViewRef.value, duplicatedableRef.value));
    const mergedDisplayIndexRef = useMergedState(toRef(props, "currentIndex"), uncontrolledDisplayIndexRef);
    const realIndexRef = computed(() => getRealIndex(mergedDisplayIndexRef.value, duplicatedableRef.value));
    function toRealIndex(index2) {
      var _a, _b;
      index2 = clampValue(index2, 0, totalViewRef.value - 1);
      const displayIndex = getDisplayIndex(index2, totalViewRef.value, duplicatedableRef.value);
      const {
        value: lastDisplayIndex
      } = mergedDisplayIndexRef;
      if (displayIndex !== mergedDisplayIndexRef.value) {
        uncontrolledDisplayIndexRef.value = displayIndex;
        (_a = props["onUpdate:currentIndex"]) === null || _a === void 0 ? void 0 : _a.call(props, displayIndex, lastDisplayIndex);
        (_b = props.onUpdateCurrentIndex) === null || _b === void 0 ? void 0 : _b.call(props, displayIndex, lastDisplayIndex);
      }
    }
    function getRealPrevIndex(index2 = realIndexRef.value) {
      return getPrevIndex(index2, totalViewRef.value, props.loop);
    }
    function getRealNextIndex(index2 = realIndexRef.value) {
      return getNextIndex(index2, totalViewRef.value, props.loop);
    }
    function isRealPrev(slideOrIndex) {
      const index2 = getSlideIndex(slideOrIndex);
      return index2 !== null && getRealPrevIndex() === index2 && totalViewRef.value > 1;
    }
    function isRealNext(slideOrIndex) {
      const index2 = getSlideIndex(slideOrIndex);
      return index2 !== null && getRealNextIndex() === index2 && totalViewRef.value > 1;
    }
    function isRealActive(slideOrIndex) {
      return realIndexRef.value === getSlideIndex(slideOrIndex);
    }
    function isDisplayActive(index2) {
      return mergedDisplayIndexRef.value === index2;
    }
    function isPrevDisabled() {
      return getRealPrevIndex() === null;
    }
    function isNextDisabled() {
      return getRealNextIndex() === null;
    }
    let expectedTransitionDirection = 0;
    function to(index2) {
      const realIndex = clampValue(getRealIndex(index2, duplicatedableRef.value), 0, totalViewRef.value);
      if (index2 !== mergedDisplayIndexRef.value || realIndex !== realIndexRef.value) {
        toRealIndex(realIndex);
      }
    }
    function prev() {
      const prevIndex = getRealPrevIndex();
      if (prevIndex !== null) {
        expectedTransitionDirection = -1;
        toRealIndex(prevIndex);
      }
    }
    function next() {
      const nextIndex = getRealNextIndex();
      if (nextIndex !== null) {
        expectedTransitionDirection = 1;
        toRealIndex(nextIndex);
      }
    }
    let inTransition = false;
    function prevIfSlideTransitionEnd() {
      if (!inTransition || !duplicatedableRef.value) prev();
    }
    function nextIfSlideTransitionEnd() {
      if (!inTransition || !duplicatedableRef.value) next();
    }
    let previousTranslate = 0;
    const translateStyleRef = ref({});
    function updateTranslate(translate, speed = 0) {
      translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
        transform: verticalRef.value ? `translateY(${-translate}px)` : `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      });
    }
    function fixTranslate(speed = 0) {
      if (sequenceLayoutRef.value) {
        translateTo(realIndexRef.value, speed);
      } else if (previousTranslate !== 0) {
        if (!inTransition && speed > 0) {
          inTransition = true;
        }
        updateTranslate(previousTranslate = 0, speed);
      }
    }
    function translateTo(index2, speed) {
      const translate = getTranslate(index2);
      if (translate !== previousTranslate && speed > 0) {
        inTransition = true;
      }
      previousTranslate = getTranslate(realIndexRef.value);
      updateTranslate(translate, speed);
    }
    function getTranslate(index2) {
      let translate;
      if (index2 >= totalViewRef.value - 1) {
        translate = getLastViewTranslate();
      } else {
        translate = slideTranlatesRef.value[index2] || 0;
      }
      return translate;
    }
    function getLastViewTranslate() {
      if (displaySlidesPerViewRef.value === "auto") {
        const {
          value: axis
        } = sizeAxisRef;
        const {
          [axis]: perViewSize
        } = perViewSizeRef.value;
        const {
          value: translates
        } = slideTranlatesRef;
        const lastTranslate = translates[translates.length - 1];
        let overallSize;
        if (lastTranslate === void 0) {
          overallSize = perViewSize;
        } else {
          const {
            value: slideSizes
          } = slideSizesRef;
          overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis];
        }
        return overallSize - perViewSize;
      } else {
        const {
          value: translates
        } = slideTranlatesRef;
        return translates[totalViewRef.value - 1] || 0;
      }
    }
    const carouselContext = {
      currentIndexRef: mergedDisplayIndexRef,
      to,
      prev: prevIfSlideTransitionEnd,
      next: nextIfSlideTransitionEnd,
      isVertical: () => verticalRef.value,
      isHorizontal: () => !verticalRef.value,
      isPrev: isRealPrev,
      isNext: isRealNext,
      isActive: isRealActive,
      isPrevDisabled,
      isNextDisabled,
      getSlideIndex,
      getSlideStyle,
      addSlide,
      removeSlide,
      onCarouselItemClick
    };
    provideCarouselContext(carouselContext);
    function addSlide(slide) {
      if (!slide) return;
      slideElsRef.value.push(slide);
    }
    function removeSlide(slide) {
      if (!slide) return;
      const index2 = getSlideIndex(slide);
      if (index2 !== -1) {
        slideElsRef.value.splice(index2, 1);
      }
    }
    function getSlideIndex(slideOrIndex) {
      return typeof slideOrIndex === "number" ? slideOrIndex : slideOrIndex ? slideElsRef.value.indexOf(slideOrIndex) : -1;
    }
    function getSlideStyle(slide) {
      const index2 = getSlideIndex(slide);
      if (index2 !== -1) {
        const styles = [slideStylesRef.value[index2]];
        const isPrev = carouselContext.isPrev(index2);
        const isNext = carouselContext.isNext(index2);
        if (isPrev) {
          styles.push(props.prevSlideStyle || "");
        }
        if (isNext) {
          styles.push(props.nextSlideStyle || "");
        }
        return normalizeStyle(styles);
      }
    }
    let dragStartX = 0;
    let dragStartY = 0;
    let dragOffset = 0;
    let dragStartTime = 0;
    let dragging = false;
    let isEffectiveDrag = false;
    function onCarouselItemClick(index2, event) {
      let allowClick = !inTransition && !dragging && !isEffectiveDrag;
      if (props.effect === "card" && allowClick && !isRealActive(index2)) {
        to(index2);
        allowClick = false;
      }
      if (!allowClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    let autoplayTimer = null;
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    function resetAutoplay() {
      stopAutoplay();
      const disabled = !props.autoplay || displayTotalViewRef.value < 2;
      if (!disabled) {
        autoplayTimer = window.setInterval(next, props.interval);
      }
    }
    function handleTouchstart(event) {
      var _a;
      if (globalDragging) return;
      if (!((_a = slidesElRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(event)))) {
        return;
      }
      globalDragging = true;
      dragging = true;
      isEffectiveDrag = false;
      dragStartTime = Date.now();
      stopAutoplay();
      if (event.type !== "touchstart" && !event.target.isContentEditable) {
        event.preventDefault();
      }
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event;
      if (verticalRef.value) {
        dragStartY = touchEvent.clientY;
      } else {
        dragStartX = touchEvent.clientX;
      }
      if (props.touchable) {
        on("touchmove", document, handleTouchmove);
        on("touchend", document, handleTouchend);
        on("touchcancel", document, handleTouchend);
      }
      if (props.draggable) {
        on("mousemove", document, handleTouchmove);
        on("mouseup", document, handleTouchend);
      }
    }
    function handleTouchmove(event) {
      const {
        value: vertical
      } = verticalRef;
      const {
        value: axis
      } = sizeAxisRef;
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event;
      const offset = vertical ? touchEvent.clientY - dragStartY : touchEvent.clientX - dragStartX;
      const perViewSize = perViewSizeRef.value[axis];
      dragOffset = clampValue(offset, -perViewSize, perViewSize);
      if (event.cancelable) {
        event.preventDefault();
      }
      if (sequenceLayoutRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0);
      }
    }
    function handleTouchend() {
      const {
        value: realIndex
      } = realIndexRef;
      let currentIndex = realIndex;
      if (!inTransition && dragOffset !== 0 && sequenceLayoutRef.value) {
        const currentTranslate = previousTranslate - dragOffset;
        const translates = [...slideTranlatesRef.value.slice(0, totalViewRef.value - 1), getLastViewTranslate()];
        let prevOffset = null;
        for (let i = 0; i < translates.length; i++) {
          const offset = Math.abs(translates[i] - currentTranslate);
          if (prevOffset !== null && prevOffset < offset) {
            break;
          }
          prevOffset = offset;
          currentIndex = i;
        }
      }
      if (currentIndex === realIndex) {
        const timeElapsed = Date.now() - dragStartTime;
        const {
          value: axis
        } = sizeAxisRef;
        const perViewSize = perViewSizeRef.value[axis];
        if (dragOffset > perViewSize / 2 || dragOffset / timeElapsed > 0.4) {
          prev();
        } else if (dragOffset < -perViewSize / 2 || dragOffset / timeElapsed < -0.4) {
          next();
        }
      }
      if (currentIndex !== null && currentIndex !== realIndex) {
        isEffectiveDrag = true;
        toRealIndex(currentIndex);
        void nextTick(() => {
          if (!duplicatedableRef.value || uncontrolledDisplayIndexRef.value !== mergedDisplayIndexRef.value) {
            fixTranslate(speedRef.value);
          }
        });
      } else {
        fixTranslate(speedRef.value);
      }
      resetDragStatus();
      resetAutoplay();
    }
    function resetDragStatus() {
      if (dragging) {
        globalDragging = false;
      }
      dragging = false;
      dragStartX = 0;
      dragStartY = 0;
      dragOffset = 0;
      dragStartTime = 0;
      off("touchmove", document, handleTouchmove);
      off("touchend", document, handleTouchend);
      off("touchcancel", document, handleTouchend);
      off("mousemove", document, handleTouchmove);
      off("mouseup", document, handleTouchend);
    }
    function handleTransitionEnd() {
      if (sequenceLayoutRef.value && inTransition) {
        const {
          value: realIndex
        } = realIndexRef;
        translateTo(realIndex, 0);
      } else {
        resetAutoplay();
      }
      if (sequenceLayoutRef.value) {
        translateStyleRef.value.transitionDuration = "0ms";
      }
      inTransition = false;
    }
    function handleMousewheel(event) {
      event.preventDefault();
      if (inTransition) return;
      let {
        deltaX,
        deltaY
      } = event;
      if (event.shiftKey && !deltaX) {
        deltaX = deltaY;
      }
      const prevMultiplier = -1;
      const nextMultiplier = 1;
      const m = (deltaX || deltaY) > 0 ? nextMultiplier : prevMultiplier;
      let rx = 0;
      let ry = 0;
      if (verticalRef.value) {
        ry = m;
      } else {
        rx = m;
      }
      const responseStep = 10;
      if (ry * deltaY >= responseStep || rx * deltaX >= responseStep) {
        if (m === nextMultiplier && !isNextDisabled()) {
          next();
        } else if (m === prevMultiplier && !isPrevDisabled()) {
          prev();
        }
      }
    }
    function handleResize() {
      perViewSizeRef.value = calculateSize(selfElRef.value, true);
      resetAutoplay();
    }
    function handleSlideResize() {
      if (autoSlideSizeRef.value) {
        slideSizesTrigger.value++;
      }
    }
    function handleMouseenter() {
      if (props.autoplay) {
        stopAutoplay();
      }
    }
    function handleMouseleave() {
      if (props.autoplay) {
        resetAutoplay();
      }
    }
    onMounted(() => {
      watchEffect(resetAutoplay);
      requestAnimationFrame(() => isMountedRef.value = true);
    });
    onBeforeUnmount(() => {
      resetDragStatus();
      stopAutoplay();
    });
    onUpdated(() => {
      const {
        value: slidesEls
      } = slideElsRef;
      const {
        value: slideVNodes
      } = slideVNodesRef;
      const indexMap2 = /* @__PURE__ */ new Map();
      const getDisplayIndex2 = (el) => indexMap2.has(el) ? indexMap2.get(el) : -1;
      let isChanged = false;
      for (let i = 0; i < slidesEls.length; i++) {
        const index2 = slideVNodes.findIndex((v) => v.el === slidesEls[i]);
        if (index2 !== i) {
          isChanged = true;
        }
        indexMap2.set(slidesEls[i], index2);
      }
      if (isChanged) {
        slidesEls.sort((a, b) => getDisplayIndex2(a) - getDisplayIndex2(b));
      }
    });
    watch(realIndexRef, (nextRealIndex, lastRealIndex) => {
      if (nextRealIndex === lastRealIndex) {
        expectedTransitionDirection = 0;
        return;
      }
      resetAutoplay();
      if (sequenceLayoutRef.value) {
        if (duplicatedableRef.value) {
          const {
            value: length
          } = totalViewRef;
          if (expectedTransitionDirection === -1 && lastRealIndex === 1 && nextRealIndex === length - 2) {
            nextRealIndex = 0;
          } else if (expectedTransitionDirection === 1 && lastRealIndex === length - 2 && nextRealIndex === 1) {
            nextRealIndex = length - 1;
          }
        }
        translateTo(nextRealIndex, speedRef.value);
      } else {
        fixTranslate();
      }
      expectedTransitionDirection = 0;
    }, {
      immediate: true
    });
    watch([duplicatedableRef, displaySlidesPerViewRef], () => void nextTick(() => {
      toRealIndex(realIndexRef.value);
    }));
    watch(slideTranlatesRef, () => {
      if (sequenceLayoutRef.value) {
        fixTranslate();
      }
    }, {
      deep: true
    });
    watch(sequenceLayoutRef, (value) => {
      if (!value) {
        inTransition = false;
        updateTranslate(previousTranslate = 0);
      } else {
        fixTranslate();
      }
    });
    const slidesControlListenersRef = computed(() => {
      return {
        onTouchstartPassive: props.touchable ? handleTouchstart : void 0,
        onMousedown: props.draggable ? handleTouchstart : void 0,
        onWheel: props.mousewheel ? handleMousewheel : void 0
      };
    });
    const arrowSlotPropsRef = computed(() => Object.assign(Object.assign({}, keep(carouselContext, ["to", "prev", "next", "isPrevDisabled", "isNextDisabled"])), {
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value
    }));
    const dotSlotPropsRef = computed(() => ({
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value,
      to: carouselContext.to
    }));
    const caroulseExposedMethod = {
      getCurrentIndex: () => mergedDisplayIndexRef.value,
      to,
      prev,
      next
    };
    const themeRef = useTheme("Carousel", "-carousel", style, carouselLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          dotSize,
          dotColor,
          dotColorActive,
          dotColorFocus,
          dotLineWidth,
          dotLineWidthActive,
          arrowColor
        }
      } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-dot-color": dotColor,
        "--n-dot-color-focus": dotColorFocus,
        "--n-dot-color-active": dotColorActive,
        "--n-dot-size": dotSize,
        "--n-dot-line-width": dotLineWidth,
        "--n-dot-line-width-active": dotLineWidthActive,
        "--n-arrow-color": arrowColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("carousel", void 0, cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      slidesElRef,
      slideVNodes: slideVNodesRef,
      duplicatedable: duplicatedableRef,
      userWantsControl: userWantsControlRef,
      autoSlideSize: autoSlideSizeRef,
      realIndex: realIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      slidesControlListeners: slidesControlListenersRef,
      handleTransitionEnd,
      handleResize,
      handleSlideResize,
      handleMouseenter,
      handleMouseleave,
      isActive: isDisplayActive,
      arrowSlotProps: arrowSlotPropsRef,
      dotSlotProps: dotSlotPropsRef
    }, caroulseExposedMethod), {
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      showArrow,
      userWantsControl,
      slideStyles,
      dotType,
      dotPlacement,
      slidesControlListeners,
      transitionProps = {},
      arrowSlotProps,
      dotSlotProps,
      $slots: {
        default: defaultSlot,
        dots: dotsSlot,
        arrow: arrowSlot
      }
    } = this;
    const children = defaultSlot && flatten(defaultSlot()) || [];
    let slides = filterCarouselItem(children);
    if (!slides.length) {
      slides = children.map((ch) => h(__unplugin_components_0, null, {
        default: () => cloneVNode(ch)
      }));
    }
    if (this.duplicatedable) {
      slides = addDuplicateSlides(slides);
    }
    this.slideVNodes.value = slides;
    if (this.autoSlideSize) {
      slides = slides.map((slide) => h(VResizeObserver, {
        onResize: this.handleSlideResize
      }, {
        default: () => slide
      }));
    }
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", Object.assign({
      ref: "selfElRef",
      class: [this.themeClass, `${mergedClsPrefix}-carousel`, this.direction === "vertical" && `${mergedClsPrefix}-carousel--vertical`, this.showArrow && `${mergedClsPrefix}-carousel--show-arrow`, `${mergedClsPrefix}-carousel--${dotPlacement}`, `${mergedClsPrefix}-carousel--${this.direction}`, `${mergedClsPrefix}-carousel--${this.effect}`, userWantsControl && `${mergedClsPrefix}-carousel--usercontrol`],
      style: this.cssVars
    }, slidesControlListeners, {
      onMouseenter: this.handleMouseenter,
      onMouseleave: this.handleMouseleave
    }), h(VResizeObserver, {
      onResize: this.handleResize
    }, {
      default: () => h("div", {
        ref: "slidesElRef",
        class: `${mergedClsPrefix}-carousel__slides`,
        role: "listbox",
        style: this.translateStyle,
        onTransitionend: this.handleTransitionEnd
      }, userWantsControl ? slides.map((slide, i) => h("div", {
        style: slideStyles[i],
        key: i
      }, withDirectives(h(Transition, Object.assign({}, transitionProps), {
        default: () => slide
      }), [[vShow, this.isActive(i)]]))) : slides)
    }), this.showDots && dotSlotProps.total > 1 && resolveSlotWithTypedProps(dotsSlot, dotSlotProps, () => [h(NCarouselDots, {
      key: dotType + dotPlacement,
      total: dotSlotProps.total,
      currentIndex: dotSlotProps.currentIndex,
      dotType,
      trigger: this.trigger,
      keyboard: this.keyboard
    })]), showArrow && resolveSlotWithTypedProps(arrowSlot, arrowSlotProps, () => [h(NCarouselArrow, null)]));
  }
});
function filterCarouselItem(vnodes) {
  return vnodes.reduce((carouselItems, vnode) => {
    if (isCarouselItem(vnode)) {
      carouselItems.push(vnode);
    }
    return carouselItems;
  }, []);
}
const _hoisted_1$4 = { class: "play-list-type" };
const _hoisted_2$3 = ["onClick"];
const DELAY_TIME = 40;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PlaylistType",
  setup(__props) {
    const { t } = useI18n();
    const playlistCategory = ref();
    const isShowAllPlaylistCategory = ref(false);
    const getAnimationDelay = computed(() => {
      return (index2) => {
        if (index2 <= 19) {
          return setAnimationDelay(index2, DELAY_TIME);
        }
        if (!isShowAllPlaylistCategory.value) {
          const nowIndex = (playlistCategory.value?.sub.length || 0) - index2;
          return setAnimationDelay(nowIndex, DELAY_TIME);
        }
        return setAnimationDelay(index2 - 19, DELAY_TIME);
      };
    });
    watch(isShowAllPlaylistCategory, (newVal) => {
      if (!newVal) {
        const elements = playlistCategory.value?.sub.map(
          (_, index2) => document.querySelector(`.type-item-${index2}`)
        );
        elements.slice(20).reverse().forEach((element, index2) => {
          if (element) {
            setTimeout(
              () => {
                element.style.position = "absolute";
              },
              index2 * DELAY_TIME + 400
            );
          }
        });
        setTimeout(
          () => {
            isHiding.value = false;
            document.querySelectorAll(".play-list-type-item").forEach((element) => {
              if (element) {
                console.log("element", element);
                element.style.position = "none";
              }
            });
          },
          (playlistCategory.value?.sub.length || 0 - 19) * DELAY_TIME
        );
      } else {
        document.querySelectorAll(".play-list-type-item").forEach((element) => {
          if (element) {
            element.style.position = "none";
          }
        });
      }
    });
    const loadPlaylistCategory = async () => {
      const { data } = await getPlaylistCategory();
      playlistCategory.value = data;
    };
    const router = useRouter();
    const handleClickPlaylistType = (type) => {
      router.push({
        path: "/list",
        query: {
          type
        }
      });
    };
    const isHiding = ref(false);
    const handleToggleShowAllPlaylistCategory = () => {
      isShowAllPlaylistCategory.value = !isShowAllPlaylistCategory.value;
      if (!isShowAllPlaylistCategory.value) {
        isHiding.value = true;
      }
    };
    onMounted(() => {
      loadPlaylistCategory();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", {
          class: normalizeClass(["title", unref(setAnimationClass)("animate__fadeInLeft")])
        }, toDisplayString(unref(t)("comp.playlistType.title")), 3),
        createBaseVNode("div", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(playlistCategory.value?.sub, (item, index2) => {
            return withDirectives((openBlock(), createElementBlock("span", {
              key: item.name,
              class: normalizeClass([
                "play-list-type-item",
                unref(setAnimationClass)(
                  index2 <= 19 ? "animate__bounceIn" : !isShowAllPlaylistCategory.value ? "animate__backOutLeft" : "animate__bounceIn"
                ) + " type-item-" + index2
              ]),
              style: normalizeStyle(getAnimationDelay.value(index2)),
              onClick: ($event) => handleClickPlaylistType(item.name)
            }, toDisplayString(item.name), 15, _hoisted_2$3)), [
              [vShow, isShowAllPlaylistCategory.value || index2 <= 19 || isHiding.value]
            ]);
          }), 128)),
          createBaseVNode("div", {
            class: normalizeClass(["play-list-type-showall", unref(setAnimationClass)("animate__bounceIn")]),
            style: normalizeStyle(
              unref(setAnimationDelay)(
                !isShowAllPlaylistCategory.value ? 25 : playlistCategory.value?.sub.length || 100 + 30
              )
            ),
            onClick: handleToggleShowAllPlaylistCategory
          }, toDisplayString(!isShowAllPlaylistCategory.value ? unref(t)("comp.playlistType.showAll") : unref(t)("comp.playlistType.hide")), 7)
        ])
      ]);
    };
  }
});
const PlaylistType = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-a9ae3794"]]);
const _hoisted_1$3 = { class: "recommend-album" };
const _hoisted_2$2 = { class: "recommend-album-list" };
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = { class: "recommend-album-list-item-content" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RecommendAlbum",
  setup(__props) {
    const { t } = useI18n();
    const albumData = ref();
    const loadAlbumList = async () => {
      const { data } = await getNewAlbum();
      albumData.value = data;
    };
    const router = useRouter();
    const handleClick = async (item) => {
      openAlbum(item);
    };
    const openAlbum = async (album) => {
      if (!album) return;
      try {
        const res = await getAlbum(album.id);
        const { songs, album: albumInfo } = res.data;
        const formattedSongs = songs.map((song) => {
          song.al.picUrl = song.al.picUrl || albumInfo.picUrl;
          song.picUrl = song.al.picUrl || albumInfo.picUrl || song.picUrl;
          return song;
        });
        navigateToMusicList(router, {
          id: album.id,
          type: "album",
          name: album.name,
          songList: formattedSongs,
          listInfo: {
            ...albumInfo,
            creator: {
              avatarUrl: albumInfo.artist.img1v1Url,
              nickname: `${albumInfo.artist.name} - ${albumInfo.company}`
            },
            description: albumInfo.description
          }
        });
      } catch (error) {
        console.error("获取专辑详情失败:", error);
      }
    };
    onMounted(() => {
      loadAlbumList();
    });
    return (_ctx, _cache) => {
      const _component_n_image = NImage;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          class: normalizeClass(["title", unref(setAnimationClass)("animate__fadeInRight")])
        }, toDisplayString(unref(t)("comp.recommendAlbum.title")), 3),
        createBaseVNode("div", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(albumData.value?.albums, (item, index2) => {
            return openBlock(), createElementBlock(Fragment, {
              key: item.id
            }, [
              index2 < 6 ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["recommend-album-list-item", unref(setAnimationClass)("animate__backInUp")]),
                style: normalizeStyle(unref(setAnimationDelay)(index2, 100)),
                onClick: ($event) => handleClick(item)
              }, [
                createVNode(_component_n_image, {
                  class: "recommend-album-list-item-img",
                  src: unref(getImgUrl)(item.blurPicUrl, "200y200"),
                  lazy: "",
                  "preview-disabled": ""
                }, null, 8, ["src"]),
                createBaseVNode("div", _hoisted_4$1, toDisplayString(item.name), 1)
              ], 14, _hoisted_3$1)) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ])
      ]);
    };
  }
});
const RecommendAlbum = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7b550b63"]]);
const _hoisted_1$2 = { class: "recommend-music" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RecommendSonglist",
  setup(__props) {
    const { t } = useI18n();
    const playerStore = usePlayerStore();
    const recommendMusic = ref();
    const loading = ref(false);
    const loadRecommendMusic = async () => {
      loading.value = true;
      const { data } = await getRecommendMusic({ limit: 10 });
      recommendMusic.value = data;
      loading.value = false;
    };
    onMounted(() => {
      loadRecommendMusic();
    });
    const handlePlay = () => {
      if (recommendMusic.value?.result) {
        playerStore.setPlayList(recommendMusic.value.result);
      }
    };
    return (_ctx, _cache) => {
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: normalizeClass(["title", unref(setAnimationClass)("animate__fadeInLeft")])
        }, toDisplayString(unref(t)("comp.recommendSonglist.title")), 3),
        withDirectives((openBlock(), createElementBlock("div", {
          class: normalizeClass(["recommend-music-list", unref(setAnimationClass)("animate__bounceInUp")])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(recommendMusic)?.result, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              key: item.id,
              class: normalizeClass(unref(setAnimationClass)("animate__bounceInUp")),
              style: normalizeStyle(unref(setAnimationDelay)(index2, 100))
            }, [
              createVNode(_sfc_main$5, {
                item,
                onPlay: handlePlay
              }, null, 8, ["item"])
            ], 6);
          }), 128))
        ], 2)), [
          [vShow, unref(recommendMusic)?.result],
          [_directive_loading, unref(loading)]
        ])
      ]);
    };
  }
});
const RecommendSonglist = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7cc401cf"]]);
const _hoisted_1$1 = { class: "recommend-singer" };
const _hoisted_2$1 = { class: "recommend-singer-list" };
const _hoisted_3 = {
  key: 0,
  class: "recommend-singer-item relative"
};
const _hoisted_4 = { class: "font-bold text-lg" };
const _hoisted_5 = { class: "mt-2" };
const _hoisted_6 = { class: "user-play" };
const _hoisted_7 = { class: "user-play-title mb-3" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "user-play-item-img" };
const _hoisted_10 = ["src"];
const _hoisted_11 = { class: "user-play-item-title" };
const _hoisted_12 = { class: "user-play-item-title-name" };
const _hoisted_13 = { class: "user-play-item-list" };
const _hoisted_14 = { class: "user-play-item-count" };
const _hoisted_15 = { class: "user-play-item-count-tag" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "recommend-singer-item-count p-2 text-base text-gray-200 z-10" };
const _hoisted_19 = { class: "recommend-singer-item-info z-10" };
const _hoisted_20 = { class: "recommend-singer-item-info-name text-el text-right line-clamp-1" };
const _hoisted_21 = ["onClick"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TopBanner",
  setup(__props) {
    const userStore = useUserStore();
    const playerStore = usePlayerStore();
    const recommendStore = useRecommendStore();
    const router = useRouter();
    const { t } = useI18n();
    const hotSingerData = ref();
    const dayRecommendData = computed(() => {
      if (recommendStore.dailyRecommendSongs.length > 0) {
        return {
          dailySongs: recommendStore.dailyRecommendSongs
        };
      }
      return null;
    });
    const userPlaylist = ref([]);
    const playlistLoading = ref(false);
    const playlistItem = ref(null);
    const playlistDetail = ref(null);
    const { navigateToArtist } = useArtist();
    const getCarouselItemStyle = (index2, delayStep, totalItems, maxWidth) => {
      if (isMobile.value) {
        return "width: 30%;";
      }
      const animationDelay = setAnimationDelay(index2, delayStep);
      const width = `calc((100% / ${totalItems}) - 16px)`;
      const maxWidthStyle = "";
      return `${animationDelay}; width: ${width}; ${maxWidthStyle}`;
    };
    const getCarouselItemStyleForPlaylist = (playlistCount) => {
      if (isMobile.value) {
        return "width: 100%;";
      }
      const animationDelay = setAnimationDelay(1, 100);
      let width = "";
      let maxWidth = "";
      switch (playlistCount) {
        case 1:
          width = "calc(100% / 4 - 16px)";
          maxWidth = "max-width: 180px;";
          break;
        case 2:
          width = "calc(100% / 3 - 16px)";
          maxWidth = "max-width: 380px;";
          break;
        case 3:
          width = "calc(100% / 2 - 16px)";
          maxWidth = "max-width: 520px;";
          break;
        default:
          width = "calc(100% / 1 - 16px)";
          maxWidth = "max-width: 656px;";
      }
      return `${animationDelay}; width: ${width}; ${maxWidth}`;
    };
    onMounted(async () => {
      loadNonUserData();
    });
    const loadDayRecommendData = async () => {
      await recommendStore.fetchDailyRecommendSongs();
    };
    const loadNonUserData = async () => {
      try {
        if (!userStore.user) {
          await loadDayRecommendData();
        }
        const { data: singerData } = await getHotSinger({ offset: 0, limit: 5 });
        hotSingerData.value = singerData;
      } catch (error) {
        console.error("加载热门歌手数据失败:", error);
      }
    };
    const loadUserData = async () => {
      try {
        if (userStore.user) {
          const { data: playlistData } = await getUserPlaylist(userStore.user?.userId);
          userPlaylist.value = playlistData.playlist.sort((a, b) => b.playCount - a.playCount).slice(0, 4);
        }
      } catch (error) {
        console.error("加载用户数据失败:", error);
      }
    };
    const handleArtistClick = (id) => {
      navigateToArtist(id);
    };
    const getDisplayDaySongs = computed(() => {
      if (!dayRecommendData.value) {
        return [];
      }
      return dayRecommendData.value.dailySongs.filter(
        (song) => !playerStore.dislikeList.includes(song.id)
      );
    });
    const showDayRecommend = () => {
      if (!dayRecommendData.value?.dailySongs) return;
      navigateToMusicList(router, {
        type: "dailyRecommend",
        name: t("comp.recommendSinger.songlist"),
        songList: getDisplayDaySongs.value,
        canRemove: false
      });
    };
    const openPlaylist = (item) => {
      playlistItem.value = item;
      playlistLoading.value = true;
      getListDetail(item.id).then((res) => {
        playlistDetail.value = res.data;
        playlistLoading.value = false;
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
    const handlePlayPlaylist = async (id) => {
      try {
        playlistLoading.value = true;
        const { data } = await getListDetail(id);
        if (data?.playlist) {
          if (data.playlist.tracks?.length > 0) {
            const initialSongs = data.playlist.tracks.map((track) => ({
              ...track,
              source: "netease",
              picUrl: track.al.picUrl
            }));
            playerStore.setPlayList(initialSongs);
            await playerStore.setPlay(initialSongs[0]);
            if (data.playlist.trackIds?.length > initialSongs.length) {
              loadFullPlaylist(data.playlist.trackIds, initialSongs);
            }
          }
        }
        playlistLoading.value = false;
      } catch (error) {
        console.error("播放歌单失败:", error);
        playlistLoading.value = false;
      }
    };
    const loadFullPlaylist = async (trackIds, initialSongs) => {
      try {
        const loadedIds = new Set(initialSongs.map((song) => song.id));
        const unloadedTrackIds = trackIds.filter((item) => !loadedIds.has(item.id)).map((item) => item.id);
        if (unloadedTrackIds.length === 0) return;
        const batchSize = 500;
        const allSongs = [...initialSongs];
        for (let i = 0; i < unloadedTrackIds.length; i += batchSize) {
          const batchIds = unloadedTrackIds.slice(i, i + batchSize);
          if (batchIds.length > 0) {
            try {
              const { data: songsData } = await getMusicDetail(batchIds);
              if (songsData?.songs?.length) {
                const formattedSongs = songsData.songs.map((item) => ({
                  ...item,
                  source: "netease",
                  picUrl: item.al.picUrl
                }));
                allSongs.push(...formattedSongs);
              }
            } catch (error) {
              console.error("获取批次歌曲详情失败:", error);
            }
          }
        }
        if (allSongs.length > initialSongs.length) {
          console.log("更新播放列表，总歌曲数:", allSongs.length);
          playerStore.setPlayList(allSongs);
        }
      } catch (error) {
        console.error("加载完整歌单失败:", error);
      }
    };
    watchEffect(() => {
      if (userStore.user) {
        loadUserData();
        loadDayRecommendData();
      }
    });
    const getPlaylistGridClass = (length) => {
      switch (length) {
        case 1:
          return "one-column";
        case 2:
          return "two-columns";
        case 3:
          return "three-columns";
        default:
          return "four-columns";
      }
    };
    return (_ctx, _cache) => {
      const _component_n_carousel_item = __unplugin_components_0;
      const _component_n_carousel = __unplugin_components_1;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          hotSingerData.value?.artists.length ? (openBlock(), createBlock(_component_n_carousel, {
            key: 0,
            "slides-per-view": "auto",
            "show-dots": false,
            "space-between": 20,
            draggable: "",
            "show-arrow": "",
            autoplay: false
          }, {
            default: withCtx(() => [
              createVNode(_component_n_carousel_item, {
                class: normalizeClass(unref(setAnimationClass)("animate__backInRight")),
                style: normalizeStyle(getCarouselItemStyle(0, 100, 6))
              }, {
                default: withCtx(() => [
                  dayRecommendData.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
                    createBaseVNode("div", {
                      style: normalizeStyle(
                        unref(setBackgroundImg)(unref(getImgUrl)(dayRecommendData.value?.dailySongs[0].al.picUrl, "500y500"))
                      ),
                      class: "recommend-singer-item-bg"
                    }, null, 4),
                    createBaseVNode("div", {
                      class: "recommend-singer-item-count p-2 text-base text-gray-200 z-10 cursor-pointer",
                      onClick: showDayRecommend
                    }, [
                      createBaseVNode("div", _hoisted_4, toDisplayString(unref(t)("comp.recommendSinger.title")), 1),
                      createBaseVNode("div", _hoisted_5, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(getDisplayDaySongs.value.slice(0, 5), (item) => {
                          return openBlock(), createElementBlock("p", {
                            key: item.id,
                            class: "text-el"
                          }, [
                            createTextVNode(toDisplayString(item.name) + " ", 1),
                            _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1))
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class", "style"]),
              unref(userStore).user && userPlaylist.value.length ? (openBlock(), createBlock(_component_n_carousel_item, {
                key: 0,
                class: normalizeClass(unref(setAnimationClass)("animate__backInRight")),
                style: normalizeStyle(getCarouselItemStyleForPlaylist(userPlaylist.value.length))
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, toDisplayString(unref(t)("comp.userPlayList.title", { name: unref(userStore).user?.nickname })), 1),
                    createBaseVNode("div", {
                      class: normalizeClass(["user-play-list", getPlaylistGridClass(userPlaylist.value.length)])
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(userPlaylist.value, (item) => {
                        return openBlock(), createElementBlock("div", {
                          key: item.id,
                          class: "user-play-item",
                          onClick: ($event) => openPlaylist(item)
                        }, [
                          createBaseVNode("div", _hoisted_9, [
                            createBaseVNode("img", {
                              src: unref(getImgUrl)(item.coverImgUrl, "200y200"),
                              alt: ""
                            }, null, 8, _hoisted_10),
                            createBaseVNode("div", _hoisted_11, [
                              createBaseVNode("div", _hoisted_12, toDisplayString(item.name), 1),
                              createBaseVNode("div", _hoisted_13, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(item.tracks, (song) => {
                                  return openBlock(), createElementBlock("div", {
                                    key: song.id,
                                    class: "user-play-item-list-name"
                                  }, toDisplayString(song.name), 1);
                                }), 128))
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_14, [
                              createBaseVNode("div", _hoisted_15, toDisplayString(unref(t)("common.songCount", { count: item.trackCount })), 1)
                            ]),
                            createBaseVNode("div", {
                              class: "user-play-item-direct-play",
                              onClick: withModifiers(($event) => handlePlayPlaylist(item.id), ["stop"])
                            }, [..._cache[1] || (_cache[1] = [
                              createBaseVNode("i", { class: "iconfont icon-playfill text-xl text-white" }, null, -1)
                            ])], 8, _hoisted_16)
                          ])
                        ], 8, _hoisted_8);
                      }), 128))
                    ], 2)
                  ])
                ]),
                _: 1
              }, 8, ["class", "style"])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(hotSingerData.value?.artists, (item, index2) => {
                return openBlock(), createBlock(_component_n_carousel_item, {
                  key: item.id,
                  class: normalizeClass(unref(setAnimationClass)("animate__backInRight")),
                  style: normalizeStyle(getCarouselItemStyle(index2 + 1, 100, 6))
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", {
                      class: normalizeClass(["recommend-singer-item relative", unref(setAnimationClass)("animate__backInRight")]),
                      style: normalizeStyle(unref(setAnimationDelay)(index2 + 2, 100)),
                      onClick: ($event) => handleArtistClick(item.id)
                    }, [
                      createBaseVNode("div", {
                        style: normalizeStyle(
                          unref(setBackgroundImg)(unref(getImgUrl)(item.picUrl || item.avatar || item.cover, "500y500"))
                        ),
                        class: "recommend-singer-item-bg"
                      }, null, 4),
                      createBaseVNode("div", _hoisted_18, toDisplayString(unref(t)("common.songCount", { count: item.musicSize })), 1),
                      createBaseVNode("div", _hoisted_19, [
                        createBaseVNode("div", _hoisted_20, toDisplayString(item.name), 1)
                      ]),
                      createBaseVNode("div", {
                        class: "recommend-singer-item-play-overlay",
                        onClick: withModifiers(($event) => handleArtistClick(item.id), ["stop"])
                      }, [..._cache[2] || (_cache[2] = [
                        createBaseVNode("div", { class: "recommend-singer-item-play-btn" }, [
                          createBaseVNode("i", { class: "iconfont icon-playfill text-4xl" })
                        ], -1)
                      ])], 8, _hoisted_21)
                    ], 14, _hoisted_17)
                  ]),
                  _: 2
                }, 1032, ["class", "style"]);
              }), 128))
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const TopBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-796153eb"]]);
const _hoisted_1 = { class: "main-page" };
const _hoisted_2 = { class: "main-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Home"
  },
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createBlock(_component_n_scrollbar, {
        size: 100,
        "x-scrollable": false
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(TopBanner),
            createBaseVNode("div", _hoisted_2, [
              !unref(isMobile) ? (openBlock(), createBlock(PlaylistType, { key: 0 })) : createCommentVNode("", true),
              createVNode(RecommendSonglist),
              createBaseVNode("div", null, [
                createVNode(Favorite, { "is-component": "" }),
                createVNode(RecommendAlbum)
              ])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ddc8c3a"]]);
export {
  index as default
};
