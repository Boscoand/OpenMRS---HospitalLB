webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(577);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(558)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./sans.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./sans.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(557)();
	// imports
	
	
	// module
	exports.push([module.id, "/* * This Source Code Form is subject to the terms of the Mozilla Public License,\n * v. 2.0. If a copy of the MPL was not distributed with this file, You can\n * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under\n * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.\n *\n * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS\n * graphic logo is a trademark of OpenMRS Inc.\n\n ***max-width: 1000px;***\n */\nbody {\n    font-family: \"OpenSans\", Arial, sans-serif;\n    -webkit-font-smoothing: subpixel-antialiased;\n    max-width: 90%;\n    margin: 10px auto;\n    background: #eeeeee;\n    color: #363463;\n    font-size: 16px;\n}\n\nheader {\n    position: relative;\n    background-color: #00463f;\n    color: #CCC;\n    line-height: 1em;\n    -moz-border-radius: 5px;\n    -webkit-border-radius: 5px;\n    -o-border-radius: 5px;\n    -ms-border-radius: 5px;\n    -khtml-border-radius: 5px;\n    border-radius: 5px;\n    display: block;\n    min-height: 48px;\n}\n\nheader .logo {\n    float: left;\n    margin: 4px;\n    display: block;\n}\n\nheader .logo img {\n    width: 120px;\n}\n\n#body-wrapper {\n    margin-top: 10px;\n    padding: 10px;\n    background-color: white;\n    -moz-border-radius: 5px;\n    -webkit-border-radius: 5px;\n    -o-border-radius: 5px;\n    -ms-border-radius: 5px;\n    -khtml-border-radius: 5px;\n    border-radius: 5px;\n    min-height: 500px;\n    justify-content: center;\n}\n\n.app-title {\n    display: block;\n    float: right;\n    color: #eeeeee;\n    font-size: 32px;\n    margin: 4px;\n    height: 100%;\n    padding-top: 12px;\n    padding-right: 5px;\n}\n\n.instructions {\n    align-self: center;\n}\n\n", ""]);
	
	// exports


/***/ })

});
//# sourceMappingURL=css.bundle.js.map