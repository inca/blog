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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/dev.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/dev.ts":
/*!*************************!*\
  !*** ./src/main/dev.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/main/util.ts\");\n\nconnectDev();\nfunction connectDev() {\n    var ws = new WebSocket(\"ws://\" + location.host);\n    ws.onclose = function () {\n        setTimeout(connectDev, 500);\n    };\n    ws.onopen = function () {\n        console.log('Connected to dev server');\n    };\n    ws.onmessage = function (ev) {\n        var payload = JSON.parse(ev.data);\n        switch (payload.type) {\n            case 'postChanged':\n                return onPostChanged(payload.post);\n            case 'cssChanged':\n                return onCssChanged(payload.cssFile);\n            case 'templateChanged':\n                return location.reload();\n            case 'jsChanged':\n                return location.reload();\n        }\n    };\n    ws.onerror = function (ev) {\n        ev.preventDefault();\n        ev.stopPropagation();\n        return false;\n    };\n}\nfunction onCssChanged(file) {\n    var _a;\n    var link = document.querySelector(\"link[rel=\\\"stylesheet\\\"][href^=\\\"/\" + file + \"\\\"]\");\n    if (link) {\n        var newHref = ((_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace(/\\?.*/, '')) + '?' + Date.now();\n        link.setAttribute('href', newHref);\n    }\n}\nfunction onPostChanged(post) {\n    var content = document.querySelector(\"article[data-post-id=\\\"\" + post.id + \"\\\"] .post__content\");\n    if (content instanceof HTMLElement) {\n        content.innerHTML = post.html;\n        Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"initContent\"])(content);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main/dev.ts?");

/***/ }),

/***/ "./src/main/util.ts":
/*!**************************!*\
  !*** ./src/main/util.ts ***!
  \**************************/
/*! exports provided: onReady, externalizeLinks, highlightCode, initContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onReady\", function() { return onReady; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"externalizeLinks\", function() { return externalizeLinks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"highlightCode\", function() { return highlightCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initContent\", function() { return initContent; });\nfunction onReady(fn) {\n    if (document.readyState === 'interactive' || document.readyState === \"complete\") {\n        setTimeout(fn, 0);\n    }\n    else {\n        document.addEventListener('DOMContentLoaded', fn);\n    }\n}\nfunction externalizeLinks(scope) {\n    var links = [].slice.call(scope.querySelectorAll('article a'));\n    for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {\n        var link = links_1[_i];\n        if (link.origin !== location.origin) {\n            link.setAttribute('target', '_blank');\n            link.setAttribute('rel', 'noopener');\n        }\n    }\n}\nfunction highlightCode(scope) {\n    var blocks = [].slice.call(scope.querySelectorAll('pre code'));\n    for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {\n        var block = blocks_1[_i];\n        window.hljs.highlightBlock(block);\n    }\n}\nfunction initContent(el) {\n    if (el === void 0) { el = document.documentElement; }\n    externalizeLinks(el);\n    highlightCode(el);\n    if (window.MathJax && window.MathJax.typeset) {\n        window.MathJax.typeset();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main/util.ts?");

/***/ })

/******/ });