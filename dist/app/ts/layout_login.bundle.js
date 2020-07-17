(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//* 回上頁
var goBack = exports.goBack = function goBack(el) {
    document.querySelector(el).addEventListener('click', function () {
        console.log('test');
        history.go(-1);
        return false;
    });
};
//* Menu開關
var menuTransition = exports.menuTransition = function menuTransition(eventTarget, target, position) {
    document.querySelector(eventTarget).addEventListener('click', function () {
        if (position === 'left') {
            document.querySelector(eventTarget).classList.toggle('menu-close');
            document.querySelector(target).classList.toggle('menu-left-show');
            document.querySelector('.right-menu').classList.remove('menu-right-show');
            document.querySelector('.cube').classList.remove('cube__rotate');
        }
        if (position === 'right') {
            document.querySelector(eventTarget).classList.toggle('cube__rotate');
            document.querySelector(target).classList.toggle('menu-right-show');
            document.querySelector('.left-menu-btn').classList.remove('menu-close');
            document.querySelector('.menu').classList.remove('menu-left-show');
        }
    });
};
//* SlideToggle
var getHeight = function getHeight(el) {
    var el_style = window.getComputedStyle(el),
        el_display = el_style.display,
        el_position = el_style.position,
        el_visibility = el_style.visibility,
        el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
        wanted_height = 0;
    if (el_display !== 'none' && el_max_height !== '0') {
        return el.offsetHeight;
    }
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display = 'block';
    wanted_height = el.offsetHeight;
    el.style.display = el_display;
    el.style.position = el_position;
    el.style.visibility = el_visibility;
    return wanted_height;
};
var toggleSlide = exports.toggleSlide = function toggleSlide(el) {
    var el_max_height = 0;
    if (el.getAttribute('data-max-height')) {
        if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
            el.style.maxHeight = el.getAttribute('data-max-height');
        } else {
            el.style.maxHeight = '0';
        }
    } else {
        el_max_height = getHeight(el) + 'px';
        el.style['transition'] = 'max-height 0.5s ease-in-out';
        el.style.overflowY = 'hidden';
        el.style.maxHeight = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display = 'block';
        setTimeout(function () {
            el.style.maxHeight = el_max_height.toString();
        }, 10);
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var _func = require('./global/func');

var _login = require('./src/login/login.func');

var _login2 = require('./src/login/login.interface');

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.back-button')) {
        (0, _func.goBack)('.back-button');
    }
    var login = function login() {
        return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var loginTest, testObj, otp;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _login.getLineTokenAndLogin)('test123');

                        case 2:
                            loginTest = _context.sent;
                            testObj = {
                                phone: 987654321,
                                type: _login2.RequestOtpType.SignIn
                            };
                            _context.next = 6;
                            return (0, _login.requestOtp)(testObj);

                        case 6:
                            otp = _context.sent;

                            console.log(loginTest);
                            console.log(otp);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };
    login();
    //* 登入 - 輸入手機
    var loginTelBtn = document.querySelector('#loginTelBtn');
    var loginTelInput = document.querySelector('#loginTel');
    if (loginTelBtn) {
        loginTelBtn.addEventListener('click', function (e) {
            var phoneNumber = void 0;
            e.preventDefault();
            if (loginTelInput.value === '') {
                alert('請輸入電話');
            }
            phoneNumber = loginTelInput.value.replace(/^/, '09');
            //TODO Send to API function
            console.log(phoneNumber);
        });
    }
    //* 登入 - 驗證碼
    var loginVarificationInput = document.querySelector('#loginVarificationInput');
    var loginVarificationBtn = document.querySelector('#loginVarificationBtn');
    if (loginVarificationBtn) {
        loginVarificationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (loginVarificationInput.value === '') {
                alert('請重新輸入驗證碼');
            }
            var varificationValue = loginVarificationInput.value;
            //TODO Send to API function
            console.log(varificationValue);
        });
    }
});

},{"./global/func":1,"./src/login/login.func":3,"./src/login/login.interface":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestOtp = requestOtp;
exports.getLineTokenAndLogin = getLineTokenAndLogin;
exports.registerMemberAndLineToken = registerMemberAndLineToken;

var _post = require('../post/post.func');

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function requestOtp(params) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _post.sendRequest)('igas/consumerapp/requestotp', {
                            uuid: '',
                            d: {
                                account: params.phone,
                                type: params.type
                            }
                        });

                    case 2:
                        res = _context.sent;

                        if (!(res.c == '200')) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', true);

                    case 7:
                        alert(res.m);
                        return _context.abrupt('return', false);

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
/**
 * 取得LineToken並登入
 * @param lineUuid
 */
function getLineTokenAndLogin(lineUuid) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _post.sendRequest)('igas/consumerapp/getLineTokenAndLogin', {
                            d: {},
                            uuid: '',
                            line_uuid: lineUuid
                        });

                    case 2:
                        res = _context2.sent;

                        if (!(res.c == '200')) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', {
                            uuid: res.d.uuid,
                            type: res.d.type,
                            blacklist: res.d.blacklist,
                            addressStatus: res.d.addressStatus,
                            checkOutType: res.d.checkOutType,
                            city: res.d.city,
                            area: res.d.area,
                            storefront: res.d.storefront,
                            address: res.d.address,
                            userName: res.d.userName
                        });

                    case 7:
                        alert(res.m);

                    case 8:
                        return _context2.abrupt('return', null);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
/** 註冊會員並新增LineToken */
function registerMemberAndLineToken(params) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return (0, _post.sendRequest)('igas/consumerapp/registertMemberAndLineToken', {
                            uuid: '',
                            d: {
                                line_uuid: params.lineUuid,
                                account: params.account,
                                name: params.name,
                                email: params.email,
                                otp_code: params.otpCode,
                                device_id: 'line_' + params.lineUuid,
                                device_type: '6'
                            }
                        });

                    case 2:
                        res = _context3.sent;

                        if (res.c == '200') {
                            //導頁
                        } else {
                            alert(res.m);
                        }

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
}

},{"../post/post.func":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RequestOtpType = exports.RequestOtpType = undefined;
(function (RequestOtpType) {
  /**
   * 1.登入
   */
  RequestOtpType["SignIn"] = "1";
  /**
   * 2.註冊
   */
  RequestOtpType["SignUp"] = "2"; //註冊
})(RequestOtpType || (exports.RequestOtpType = RequestOtpType = {}));

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendRequest = sendRequest;
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var host = 'http://api.gastom.com.tw:48080/';
function sendRequest(url, content) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return fetch(host + url, {
                            method: 'POST',
                            body: JSON.stringify(content),
                            headers: { 'Content-Type': 'application/json' }
                        });

                    case 3:
                        response = _context.sent;

                        if (response.ok) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error(response.statusText);

                    case 6:
                        _context.next = 8;
                        return response.json();

                    case 8:
                        body = _context.sent;
                        return _context.abrupt('return', body);

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](0);
                        throw _context.t0;

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 12]]);
    }));
}

},{}]},{},[2]);
