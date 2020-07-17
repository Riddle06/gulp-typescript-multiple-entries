const existingGasExchangeBtn = document.querySelector('.existing-gas--exchange-btn button');
const existingGasExchangeText = document.querySelector('.existing-gas--gas-text');
const existingGasExchangeSize = document.querySelector('.existing-gas--gas-size');
const couponExchangeBtn = document.querySelector('.exchange-coupon--exchange-btn button');
const couponExchangeText = document.querySelector('.exchange-coupon--quantity-text');
const couponExchangeSize = document.querySelector('.exchange-coupon--quantity');
const confirmExchangeBtn = document.querySelector('.buy-gas-exchange--no-exchange button');
//TODO Get value from API function
let gasSize = 55;
let couponLength = 3;
const initialGasSize = document.querySelector('.existing-gas--gas-size');
const initialCouponLength = document.querySelector('.exchange-coupon--quantity');
export const initialDefault = () => {
    initialGasSize.innerHTML = `${gasSize} kg`;
    initialCouponLength.innerHTML = couponLength.toString();
};
let gasExchange = false;
//* 兌換確認按鈕變化
const confirmExchange = (exchange) => {
    if (exchange) {
        confirmExchangeBtn.classList.add('confirm-exchange');
        confirmExchangeBtn.innerHTML = '確認並下一步';
    }
    else {
        confirmExchangeBtn.classList.remove('confirm-exchange');
        confirmExchangeBtn.innerHTML = '暫時不兌換並下一步';
    }
};
//* 存氣桶
export const exchangeFunc = (bodyTarget) => {
    bodyTarget.classList.toggle('existing-gas__cancel');
    existingGasExchangeBtn.classList.toggle('cancel-existing-gas');
    existingGasExchangeBtn.innerHTML = '取消兌換';
    existingGasExchangeText.innerHTML = '以選擇兌換';
    existingGasExchangeSize.innerHTML = '1 桶';
    gasExchange = !gasExchange;
    confirmExchange(gasExchange);
    if (!gasExchange) {
        existingGasExchangeBtn.innerHTML = '兌換一次';
        existingGasExchangeText.innerHTML = '現有存氣';
        existingGasExchangeSize.innerHTML = `${gasSize} kg`;
    }
    return gasExchange;
};
//TODO Get value from API function
let coupon = 'test';
export const couponExchangeFunc = (bodyTarget, couponExchange) => {
    if (couponExchange) {
        bodyTarget.classList.add('existing-gas__cancel');
        couponExchangeBtn.classList.add('cancel-existing-gas');
        couponExchangeBtn.innerHTML = '取消選擇';
        couponExchangeText.innerHTML = '已選擇了優惠券';
        couponExchangeSize.innerHTML = '1 張';
        confirmExchange(couponExchange);
        return coupon;
    }
    else {
        bodyTarget.classList.remove('existing-gas__cancel');
        couponExchangeBtn.classList.remove('cancel-existing-gas');
        couponExchangeBtn.innerHTML = '請選擇';
        couponExchangeText.innerHTML = '現有優惠券';
        couponExchangeSize.innerHTML = couponLength.toString();
        confirmExchange(couponExchange);
        coupon = '';
        return coupon;
    }
};