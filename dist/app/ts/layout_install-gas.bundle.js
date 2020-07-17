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

Object.defineProperty(exports, "__esModule", {
    value: true
});
var numberWithCommas = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
//* 總金額初始化
var initialDepositEl = document.querySelector('.install-gas--deposit-price');
var totalPrice = document.querySelector('.install-price--total-price-value');
var defaultDepositPriceEl = document.querySelector('.gas-deposit--price');
var defaultGasPriceEl = document.querySelector('.gas-price--price');
var defaultInstallPriceEl = document.querySelector('.gas-installation--price');
var defaultDepositPriceList = document.querySelector('.install-price--deposit-price');
var defaultGasPriceList = document.querySelector('.install-price--gas-price');
var defaultInstallPriceList = document.querySelector('.install-price--installation-price');
var descriptionPriceEl = document.querySelector('.detail-description__deposit span');
//TODO Get value from API function
var depositPriceValue = 1900;
var gasPriceValue = 900;
var installationPriceValue = 1900;
//* 設定最初金額
var setInitalPrice = exports.setInitalPrice = function setInitalPrice() {
    defaultDepositPriceEl.innerHTML = '$' + numberWithCommas(depositPriceValue);
    defaultDepositPriceList.innerHTML = '$' + numberWithCommas(depositPriceValue);
    defaultGasPriceEl.innerHTML = '$' + numberWithCommas(gasPriceValue);
    defaultGasPriceList.innerHTML = '$' + numberWithCommas(gasPriceValue);
    defaultInstallPriceEl.innerHTML = '$' + numberWithCommas(installationPriceValue);
    defaultInstallPriceList.innerHTML = '$' + numberWithCommas(installationPriceValue);
    descriptionPriceEl.innerHTML = '$' + numberWithCommas(depositPriceValue);
    var initialDepositPriceVal = depositPriceValue;
    var initialInstallationPriceVal = installationPriceValue;
    var initialGasPriceVal = gasPriceValue;
    if (initialDepositEl.classList.contains('no-deposit')) {
        totalPrice.innerHTML = '$' + (initialInstallationPriceVal + initialGasPriceVal).toString();
    } else {
        totalPrice.innerHTML = '$' + (initialDepositPriceVal + initialInstallationPriceVal + initialGasPriceVal).toString();
    }
};
//* 加減安裝包數量並計算金額
var installValueEl = document.querySelector('#installValue');
var installationQuantity = document.querySelector('.install-price--installation-quantity');
var gasQuantity = document.querySelector('.install-price--gas-quantity');
var depositQuantity = document.querySelector('.install-price--deposit-quantity');
var priceChange = exports.priceChange = function priceChange(type) {
    var installValue = +installValueEl.value;
    if (type === 'dec') {
        if (installValue !== 1) {
            installValue--;
            installationQuantity.innerHTML = installValue.toString();
            installValueEl.value = installValue.toString();
            defaultInstallPriceList.innerHTML = '$' + (installationPriceValue * installValue).toString();
            gasQuantity.innerHTML = installValue.toString();
            defaultGasPriceList.innerHTML = '$' + (gasPriceValue * installValue).toString();
            if (initialDepositEl.classList.contains('no-deposit')) {
                totalPrice.innerHTML = '$' + (installationPriceValue * installValue + gasPriceValue * installValue).toString();
            } else {
                depositQuantity.innerHTML = installValue.toString();
                defaultDepositPriceList.innerHTML = '$' + (depositPriceValue * installValue).toString();
                totalPrice.innerHTML = '$' + (installationPriceValue * installValue + gasPriceValue * installValue + depositPriceValue * installValue).toString();
            }
        }
    }
    if (type === 'inc') {
        installValue++;
        installValueEl.value = installValue.toString();
        installationQuantity.innerHTML = installValue.toString();
        defaultInstallPriceList.innerHTML = '$' + (installationPriceValue * installValue).toString();
        gasQuantity.innerHTML = installValue.toString();
        defaultGasPriceList.innerHTML = '$' + (gasPriceValue * installValue).toString();
        if (initialDepositEl.classList.contains('no-deposit')) {
            totalPrice.innerHTML = '$' + (installationPriceValue * installValue + gasPriceValue * installValue).toString();
        } else {
            depositQuantity.innerHTML = installValue.toString();
            defaultDepositPriceList.innerHTML = '$' + (depositPriceValue * installValue).toString();
            totalPrice.innerHTML = '$' + (installationPriceValue * installValue + gasPriceValue * installValue + depositPriceValue * installValue).toString();
        }
    }
};

},{}],3:[function(require,module,exports){
'use strict';

var _func = require('./global/func');

var _func2 = require('./install-gas/func');

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.back-button')) {
        (0, _func.goBack)('.back-button');
    }
    //* 判斷是否有壓桶
    var isFirstTime = false;
    var installGasTop = document.querySelector('.install-gas--gas-top');
    var depositIconElement = document.querySelector('.gas-deposit');
    var depositPriceElement = document.querySelector('.install-gas--deposit-price');
    var rentalNewGasQuantity = document.querySelector('.gas-rental--quantity');
    if (!isFirstTime) {
        installGasTop.classList.add('install-gas--gas-top__no-deposit');
        depositIconElement.classList.add('no-deposit');
        depositPriceElement.classList.add('no-deposit');
        rentalNewGasQuantity.innerHTML = '購買新桶數';
    }
    //* 金額初始化
    (0, _func2.setInitalPrice)();
    //* 金額計算
    var installIncBtn = document.querySelector('#installIncBtn');
    var installDecBtn = document.querySelector('#installDecBtn');
    installDecBtn.addEventListener('click', function () {
        (0, _func2.priceChange)('dec');
    });
    installIncBtn.addEventListener('click', function () {
        (0, _func2.priceChange)('inc');
    });
    //* 說明slidedown
    var depositDescriptionTarget = document.querySelector('.install-gas--detail-description__deposit');
    var installDescriptionTarget = document.querySelector('.install-gas--detail-description__install');
    var depositDescription = document.querySelector('.detail-description__deposit');
    var installDescription = document.querySelector('.detail-description__install');
    depositDescriptionTarget.addEventListener('click', function () {
        this.classList.toggle('description__show');
        (0, _func.toggleSlide)(depositDescription);
    });
    installDescriptionTarget.addEventListener('click', function () {
        this.classList.toggle('description__show');
        (0, _func.toggleSlide)(installDescription);
    });
    //* 註解
    var commentsBtn = document.querySelector('.install-gas--comments-btn');
    var commentsElement = document.querySelector('.comments-overlay');
    var commentsCancelBtn = document.querySelector('.comments--cancel button');
    var commentsConfirmBtn = document.querySelector('.comments--confirm button');
    var commentsValue = document.querySelector('.comments--textarea textarea');
    var commentsText = document.querySelector('.install-gas--comments');
    commentsBtn.addEventListener('click', function () {
        commentsElement.style.display = 'flex';
    });
    commentsCancelBtn.addEventListener('click', function () {
        commentsValue.value = '';
        commentsElement.style.display = 'none';
    });
    commentsConfirmBtn.addEventListener('click', function () {
        var comment = commentsValue.value;
        commentsText.innerHTML = '*\u5099\u8A3B:\n' + comment;
        commentsElement.style.display = 'none';
    });
    //*
    var totalGasInstallAmount = document.querySelector('#installValue');
    var totalGasInstallPrice = document.querySelector('.install-price--total-price-value');
    var totalGasInstall = {
        noOfGas: 0,
        price: 0,
        isFirstTime: isFirstTime
    };
    var confirmInstallGas = document.querySelector('.install-gas--confirm a');
    confirmInstallGas.addEventListener('click', function () {
        var totalGasInstallPriceNum = totalGasInstallPrice.innerHTML.split('$')[1];
        totalGasInstall.noOfGas = +totalGasInstallAmount.value;
        totalGasInstall.price = +totalGasInstallPriceNum;
        console.log(totalGasInstall);
    });
});

},{"./global/func":1,"./install-gas/func":2}]},{},[3]);
