module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asciimathToLatex = __webpack_require__(1);

var _asciimathToLatex2 = _interopRequireDefault(_asciimathToLatex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import katex from 'katex'

var mathBlock = function mathBlock(code) {
  var tex = '';
  code.split(/(?:\n\s*){2,}/).forEach(function (line) {
    // consecutive new lines means a new formula
    try {
      tex += katex.renderToString(line.trim(), { displayMode: true });
    } catch (err) {
      tex += '<pre>' + err + '</pre>';
    }
  });
  return '<div>' + tex + '</div>';
}; //import './katex.css'

var LatexPlugin = function LatexPlugin(md) {
  // inline math
  var temp1 = md.renderer.rules.code_inline.bind(md.renderer.rules);
  md.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
    var code = tokens[idx].content;
    if (code.startsWith('@') && code.endsWith('@')) {
      code = '$' + (0, _asciimathToLatex2.default)(code.substr(1, code.length - 2)) + '$';
    }
    if (code.startsWith('$') && code.endsWith('$')) {
      // inline math
      code = code.substr(1, code.length - 2);
      try {
        return katex.renderToString(code);
      } catch (err) {
        return '<code>' + err + '</code>';
      }
    }
    return temp1(tokens, idx, options, env, slf);
  };

  // fenced math block
  var temp2 = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];
    var code = token.content.trim();
    if (token.info === 'math' || token.info === 'katex') {
      // math
      return mathBlock(code);
    }
    if (/^ascii-?math/i.test(token.info)) {
      code = code.split(/(?:\n\s*){2,}/).map(function (item) {
        return (0, _asciimathToLatex2.default)(item);
      }).join('\n\n');
      return mathBlock(code);
    }
    return temp2(tokens, idx, options, env, slf);
  };
};

exports.default = LatexPlugin;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("asciimath-to-latex");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map