webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(587);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(293)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./modulo-facturacion-openmrs.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./modulo-facturacion-openmrs.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(292)();
	// imports
	
	
	// module
	exports.push([module.id, "/* * This Source Code Form is subject to the terms of the Mozilla Public License,\r\n * v. 2.0. If a copy of the MPL was not distributed with this file, You can\r\n * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under\r\n * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.\r\n *\r\n * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS\r\n * graphic logo is a trademark of OpenMRS Inc.\r\n */\r\nbody {\r\n    font-family: \"OpenSans\", Arial, sans-serif;\r\n    -webkit-font-smoothing: subpixel-antialiased;\r\n    max-width: 1000px;\r\n    margin: 10px auto;\r\n    background: #eeeeee;\r\n    color: #363463;\r\n    font-size: 16px;\r\n}\r\n\r\nheader {\r\n    position: relative;\r\n    background-color: #00463f;\r\n    color: #CCC;\r\n    line-height: 1em;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    -o-border-radius: 5px;\r\n    -ms-border-radius: 5px;\r\n    -khtml-border-radius: 5px;\r\n    border-radius: 5px;\r\n    display: block;\r\n    min-height: 48px;\r\n}\r\n\r\nheader .logo {\r\n    float: left;\r\n    margin: 4px;\r\n    display: block;\r\n}\r\n\r\nheader .logo img {\r\n    width: 120px;\r\n}\r\n\r\n#body-wrapper {\r\n    margin-top: 10px;\r\n    padding: 10px;\r\n    background-color: white;\r\n    -moz-border-radius: 5px;\r\n    -webkit-border-radius: 5px;\r\n    -o-border-radius: 5px;\r\n    -ms-border-radius: 5px;\r\n    -khtml-border-radius: 5px;\r\n    border-radius: 5px;\r\n    min-height: 500px;\r\n    justify-content: center;\r\n}\r\n\r\n.app-title {\r\n    display: block;\r\n    float: right;\r\n    color: #eeeeee;\r\n    font-size: 32px;\r\n    margin: 4px;\r\n    height: 100%;\r\n    padding-top: 12px;\r\n    padding-right: 5px;\r\n}\r\n\r\n.instructions {\r\n    align-self: center;\r\n}\r\n\r\n.crearBtn {\r\n    float: right;\r\n    display: block;\r\n}\r\n\r\n.btnImg {\r\n    font-size: 5em;\r\n    color:darkblue;\r\n    padding: 5px;\r\n    margin:20px;\r\n    width: 20%;\r\n}\r\n.labMod{\r\n    font-size: 0.25em;\r\n}\r\n.acciones{\r\n    font-size: 1.3em;\r\n}\r\nlabel{\r\n    font-weight: bold;\r\n}\r\n\r\n", ""]);
	
	// exports


/***/ })

});
//# sourceMappingURL=css.bundle.js.map