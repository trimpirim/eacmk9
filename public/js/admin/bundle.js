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

	var _checkboxCollapse = __webpack_require__(2);

	var _checkboxCollapse2 = _interopRequireDefault(_checkboxCollapse);

	var _form = __webpack_require__(3);

	var _form2 = _interopRequireDefault(_form);

	var _datepicker = __webpack_require__(4);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(document).ready(function () {
	  _ckeditorHelper2.default.load();
	  _checkboxCollapse2.default.init();
	  _form2.default.init();
	  _datepicker2.default.init();
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CheckboxCollapse = {
	  selector: '.js-checkbox-collapse',

	  init: function init() {
	    var element = $(CheckboxCollapse.selector);
	    if (element.length > 0) {
	      var collapseElement = $(element.attr('data-target'));
	      if (collapseElement.length > 0) {
	        var collapse = 'show';
	        if (!element.prop('checked')) {
	          collapse = 'hide';
	        }

	        collapseElement.collapse(collapse);
	      }
	    }
	  }
	};

	exports.default = CheckboxCollapse;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Form = {
	  reset: function reset() {
	    var resetElements = $('.js-reset-element');
	    resetElements.on('click', function () {
	      var form = $(this).closest('form');
	      if (form.length > 0) {
	        form.trigger('reset');

	        var selects = form.find('select:not(.js-select-to-autocomplete)');
	        selects.prop('selectedIndex', 0);

	        var inputs = form.find('input');
	        inputs.attr('value', '');

	        form[0].submit();
	      }
	    });
	  },
	  init: function init() {
	    Form.reset();
	  }
	};

	exports.default = Form;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Datepicker = {
	  selector: '.js-datepicker',
	  DEFAULT_OPTIONS: {
	    nextText: '',
	    prevText: '',
	    dateFormat: 'dd/mm/yy',
	    changeYear: true,
	    yearRange: "-100:+0"
	  },
	  init: function init() {
	    var options = Datepicker.parseOptions();

	    $(Datepicker.selector).datepicker(options);
	  },
	  parseOptions: function parseOptions() {
	    var object = $(Datepicker.selector);
	    var defaultOptions = Datepicker.DEFAULT_OPTIONS;
	    var options = {
	      nextText: object.data('js-next-text') || defaultOptions.nextText,
	      prevText: object.data('js-prev-text') || defaultOptions.prevText,
	      dateFormat: object.data('js-date-format') || defaultOptions.dateFormat,
	      changeYear: object.data('js-change-year') || defaultOptions.changeYear,
	      yearRange: object.data('js-year-range') || defaultOptions.yearRange
	    };
	    return options;
	  }
	};

	exports.default = Datepicker;

/***/ }
/******/ ]);