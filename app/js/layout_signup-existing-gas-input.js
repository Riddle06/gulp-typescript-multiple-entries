import { goBack } from './global/func.js';
document.addEventListener('DOMContentLoaded', () => {
    goBack('.back-button');
    //* 判定免等會員或一般會員
    const normalExistingGas = document.querySelector('#signupGasInput');
    const specialExistingGas = document.querySelector('#signupGasSpecialInput');
    //* Popup
    const signupCheckGasPopupBtn = document.querySelector('#signupCheckGasPopup');
    const signupCheckGasPopup = document.querySelector('.signup__check-gas--popup');
    signupCheckGasPopupBtn.addEventListener('click', () => {
        signupCheckGasPopup.style.display = 'none';
    });
    //* 一般會員
    if (normalExistingGas) {
        //* 選則瓦斯桶數量
        const checkGasInputDecBtn = document.querySelector('#gasInputDecBtn');
        const checkGasInputIncBtn = document.querySelector('#gasInputIncBtn');
        const checkGasValueEl = document.querySelector('#gasInputValue');
        const signupInputGas = document.querySelector('#signupGasInput');
        let checkGasValue = +checkGasValueEl.value;
        checkGasInputDecBtn.addEventListener('click', () => {
            if (checkGasValue !== 0) {
                checkGasValue--;
            }
            checkGasValueEl.value = checkGasValue.toString();
        });
        checkGasInputIncBtn.addEventListener('click', () => {
            checkGasValue++;
            checkGasValueEl.value = checkGasValue.toString();
        });
        signupInputGas.addEventListener('click', () => {
            //TODO Send to API function
            console.log(checkGasValue);
        });
    }
    //* 免等會員
    if (specialExistingGas) {
        const inputs = document.querySelectorAll('input');
        Array.prototype.forEach.call(inputs, (input) => {
            input.addEventListener('change', function (e) {
                let fileName = e.target.value.split('\\').pop();
                this.nextElementSibling.innerHTML = fileName;
            });
        });
        const confirmBtn = document.querySelector('#signupGasSpecialInput');
        const imagesBase64Arr = [];
        const getBase64 = (event) => {
            let file = event.files[0];
            let reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
            }
            reader.onload = function () {
                imagesBase64Arr.push(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        };
        confirmBtn.addEventListener('click', () => {
            //TODO Send to API function
            const file1 = document.querySelector('#gasCan1');
            const file2 = document.querySelector('#gasCan2');
            getBase64(file1);
            getBase64(file2);
        });
    }
});
