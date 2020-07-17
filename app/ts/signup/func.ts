import { City } from './interface.js';

//* 註冊 Placeholder 位置
export const inputPlaceholder = (el: HTMLElement, placeholderEl: string) => {
  el.addEventListener('keyup', (e) => {
    const placeholder = document.querySelector(placeholderEl);
    let op = 1;
    if ((<HTMLInputElement>e.target!).value !== '') {
      const timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          (<HTMLElement>placeholder!).style.display = 'none';
        }
        (<HTMLElement>placeholder!).style.opacity = op.toString();
        (<HTMLElement>placeholder!).style.filter = 'alpha(opacity=' + op * 100 + ')';
        op -= op * 0.1;
      }, 5);
    } else {
      (<HTMLElement>placeholder!).style.display = 'block';
      var timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
        }
        (<HTMLElement>placeholder!).style.opacity = op.toString();
        (<HTMLElement>placeholder!).style.filter = 'alpha(opacity=' + op * 100 + ')';
        op += op * 0.1;
      }, 50);
    }
  });
};

//* 驗證 Email 格式
export const ValidateForm = (el: HTMLInputElement) => {
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

export const addCityOptions = (arrData: Array<City>, el: HTMLOptionsCollection) => {
  arrData.forEach((city) => el.add(new Option(city.city, city.city)));
};
export const addDefaultCountyOptions = (arrData: Array<City>, el: HTMLOptionsCollection) => {
  arrData[0].county.forEach((city) => el.add(new Option(city, city)));
};

//* 清區域 Option lists 並且加上新 Option lists
export const emptyList = (selectEl: HTMLSelectElement) => {
  selectEl.options.length = 0;
  return selectEl;
};

export const populateList = (selectEl: HTMLSelectElement, items: Array<string>) => {
  return appendChildren(
    selectEl,
    items.map((item) => new Option(item, item))
  );
};

function appendChildren(el: HTMLSelectElement, children: HTMLOptionElement[]) {
  children.forEach((child) => el.appendChild(child));
  return el;
}

//* 驗證縣市區域 Select 是否有選
const addErrorFunc = (elSelect: HTMLSelectElement) => {
  if (elSelect.value === '') {
    elSelect.parentElement!.querySelector('p')!.style.display = 'block';
    elSelect.style.borderColor = 'red';
  } else {
    elSelect.parentElement!.querySelector('p')!.style.display = 'none';
    elSelect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  }
};

//* 驗證地址是否有填
const addRoadError = (roadEl: HTMLInputElement, roadSelect: HTMLSelectElement) => {
  if (roadEl.value === '') {
    (<HTMLElement>document.querySelector('.error-message__road')!).style.display = 'block';
    roadEl.style.borderColor = 'red';
  }
  if (roadSelect.value === '') {
    (<HTMLElement>document.querySelector('.error-message__road')!).style.display = 'block';
    roadSelect.style.borderColor = 'red';
  }
  if (roadEl.value !== '' && roadSelect.value !== '') {
    (<HTMLElement>document.querySelector('.error-message__road')!).style.display = 'none';
    roadEl.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    roadSelect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  }
};

//* 顯示縣市區域地址錯誤訊息
export const addErrorMsg = (
  cityS: HTMLSelectElement,
  countyS: HTMLSelectElement,
  roadName: HTMLInputElement,
  roadSelect: HTMLSelectElement,
  confirmBtn: HTMLElement
) => {
  confirmBtn.addEventListener('click', () => {
    addErrorFunc(cityS);
    if (cityS.value !== '') {
      addErrorFunc(countyS);
    }
    addRoadError(roadName, roadSelect);
  });
};

//* 連結地址字串
export const userAddressConcat = (
  el1: string,
  el2: string,
  el3: string,
  el4: string,
  el5: string,
  el6: string,
  el7: string,
  el8: string
) => {
  const roadName = (<HTMLInputElement>document.querySelector(el1)!).value;
  const roadSelect = (<HTMLInputElement>document.querySelector(el2)!).value;
  let roadSection = (<HTMLInputElement>document.querySelector(el3)!).value;
  if (roadSection) {
    roadSection = roadSection + '段';
  }
  let signupRoadAlley = (<HTMLInputElement>document.querySelector(el4)!).value;
  if (signupRoadAlley) {
    signupRoadAlley = signupRoadAlley + '巷';
  }
  let signupRoadSubAlley = (<HTMLInputElement>document.querySelector(el5)!).value;
  if (signupRoadSubAlley) {
    signupRoadSubAlley = signupRoadSubAlley + '弄';
  }
  let signupRoadNumber = (<HTMLInputElement>document.querySelector(el6)!).value;
  if (signupRoadNumber) {
    signupRoadNumber = signupRoadNumber + '號';
  }
  let signupRoadFloor = (<HTMLInputElement>document.querySelector(el7)!).value;
  if (signupRoadFloor) {
    signupRoadFloor = signupRoadFloor + '樓';
  }
  let signupRoadRoom = (<HTMLInputElement>document.querySelector(el8)!).value;
  if (signupRoadRoom) {
    signupRoadRoom = '之' + signupRoadRoom;
  }
  const fullAddress =
    roadName +
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
export const radioCheck = (el: string, condition: string) => {
  const targetEl = document.querySelector(el);
  if ((<HTMLInputElement>targetEl!).value === condition) {
    return true;
  }
  return false;
};
