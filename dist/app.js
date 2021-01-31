"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = _interopRequireDefault(require("./database"));

var _authController = _interopRequireDefault(require("./controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _database["default"])();
var app = (0, _express["default"])(); // Settings

app.set('port', process.env.PORT || 3000); // Middlewares

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_authController["default"]);
var _default = app;
exports["default"] = _default;