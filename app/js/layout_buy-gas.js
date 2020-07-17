import { menuTransition } from './global/func.js';
document.addEventListener('DOMContentLoaded', () => {
    menuTransition('.left-menu-btn', '.menu', 'left');
    menuTransition('.cube', '.right-menu', 'right');
    const buyGasInputValue = document.querySelector('#buyGasInputValue');
    const buyGasInputDecBtn = document.querySelector('#buyGasInputDecBtn');
    const buyGasInputIncBtn = document.querySelector('#buyGasInputIncBtn');
    const buyGasPriceCount = document.querySelector('.price-count--confirm');
    const buyGasPrice = document.querySelector('.price-count--confirm__total');
    const buyGasInitialPrice = document.querySelector('.special-can--price');
    //TODO Get value from API function
    let fixedPrice = 606;
    //* 初始化價錢
    buyGasInitialPrice.innerHTML = `$${fixedPrice}`;
    //* 顯示金額
    const showPrice = () => {
        if (checkGasValue > 0) {
            buyGasPriceCount.classList.add('price-count--confirm__show');
        }
        else {
            buyGasPriceCount.classList.remove('price-count--confirm__show');
        }
    };
    //* 選則瓦斯桶數量
    let checkGasValue = +buyGasInputValue.value;
    let totalPrice;
    buyGasInputDecBtn.addEventListener('click', () => {
        if (checkGasValue !== 0) {
            checkGasValue--;
        }
        totalPrice = fixedPrice * checkGasValue;
        buyGasPrice.innerHTML = `$${totalPrice}`;
        showPrice();
        buyGasInputValue.value = checkGasValue.toString();
        console.log(checkGasValue);
    });
    buyGasInputIncBtn.addEventListener('click', () => {
        checkGasValue++;
        buyGasInputValue.value = checkGasValue.toString();
        totalPrice = fixedPrice * checkGasValue;
        buyGasPrice.innerHTML = `$${totalPrice}`;
        showPrice();
        console.log(checkGasValue);
    });
});
