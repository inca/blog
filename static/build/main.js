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

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*\n * A fast javascript implementation of simplex noise by Jonas Wagner\n\nBased on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.\nWhich is based on example code by Stefan Gustavson (stegu@itn.liu.se).\nWith Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).\nBetter rank ordering method by Stefan Gustavson in 2012.\n\n\n Copyright (c) 2018 Jonas Wagner\n\n Permission is hereby granted, free of charge, to any person obtaining a copy\n of this software and associated documentation files (the \"Software\"), to deal\n in the Software without restriction, including without limitation the rights\n to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n copies of the Software, and to permit persons to whom the Software is\n furnished to do so, subject to the following conditions:\n\n The above copyright notice and this permission notice shall be included in all\n copies or substantial portions of the Software.\n\n THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n SOFTWARE.\n */\n(function() {\n  'use strict';\n\n  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);\n  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;\n  var F3 = 1.0 / 3.0;\n  var G3 = 1.0 / 6.0;\n  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;\n  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;\n\n  function SimplexNoise(randomOrSeed) {\n    var random;\n    if (typeof randomOrSeed == 'function') {\n      random = randomOrSeed;\n    }\n    else if (randomOrSeed) {\n      random = alea(randomOrSeed);\n    } else {\n      random = Math.random;\n    }\n    this.p = buildPermutationTable(random);\n    this.perm = new Uint8Array(512);\n    this.permMod12 = new Uint8Array(512);\n    for (var i = 0; i < 512; i++) {\n      this.perm[i] = this.p[i & 255];\n      this.permMod12[i] = this.perm[i] % 12;\n    }\n\n  }\n  SimplexNoise.prototype = {\n    grad3: new Float32Array([1, 1, 0,\n      -1, 1, 0,\n      1, -1, 0,\n\n      -1, -1, 0,\n      1, 0, 1,\n      -1, 0, 1,\n\n      1, 0, -1,\n      -1, 0, -1,\n      0, 1, 1,\n\n      0, -1, 1,\n      0, 1, -1,\n      0, -1, -1]),\n    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,\n      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,\n      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,\n      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,\n      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,\n      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,\n      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,\n      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),\n    noise2D: function(xin, yin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0 = 0; // Noise contributions from the three corners\n      var n1 = 0;\n      var n2 = 0;\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin) * F2; // Hairy factor for 2D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var t = (i + j) * G2;\n      var X0 = i - t; // Unskew the cell origin back to (x,y) space\n      var Y0 = j - t;\n      var x0 = xin - X0; // The x,y distances from the cell origin\n      var y0 = yin - Y0;\n      // For the 2D case, the simplex shape is an equilateral triangle.\n      // Determine which simplex we are in.\n      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords\n      if (x0 > y0) {\n        i1 = 1;\n        j1 = 0;\n      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)\n      else {\n        i1 = 0;\n        j1 = 1;\n      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)\n      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and\n      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where\n      // c = (3-sqrt(3))/6\n      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords\n      var y1 = y0 - j1 + G2;\n      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords\n      var y2 = y0 - 1.0 + 2.0 * G2;\n      // Work out the hashed gradient indices of the three simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      // Calculate the contribution from the three corners\n      var t0 = 0.5 - x0 * x0 - y0 * y0;\n      if (t0 >= 0) {\n        var gi0 = permMod12[ii + perm[jj]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient\n      }\n      var t1 = 0.5 - x1 * x1 - y1 * y1;\n      if (t1 >= 0) {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);\n      }\n      var t2 = 0.5 - x2 * x2 - y2 * y2;\n      if (t2 >= 0) {\n        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to return values in the interval [-1,1].\n      return 70.0 * (n0 + n1 + n2);\n    },\n    // 3D simplex noise\n    noise3D: function(xin, yin, zin) {\n      var permMod12 = this.permMod12;\n      var perm = this.perm;\n      var grad3 = this.grad3;\n      var n0, n1, n2, n3; // Noise contributions from the four corners\n      // Skew the input space to determine which simplex cell we're in\n      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D\n      var i = Math.floor(xin + s);\n      var j = Math.floor(yin + s);\n      var k = Math.floor(zin + s);\n      var t = (i + j + k) * G3;\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var x0 = xin - X0; // The x,y,z distances from the cell origin\n      var y0 = yin - Y0;\n      var z0 = zin - Z0;\n      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.\n      // Determine which simplex we are in.\n      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords\n      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords\n      if (x0 >= y0) {\n        if (y0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // X Y Z order\n        else if (x0 >= z0) {\n          i1 = 1;\n          j1 = 0;\n          k1 = 0;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // X Z Y order\n        else {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 1;\n          j2 = 0;\n          k2 = 1;\n        } // Z X Y order\n      }\n      else { // x0<y0\n        if (y0 < z0) {\n          i1 = 0;\n          j1 = 0;\n          k1 = 1;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Z Y X order\n        else if (x0 < z0) {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 0;\n          j2 = 1;\n          k2 = 1;\n        } // Y Z X order\n        else {\n          i1 = 0;\n          j1 = 1;\n          k1 = 0;\n          i2 = 1;\n          j2 = 1;\n          k2 = 0;\n        } // Y X Z order\n      }\n      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),\n      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and\n      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where\n      // c = 1/6.\n      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords\n      var y1 = y0 - j1 + G3;\n      var z1 = z0 - k1 + G3;\n      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords\n      var y2 = y0 - j2 + 2.0 * G3;\n      var z2 = z0 - k2 + 2.0 * G3;\n      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords\n      var y3 = y0 - 1.0 + 3.0 * G3;\n      var z3 = z0 - 1.0 + 3.0 * G3;\n      // Work out the hashed gradient indices of the four simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      // Calculate the contribution from the four corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);\n      }\n      // Add contributions from each corner to get the final noise value.\n      // The result is scaled to stay just inside [-1,1]\n      return 32.0 * (n0 + n1 + n2 + n3);\n    },\n    // 4D simplex noise, better simplex rank ordering method 2012-03-09\n    noise4D: function(x, y, z, w) {\n      var perm = this.perm;\n      var grad4 = this.grad4;\n\n      var n0, n1, n2, n3, n4; // Noise contributions from the five corners\n      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in\n      var s = (x + y + z + w) * F4; // Factor for 4D skewing\n      var i = Math.floor(x + s);\n      var j = Math.floor(y + s);\n      var k = Math.floor(z + s);\n      var l = Math.floor(w + s);\n      var t = (i + j + k + l) * G4; // Factor for 4D unskewing\n      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space\n      var Y0 = j - t;\n      var Z0 = k - t;\n      var W0 = l - t;\n      var x0 = x - X0; // The x,y,z,w distances from the cell origin\n      var y0 = y - Y0;\n      var z0 = z - Z0;\n      var w0 = w - W0;\n      // For the 4D case, the simplex is a 4D shape I won't even try to describe.\n      // To find out which of the 24 possible simplices we're in, we need to\n      // determine the magnitude ordering of x0, y0, z0 and w0.\n      // Six pair-wise comparisons are performed between each possible pair\n      // of the four coordinates, and the results are used to rank the numbers.\n      var rankx = 0;\n      var ranky = 0;\n      var rankz = 0;\n      var rankw = 0;\n      if (x0 > y0) rankx++;\n      else ranky++;\n      if (x0 > z0) rankx++;\n      else rankz++;\n      if (x0 > w0) rankx++;\n      else rankw++;\n      if (y0 > z0) ranky++;\n      else rankz++;\n      if (y0 > w0) ranky++;\n      else rankw++;\n      if (z0 > w0) rankz++;\n      else rankw++;\n      var i1, j1, k1, l1; // The integer offsets for the second simplex corner\n      var i2, j2, k2, l2; // The integer offsets for the third simplex corner\n      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner\n      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.\n      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w\n      // impossible. Only the 24 indices which have non-zero entries make any sense.\n      // We use a thresholding to set the coordinates in turn from the largest magnitude.\n      // Rank 3 denotes the largest coordinate.\n      i1 = rankx >= 3 ? 1 : 0;\n      j1 = ranky >= 3 ? 1 : 0;\n      k1 = rankz >= 3 ? 1 : 0;\n      l1 = rankw >= 3 ? 1 : 0;\n      // Rank 2 denotes the second largest coordinate.\n      i2 = rankx >= 2 ? 1 : 0;\n      j2 = ranky >= 2 ? 1 : 0;\n      k2 = rankz >= 2 ? 1 : 0;\n      l2 = rankw >= 2 ? 1 : 0;\n      // Rank 1 denotes the second smallest coordinate.\n      i3 = rankx >= 1 ? 1 : 0;\n      j3 = ranky >= 1 ? 1 : 0;\n      k3 = rankz >= 1 ? 1 : 0;\n      l3 = rankw >= 1 ? 1 : 0;\n      // The fifth corner has all coordinate offsets = 1, so no need to compute that.\n      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords\n      var y1 = y0 - j1 + G4;\n      var z1 = z0 - k1 + G4;\n      var w1 = w0 - l1 + G4;\n      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords\n      var y2 = y0 - j2 + 2.0 * G4;\n      var z2 = z0 - k2 + 2.0 * G4;\n      var w2 = w0 - l2 + 2.0 * G4;\n      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords\n      var y3 = y0 - j3 + 3.0 * G4;\n      var z3 = z0 - k3 + 3.0 * G4;\n      var w3 = w0 - l3 + 3.0 * G4;\n      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords\n      var y4 = y0 - 1.0 + 4.0 * G4;\n      var z4 = z0 - 1.0 + 4.0 * G4;\n      var w4 = w0 - 1.0 + 4.0 * G4;\n      // Work out the hashed gradient indices of the five simplex corners\n      var ii = i & 255;\n      var jj = j & 255;\n      var kk = k & 255;\n      var ll = l & 255;\n      // Calculate the contribution from the five corners\n      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;\n      if (t0 < 0) n0 = 0.0;\n      else {\n        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;\n        t0 *= t0;\n        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);\n      }\n      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;\n      if (t1 < 0) n1 = 0.0;\n      else {\n        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;\n        t1 *= t1;\n        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);\n      }\n      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;\n      if (t2 < 0) n2 = 0.0;\n      else {\n        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;\n        t2 *= t2;\n        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);\n      }\n      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;\n      if (t3 < 0) n3 = 0.0;\n      else {\n        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;\n        t3 *= t3;\n        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);\n      }\n      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;\n      if (t4 < 0) n4 = 0.0;\n      else {\n        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;\n        t4 *= t4;\n        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);\n      }\n      // Sum up and scale the result to cover the range [-1,1]\n      return 27.0 * (n0 + n1 + n2 + n3 + n4);\n    }\n  };\n\n  function buildPermutationTable(random) {\n    var i;\n    var p = new Uint8Array(256);\n    for (i = 0; i < 256; i++) {\n      p[i] = i;\n    }\n    for (i = 0; i < 255; i++) {\n      var r = i + ~~(random() * (256 - i));\n      var aux = p[i];\n      p[i] = p[r];\n      p[r] = aux;\n    }\n    return p;\n  }\n  SimplexNoise._buildPermutationTable = buildPermutationTable;\n\n  function alea() {\n    // Johannes Baagøe <baagoe@baagoe.com>, 2010\n    var s0 = 0;\n    var s1 = 0;\n    var s2 = 0;\n    var c = 1;\n\n    var mash = masher();\n    s0 = mash(' ');\n    s1 = mash(' ');\n    s2 = mash(' ');\n\n    for (var i = 0; i < arguments.length; i++) {\n      s0 -= mash(arguments[i]);\n      if (s0 < 0) {\n        s0 += 1;\n      }\n      s1 -= mash(arguments[i]);\n      if (s1 < 0) {\n        s1 += 1;\n      }\n      s2 -= mash(arguments[i]);\n      if (s2 < 0) {\n        s2 += 1;\n      }\n    }\n    mash = null;\n    return function() {\n      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32\n      s0 = s1;\n      s1 = s2;\n      return s2 = t - (c = t | 0);\n    };\n  }\n  function masher() {\n    var n = 0xefc8249d;\n    return function(data) {\n      data = data.toString();\n      for (var i = 0; i < data.length; i++) {\n        n += data.charCodeAt(i);\n        var h = 0.02519603282416938 * n;\n        n = h >>> 0;\n        h -= n;\n        h *= n;\n        n = h >>> 0;\n        h -= n;\n        n += h * 0x100000000; // 2^32\n      }\n      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32\n    };\n  }\n\n  // amd\n  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  // common js\n  if (true) exports.SimplexNoise = SimplexNoise;\n  // browser\n  else {}\n  // nodejs\n  if (true) {\n    module.exports = SimplexNoise;\n  }\n\n})();\n\n\n//# sourceURL=webpack:///./node_modules/simplex-noise/simplex-noise.js?");

