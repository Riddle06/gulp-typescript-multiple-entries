import { goBack } from './global/func.js';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.back-button')) {
    goBack('.back-button');
  }
  const contractAgreeBtn = document.querySelector('.contract__btn a')! as HTMLAnchorElement;
  const contractAgreeCheckbox = document.querySelector(
    '#contractAgreeCheckbox'
  )! as HTMLInputElement;

  contractAgreeCheckbox.addEventListener('click', function () {
    if (this.checked) {
      contractAgreeBtn.setAttribute('href', '#');
      contractAgreeBtn.classList.remove('disabled');
    } else {
      contractAgreeBtn.removeAttribute('href');
      contractAgreeBtn.classList.add('disabled');
    }
  });
});
