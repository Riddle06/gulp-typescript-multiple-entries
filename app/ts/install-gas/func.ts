const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//* 總金額初始化
const initialDepositEl = document.querySelector('.install-gas--deposit-price')! as HTMLElement;
const totalPrice = document.querySelector('.install-price--total-price-value')! as HTMLElement;
const defaultDepositPriceEl = document.querySelector(
  '.gas-deposit--price'
)! as HTMLParagraphElement;
const defaultGasPriceEl = document.querySelector('.gas-price--price')! as HTMLParagraphElement;
const defaultInstallPriceEl = document.querySelector(
  '.gas-installation--price'
)! as HTMLParagraphElement;
const defaultDepositPriceList = document.querySelector(
  '.install-price--deposit-price'
)! as HTMLParagraphElement;
const defaultGasPriceList = document.querySelector(
  '.install-price--gas-price'
)! as HTMLParagraphElement;
const defaultInstallPriceList = document.querySelector(
  '.install-price--installation-price'
)! as HTMLParagraphElement;
const descriptionPriceEl = document.querySelector(
  '.detail-description__deposit span'
)! as HTMLSpanElement;

//TODO Get value from API function
let depositPriceValue = 1900;
let gasPriceValue = 900;
let installationPriceValue = 1900;

//* 設定最初金額

export const setInitalPrice = () => {
  defaultDepositPriceEl.innerHTML = `$${numberWithCommas(depositPriceValue)}`;
  defaultDepositPriceList.innerHTML = `$${numberWithCommas(depositPriceValue)}`;
  defaultGasPriceEl.innerHTML = `$${numberWithCommas(gasPriceValue)}`;
  defaultGasPriceList.innerHTML = `$${numberWithCommas(gasPriceValue)}`;
  defaultInstallPriceEl.innerHTML = `$${numberWithCommas(installationPriceValue)}`;
  defaultInstallPriceList.innerHTML = `$${numberWithCommas(installationPriceValue)}`;
  descriptionPriceEl.innerHTML = `$${numberWithCommas(depositPriceValue)}`;

  let initialDepositPriceVal = depositPriceValue;
  let initialInstallationPriceVal = installationPriceValue;
  let initialGasPriceVal = gasPriceValue;
  if (initialDepositEl.classList.contains('no-deposit')) {
    totalPrice.innerHTML = `$${(initialInstallationPriceVal + initialGasPriceVal).toString()}`;
  } else {
    totalPrice.innerHTML = `$${(
      initialDepositPriceVal +
      initialInstallationPriceVal +
      initialGasPriceVal
    ).toString()}`;
  }
};

//* 加減安裝包數量並計算金額

const installValueEl = document.querySelector('#installValue')! as HTMLInputElement;
const installationQuantity = document.querySelector(
  '.install-price--installation-quantity'
)! as HTMLElement;
const gasQuantity = document.querySelector('.install-price--gas-quantity')! as HTMLElement;
const depositQuantity = document.querySelector('.install-price--deposit-quantity')! as HTMLElement;

export const priceChange = (type: 'inc' | 'dec') => {
  let installValue: number = +installValueEl.value;
  if (type === 'dec') {
    if (installValue !== 1) {
      installValue--;
      installationQuantity.innerHTML = installValue.toString();
      installValueEl.value = installValue.toString();
      defaultInstallPriceList.innerHTML = `$${(installationPriceValue * installValue).toString()}`;
      gasQuantity.innerHTML = installValue.toString();
      defaultGasPriceList.innerHTML = `$${(gasPriceValue * installValue).toString()}`;
      if (initialDepositEl.classList.contains('no-deposit')) {
        totalPrice.innerHTML = `$${(
          installationPriceValue * installValue +
          gasPriceValue * installValue
        ).toString()}`;
      } else {
        depositQuantity.innerHTML = installValue.toString();
        defaultDepositPriceList.innerHTML = `$${(depositPriceValue * installValue).toString()}`;
        totalPrice.innerHTML = `$${(
          installationPriceValue * installValue +
          gasPriceValue * installValue +
          depositPriceValue * installValue
        ).toString()}`;
      }
    }
  }
  if (type === 'inc') {
    installValue++;
    installValueEl.value = installValue.toString();
    installationQuantity.innerHTML = installValue.toString();
    defaultInstallPriceList.innerHTML = `$${(installationPriceValue * installValue).toString()}`;
    gasQuantity.innerHTML = installValue.toString();
    defaultGasPriceList.innerHTML = `$${(gasPriceValue * installValue).toString()}`;
    if (initialDepositEl.classList.contains('no-deposit')) {
      totalPrice.innerHTML = `$${(
        installationPriceValue * installValue +
        gasPriceValue * installValue
      ).toString()}`;
    } else {
      depositQuantity.innerHTML = installValue.toString();
      defaultDepositPriceList.innerHTML = `$${(depositPriceValue * installValue).toString()}`;
      totalPrice.innerHTML = `$${(
        installationPriceValue * installValue +
        gasPriceValue * installValue +
        depositPriceValue * installValue
      ).toString()}`;
    }
  }
};
