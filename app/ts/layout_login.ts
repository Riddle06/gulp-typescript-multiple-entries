import { goBack } from './global/func.js';
import { getLineTokenAndLogin, requestOtp } from './src/login/login.func.js';
import { RequestOtpType } from './src/login/login.interface.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.back-button')) {
    goBack('.back-button');
  }
  const login = async () => {
    const loginTest = await getLineTokenAndLogin('test123');
    const testObj = {
      phone: 987654321,
      type: RequestOtpType.SignIn,
    };
    const otp = await requestOtp(testObj);
    console.log(loginTest);
    console.log(otp);
  };
  login();
  //* 登入 - 輸入手機
  const loginTelBtn = document.querySelector('#loginTelBtn')! as HTMLButtonElement;
  const loginTelInput = document.querySelector('#loginTel')! as HTMLInputElement;

  if (loginTelBtn) {
    loginTelBtn.addEventListener('click', (e) => {
      let phoneNumber;
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
  const loginVarificationInput = document.querySelector(
    '#loginVarificationInput'
  )! as HTMLInputElement;
  const loginVarificationBtn = document.querySelector(
    '#loginVarificationBtn'
  )! as HTMLButtonElement;

  if (loginVarificationBtn) {
    loginVarificationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginVarificationInput.value === '') {
        alert('請重新輸入驗證碼');
      }
      const varificationValue = loginVarificationInput.value;
      //TODO Send to API function
      console.log(varificationValue);
    });
  }
});
