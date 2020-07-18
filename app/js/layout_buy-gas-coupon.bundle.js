(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var existingGasExchangeBtn = document.querySelector('.existing-gas--exchange-btn button');
var existingGasExchangeText = document.querySelector('.existing-gas--gas-text');
var existingGasExchangeSize = document.querySelector('.existing-gas--gas-size');
var couponExchangeBtn = document.querySelector('.exchange-coupon--exchange-btn button');
var couponExchangeText = document.querySelector('.exchange-coupon--quantity-text');
var couponExchangeSize = document.querySelector('.exchange-coupon--quantity');
var confirmExchangeBtn = document.querySelector('.buy-gas-exchange--no-exchange button');
//TODO Get value from API function
var gasSize = 55;
var couponLength = 3;
var initialGasSize = document.querySelector('.existing-gas--gas-size');
var initialCouponLength = document.querySelector('.exchange-coupon--quantity');
var initialDefault = exports.initialDefault = function initialDefault() {
    initialGasSize.innerHTML = gasSize + " kg";
    initialCouponLength.innerHTML = couponLength.toString();
};
var gasExchange = false;
//* 兌換確認按鈕變化
var confirmExchange = function confirmExchange(exchange) {
    if (exchange) {
        confirmExchangeBtn.classList.add('confirm-exchange');
        confirmExchangeBtn.innerHTML = '確認並下一步';
    } else {
        confirmExchangeBtn.classList.remove('confirm-exchange');
        confirmExchangeBtn.innerHTML = '暫時不兌換並下一步';
    }
};
//* 存氣桶
var exchangeFunc = exports.exchangeFunc = function exchangeFunc(bodyTarget) {
    bodyTarget.classList.toggle('existing-gas__cancel');
    existingGasExchangeBtn.classList.toggle('cancel-existing-gas');
    existingGasExchangeBtn.innerHTML = '取消兌換';
    existingGasExchangeText.innerHTML = '以選擇兌換';
    existingGasExchangeSize.innerHTML = '1 桶';
    gasExchange = !gasExchange;
    confirmExchange(gasExchange);
    if (!gasExchange) {
        existingGasExchangeBtn.innerHTML = '兌換一次';
        existingGasExchangeText.innerHTML = '現有存氣';
        existingGasExchangeSize.innerHTML = gasSize + " kg";
    }
    return gasExchange;
};
//TODO Get value from API function
var coupon = 'test';
var couponExchangeFunc = exports.couponExchangeFunc = function couponExchangeFunc(bodyTarget, couponExchange) {
    if (couponExchange) {
        bodyTarget.classList.add('existing-gas__cancel');
        couponExchangeBtn.classList.add('cancel-existing-gas');
        couponExchangeBtn.innerHTML = '取消選擇';
        couponExchangeText.innerHTML = '已選擇了優惠券';
        couponExchangeSize.innerHTML = '1 張';
        confirmExchange(couponExchange);
        return coupon;
    } else {
        bodyTarget.classList.remove('existing-gas__cancel');
        couponExchangeBtn.classList.remove('cancel-existing-gas');
        couponExchangeBtn.innerHTML = '請選擇';
        couponExchangeText.innerHTML = '現有優惠券';
        couponExchangeSize.innerHTML = couponLength.toString();
        confirmExchange(couponExchange);
        coupon = '';
        return coupon;
    }
};

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _func = require('./global/func');

var _func2 = require('./buy-gas-coupon/func');

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.back-button')) {
        (0, _func.goBack)('.back-button');
    }
    //* 存氣兌換
    var existingGasContainer = document.querySelector('.existing-gas');
    var couponContainer = document.querySelector('.exchange-coupon');
    var existingGasExchangeBtn = document.querySelector('.existing-gas--exchange-btn button');
    var couponExchangeBtn = document.querySelector('.exchange-coupon--exchange-btn button');
    var confirmExchangeBtn = document.querySelector('.buy-gas-exchange--no-exchange');
    var gasCoupon = {
        exchangeGas: false,
        exchangeCoupon: ''
    };
    (0, _func2.initialDefault)();
    existingGasExchangeBtn.addEventListener('click', function () {
        return (0, _func2.exchangeFunc)(existingGasContainer);
    });
    couponExchangeBtn.addEventListener('click', function () {
        return (0, _func2.couponExchangeFunc)(couponContainer, false);
    });
    (0, _func2.couponExchangeFunc)(couponContainer, true);
    confirmExchangeBtn.addEventListener('click', function () {
        var confirmGas = (0, _func2.exchangeFunc)(existingGasContainer);
        var confirmCoupon = (0, _func2.couponExchangeFunc)(couponContainer, true);
        gasCoupon.exchangeGas = confirmGas;
        gasCoupon.exchangeCoupon = confirmCoupon;
        console.log(gasCoupon);
    });
});

},{"./buy-gas-coupon/func":1,"./global/func":2}]},{},[3]);
