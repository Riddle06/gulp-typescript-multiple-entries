import { goBack, toggleSlide } from './global/func';
import { priceChange, setInitalPrice } from './install-gas/func';
import { GasInstall } from './install-gas/interface';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.back-button')) {
    goBack('.back-button');
  }

  //* 判斷是否有壓桶
  const isFirstTime = false;
  const installGasTop = document.querySelector('.install-gas--gas-top')! as HTMLElement;
  const depositIconElement = document.querySelector('.gas-deposit')! as HTMLDivElement;
  const depositPriceElement = document.querySelector('.install-gas--deposit-price')! as HTMLElement;
  const rentalNewGasQuantity = document.querySelector('.gas-rental--quantity')! as HTMLElement;

  if (!isFirstTime) {
    installGasTop.classList.add('install-gas--gas-top__no-deposit');
    depositIconElement.classList.add('no-deposit');
    depositPriceElement.classList.add('no-deposit');
    rentalNewGasQuantity.innerHTML = '購買新桶數';
  }

  //* 金額初始化
  setInitalPrice();

  //* 金額計算
  const installIncBtn = document.querySelector('#installIncBtn')! as HTMLElement;
  const installDecBtn = document.querySelector('#installDecBtn')! as HTMLElement;

  installDecBtn.addEventListener('click', () => {
    priceChange('dec');
  });
  installIncBtn.addEventListener('click', () => {
    priceChange('inc');
  });

  //* 說明slidedown
  const depositDescriptionTarget = document.querySelector(
    '.install-gas--detail-description__deposit'
  )! as HTMLElement;
  const installDescriptionTarget = document.querySelector(
    '.install-gas--detail-description__install'
  )! as HTMLElement;
  const depositDescription = document.querySelector(
    '.detail-description__deposit'
  )! as HTMLDivElement;
  const installDescription = document.querySelector(
    '.detail-description__install'
  )! as HTMLDivElement;

  depositDescriptionTarget.addEventListener('click', function () {
    this.classList.toggle('description__show');
    toggleSlide(depositDescription);
  });
  installDescriptionTarget.addEventListener('click', function () {
    this.classList.toggle('description__show');
    toggleSlide(installDescription);
  });

  //* 註解
  const commentsBtn = document.querySelector('.install-gas--comments-btn')! as HTMLButtonElement;
  const commentsElement = document.querySelector('.comments-overlay')! as HTMLDivElement;
  const commentsCancelBtn = document.querySelector(
    '.comments--cancel button'
  )! as HTMLButtonElement;
  const commentsConfirmBtn = document.querySelector(
    '.comments--confirm button'
  )! as HTMLButtonElement;
  const commentsValue = document.querySelector(
    '.comments--textarea textarea'
  )! as HTMLTextAreaElement;
  const commentsText = document.querySelector('.install-gas--comments')! as HTMLElement;

  commentsBtn.addEventListener('click', () => {
    commentsElement.style.display = 'flex';
  });
  commentsCancelBtn.addEventListener('click', () => {
    commentsValue.value = '';
    commentsElement.style.display = 'none';
  });
  commentsConfirmBtn.addEventListener('click', () => {
    const comment = commentsValue.value;
    commentsText.innerHTML = `*備註:\n${comment}`;
    commentsElement.style.display = 'none';
  });

  //*
  const totalGasInstallAmount = document.querySelector('#installValue')! as HTMLInputElement;
  const totalGasInstallPrice = document.querySelector(
    '.install-price--total-price-value'
  )! as HTMLSpanElement;

  let totalGasInstall: GasInstall = {
    noOfGas: 0,
    price: 0,
    isFirstTime: isFirstTime,
  };
  const confirmInstallGas = document.querySelector('.install-gas--confirm a')! as HTMLAnchorElement;
  confirmInstallGas.addEventListener('click', () => {
    const totalGasInstallPriceNum = totalGasInstallPrice.innerHTML.split('$')[1];
    totalGasInstall.noOfGas = +totalGasInstallAmount.value;
    totalGasInstall.price = +totalGasInstallPriceNum;
    console.log(totalGasInstall);
  });
});
