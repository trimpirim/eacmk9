/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ckeditorHelper = __webpack_require__(1);

	var _ckeditorHelper2 = _interopRequireDefault(_ckeditorHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(document).ready(function () {
	  _ckeditorHelper2.default.load();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CKEditorHelper = {
	  selector: '.js-ckeditor-replace',
	  instances: [],

	  load: function load() {
	    this.replace();
	  },
	  replace: function replace() {
	    var replaceElements = $(this.selector);
	    if (typeof CKEDITOR !== 'undefined') {
	      if (replaceElements.length > 0) {
	        replaceElements.each(function (index, item) {
	          var replaceElement = $(item);
	          if (!!replaceElement.attr('id')) {
	            var id = replaceElement.attr('id');
	            var instance = CKEDITOR.replace(id);
	            if (!!replaceElement.data('upload-url')) {
	              instance.config.extraPlugins = 'uploadimage';
	              instance.config.uploadUrl = replaceElement.data('upload-url');
	            }
	            CKEditorHelper.instances.push(instance);

	            CKEditorHelper.limitChars(instance, replaceElement);
	          }
	        });
	      }
	    }
	  },
	  limitChars: function limitChars(instance, element) {
	    var limit = element.data('js-ckeditor-limit');
	    if (limit) {
	      instance.on('key', function () {
	        var text = instance.document.getBody().getText();
	        return text.length <= limit;
	      });
	    }
	  }
	};

	exports.default = CKEditorHelper;

/***/ }
/******/ ]);