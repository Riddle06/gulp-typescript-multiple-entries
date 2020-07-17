import { goBack } from './global/func.js';
import { validateDelivery } from './buy-gas-select-time/func.js';
import { Delivery } from './buy-gas-select-time/interface.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.back-button')) {
    goBack('.back-button');
  }
  const deliveryTimeEl = document.querySelector(
    '.buy-gas--delivery-date input'
  )! as HTMLInputElement;
  const deliveryMethodEl = document.querySelector(
    'input[name="deliveryMethod"]:checked'
  )! as HTMLInputElement;
  const confirmDelivery = document.querySelector(
    '.buy-gas--confirm-delivery-time a'
  )! as HTMLAnchorElement;
  const deliveryMethods = document.querySelectorAll('input[name="deliveryMethod"]')! as NodeListOf<
    HTMLInputElement
  >;

  //* 更新選擇時間 value
  deliveryTimeEl.addEventListener('change', () => {
    const time = deliveryTimeEl.value;
    const deliveryMethod = deliveryMethodEl.value;
    console.log(time, deliveryMethod);
    validateDelivery(time, deliveryMethod, confirmDelivery);
  });

  //* 更新配送方式
  deliveryMethods.forEach((delivery: HTMLInputElement) => {
    delivery.addEventListener('change', function () {
      const time = deliveryTimeEl.value;
      validateDelivery(time, this.value, confirmDelivery);
    });
  });

  let delivery: Delivery = {
    time: '',
    date: '',
    method: '',
  };
  //* 確認配送日期和方式
  confirmDelivery.addEventListener('click', (e) => {
    e.preventDefault();
    const deliveryMethodEl = document.querySelector(
      'input[name="deliveryMethod"]:checked'
    )! as HTMLInputElement;
    delivery = {
      time:
        deliveryTimeEl.value.split(' ')[1] +
        deliveryTimeEl.value.split(' ')[2] +
        deliveryTimeEl.value.split(' ')[3],
      date: deliveryTimeEl.value.split(' ')[0],
      method: deliveryMethodEl.value,
    };
    console.log(delivery);
  });
});
