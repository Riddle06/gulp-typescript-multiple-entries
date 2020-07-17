import { goBack } from './global/func.js';
import { exchangeFunc, couponExchangeFunc, initialDefault } from './buy-gas-coupon/func.js';
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.back-button')) {
        goBack('.back-button');
    }
    //* 存氣兌換
    const existingGasContainer = document.querySelector('.existing-gas');
    const couponContainer = document.querySelector('.exchange-coupon');
    const existingGasExchangeBtn = document.querySelector('.existing-gas--exchange-btn button');
    const couponExchangeBtn = document.querySelector('.exchange-coupon--exchange-btn button');
    const confirmExchangeBtn = document.querySelector('.buy-gas-exchange--no-exchange');
    let gasCoupon = {
        exchangeGas: false,
        exchangeCoupon: '',
    };
    initialDefault();
    existingGasExchangeBtn.addEventListener('click', () => exchangeFunc(existingGasContainer));
    couponExchangeBtn.addEventListener('click', () => couponExchangeFunc(couponContainer, false));
    couponExchangeFunc(couponContainer, true);
    confirmExchangeBtn.addEventListener('click', () => {
        const confirmGas = exchangeFunc(existingGasContainer);
        const confirmCoupon = couponExchangeFunc(couponContainer, true);
        gasCoupon.exchangeGas = confirmGas;
        gasCoupon.exchangeCoupon = confirmCoupon;
        console.log(gasCoupon);
    });
});
