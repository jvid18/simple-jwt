"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verifyToken = _interopRequireDefault(require("./verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('/signin', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, email, password, user, passwordIsValid, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'No user found.'
            }));

          case 6:
            _context.next = 8;
            return user.validatePassword(password);

          case 8:
            passwordIsValid = _context.sent;

            if (passwordIsValid) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              auth: false,
              token: null
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60
            });
            res.json({
              auth: true,
              token: token
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/signup', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body2, username, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
            user = new _User["default"]({
              username: username,
              email: email,
              password: password
            });
            _context2.next = 4;
            return user.encryptPassword(password);

          case 4:
            user.password = _context2.sent;
            _context2.next = 7;
            return user.save();

          case 7:
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60
            });
            res.json({
              auth: true,
              token: token
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/me', _verifyToken["default"], /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _User["default"].findById(req.userId, {
              password: 0
            });

          case 2:
            user = _context3.sent;

            if (!user) {
              res.status(404).json({
                message: 'No user found.'
              });
            }

            res.json(user);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;