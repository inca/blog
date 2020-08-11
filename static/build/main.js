/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/index.ts":
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./src/util.ts\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ \"./src/main/math.ts\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ \"./src/main/theme.ts\");\n\n\n\nObject(_util__WEBPACK_IMPORTED_MODULE_0__[\"onReady\"])(() => {\n    Object(_math__WEBPACK_IMPORTED_MODULE_1__[\"initMath\"])();\n    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"initContent\"])();\n    Object(_theme__WEBPACK_IMPORTED_MODULE_2__[\"initTheme\"])();\n});\n\n\n//# sourceURL=webpack:///./src/main/index.ts?");

/***/ }),

/***/ "./src/main/math.ts":
/*!**************************!*\
  !*** ./src/main/math.ts ***!
  \**************************/
/*! exports provided: initMath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initMath\", function() { return initMath; });\n/**\n * Optionally adds MathJax on pages that have $$ or %% markers.\n * Must be called only once (not in initContent).\n */\nfunction initMath() {\n    var _a;\n    const body = (_a = document.body.textContent, (_a !== null && _a !== void 0 ? _a : ''));\n    if (!/\\$\\$|\\%\\%/.test(body)) {\n        return;\n    }\n    window.MathJax = {\n        extensions: [\"TeX/AMSmath.js\", \"TeX/AMSsymbol.js\"],\n        tex: {\n            inlineMath: [['%%', '%%']],\n            displayMath: [['$$', '$$']],\n        },\n    };\n    const script = document.createElement('script');\n    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';\n    document.body.appendChild(script);\n}\n\n\n//# sourceURL=webpack:///./src/main/math.ts?");

/***/ }),

/***/ "./src/main/theme.ts":
/*!***************************!*\
  !*** ./src/main/theme.ts ***!
  \***************************/
/*! exports provided: initTheme, getTheme, readThemeFromLocalStorage, updateTheme, setTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initTheme\", function() { return initTheme; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTheme\", function() { return getTheme; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"readThemeFromLocalStorage\", function() { return readThemeFromLocalStorage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTheme\", function() { return updateTheme; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTheme\", function() { return setTheme; });\nconst prefersDarkTheme = window.matchMedia ?\n    window.matchMedia('(prefers-color-scheme: dark)').matches : false;\nconst autoDetectedTheme = prefersDarkTheme ? 'dark' : 'light';\n/**\n * Theme set by user.\n */\nlet userTheme = null;\nfunction initTheme() {\n    userTheme = readThemeFromLocalStorage();\n    updateTheme(getTheme());\n}\nfunction getTheme() {\n    return (userTheme !== null && userTheme !== void 0 ? userTheme : autoDetectedTheme);\n}\nfunction readThemeFromLocalStorage() {\n    const val = localStorage.getItem('theme') || '';\n    if (val === 'light' || val === 'dark') {\n        return val;\n    }\n    return null;\n}\nfunction updateTheme(theme) {\n    const html = document.documentElement;\n    html.classList.remove('theme--light', 'theme--dark');\n    html.classList.add('theme--' + theme);\n}\nfunction setTheme(theme) {\n    userTheme = theme;\n    localStorage.setItem('theme', (theme !== null && theme !== void 0 ? theme : ''));\n    updateTheme(getTheme());\n}\n\n\n//# sourceURL=webpack:///./src/main/theme.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: onReady, externalizeLinks, highlightCode, initContent, lerp, clamp, saturate, smoothstep, step, dot, add, mul, div */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onReady\", function() { return onReady; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"externalizeLinks\", function() { return externalizeLinks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"highlightCode\", function() { return highlightCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initContent\", function() { return initContent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lerp\", function() { return lerp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clamp\", function() { return clamp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saturate\", function() { return saturate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"smoothstep\", function() { return smoothstep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"step\", function() { return step; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dot\", function() { return dot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mul\", function() { return mul; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"div\", function() { return div; });\nfunction onReady(fn) {\n    if (document.readyState === 'interactive' || document.readyState === \"complete\") {\n        setTimeout(fn, 0);\n    }\n    else {\n        document.addEventListener('DOMContentLoaded', fn);\n    }\n}\nfunction externalizeLinks(scope) {\n    const links = [].slice.call(scope.querySelectorAll('article a'));\n    for (const link of links) {\n        if (link.origin !== location.origin) {\n            link.setAttribute('target', '_blank');\n            link.setAttribute('rel', 'noopener');\n        }\n    }\n}\nfunction highlightCode(scope) {\n    const blocks = [].slice.call(scope.querySelectorAll('pre code'));\n    for (const block of blocks) {\n        window.hljs.highlightBlock(block);\n    }\n}\nfunction initContent(el = document.documentElement) {\n    externalizeLinks(el);\n    highlightCode(el);\n    if (window.MathJax && window.MathJax.typeset) {\n        window.MathJax.typeset();\n    }\n}\nfunction lerp(a, b, t) {\n    return a * (1 - t) + b * t;\n}\nfunction clamp(x, min, max) {\n    return Math.max(Math.min(x, max), min);\n}\nfunction saturate(x) {\n    return clamp(x, 0, 1);\n}\nfunction smoothstep(min, max, x) {\n    var x = saturate((x - min) / (max - min));\n    return x * x * (3 - 2 * x);\n}\n;\nfunction step(y, x) {\n    return x > y ? 1 : 0;\n}\nfunction dot(a, b) {\n    let res = 0;\n    for (let i = 0; i < a.length; i++) {\n        res += a[i] * b[i];\n    }\n    return res;\n}\nfunction add(a, b) {\n    let res = [];\n    for (let i = 0; i < a.length; i++) {\n        const p = typeof b === 'number' ? b : b[i];\n        res[i] = a[i] + p;\n    }\n    return res;\n}\nfunction mul(a, b) {\n    let res = [];\n    for (let i = 0; i < a.length; i++) {\n        const p = typeof b === 'number' ? b : b[i];\n        res[i] = a[i] * p;\n    }\n    return res;\n}\nfunction div(a, b) {\n    let res = [];\n    for (let i = 0; i < a.length; i++) {\n        const p = typeof b === 'number' ? b : b[i];\n        res[i] = a[i] / p;\n    }\n    return res;\n}\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });