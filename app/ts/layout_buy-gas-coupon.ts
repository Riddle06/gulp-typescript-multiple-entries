import { goBack } from './global/func.js';
import { exchangeFunc, couponExchangeFunc, initialDefault } from './buy-gas-coupon/func.js';
import { Coupon } from './buy-gas-coupon/interface.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.back-button')) {
    goBack('.back-button');
  }

  //* 存氣兌換
  const existingGasContainer = document.querySelector('.existing-gas')! as HTMLDivElement;
  const couponContainer = document.querySelector('.exchange-coupon')! as HTMLDivElement;
  const existingGasExchangeBtn = document.querySelector(
    '.existing-gas--exchange-btn button'
  )! as HTMLButtonElement;
  const couponExchangeBtn = document.querySelector(
    '.exchange-coupon--exchange-btn button'
  )! as HTMLButtonElement;
  const confirmExchangeBtn = document.querySelector(
    '.buy-gas-exchange--no-exchange'
  )! as HTMLButtonElement;

  let gasCoupon: Coupon = {
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
