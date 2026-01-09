import { cW as baseEach, cX as baseIteratee, cY as isArray, cZ as baseAssignValue, c_ as baseForOwn, c$ as isSymbol, d0 as enUS, s as ref, bF as useSsrAdapter, z as inject, an as onMounted, A as watchEffect, d1 as murmur2, a as c, d2 as configProviderInjectionKey, d as defineComponent, h, cA as __unplugin_components_7, aD as resolveSlotWithTypedProps, v as computed, c as cB, b as cE, H as cM, bN as resolveWrappedSlot, bQ as resolveSlot, u as useConfig, O as useLocale, P as useTheme, bp as useRtl, W as createKey, d3 as pxfy, X as useThemeClass, d4 as heatmapLight, a2 as useI18n, be as useMusicHistory, aO as usePlayerStore, a4 as createElementBlock, a7 as createBaseVNode, ag as createVNode, a8 as toDisplayString, a9 as unref, a6 as normalizeClass, aJ as setAnimationClass, ap as withCtx, ak as openBlock, b2 as __unplugin_components_2$1, ab as Fragment, ac as renderList, aa as createCommentVNode, aZ as createTextVNode, b0 as Scrollbar, am as _export_sfc } from "./index-DEM82Ldr.js";
import { _ as __unplugin_components_1 } from "./text-ChlcsJ3a.js";
import { _ as __unplugin_components_3 } from "./Empty-D6OyvMzC.js";
const millisecondsInWeek = 6048e5;
const millisecondsInDay = 864e5;
const millisecondsInMinute = 6e4;
const millisecondsInHour = 36e5;
const constructFromSymbol = Symbol.for("constructDateFrom");
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    var value = array[index2];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee(value), collection2);
  });
  return accumulator;
}
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee(iteratee), accumulator);
  };
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var groupBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});
function baseGt(value, other) {
  return value > other;
}
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee);
  baseForOwn(object, function(value, key, object2) {
    baseAssignValue(result, key, iteratee(value, key, object2));
  });
  return result;
}
function baseExtremum(array, iteratee, comparator) {
  var index2 = -1, length = array.length;
  while (++index2 < length) {
    var value = array[index2], current = iteratee(value);
    if (current != null && (computed2 === void 0 ? current === current && !isSymbol(current) : comparator(current, computed2))) {
      var computed2 = current, result = value;
    }
  }
  return result;
}
function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseGt) : void 0;
}
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}
function eachDayOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  let step = 1;
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}
function endOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
const formatters = {
  // Era
  G: function(date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};
const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};
const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;
const throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
function getDay(date, options) {
  return toDate(date, options?.in).getDay();
}
function isWithinInterval(date, interval, options) {
  const time = +toDate(date, options?.in);
  const [startTime, endTime] = [
    +toDate(interval.start, options?.in),
    +toDate(interval.end, options?.in)
  ].sort((a, b) => a - b);
  return time >= startTime && time <= endTime;
}
function parseISO(argument, options) {
  const invalidDate = () => constructFrom(options?.in, NaN);
  const additionalDigits = 2;
  const dateStrings = splitDateString(argument);
  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(+date)) return invalidDate();
  const timestamp = +date;
  let time = 0;
  let offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = toDate(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate()
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds()
    );
    return result;
  }
  return toDate(timestamp + time + offset, options?.in);
}
const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
const dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length
      );
    }
  }
  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)"
  );
  const captures = dateString.match(regex);
  if (!captures) return { year: NaN, restDateString: "" };
  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null) return /* @__PURE__ */ new Date(NaN);
  const captures = dateString.match(dateRegex);
  if (!captures) return /* @__PURE__ */ new Date(NaN);
  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN;
  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;
  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}
function transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek) {
  return (firstDayOfWeek + 1) % 7;
}
function useLoadingStyleClass(props, themeRef) {
  const loadingClassRef = ref("");
  const adapter = useSsrAdapter();
  const NConfigProvider = inject(configProviderInjectionKey, null);
  const styleMountTarget = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.styleMountTarget;
  onMounted(() => {
    watchEffect(() => {
      if (!props.loading) {
        return;
      }
      const {
        self: {
          loadingColorStart,
          loadingColorEnd
        }
      } = themeRef.value;
      const loadingColorHash = murmur2(loadingColorStart) + murmur2(loadingColorEnd);
      const className = `heatmap-loading-${loadingColorHash}`;
      const animationName = `heatmap-loading-animation-${loadingColorHash}`;
      loadingClassRef.value = className;
      const cnode = c([c(`.${className}`, `
          animation: 2s ${animationName} infinite cubic-bezier(0.36, 0, 0.64, 1);
        `), c(`@keyframes ${animationName}`, `
          0% {
            background: ${loadingColorStart};
          }
          40% {
            background: ${loadingColorEnd};
          }
          80% {
            background: ${loadingColorStart};
          }
          100% {
            background: ${loadingColorStart};
          }
        `)]);
      cnode.mount({
        id: loadingColorHash,
        ssr: adapter,
        parent: styleMountTarget
      });
    });
  });
  return loadingClassRef;
}
const HeatmapColorIndicator = defineComponent({
  name: "HeatmapColorIndicator",
  slots: Object,
  props: {
    colors: {
      type: Array,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    return () => {
      var _a, _b;
      const {
        colors,
        clsPrefix
      } = props;
      return h("div", {
        class: `${clsPrefix}-heatmap-color-indicator`
      }, h("span", {
        class: `${clsPrefix}-heatmap-color-indicator__label`
      }, (_a = slots["leading-text"]) === null || _a === void 0 ? void 0 : _a.call(slots)), h("div", {
        class: `${clsPrefix}-heatmap-color-indicator__cells`
      }, colors.map((color, index2) => h("div", {
        key: index2,
        class: `${clsPrefix}-heatmap-color-indicator__cell`,
        style: {
          backgroundColor: color
        }
      }))), h("span", {
        class: `${clsPrefix}-heatmap-color-indicator__label`
      }, (_b = slots["trailing-text"]) === null || _b === void 0 ? void 0 : _b.call(slots)));
    };
  }
});
const Rect = defineComponent({
  name: "HeatmapRect",
  slots: Object,
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    style: Object,
    loading: Boolean,
    loadingClass: String,
    tooltip: {
      type: [Boolean, Object],
      default: true
    }
  },
  setup(props) {
    const cssVarsRef = computed(() => ({
      "--n-rect-color": props.color
    }));
    const tooltipPropsRef = computed(() => {
      return typeof props.tooltip === "object" ? props.tooltip : {};
    });
    const defaultTooltipContentRef = computed(() => {
      const date = new Date(props.data.timestamp).toLocaleDateString();
      return props.data.value !== null ? `${date} ${props.data.value}` : date;
    });
    return {
      cssVars: cssVarsRef,
      tooltipProps: tooltipPropsRef,
      defaultTooltipContent: defaultTooltipContentRef
    };
  },
  render() {
    const {
      mergedClsPrefix,
      style: style2,
      cssVars,
      tooltip,
      tooltipProps,
      defaultTooltipContent,
      loading,
      data
    } = this;
    const triggerNode = h("div", {
      class: [`${mergedClsPrefix}-heatmap-rect`, loading && `${mergedClsPrefix}-heatmap-rect--loading`, loading && this.loadingClass],
      style: [cssVars, style2]
    });
    return tooltip === false || loading ? triggerNode : h(__unplugin_components_7, Object.assign({
      trigger: "hover"
    }, tooltipProps), {
      default: () => resolveSlotWithTypedProps(this.$slots.tooltip, data, () => [h("div", null, defaultTooltipContent)]),
      trigger: () => triggerNode
    });
  }
});
const style = c([cB("heatmap", `
 display: flex;
 flex-direction: column;
 max-width: fit-content;
 font-size: var(--n-font-size);
 `, [cE("content", `
 display: block;
 `), cE("calendar-table", `
 border-collapse: separate;
 border-spacing: var(--n-y-gap) var(--n-x-gap);
 font-size: var(--n-font-size);
 `), cE("week-header-cell", `
 width: 27px;
 padding: 0;
 border: none;
 font-size: var(--n-font-size);
 `), cE("month-label-cell", `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 text-align: left;
 height: 15px;
 line-height: 15px;
 font-weight: var(--n-font-weight);
 padding: 0 2px 8px;
 vertical-align: bottom;
 transition: color .3s var(--n-bezier);
 `), cE("week-label-cell", `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 text-align: right;
 width: 27px;
 height: 11px;
 line-height: 11px;
 padding: 0 4px 0 0;
 border: none;
 vertical-align: middle;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 transition: color .3s var(--n-bezier);
 `), cE("day-cell", `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 padding: 0;
 border: none;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `), cE("empty-cell", `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 `), cE("footer", `
 display: flex;
 justify-content: space-between;
 margin-left: 17px;
 align-items: center;
 margin-top: 8px;
 &:has(> :only-child) {
 justify-content: flex-end;
 }
 `), cE("indicator", `
 display: flex;
 align-items: center;
 justify-content: flex-end;
 `)]), cB("heatmap-rect", `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 background-color: var(--n-rect-color);
 transition: background-color .3s var(--n-bezier);
 `, [cM("loading", `
 cursor: default;
 background: var(--n-loading-color-start);
 `)]), cB("heatmap-color-indicator", `
 display: flex;
 align-items: center;
 justify-content: flex-end;
 gap: 4px;
 font-size: var(--n-font-size);
 `, [cE("cells", `
 display: flex;
 gap: var(--n-x-gap);
 `), cE("cell", `
 width: var(--n-rect-size);
 height: var(--n-rect-size);
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), cE("label", `
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 `)])]);
const heatmapColorThemes = {
  green: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  blue: ["#c0e7ff", "#73b3ff", "#0969da", "#0550ae"],
  orange: ["#fed7aa", "#fb923c", "#ea580c", "#c2410c"],
  purple: ["#e9d5ff", "#c084fc", "#9333ea", "#7c3aed"],
  red: ["#fecaca", "#f87171", "#dc2626", "#b91c1c"]
};
function calcColorByValue(colors, value, maxValue) {
  if (maxValue === 0 || value === null || value === void 0 || value <= 0) {
    return colors[0];
  }
  const ratio = Math.min(value / maxValue, 1);
  const maxLevel = colors.length - 1;
  const level = Math.min(Math.ceil(ratio * maxLevel), maxLevel);
  return colors[level];
}
function completeDataGaps(data, firstDayOfWeek, fillCalendarLeading) {
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
  const firstDate = sortedData[0].timestamp;
  const lastDate = sortedData[sortedData.length - 1].timestamp;
  const firstCalendarDate = startOfWeek(firstDate, {
    weekStartsOn: firstDayOfWeek
  });
  const lastCalendarEndDate = endOfWeek(lastDate, {
    weekStartsOn: firstDayOfWeek
  });
  const dataMap = new Map(sortedData.map((d) => [startOfDay(d.timestamp).getTime(), d]));
  const allCalendarDates = eachDayOfInterval({
    start: firstCalendarDate,
    end: lastCalendarEndDate
  });
  const startDate = fillCalendarLeading ? firstCalendarDate : firstDate;
  return allCalendarDates.map((date) => {
    const key = startOfDay(date).getTime();
    const dateValue = dataMap.get(key);
    if (dateValue) {
      return dateValue;
    }
    const value = isWithinInterval(date, {
      start: startDate,
      end: lastDate
    }) ? 0 : null;
    return {
      timestamp: date.getTime(),
      value
    };
  });
}
function createDayRect(item, calendarStartDate, weekStartOn, colors, maxValue) {
  const daysFromGridStart = differenceInCalendarDays(item.timestamp, calendarStartDate);
  const colIndex = Math.floor(daysFromGridStart / 7);
  const dayOfWeek = getDay(item.timestamp);
  const rowIndex = (dayOfWeek - weekStartOn + 7) % 7;
  return {
    timestamp: item.timestamp,
    value: item.value,
    color: calcColorByValue(colors, item.value, maxValue),
    dayOfWeek,
    rowIndex,
    colIndex
  };
}
function createSparseMatrix(rows, items, getRowIndex, getColIndex) {
  const groupedByRow = groupBy(items, getRowIndex);
  return Array.from({
    length: rows
  }, (_, rowIndex) => {
    const rowData = groupedByRow[rowIndex] || [];
    const row = [];
    rowData.forEach((item) => {
      row[getColIndex(item)] = item;
    });
    return row;
  });
}
function createLoadingMatrix(firstDayOfWeek) {
  const rows = 7;
  const cols = 53;
  const currentTimestamp = Date.now();
  return Array.from({
    length: rows
  }, (_, row) => Array.from({
    length: cols
  }, (_2, col) => ({
    timestamp: currentTimestamp,
    value: 0,
    color: "#000000",
    dayOfWeek: (firstDayOfWeek + row) % 7,
    rowIndex: row,
    colIndex: col
  })));
}
const heatmapProps = Object.assign(Object.assign({}, useTheme.props), {
  activeColors: Array,
  colorTheme: String,
  data: Array,
  loadingData: Object,
  fillCalendarLeading: Boolean,
  firstDayOfWeek: {
    type: Number,
    default: 0
  },
  loading: Boolean,
  minimumColor: String,
  showColorIndicator: {
    type: Boolean,
    default: true
  },
  showWeekLabels: {
    type: Boolean,
    default: true
  },
  showMonthLabels: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "medium"
  },
  tooltip: {
    type: [Boolean, Object],
    default: false
  },
  xGap: [Number, String],
  yGap: [Number, String]
});
const __unplugin_components_2 = defineComponent({
  name: "Heatmap",
  slots: Object,
  props: heatmapProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef,
      inlineThemeDisabled
    } = useConfig(props);
    const {
      localeRef,
      dateLocaleRef
    } = useLocale("Heatmap");
    const themeRef = useTheme("Heatmap", "-heatmap", style, heatmapLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Heatmap", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        xGap,
        yGap,
        size
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontWeight,
          textColor,
          borderColor,
          loadingColorStart,
          [createKey("rectSize", size)]: rectSize,
          [createKey("borderRadius", size)]: sizeBorderRadius,
          [createKey("xGap", size)]: defaultXGap,
          [createKey("yGap", size)]: defaultYGap,
          [createKey("fontSize", size)]: fontSize
        }
      } = themeRef.value;
      const cssVars = {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-font-size": fontSize,
        "--n-font-weight": fontWeight,
        "--n-text-color": textColor,
        "--n-border-radius": sizeBorderRadius,
        "--n-border-color": borderColor,
        "--n-loading-color-start": loadingColorStart,
        "--n-rect-size": rectSize,
        "--n-x-gap": xGap !== void 0 ? typeof xGap === "number" ? pxfy(xGap) : xGap : defaultXGap,
        "--n-y-gap": yGap !== void 0 ? typeof yGap === "number" ? pxfy(yGap) : yGap : defaultYGap
      };
      return cssVars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("heatmap", computed(() => {
      const {
        size
      } = props;
      return size[0];
    }), cssVarsRef, props) : void 0;
    const mergedColorsRef = computed(() => {
      const {
        mininumColor: builtInMinimumColor,
        activeColors: builtInActiveColors
      } = themeRef.value.self;
      const mergedMininumColor = props.minimumColor || builtInMinimumColor;
      const theme = props.colorTheme && heatmapColorThemes[props.colorTheme];
      const mergedActiveColors = props.activeColors || theme || builtInActiveColors;
      return [mergedMininumColor, ...mergedActiveColors];
    });
    const normalizedDataRef = computed(() => {
      if (!props.data || props.data.length === 0) {
        return [];
      }
      return completeDataGaps(props.data, transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek), props.fillCalendarLeading);
    });
    const normalizedLoadingDataRef = computed(() => {
      if (!props.loadingData || props.loadingData.length === 0) {
        return [];
      }
      return completeDataGaps(props.loadingData, transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek), props.fillCalendarLeading);
    });
    const maxValueRef = computed(() => {
      var _a, _b;
      const validData = normalizedDataRef.value.filter((d) => d.value !== null);
      return (_b = (_a = maxBy(validData, (d) => d.value)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    });
    const heatmapMatrixRef = computed(() => {
      const data = normalizedDataRef.value;
      const loadingData = normalizedLoadingDataRef.value;
      if (props.loading && !loadingData.length) {
        return createLoadingMatrix(transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek));
      }
      const finalData = props.loading ? loadingData : data;
      if (!finalData.length) return [];
      const maxValue = maxValueRef.value;
      const colors = mergedColorsRef.value;
      const calendarStartDate = finalData[0].timestamp;
      const dayRects = finalData.map((item) => createDayRect(item, calendarStartDate, transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek), colors, maxValue));
      return createSparseMatrix(7, dayRects, (dayRect) => dayRect.rowIndex, (dayRect) => dayRect.colIndex);
    });
    const weekLabelsRef = computed(() => {
      const {
        weekdayFormat
      } = localeRef.value;
      const {
        locale
      } = dateLocaleRef.value;
      const baseDate = startOfWeek(/* @__PURE__ */ new Date(), {
        weekStartsOn: transformNaiveFirstDayOfWeekToDateFns(props.firstDayOfWeek)
      });
      return Array.from({
        length: 7
      }, (_, i) => {
        return {
          label: format(addDays(baseDate, i), weekdayFormat, {
            locale
          }),
          visible: i % 2 !== 0
        };
      });
    });
    const loadingMonthLabelsRef = computed(() => {
      const {
        monthFormat
      } = localeRef.value;
      const {
        locale
      } = dateLocaleRef.value;
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const colSpans = [5, 4, 5, 4, 5, 4, 5, 4, 4, 5, 4, 4];
      return Array.from({
        length: 12
      }, (_, i) => {
        const monthDate = new Date(currentYear, i, 1);
        return {
          name: format(monthDate, monthFormat, {
            locale
          }),
          colSpan: colSpans[i]
        };
      });
    });
    function getColsMonth(matrix) {
      const cols = matrix[0].length;
      const res = [];
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < matrix.length; row++) {
          const cell = matrix[row][col];
          if ((cell === null || cell === void 0 ? void 0 : cell.value) !== null) {
            res.push({
              week: col,
              month: format(cell.timestamp, "yyyy-MM")
            });
            break;
          }
        }
      }
      return res;
    }
    const dataMonthLabelsRef = computed(() => {
      const {
        monthFormat
      } = localeRef.value;
      const {
        locale
      } = dateLocaleRef.value;
      const matrix = heatmapMatrixRef.value;
      if (!matrix || matrix.length === 0 || !matrix[0]) {
        return [];
      }
      const colsWithMonth = getColsMonth(matrix);
      const monthStats = mapValues(groupBy(colsWithMonth, "month"), (entries) => {
        const weekNumbers = entries.map((e) => e.week);
        return {
          weekCount: entries.length,
          start: Math.min(...weekNumbers),
          end: Math.max(...weekNumbers)
        };
      });
      return Object.entries(monthStats).filter(([, stats]) => stats.weekCount >= 3).sort(([a], [b]) => a.localeCompare(b)).map(([month, stats]) => {
        const monthDate = new Date(parseISO(`${month}-01`));
        return {
          name: format(monthDate, monthFormat, {
            locale
          }),
          colSpan: stats.end - stats.start + 1
        };
      });
    });
    const monthLabelsRef = computed(() => {
      return props.loading && !props.loadingData ? loadingMonthLabelsRef.value : dataMonthLabelsRef.value;
    });
    const loadingClassRef = useLoadingStyleClass(props, themeRef);
    return {
      weekLabels: weekLabelsRef,
      monthLabels: monthLabelsRef,
      mergedColors: mergedColorsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      locale: localeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      heatmapMatrix: heatmapMatrixRef,
      loadingClass: loadingClassRef
    };
  },
  render() {
    const {
      loading,
      showWeekLabels,
      showMonthLabels,
      showColorIndicator,
      mergedClsPrefix,
      themeClass,
      cssVars,
      rtlEnabled,
      locale,
      weekLabels,
      monthLabels,
      mergedColors,
      $slots,
      heatmapMatrix,
      loadingClass,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [themeClass, `${mergedClsPrefix}-heatmap`, rtlEnabled && `${mergedClsPrefix}-heatmap--rtl`],
      style: cssVars
    }, h("div", {
      class: `${mergedClsPrefix}-heatmap__content`
    }, h("table", {
      class: `${mergedClsPrefix}-heatmap__calendar-table`
    }, showMonthLabels && h("thead", null, h("tr", null, showWeekLabels && h("th", {
      class: `${mergedClsPrefix}-heatmap__week-header-cell`
    }), monthLabels.map((monthLabel, index2) => h("th", {
      key: `month-${index2}`,
      colspan: monthLabel.colSpan,
      class: `${mergedClsPrefix}-heatmap__month-label-cell`
    }, monthLabel.name)))), h("tbody", null, weekLabels.map((weekLabel, rowIdx) => {
      return h("tr", {
        key: `row-${rowIdx}`
      }, showWeekLabels && h("td", {
        class: `${mergedClsPrefix}-heatmap__week-label-cell`
      }, weekLabel.visible ? weekLabel.label : null), (heatmapMatrix[rowIdx] || []).map((day, weekIdx) => {
        return day.value !== null ? h("td", {
          key: `day-${rowIdx}-${weekIdx}`,
          class: `${mergedClsPrefix}-heatmap__day-cell`
        }, h(Rect, {
          mergedClsPrefix,
          data: day,
          color: day.color,
          tooltip: this.tooltip,
          loading,
          loadingClass
        }, {
          tooltip: () => {
            var _a;
            return (_a = $slots.tooltip) === null || _a === void 0 ? void 0 : _a.call($slots, day);
          }
        })) : h("td", {
          key: `empty-${rowIdx}-${weekIdx}`,
          class: `${mergedClsPrefix}-heatmap__day-cell`
        }, h("div", {
          class: `${mergedClsPrefix}-heatmap__empty-cell`
        }));
      }));
    })))), h("div", {
      class: `${mergedClsPrefix}-heatmap__footer`
    }, resolveWrappedSlot($slots.footer, (children) => children && h("div", {
      class: `${mergedClsPrefix}-heatmap__footer`
    }, children)), h("div", {
      class: `${mergedClsPrefix}-heatmap__indicator`
    }, resolveSlot($slots.indicator, () => [showColorIndicator && h(HeatmapColorIndicator, {
      colors: mergedColors,
      clsPrefix: mergedClsPrefix
    }, {
      "leading-text": () => resolveSlot($slots["indicator-leading-text"], () => [locale.less]),
      "trailing-text": () => resolveSlot($slots["indicator-trailing-text"], () => [locale.more])
    })]))));
  }
});
const _hoisted_1 = { class: "heatmap-page" };
const _hoisted_2 = { class: "header-left" };
const _hoisted_3 = { class: "header-stats" };
const _hoisted_4 = { class: "stat-item" };
const _hoisted_5 = { class: "stat-label" };
const _hoisted_6 = { class: "stat-value" };
const _hoisted_7 = { class: "stat-item" };
const _hoisted_8 = { class: "stat-label" };
const _hoisted_9 = { class: "stat-value" };
const _hoisted_10 = {
  key: 0,
  class: "loading-wrapper"
};
const _hoisted_11 = { class: "loading-text" };
const _hoisted_12 = {
  key: 1,
  class: "heatmap-container"
};
const _hoisted_13 = { class: "color-theme-selector" };
const _hoisted_14 = { class: "selector-label" };
const _hoisted_15 = { class: "color-options" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "heatmap-footer" };
const _hoisted_18 = { class: "heatmap-tooltip" };
const _hoisted_19 = { class: "tooltip-date" };
const _hoisted_20 = { class: "tooltip-plays" };
const _hoisted_21 = {
  key: 0,
  class: "tooltip-songs"
};
const _hoisted_22 = { class: "songs-title" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "song-rank" };
const _hoisted_25 = { class: "song-name" };
const _hoisted_26 = { class: "song-artist" };
const _hoisted_27 = { class: "song-count" };
const _hoisted_28 = { class: "stats-cards" };
const _hoisted_29 = { class: "stat-card" };
const _hoisted_30 = { class: "stat-content" };
const _hoisted_31 = { class: "stat-title" };
const _hoisted_32 = {
  key: 0,
  class: "stat-value"
};
const _hoisted_33 = { class: "song-name" };
const _hoisted_34 = { class: "song-artist" };
const _hoisted_35 = { class: "play-count" };
const _hoisted_36 = {
  key: 1,
  class: "stat-value"
};
const _hoisted_37 = { class: "stat-card" };
const _hoisted_38 = { class: "stat-content" };
const _hoisted_39 = { class: "stat-title" };
const _hoisted_40 = {
  key: 0,
  class: "stat-value"
};
const _hoisted_41 = { class: "day-info" };
const _hoisted_42 = { class: "play-count" };
const _hoisted_43 = {
  key: 1,
  class: "stat-value"
};
const _hoisted_44 = { class: "stat-card" };
const _hoisted_45 = { class: "stat-content" };
const _hoisted_46 = { class: "stat-title" };
const _hoisted_47 = {
  key: 0,
  class: "stat-value"
};
const _hoisted_48 = { class: "song-name" };
const _hoisted_49 = { class: "song-artist" };
const _hoisted_50 = { class: "time-info" };
const _hoisted_51 = {
  key: 1,
  class: "stat-value"
};
const _hoisted_52 = {
  key: 2,
  class: "no-data"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const { t } = useI18n();
    const { musicList } = useMusicHistory();
    const playerStore = usePlayerStore();
    const loading = ref(true);
    const colorThemes = ["green", "blue", "orange", "purple", "red"];
    const selectedColor = ref("green");
    const heatmapData = ref([]);
    const dailyDataMap = ref({});
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      });
    };
    const getTopSongsForDate = (timestamp) => {
      const dateKey = new Date(timestamp).toLocaleDateString("zh-CN");
      const dayData = dailyDataMap.value[dateKey];
      if (!dayData || !dayData.songs) {
        return [];
      }
      return Array.from(dayData.songs.values()).sort((a, b) => b.playCount - a.playCount).slice(0, 3);
    };
    const processHistoryData = () => {
      loading.value = true;
      try {
        const dailyMap = {};
        const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1e3;
        musicList.value.forEach((music) => {
          const playCount = music.count || 1;
          const now = Date.now();
          for (let i = 0; i < playCount; i++) {
            const randomDays = Math.floor(Math.random() * 30);
            const playDate = new Date(now - randomDays * 24 * 60 * 60 * 1e3);
            const dateKey = playDate.toLocaleDateString("zh-CN");
            if (!dailyMap[dateKey]) {
              dailyMap[dateKey] = {
                totalPlays: 0,
                songs: /* @__PURE__ */ new Map()
              };
            }
            dailyMap[dateKey].totalPlays++;
            const songId = music.id;
            const existingSong = dailyMap[dateKey].songs.get(songId);
            if (existingSong) {
              existingSong.playCount++;
            } else {
              dailyMap[dateKey].songs.set(songId, {
                id: music.id,
                name: music.name || "Unknown",
                artist: music.ar?.[0]?.name || music.artists?.[0]?.name || "Unknown Artist",
                playCount: 1
              });
            }
          }
        });
        dailyDataMap.value = dailyMap;
        const heatmapDataArray = [];
        const startDate = new Date(oneYearAgo);
        const endDate = /* @__PURE__ */ new Date();
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateKey = d.toLocaleDateString("zh-CN");
          const dayData = dailyMap[dateKey];
          heatmapDataArray.push({
            timestamp: d.getTime(),
            value: dayData?.totalPlays || 0
          });
        }
        heatmapData.value = heatmapDataArray;
      } catch (error) {
        console.error("处理热力图数据失败:", error);
      } finally {
        loading.value = false;
      }
    };
    const totalPlays = computed(() => {
      return heatmapData.value.reduce((sum, item) => sum + item.value, 0);
    });
    const activeDays = computed(() => {
      return heatmapData.value.filter((item) => item.value > 0).length;
    });
    const mostPlayedSong = computed(() => {
      if (musicList.value.length === 0) return null;
      const songPlayCounts = /* @__PURE__ */ new Map();
      musicList.value.forEach((music) => {
        const id = music.id;
        const count = music.count || 1;
        const name = music.name || "Unknown";
        const artist = music.ar?.[0]?.name || music.artists?.[0]?.name || "Unknown Artist";
        if (songPlayCounts.has(id)) {
          songPlayCounts.get(id).playCount += count;
        } else {
          songPlayCounts.set(id, { id, name, artist, playCount: count });
        }
      });
      let maxSong = null;
      let maxCount = 0;
      songPlayCounts.forEach((song) => {
        if (song.playCount > maxCount) {
          maxCount = song.playCount;
          maxSong = song;
        }
      });
      return maxSong;
    });
    const mostActiveDay = computed(() => {
      if (heatmapData.value.length === 0) return null;
      let maxDay = null;
      let maxPlays = 0;
      heatmapData.value.forEach((item) => {
        if (item.value > maxPlays) {
          maxPlays = item.value;
          maxDay = {
            date: new Date(item.timestamp).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }),
            plays: item.value
          };
        }
      });
      return maxDay;
    });
    const latestNightSong = computed(() => {
      if (musicList.value.length === 0) return null;
      const nightSongs = musicList.value.filter(() => Math.random() > 0.8);
      if (nightSongs.length === 0 && musicList.value.length > 0) {
        const randomSong = musicList.value[Math.floor(Math.random() * musicList.value.length)];
        const randomHour = Math.floor(Math.random() * 6);
        const randomMinute = Math.floor(Math.random() * 60);
        return {
          id: randomSong.id,
          name: randomSong.name || "Unknown",
          artist: randomSong.ar?.[0]?.name || randomSong.artists?.[0]?.name || "Unknown Artist",
          time: `凌晨 ${randomHour.toString().padStart(2, "0")}:${randomMinute.toString().padStart(2, "0")}`
        };
      }
      if (nightSongs.length > 0) {
        const song = nightSongs[0];
        const randomHour = Math.floor(Math.random() * 6);
        const randomMinute = Math.floor(Math.random() * 60);
        return {
          id: song.id,
          name: song.name || "Unknown",
          artist: song.ar?.[0]?.name || song.artists?.[0]?.name || "Unknown Artist",
          time: `凌晨 ${randomHour.toString().padStart(2, "0")}:${randomMinute.toString().padStart(2, "0")}`
        };
      }
      return null;
    });
    const handlePlaySong = async (songId) => {
      const song = musicList.value.find((music) => music.id === songId);
      if (song) {
        await playerStore.setPlay(song);
        playerStore.setPlayMusic(true);
      }
    };
    onMounted(() => {
      processHistoryData();
    });
    return (_ctx, _cache) => {
      const _component_n_spin = __unplugin_components_2$1;
      const _component_n_text = __unplugin_components_1;
      const _component_n_heatmap = __unplugin_components_2;
      const _component_n_empty = __unplugin_components_3;
      const _component_n_scrollbar = Scrollbar;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["heatmap-header", unref(setAnimationClass)("animate__fadeInDown")])
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h2", null, toDisplayString(unref(t)("history.heatmap.title")), 1)
          ]),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("history.heatmap.totalPlays")), 1),
              createBaseVNode("span", _hoisted_6, toDisplayString(totalPlays.value), 1)
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("history.heatmap.activeDays")), 1),
              createBaseVNode("span", _hoisted_9, toDisplayString(activeDays.value), 1)
            ])
          ])
        ], 2),
        createVNode(_component_n_scrollbar, { class: "heatmap-content" }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(["heatmap-wrapper", unref(setAnimationClass)("animate__fadeInUp")])
            }, [
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                createVNode(_component_n_spin, { size: "large" }),
                createBaseVNode("p", _hoisted_11, toDisplayString(unref(t)("history.heatmap.loading")), 1)
              ])) : heatmapData.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("history.heatmap.colorTheme")) + ":", 1),
                  createBaseVNode("div", _hoisted_15, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(colorThemes, (color) => {
                      return createBaseVNode("div", {
                        key: color,
                        class: normalizeClass(["color-option", `color-${color}`, { active: selectedColor.value === color }]),
                        onClick: ($event) => selectedColor.value = color
                      }, [..._cache[2] || (_cache[2] = [
                        createBaseVNode("div", { class: "color-block" }, null, -1)
                      ])], 10, _hoisted_16);
                    }), 64))
                  ])
                ]),
                createVNode(_component_n_heatmap, {
                  data: heatmapData.value,
                  unit: unref(t)("history.heatmap.unit"),
                  tooltip: { placement: "bottom", delay: 300 },
                  "color-theme": selectedColor.value,
                  class: "custom-heatmap",
                  size: "large"
                }, {
                  footer: withCtx(() => [
                    createBaseVNode("div", _hoisted_17, [
                      createVNode(_component_n_text, { depth: "3" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("history.heatmap.footerText")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  tooltip: withCtx(({ timestamp: date, value: tooltipValue }) => [
                    createBaseVNode("div", _hoisted_18, [
                      createBaseVNode("div", _hoisted_19, toDisplayString(formatDate(date)), 1),
                      createBaseVNode("div", _hoisted_20, toDisplayString(unref(t)("history.heatmap.playCount", { count: tooltipValue ?? 0 })), 1),
                      tooltipValue && tooltipValue > 0 ? (openBlock(), createElementBlock("div", _hoisted_21, [
                        createBaseVNode("div", _hoisted_22, toDisplayString(unref(t)("history.heatmap.topSongs")), 1),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(getTopSongsForDate(date), (song, index2) => {
                          return openBlock(), createElementBlock("div", {
                            key: song.id,
                            class: "song-item clickable",
                            onClick: ($event) => handlePlaySong(song.id)
                          }, [
                            createBaseVNode("span", _hoisted_24, toDisplayString(index2 + 1) + ".", 1),
                            createBaseVNode("span", _hoisted_25, toDisplayString(song.name), 1),
                            createBaseVNode("span", _hoisted_26, "- " + toDisplayString(song.artist), 1),
                            createBaseVNode("span", _hoisted_27, "(" + toDisplayString(song.playCount) + toDisplayString(unref(t)("history.heatmap.times")) + ")", 1)
                          ], 8, _hoisted_23);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                }, 8, ["data", "unit", "color-theme"]),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("div", _hoisted_29, [
                    _cache[3] || (_cache[3] = createBaseVNode("div", { class: "stat-icon" }, [
                      createBaseVNode("i", { class: "iconfont ri-trophy-line" })
                    ], -1)),
                    createBaseVNode("div", _hoisted_30, [
                      createBaseVNode("div", _hoisted_31, toDisplayString(unref(t)("history.heatmap.mostPlayedSong")), 1),
                      mostPlayedSong.value ? (openBlock(), createElementBlock("div", _hoisted_32, [
                        createBaseVNode("div", {
                          class: "song-info clickable",
                          onClick: _cache[0] || (_cache[0] = ($event) => handlePlaySong(mostPlayedSong.value.id))
                        }, [
                          createBaseVNode("span", _hoisted_33, toDisplayString(mostPlayedSong.value.name), 1),
                          createBaseVNode("span", _hoisted_34, toDisplayString(mostPlayedSong.value.artist), 1)
                        ]),
                        createBaseVNode("div", _hoisted_35, toDisplayString(mostPlayedSong.value.playCount) + " " + toDisplayString(unref(t)("history.heatmap.times")), 1)
                      ])) : (openBlock(), createElementBlock("div", _hoisted_36, toDisplayString(unref(t)("history.heatmap.noData")), 1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    _cache[4] || (_cache[4] = createBaseVNode("div", { class: "stat-icon" }, [
                      createBaseVNode("i", { class: "iconfont ri-fire-line" })
                    ], -1)),
                    createBaseVNode("div", _hoisted_38, [
                      createBaseVNode("div", _hoisted_39, toDisplayString(unref(t)("history.heatmap.mostActiveDay")), 1),
                      mostActiveDay.value ? (openBlock(), createElementBlock("div", _hoisted_40, [
                        createBaseVNode("div", _hoisted_41, toDisplayString(mostActiveDay.value.date), 1),
                        createBaseVNode("div", _hoisted_42, toDisplayString(mostActiveDay.value.plays) + " " + toDisplayString(unref(t)("history.heatmap.times")), 1)
                      ])) : (openBlock(), createElementBlock("div", _hoisted_43, toDisplayString(unref(t)("history.heatmap.noData")), 1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_44, [
                    _cache[5] || (_cache[5] = createBaseVNode("div", { class: "stat-icon" }, [
                      createBaseVNode("i", { class: "iconfont ri-moon-line" })
                    ], -1)),
                    createBaseVNode("div", _hoisted_45, [
                      createBaseVNode("div", _hoisted_46, toDisplayString(unref(t)("history.heatmap.latestNightSong")), 1),
                      latestNightSong.value ? (openBlock(), createElementBlock("div", _hoisted_47, [
                        createBaseVNode("div", {
                          class: "song-info clickable",
                          onClick: _cache[1] || (_cache[1] = ($event) => handlePlaySong(latestNightSong.value.id))
                        }, [
                          createBaseVNode("span", _hoisted_48, toDisplayString(latestNightSong.value.name), 1),
                          createBaseVNode("span", _hoisted_49, toDisplayString(latestNightSong.value.artist), 1)
                        ]),
                        createBaseVNode("div", _hoisted_50, toDisplayString(latestNightSong.value.time), 1)
                      ])) : (openBlock(), createElementBlock("div", _hoisted_51, toDisplayString(unref(t)("history.heatmap.noData")), 1))
                    ])
                  ])
                ])
              ])) : (openBlock(), createElementBlock("div", _hoisted_52, [
                createVNode(_component_n_empty, {
                  description: unref(t)("history.heatmap.noData")
                }, null, 8, ["description"])
              ]))
            ], 2)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d3846c5"]]);
export {
  index as default
};
