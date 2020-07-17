var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { goBack } from './global/func';
import { getLineTokenAndLogin, requestOtp } from './src/login/login.func.js';
import { RequestOtpType } from './src/login/login.interface.js';
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.back-button')) {
        goBack('.back-button');
    }
    const login = () => __awaiter(void 0, void 0, void 0, function* () {
        const loginTest = yield getLineTokenAndLogin('test123');
        const testObj = {
            phone: 987654321,
            type: RequestOtpType.SignIn,
        };
        const otp = yield requestOtp(testObj);
        console.log(loginTest);
        console.log(otp);
    });
    login();
    //* 登入 - 輸入手機
    const loginTelBtn = document.querySelector('#loginTelBtn');
    const loginTelInput = document.querySelector('#loginTel');
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
    const loginVarificationInput = document.querySelector('#loginVarificationInput');
    const loginVarificationBtn = document.querySelector('#loginVarificationBtn');
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
