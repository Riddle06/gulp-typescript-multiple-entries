import { goBack } from './global/func.js';
import { User } from './signup/interface.js';
import {
  addCityOptions,
  // addDefaultCountyOptions,
  emptyList,
  populateList,
  addErrorMsg,
  userAddressConcat,
  radioCheck,
} from './signup/func.js';

document.addEventListener('DOMContentLoaded', () => {
  goBack('.back-button');

  //! Dummy data
  //TODO Get value from API function
  const city = [
    {
      city: 'taipei',
      county: ['T', 'd'],
    },
    {
      city: 'touyuan',
      county: ['s', 'a'],
    },
  ];

  const citySelect = document.querySelector('.signupCity') as HTMLSelectElement;
  const countySelect = document.querySelector('.signupCounty') as HTMLSelectElement;
  const cityOptions = (<HTMLSelectElement>document.querySelector('.signupCity')).options;
  // const countyOptions = (<HTMLSelectElement>document.querySelector('.signupCounty')).options
  const initialCityOption = new Option('選擇縣市', '', false);
  const initialCountyOption = new Option('選擇 /鎮/市/區', '', false);
  const roadName = document.querySelector('.signupRoadName') as HTMLInputElement;
  const roadSelect = document.querySelector('.signupRoadSelect') as HTMLSelectElement;
  const confirmBtn = document.querySelector('#confirmAddress') as HTMLInputElement;

  let userAddress: User = {
    city: '',
    county: '',
    address: '',
    hasElevator: false,
  };

  //* 初始化設定縣市區域 option lists
  citySelect.insertBefore(initialCityOption, citySelect.firstChild);
  citySelect.options[0].disabled = true;
  countySelect.insertBefore(initialCountyOption, countySelect.firstChild);
  countySelect.options[0].disabled = true;

  //* 填入縣市
  addCityOptions(city, cityOptions);
  // addDefaultCountyOptions(city, countyOptions)

  //* 根據縣市切換區域 option list
  document.querySelector('.signupCity')!.addEventListener('change', (e) => {
    let selectValue = (<HTMLInputElement>e.target).value;
    let filteredCountyArray: string[] = [];
    const filterCounty = city.filter((el) => {
      return el.city === selectValue;
    });
    filterCounty[0].county.forEach((el) => {
      filteredCountyArray.push(el);
      populateList(
        emptyList(<HTMLSelectElement>document.querySelector('.signupCounty')!),
        filteredCountyArray
      );
      countySelect.insertBefore(initialCountyOption, countySelect.firstChild);
      countySelect.options[0].disabled = true;
    });
  });

  //* 若未選縣市區域顯示 error message
  addErrorMsg(citySelect, countySelect, roadName, roadSelect, confirmBtn);

  //* 把資料存成 object

  confirmBtn.addEventListener('click', () => {
    const fullAddress = userAddressConcat(
      '.signupRoadName',
      '.signupRoadSelect',
      '.signupRoadSection',
      '.signupRoadAlley',
      '.signupRoadSubAlley',
      '.signupRoadNumber',
      '.signupRoadFloor',
      '.signupRoadRoom'
    );
    const checkElevator = radioCheck('input[name="elevatorInput"]:checked', 'hasElevator');
    userAddress.city = citySelect.value;
    userAddress.county = countySelect.value;
    userAddress.address = fullAddress;
    userAddress.hasElevator = checkElevator;
    console.log(userAddress);
  });
});
