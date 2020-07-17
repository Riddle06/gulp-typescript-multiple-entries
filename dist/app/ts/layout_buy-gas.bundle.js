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

document.addEventListener('DOMContentLoaded', function () {
    (0, _func.menuTransition)('.left-menu-btn', '.menu', 'left');
    (0, _func.menuTransition)('.cube', '.right-menu', 'right');
    var buyGasInputValue = document.querySelector('#buyGasInputValue');
    var buyGasInputDecBtn = document.querySelector('#buyGasInputDecBtn');
    var buyGasInputIncBtn = document.querySelector('#buyGasInputIncBtn');
    var buyGasPriceCount = document.querySelector('.price-count--confirm');
    var buyGasPrice = document.querySelector('.price-count--confirm__total');
    var buyGasInitialPrice = document.querySelector('.special-can--price');
    //TODO Get value from API function
    var fixedPrice = 606;
    //* 初始化價錢
    buyGasInitialPrice.innerHTML = '$' + fixedPrice;
    //* 顯示金額
    var showPrice = function showPrice() {
        if (checkGasValue > 0) {
            buyGasPriceCount.classList.add('price-count--confirm__show');
        } else {
            buyGasPriceCount.classList.remove('price-count--confirm__show');
        }
    };
    //* 選則瓦斯桶數量
    var checkGasValue = +buyGasInputValue.value;
    var totalPrice = void 0;
    buyGasInputDecBtn.addEventListener('click', function () {
        if (checkGasValue !== 0) {
            checkGasValue--;
        }
        totalPrice = fixedPrice * checkGasValue;
        buyGasPrice.innerHTML = '$' + totalPrice;
        showPrice();
        buyGasInputValue.value = checkGasValue.toString();
        console.log(checkGasValue);
    });
    buyGasInputIncBtn.addEventListener('click', function () {
        checkGasValue++;
        buyGasInputValue.value = checkGasValue.toString();
        totalPrice = fixedPrice * checkGasValue;
        buyGasPrice.innerHTML = '$' + totalPrice;
        showPrice();
        console.log(checkGasValue);
    });
});

},{"./global/func":1}]},{},[2]);
