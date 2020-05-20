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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/hexgrid/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/hex.ts":
/*!********************!*\
  !*** ./src/hex.ts ***!
  \********************/
/*! exports provided: Hex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hex\", function() { return Hex; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n\nclass Hex {\n    constructor(q, r) {\n        this.q = q;\n        this.r = r;\n    }\n    static fromOrthogonal(xy, radius) {\n        return new Hex(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"dot\"])(xy, Hex.Q_INV) / radius, Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"dot\"])(xy, Hex.R_INV) / radius);\n    }\n    add(hex) {\n        return new Hex(this.q + hex.q, this.r + hex.r);\n    }\n    distanceTo(hex) {\n        return (Math.abs(this.q - hex.q) +\n            Math.abs(this.q + this.r - hex.q - hex.r) +\n            Math.abs(this.r - hex.r)) / 2;\n    }\n    toOrthogonal(radius) {\n        return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(Hex.Q_BASIS, this.q), Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(Hex.R_BASIS, this.r)), radius);\n    }\n    toString() {\n        return `(${this.q}; ${this.r})`;\n    }\n    // Traversal\n    *neighbours() {\n        for (const dir of Hex.AXIAL_DIRECTIONS) {\n            yield this.add(dir);\n        }\n    }\n    static *ring(center, radius) {\n        let current = center.add(new Hex(0, -radius));\n        for (const dir of Hex.AXIAL_DIRECTIONS) {\n            for (let i = 0; i < radius; i++) {\n                yield current;\n                current = current.add(dir);\n            }\n        }\n    }\n    static *spiral(center, minRadius, maxRadius) {\n        if (minRadius == 0) {\n            yield center;\n            minRadius += 1;\n        }\n        for (let r = minRadius; r <= maxRadius; r++) {\n            for (const hex of Hex.ring(center, r)) {\n                yield hex;\n            }\n        }\n    }\n}\nHex.zero = new Hex(0, 0);\nHex.Q_BASIS = [2, 0];\nHex.R_BASIS = [1, Math.sqrt(3)];\nHex.Q_INV = [0.5, -Math.sqrt(3) / 6];\nHex.R_INV = [0, Math.sqrt(3) / 3];\nHex.AXIAL_DIRECTIONS = [\n    new Hex(1, 0),\n    new Hex(0, 1),\n    new Hex(-1, 1),\n    new Hex(-1, 0),\n    new Hex(0, -1),\n    new Hex(1, -1),\n];\n\n\n//# sourceURL=webpack:///./src/hex.ts?");

/***/ }),

