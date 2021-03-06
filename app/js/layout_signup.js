import { goBack } from './global/func';
import { inputPlaceholder, ValidateForm, radioCheck } from './signup/func.js';
document.addEventListener('DOMContentLoaded', () => {
    goBack('.back-button');
    //* 隱藏 Email placeholder on input
    const signupEmailEl = document.querySelector('#signupEmail');
    const signupEmailButtonConfirm = document.querySelector('#signupEmailBtn');
    if (signupEmailEl) {
        inputPlaceholder(signupEmailEl, '.signup--form__input label');
    }
    //* 驗證 Email 格式
    if (signupEmailButtonConfirm) {
        signupEmailButtonConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            ValidateForm(signupEmailEl);
            //TODO Send to API function
            const signupEmailValue = signupEmailEl.value;
            console.log(signupEmailValue);
        });
    }
    //* 隱藏 Email placeholder on input
    const signupNameEl = document.querySelector('#signupName');
    if (signupNameEl) {
        inputPlaceholder(signupNameEl, '.signup--form__input label');
    }
    //* 驗證姓名格式
    const signupNameButtonConfirm = document.querySelector('#signupNameBtn');
    if (signupNameButtonConfirm) {
        signupNameButtonConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupNameEl.value === '') {
                alert('請輸入姓名');
            }
            //TODO Send to API function
            const signupNameValue = signupNameEl.value;
            console.log(signupNameValue);
        });
    }
    //* 驗證電話格式
    const signupTelButton = document.querySelector('#signupTel');
    const signupTelButtonConfirm = document.querySelector('#signupTelBtn');
    if (signupTelButtonConfirm) {
        signupTelButtonConfirm.addEventListener('click', (e) => {
            let phoneNUmber;
            e.preventDefault();
            if (signupTelButton.value === '') {
                alert('請輸入電話');
            }
            phoneNUmber = signupTelButton.value.replace(/^/, '09');
            //TODO Send to API function
            console.log(phoneNUmber);
        });
    }
    //* 驗證碼格式
    const signupVarificationEl = document.querySelector('#signupVarification');
    const signupVarificationButtonConfirm = document.querySelector('#signupVarificationBtn');
    if (signupVarificationButtonConfirm) {
        signupVarificationButtonConfirm.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupVarificationEl.value === '') {
                alert('請重新輸入驗證碼');
            }
            //TODO Send to API function
            const signupVarificationValue = signupVarificationEl.value;
            console.log(signupVarificationValue);
        });
    }
    //* 服務條款
    const agreeBtn = document.querySelector('#policyAgreeBtn');
    const policyValidationCheckbox = document.querySelector('#policyAgreeCheckbox');
    if (agreeBtn) {
        policyValidationCheckbox.addEventListener('change', () => {
            if (policyValidationCheckbox.checked) {
                agreeBtn.classList.remove('disabled');
                agreeBtn.setAttribute('href', 'tutorial1.html');
            }
            else {
                agreeBtn.classList.add('disabled');
                agreeBtn.removeAttribute('href');
            }
        });
        agreeBtn.removeAttribute('href');
    }
    //* 是否有瓦斯桶
    const checkExistingGas = document.querySelector('#signupCheckGas');
    checkExistingGas.addEventListener('click', () => {
        const existingGasValue = radioCheck('input[name="checkGas"]:checked', 'hasGas');
        //TODO Send to API function
        console.log(existingGasValue);
    });
});
