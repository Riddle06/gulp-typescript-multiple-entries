const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
//* 總金額初始化
const initialDepositEl = document.querySelector('.install-gas--deposit-price');
const totalPrice = document.querySelector('.install-price--total-price-value');
const defaultDepositPriceEl = document.querySelector('.gas-deposit--price');
const defaultGasPriceEl = document.querySelector('.gas-price--price');
const defaultInstallPriceEl = document.querySelector('.gas-installation--price');
const defaultDepositPriceList = document.querySelector('.install-price--deposit-price');
const defaultGasPriceList = document.querySelector('.install-price--gas-price');
const defaultInstallPriceList = document.querySelector('.install-price--installation-price');
const descriptionPriceEl = document.querySelector('.detail-description__deposit span');
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
    }
    else {
        totalPrice.innerHTML = `$${(initialDepositPriceVal +
            initialInstallationPriceVal +
            initialGasPriceVal).toString()}`;
    }
};
//* 加減安裝包數量並計算金額
const installValueEl = document.querySelector('#installValue');
const installationQuantity = document.querySelector('.install-price--installation-quantity');
const gasQuantity = document.querySelector('.install-price--gas-quantity');
const depositQuantity = document.querySelector('.install-price--deposit-quantity');
export const priceChange = (type) => {
    let installValue = +installValueEl.value;
    if (type === 'dec') {
        if (installValue !== 1) {
            installValue--;
            installationQuantity.innerHTML = installValue.toString();
            installValueEl.value = installValue.toString();
            defaultInstallPriceList.innerHTML = `$${(installationPriceValue * installValue).toString()}`;
            gasQuantity.innerHTML = installValue.toString();
            defaultGasPriceList.innerHTML = `$${(gasPriceValue * installValue).toString()}`;
            if (initialDepositEl.classList.contains('no-deposit')) {
                totalPrice.innerHTML = `$${(installationPriceValue * installValue +
                    gasPriceValue * installValue).toString()}`;
            }
            else {
                depositQuantity.innerHTML = installValue.toString();
                defaultDepositPriceList.innerHTML = `$${(depositPriceValue * installValue).toString()}`;
                totalPrice.innerHTML = `$${(installationPriceValue * installValue +
                    gasPriceValue * installValue +
                    depositPriceValue * installValue).toString()}`;
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
            totalPrice.innerHTML = `$${(installationPriceValue * installValue +
                gasPriceValue * installValue).toString()}`;
        }
        else {
            depositQuantity.innerHTML = installValue.toString();
            defaultDepositPriceList.innerHTML = `$${(depositPriceValue * installValue).toString()}`;
            totalPrice.innerHTML = `$${(installationPriceValue * installValue +
                gasPriceValue * installValue +
                depositPriceValue * installValue).toString()}`;
        }
    }
};
