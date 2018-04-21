exports.id = "main";
exports.modules = {

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.js\");\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _reactRouter = __webpack_require__(/*! react-router */ \"./node_modules/react-router/es/index.js\");\n\nvar _express = __webpack_require__(/*! express */ \"./node_modules/express/index.js\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _functions = __webpack_require__(/*! Utils/functions */ \"./src/shared/utils/functions.js\");\n\nvar _store = __webpack_require__(/*! Stores/store */ \"./src/shared/stores/store.js\");\n\nvar _App = __webpack_require__(/*! Containers/App */ \"./src/shared/containers/App.js\");\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = (0, _express2.default)();\n\napp.use(_express2.default.static('public'));\n\napp.use(function (req, res, next) {\n\tconsole.log('\\x1B[32m%s\\x1B[0m', '-Method: ' + req.method + ', URL: ' + req.url);\n\tnext();\n});\n\napp.get('*', function (req, res) {\n\ttry {\n\t\tvar html = (0, _server.renderToString)(_react2.default.createElement(\n\t\t\t_reactRedux.Provider,\n\t\t\t{ store: _store.store },\n\t\t\t_react2.default.createElement(\n\t\t\t\t_reactRouter.StaticRouter,\n\t\t\t\t{ location: req.url, context: {} },\n\t\t\t\t_react2.default.createElement(_App2.default, null)\n\t\t\t)\n\t\t));\n\t\tres.send(render(html));\n\t} catch (err) {\n\t\tconsole.log((0, _functions.errorPattern)(err));\n\t}\n});\napp.listen(3000, function () {\n\tconsole.log('Server is running on port 3000');\n});\n\nvar render = function render(html) {\n\treturn '\\n\\t\\t<!DOCTYPE html>\\n\\t\\t<html>\\n\\t\\t\\t<head></head>\\n\\t\\t\\t<body>\\n\\t\\t\\t\\t<div class=\"root\">' + html + '</div>\\n\\t\\t\\t\\t<script src=\"bundle.js\" refer></script>\\n\\t\\t\\t</body>\\n\\t\\t</html>\\n\\t';\n};\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ })

};