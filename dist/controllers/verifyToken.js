"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided.'
    });
  }

  var decoded;

  try {
    decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (_unused) {
    return res.status(401).json({
      auth: false,
      message: 'Invalid token.'
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;