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

var _func2 = require('./signup/func');

document.addEventListener('DOMContentLoaded', function () {
    (0, _func.goBack)('.back-button');
    //! Dummy data
    //TODO Get value from API function
    var city = [{
        city: 'taipei',
        county: ['T', 'd']
    }, {
        city: 'touyuan',
        county: ['s', 'a']
    }];
    var citySelect = document.querySelector('.signupCity');
    var countySelect = document.querySelector('.signupCounty');
    var cityOptions = document.querySelector('.signupCity').options;
    // const countyOptions = (<HTMLSelectElement>document.querySelector('.signupCounty')).options
    var initialCityOption = new Option('選擇縣市', '', false);
    var initialCountyOption = new Option('選擇 /鎮/市/區', '', false);
    var roadName = document.querySelector('.signupRoadName');
    var roadSelect = document.querySelector('.signupRoadSelect');
    var confirmBtn = document.querySelector('#confirmAddress');
    var userAddress = {
        city: '',
        county: '',
        address: '',
        hasElevator: false
    };
    //* 初始化設定縣市區域 option lists
    citySelect.insertBefore(initialCityOption, citySelect.firstChild);
    citySelect.options[0].disabled = true;
    countySelect.insertBefore(initialCountyOption, countySelect.firstChild);
    countySelect.options[0].disabled = true;
    //* 填入縣市
    (0, _func2.addCityOptions)(city, cityOptions);
    // addDefaultCountyOptions(city, countyOptions)
    //* 根據縣市切換區域 option list
    document.querySelector('.signupCity').addEventListener('change', function (e) {
        var selectValue = e.target.value;
        var filteredCountyArray = [];
        var filterCounty = city.filter(function (el) {
            return el.city === selectValue;
        });
        filterCounty[0].county.forEach(function (el) {
            filteredCountyArray.push(el);
            (0, _func2.populateList)((0, _func2.emptyList)(document.querySelector('.signupCounty')), filteredCountyArray);
            countySelect.insertBefore(initialCountyOption, countySelect.firstChild);
            countySelect.options[0].disabled = true;
        });
    });
    //* 若未選縣市區域顯示 error message
    (0, _func2.addErrorMsg)(citySelect, countySelect, roadName, roadSelect, confirmBtn);
    //* 把資料存成 object
    confirmBtn.addEventListener('click', function () {
        var fullAddress = (0, _func2.userAddressConcat)('.signupRoadName', '.signupRoadSelect', '.signupRoadSection', '.signupRoadAlley', '.signupRoadSubAlley', '.signupRoadNumber', '.signupRoadFloor', '.signupRoadRoom');
        var checkElevator = (0, _func2.radioCheck)('input[name="elevatorInput"]:checked', 'hasElevator');
        userAddress.city = citySelect.value;
        userAddress.county = countySelect.value;
        userAddress.address = fullAddress;
        userAddress.hasElevator = checkElevator;
        console.log(userAddress);
    });
});

},{"./global/func":1,"./signup/func":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//* 註冊 Placeholder 位置
var inputPlaceholder = exports.inputPlaceholder = function inputPlaceholder(el, placeholderEl) {
    el.addEventListener('keyup', function (e) {
        var placeholder = document.querySelector(placeholderEl);
        var op = 1;
        if (e.target.value !== '') {
            var _timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(_timer);
                    placeholder.style.display = 'none';
                }
                placeholder.style.opacity = op.toString();
                placeholder.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op -= op * 0.1;
            }, 5);
        } else {
            placeholder.style.display = 'block';
            var timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                }
                placeholder.style.opacity = op.toString();
                placeholder.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op += op * 0.1;
            }, 50);
        }
    });
};
//* 驗證 Email 格式
var ValidateForm = exports.ValidateForm = function ValidateForm(el) {
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (el.value.match(mailformat)) {
        el.focus();
        return true;
    } else {
        alert('請填入正確Email');
        el.focus();
        return false;
    }
};
//* 縣市區域 Select
var addCityOptions = exports.addCityOptions = function addCityOptions(arrData, el) {
    arrData.forEach(function (city) {
        return el.add(new Option(city.city, city.city));
    });
};
var addDefaultCountyOptions = exports.addDefaultCountyOptions = function addDefaultCountyOptions(arrData, el) {
    arrData[0].county.forEach(function (city) {
        return el.add(new Option(city, city));
    });
};
//* 清區域 Option lists 並且加上新 Option lists
var emptyList = exports.emptyList = function emptyList(selectEl) {
    selectEl.options.length = 0;
    return selectEl;
};
var populateList = exports.populateList = function populateList(selectEl, items) {
    return appendChildren(selectEl, items.map(function (item) {
        return new Option(item, item);
    }));
};
function appendChildren(el, children) {
    children.forEach(function (child) {
        return el.appendChild(child);
    });
    return el;
}
//* 驗證縣市區域 Select 是否有選
var addErrorFunc = function addErrorFunc(elSelect) {
    if (elSelect.value === '') {
        elSelect.parentElement.querySelector('p').style.display = 'block';
        elSelect.style.borderColor = 'red';
    } else {
        elSelect.parentElement.querySelector('p').style.display = 'none';
        elSelect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
};
//* 驗證地址是否有填
var addRoadError = function addRoadError(roadEl, roadSelect) {
    if (roadEl.value === '') {
        document.querySelector('.error-message__road').style.display = 'block';
        roadEl.style.borderColor = 'red';
    }
    if (roadSelect.value === '') {
        document.querySelector('.error-message__road').style.display = 'block';
        roadSelect.style.borderColor = 'red';
    }
    if (roadEl.value !== '' && roadSelect.value !== '') {
        document.querySelector('.error-message__road').style.display = 'none';
        roadEl.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        roadSelect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
};
//* 顯示縣市區域地址錯誤訊息
var addErrorMsg = exports.addErrorMsg = function addErrorMsg(cityS, countyS, roadName, roadSelect, confirmBtn) {
    confirmBtn.addEventListener('click', function () {
        addErrorFunc(cityS);
        if (cityS.value !== '') {
            addErrorFunc(countyS);
        }
        addRoadError(roadName, roadSelect);
    });
};
//* 連結地址字串
var userAddressConcat = exports.userAddressConcat = function userAddressConcat(el1, el2, el3, el4, el5, el6, el7, el8) {
    var roadName = document.querySelector(el1).value;
    var roadSelect = document.querySelector(el2).value;
    var roadSection = document.querySelector(el3).value;
    if (roadSection) {
        roadSection = roadSection + '段';
    }
    var signupRoadAlley = document.querySelector(el4).value;
    if (signupRoadAlley) {
        signupRoadAlley = signupRoadAlley + '巷';
    }
    var signupRoadSubAlley = document.querySelector(el5).value;
    if (signupRoadSubAlley) {
        signupRoadSubAlley = signupRoadSubAlley + '弄';
    }
    var signupRoadNumber = document.querySelector(el6).value;
    if (signupRoadNumber) {
        signupRoadNumber = signupRoadNumber + '號';
    }
    var signupRoadFloor = document.querySelector(el7).value;
    if (signupRoadFloor) {
        signupRoadFloor = signupRoadFloor + '樓';
    }
    var signupRoadRoom = document.querySelector(el8).value;
    if (signupRoadRoom) {
        signupRoadRoom = '之' + signupRoadRoom;
    }
    var fullAddress = roadName + roadSelect + roadSection + signupRoadAlley + signupRoadSubAlley + signupRoadNumber + signupRoadFloor + signupRoadRoom;
    return fullAddress;
};
//* 判斷 Radio button
var radioCheck = exports.radioCheck = function radioCheck(el, condition) {
    var targetEl = document.querySelector(el);
    if (targetEl.value === condition) {
        return true;
    }
    return false;
};

},{}]},{},[2]);
