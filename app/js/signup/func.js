//* 註冊 Placeholder 位置
export const inputPlaceholder = (el, placeholderEl) => {
    el.addEventListener('keyup', (e) => {
        const placeholder = document.querySelector(placeholderEl);
        let op = 1;
        if (e.target.value !== '') {
            const timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    placeholder.style.display = 'none';
                }
                placeholder.style.opacity = op.toString();
                placeholder.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op -= op * 0.1;
            }, 5);
        }
        else {
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
export const ValidateForm = (el) => {
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (el.value.match(mailformat)) {
        el.focus();
        return true;
    }
    else {
        alert('請填入正確Email');
        el.focus();
        return false;
    }
};
//* 縣市區域 Select
export const addCityOptions = (arrData, el) => {
    arrData.forEach((city) => el.add(new Option(city.city, city.city)));
};
export const addDefaultCountyOptions = (arrData, el) => {
    arrData[0].county.forEach((city) => el.add(new Option(city, city)));
};
//* 清區域 Option lists 並且加上新 Option lists
export const emptyList = (selectEl) => {
    selectEl.options.length = 0;
    return selectEl;
};
export const populateList = (selectEl, items) => {
    return appendChildren(selectEl, items.map((item) => new Option(item, item)));
};
function appendChildren(el, children) {
    children.forEach((child) => el.appendChild(child));
    return el;
}
//* 驗證縣市區域 Select 是否有選
const addErrorFunc = (elSelect) => {
    if (elSelect.value === '') {
        elSelect.parentElement.querySelector('p').style.display = 'block';
        elSelect.style.borderColor = 'red';
    }
    else {
        elSelect.parentElement.querySelector('p').style.display = 'none';
        elSelect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
};
//* 驗證地址是否有填
const addRoadError = (roadEl, roadSelect) => {
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
export const addErrorMsg = (cityS, countyS, roadName, roadSelect, confirmBtn) => {
    confirmBtn.addEventListener('click', () => {
        addErrorFunc(cityS);
        if (cityS.value !== '') {
            addErrorFunc(countyS);
        }
        addRoadError(roadName, roadSelect);
    });
};
//* 連結地址字串
export const userAddressConcat = (el1, el2, el3, el4, el5, el6, el7, el8) => {
    const roadName = document.querySelector(el1).value;
    const roadSelect = document.querySelector(el2).value;
    let roadSection = document.querySelector(el3).value;
    if (roadSection) {
        roadSection = roadSection + '段';
    }
    let signupRoadAlley = document.querySelector(el4).value;
    if (signupRoadAlley) {
        signupRoadAlley = signupRoadAlley + '巷';
    }
    let signupRoadSubAlley = document.querySelector(el5).value;
    if (signupRoadSubAlley) {
        signupRoadSubAlley = signupRoadSubAlley + '弄';
    }
    let signupRoadNumber = document.querySelector(el6).value;
    if (signupRoadNumber) {
        signupRoadNumber = signupRoadNumber + '號';
    }
    let signupRoadFloor = document.querySelector(el7).value;
    if (signupRoadFloor) {
        signupRoadFloor = signupRoadFloor + '樓';
    }
    let signupRoadRoom = document.querySelector(el8).value;
    if (signupRoadRoom) {
        signupRoadRoom = '之' + signupRoadRoom;
    }
    const fullAddress = roadName +
        roadSelect +
        roadSection +
        signupRoadAlley +
        signupRoadSubAlley +
        signupRoadNumber +
        signupRoadFloor +
        signupRoadRoom;
    return fullAddress;
};
//* 判斷 Radio button
export const radioCheck = (el, condition) => {
    const targetEl = document.querySelector(el);
    if (targetEl.value === condition) {
        return true;
    }
    return false;
};