/***/ "./src/hexgrid/index.ts":
/*!******************************!*\
  !*** ./src/hexgrid/index.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./src/util.ts\");\n/* harmony import */ var _hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hex */ \"./src/hex.ts\");\n\n\nconst cellRadius = 16;\nconst colorQ = 'hsl(190, 80%, 50%)';\nconst colorR = 'hsl(290, 80%, 60%)';\nconst sqrt3 = Math.sqrt(3);\nconst hexVertices = [\n    [1, sqrt3 / 3],\n    [0, sqrt3 * 2 / 3],\n    [-1, sqrt3 / 3],\n    [-1, -sqrt3 / 3],\n    [0, -sqrt3 * 2 / 3],\n    [1, -sqrt3 / 3],\n];\nObject(_util__WEBPACK_IMPORTED_MODULE_0__[\"onReady\"])(() => drawGrids());\nconst modules = {\n    baseGrid,\n    gridOrthoAxes,\n    gridObliqueAxes,\n    gridCoordinates,\n};\nfunction drawGrids() {\n    const svgs = document.querySelectorAll('svg.hexgrid');\n    for (const svg of svgs) {\n        const module = modules[svg.id];\n        svg.setAttribute('transform', 'scale(1, -1)');\n        if (module) {\n            module(svg);\n        }\n    }\n}\nfunction baseGrid(svg) {\n    drawGrid(svg, {\n        opacity: 1,\n        opacityFade: 0.05,\n        maxRing: 12,\n    });\n}\nfunction gridOrthoAxes(svg) {\n    const baseSpec = {\n        opacity: .6,\n        opacityFade: 0.05,\n        maxRing: 12,\n    };\n    drawGrid(svg, Object.assign(Object.assign({}, baseSpec), { lines: true, dots: false }));\n    drawAxis(svg, {\n        unit: [1, 0],\n        color: 'hsl(0, 80%, 60%)',\n        label: 'X',\n    });\n    drawAxis(svg, {\n        unit: [0, 1],\n        color: 'hsl(120, 60%, 50%)',\n        label: 'Y',\n    });\n    drawGrid(svg, Object.assign(Object.assign({}, baseSpec), { lines: false, dots: true }));\n}\nfunction gridObliqueAxes(svg) {\n    const baseSpec = {\n        opacity: .6,\n        opacityFade: 0.05,\n        maxRing: 12,\n    };\n    drawGrid(svg, Object.assign(Object.assign({}, baseSpec), { lines: true, dots: false }));\n    drawAxis(svg, {\n        unit: [1, 0],\n        color: colorQ,\n        label: 'Q',\n    });\n    drawAxis(svg, {\n        unit: [.5, sqrt3 / 2],\n        color: colorR,\n        label: 'R',\n    });\n    drawGrid(svg, Object.assign(Object.assign({}, baseSpec), { lines: false, dots: true }));\n}\nfunction gridCoordinates(svg) {\n    const baseSpec = {\n        opacity: .6,\n        opacityFade: 0.05,\n        maxRing: 12,\n    };\n    drawGrid(svg, Object.assign(Object.assign({}, baseSpec), { lines: true, dots: false }));\n    const g = createElement(svg, 'g');\n    g.setAttribute('class', 'hexgrid__coords');\n    svg.addEventListener('mousemove', ev => {\n        const path = ev.target;\n        const q = parseInt(path.getAttribute('data-q'));\n        const r = parseInt(path.getAttribute('data-r'));\n        if (isNaN(q) || isNaN(r)) {\n            return;\n        }\n        drawCoords(g, new _hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"](q, r));\n    });\n}\nfunction drawGrid(svg, spec) {\n    const { maxRing = 12, opacity = 1, opacityFade = 0, lines = true, dots = false, } = spec;\n    const g = createElement(svg, 'g');\n    g.setAttribute('class', 'hexgrid__grid');\n    for (const hex of _hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"].spiral(_hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"].zero, 0, maxRing)) {\n        const alpha = opacity - opacityFade * hex.distanceTo(_hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"].zero);\n        drawHexCell(g, hex, `rgba(0,0,0,${alpha})`, lines, dots);\n    }\n}\nfunction drawAxis(svg, spec) {\n    const { unit, color, label = '', width = 2 } = spec;\n    const viewBox = getViewBox(svg);\n    const minDim = Math.min(viewBox.width, viewBox.height) - 8;\n    const p0 = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(unit, -1), minDim / 2);\n    const p1 = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(unit, minDim / 2);\n    const d = `M ` + [p0, p1].map(p => p.join(',')).join(' ');\n    const g = createElement(svg, 'g');\n    g.setAttribute('class', 'hexgrid__axis');\n    const line = createElement(g, 'path');\n    line.setAttribute('d', d);\n    line.setAttribute('stroke-width', String(width));\n    line.setAttribute('stroke', color);\n    const arrow = createArrowHead(g, color);\n    const a = Math.atan2(unit[1], unit[0]) * 180 / Math.PI;\n    arrow.setAttribute('transform', `translate(${p1[0]}, ${p1[1]}) rotate(${a})`);\n    const lbl = createElement(svg, 'g');\n    lbl.setAttribute('class', 'hexgrid__label');\n    lbl.setAttribute('transform', `translate(${p1[0] + 8}, ${p1[1] - 16})`);\n    const text = createElement(lbl, 'text');\n    text.setAttribute('x', '0');\n    text.setAttribute('y', '0');\n    text.setAttribute('fill', color);\n    text.setAttribute('transform', 'scale(1,-1)');\n    // text.setAttribute('font-weight', 'bold');\n    text.innerHTML = label;\n}\nfunction drawHexCell(svg, hex, color, lines = true, dot = false) {\n    const viewbox = getViewBox(svg);\n    const o = hex.toOrthogonal(cellRadius);\n    if (o[0] < viewbox.x ||\n        o[0] > (viewbox.x + viewbox.width) ||\n        o[1] < (viewbox.y) ||\n        o[1] > (viewbox.y + viewbox.height)) {\n        return;\n    }\n    if (lines) {\n        const d = 'M' +\n            hexVertices.map(p => Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(o, Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(p, cellRadius)).join(',')).join(' ') +\n            'z';\n        const path = createElement(svg, 'path');\n        path.setAttribute('d', d);\n        path.setAttribute('fill', 'transparent');\n        path.setAttribute('stroke', color);\n        path.setAttribute('stroke-width', '.4');\n        path.setAttribute('data-q', String(hex.q));\n        path.setAttribute('data-r', String(hex.r));\n    }\n    if (dot) {\n        const circle = createElement(svg, 'circle');\n        circle.setAttribute('fill', color);\n        circle.setAttribute('cx', String(o[0]));\n        circle.setAttribute('cy', String(o[1]));\n        circle.setAttribute('r', '1');\n    }\n}\nfunction drawCoords(svg, hex) {\n    svg.innerHTML = '';\n    // Draw step by step, starting from 0, going in Q direction first,\n    // then switching to R\n    let h = _hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"].zero;\n    let sign = Math.sign(hex.q);\n    for (let i = 0; i < Math.abs(hex.q); i++) {\n        const next = h.add(new _hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"](sign, 0));\n        const p0 = h.toOrthogonal(cellRadius);\n        const p1 = next.toOrthogonal(cellRadius);\n        h = next;\n        drawArrow(svg, p0, p1, colorQ);\n    }\n    sign = Math.sign(hex.r);\n    for (let i = 0; i < Math.abs(hex.r); i++) {\n        const next = h.add(new _hex__WEBPACK_IMPORTED_MODULE_1__[\"Hex\"](0, sign));\n        const p0 = h.toOrthogonal(cellRadius);\n        const p1 = next.toOrthogonal(cellRadius);\n        h = next;\n        drawArrow(svg, p0, p1, colorR);\n    }\n    // Finally, draw a label\n    const lbl = createElement(svg, 'g');\n    const p = h.toOrthogonal(cellRadius);\n    lbl.setAttribute('transform', `translate(${p[0] + 48}, ${p[1] - 16})`);\n    const c = createElement(lbl, 'circle');\n    c.setAttribute('fill', '#fff');\n    c.setAttribute('cx', '0');\n    c.setAttribute('cy', '0');\n    c.setAttribute('r', '1');\n    c.setAttribute('transform', `scale(32, 8)`);\n    const ql = createElement(lbl, 'text');\n    ql.setAttribute('fill', colorQ);\n    ql.setAttribute('transform', 'scale(1, -1)');\n    ql.setAttribute('text-anchor', 'end');\n    ql.setAttribute('alignment-baseline', 'middle');\n    ql.textContent = ' ' + hex.q + ' ';\n    const rl = createElement(lbl, 'text');\n    rl.setAttribute('fill', colorR);\n    rl.setAttribute('transform', 'scale(1, -1)');\n    rl.setAttribute('text-anchor', 'start');\n    rl.setAttribute('alignment-baseline', 'middle');\n    rl.textContent = ' ' + hex.r + ' ';\n}\nfunction drawArrow(svg, p0, p1, color, width = 2) {\n    const line = createElement(svg, 'path');\n    const d = `M ` + [p0, p1].map(p => p.join(',')).join(' ');\n    line.setAttribute('d', d);\n    line.setAttribute('stroke-width', String(width));\n    line.setAttribute('stroke', color);\n    const arrow = createArrowHead(svg, color);\n    const diff = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(p1, Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"mul\"])(p0, -1));\n    const a = Math.atan2(diff[1], diff[0]) * 180 / Math.PI;\n    arrow.setAttribute('transform', `translate(${p1[0]}, ${p1[1]}) rotate(${a})`);\n}\nfunction createArrowHead(svg, color) {\n    const p = createElement(svg, 'path');\n    p.setAttribute('class', 'hexgrid__arrowhead');\n    p.setAttribute('d', 'M 4,0 -8,4 -8,-4 z');\n    p.setAttribute('fill', color);\n    return p;\n}\nfunction createElement(svg, tagName) {\n    const g = document.createElementNS(\"http://www.w3.org/2000/svg\", tagName);\n    svg.appendChild(g);\n    return g;\n}\nfunction getViewBox(svg) {\n    const viewport = (svg.viewportElement || svg);\n    return viewport.viewBox.baseVal;\n}\n\n\n//# sourceURL=webpack:///./src/hexgrid/index.ts?");

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