import { goBack } from './global/func';

document.addEventListener('DOMContentLoaded', () => {
  goBack('.back-button');

  //* 判定免等會員或一般會員
  const normalExistingGas = document.querySelector('#signupGasInput');
  const specialExistingGas = document.querySelector('#signupGasSpecialInput');

  //* Popup
  const signupCheckGasPopupBtn = document.querySelector(
    '#signupCheckGasPopup'
  )! as HTMLButtonElement;
  const signupCheckGasPopup = document.querySelector('.signup__check-gas--popup')! as HTMLElement;
  signupCheckGasPopupBtn.addEventListener('click', () => {
    signupCheckGasPopup.style.display = 'none';
  });

  //* 一般會員
  if (normalExistingGas) {
    //* 選則瓦斯桶數量
    const checkGasInputDecBtn = document.querySelector('#gasInputDecBtn')! as HTMLElement;
    const checkGasInputIncBtn = document.querySelector('#gasInputIncBtn')! as HTMLElement;
    const checkGasValueEl = document.querySelector('#gasInputValue')! as HTMLInputElement;
    const signupInputGas = document.querySelector('#signupGasInput')! as HTMLButtonElement;
    let checkGasValue: number = +checkGasValueEl.value;
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
    const inputs = (<any>document.querySelectorAll('input')!) as HTMLInputElement[];
    Array.prototype.forEach.call(inputs, (input: HTMLInputElement) => {
      input.addEventListener('change', function (e: Event) {
        let fileName = (<HTMLInputElement>e.target).value.split('\\').pop()!;
        this.nextElementSibling!.innerHTML = fileName;
      });
    });
    const confirmBtn = document.querySelector('#signupGasSpecialInput')! as HTMLButtonElement;

    const imagesBase64Arr: any[] = [];
    const getBase64 = (event: HTMLInputElement) => {
      let file = event.files![0];
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
      const file1 = document.querySelector('#gasCan1')! as HTMLInputElement;
      const file2 = document.querySelector('#gasCan2')! as HTMLInputElement;
      getBase64(file1);
      getBase64(file2);
    });
  }
});