/***/ }),

/***/ "./src/main/index.ts":
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./src/util.ts\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ \"./src/main/math.ts\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ \"./src/main/theme.ts\");\n/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logo */ \"./src/main/logo.ts\");\n\n\n\n\nObject(_util__WEBPACK_IMPORTED_MODULE_0__[\"onReady\"])(() => {\n    Object(_math__WEBPACK_IMPORTED_MODULE_1__[\"initMath\"])();\n    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"initContent\"])();\n    Object(_theme__WEBPACK_IMPORTED_MODULE_2__[\"initTheme\"])();\n    Object(_logo__WEBPACK_IMPORTED_MODULE_3__[\"initLogo\"])();\n});\n\n\n//# sourceURL=webpack:///./src/main/index.ts?");

/***/ }),

/***/ "./src/main/logo.ts":
/*!**************************!*\
  !*** ./src/main/logo.ts ***!
  \**************************/
/*! exports provided: initLogo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLogo\", function() { return initLogo; });\n/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplex-noise */ \"./node_modules/simplex-noise/simplex-noise.js\");\n/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simplex_noise__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction initLogo() {\n    var _a, _b;\n    const logoEl = document.querySelector('.logo');\n    const spans = (_a = logoEl.querySelectorAll('.logo__name'), (_a !== null && _a !== void 0 ? _a : []));\n    for (const span of spans) {\n        const text = (_b = span.getAttribute('data-name'), (_b !== null && _b !== void 0 ? _b : ''));\n        for (const letter of text) {\n            const sp = document.createElement('span');\n            sp.innerText = letter;\n            sp.setAttribute('class', 'logo__particle');\n            span.appendChild(sp);\n        }\n    }\n    const particles = [].slice.apply(logoEl.querySelectorAll('.logo__particle'));\n    randomizeParticles(particles);\n    logoEl.addEventListener('mouseout', () => randomizeParticles(particles));\n}\nfunction randomizeParticles(els) {\n    const noise = new simplex_noise__WEBPACK_IMPORTED_MODULE_0___default.a(Math.random());\n    for (const [i, el] of els.entries()) {\n        const tx = noise.noise2D(i * 0.1, 0);\n        const ty = noise.noise2D(i * 0.1, 100);\n        el.setAttribute('style', `\n            --tx: ${tx * 8}px;\n            --ty: ${ty * 16}px;\n        `);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main/logo.ts?");

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