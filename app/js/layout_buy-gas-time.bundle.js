(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var validateDelivery = exports.validateDelivery = function validateDelivery(time, delivery, confirmBtn) {
    if (time && delivery) {
        confirmBtn.setAttribute('href', '#');
        confirmBtn.classList.remove('disabled');
        confirmBtn.innerHTML = '確認時段並需將瓦斯桶放置門外';
    } else {
        confirmBtn.removeAttribute('href');
        confirmBtn.classList.add('disabled');
        confirmBtn.innerHTML = '確認時段';
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

var _func2 = require('./buy-gas-select-time/func');

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.back-button')) {
        (0, _func.goBack)('.back-button');
    }
    var deliveryTimeEl = document.querySelector('.buy-gas--delivery-date input');
    var deliveryMethodEl = document.querySelector('input[name="deliveryMethod"]:checked');
    var confirmDelivery = document.querySelector('.buy-gas--confirm-delivery-time a');
    var deliveryMethods = document.querySelectorAll('input[name="deliveryMethod"]');
    //* 更新選擇時間 value
    deliveryTimeEl.addEventListener('change', function () {
        var time = deliveryTimeEl.value;
        var deliveryMethod = deliveryMethodEl.value;
        console.log(time, deliveryMethod);
        (0, _func2.validateDelivery)(time, deliveryMethod, confirmDelivery);
    });
    //* 更新配送方式
    deliveryMethods.forEach(function (delivery) {
        delivery.addEventListener('change', function () {
            var time = deliveryTimeEl.value;
            (0, _func2.validateDelivery)(time, this.value, confirmDelivery);
        });
    });
    var delivery = {
        time: '',
        date: '',
        method: ''
    };
    //* 確認配送日期和方式
    confirmDelivery.addEventListener('click', function (e) {
        e.preventDefault();
        var deliveryMethodEl = document.querySelector('input[name="deliveryMethod"]:checked');
        delivery = {
            time: deliveryTimeEl.value.split(' ')[1] + deliveryTimeEl.value.split(' ')[2] + deliveryTimeEl.value.split(' ')[3],
            date: deliveryTimeEl.value.split(' ')[0],
            method: deliveryMethodEl.value
        };
        console.log(delivery);
    });
});

},{"./buy-gas-select-time/func":1,"./global/func":2}]},{},[3]);
