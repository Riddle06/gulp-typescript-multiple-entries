export const validateDelivery = (time: string, delivery: string, confirmBtn: HTMLAnchorElement) => {
  if (time && delivery) {
    confirmBtn.setAttribute('href', '#');
    confirmBtn.classList.remove('disabled');
    confirmBtn.innerHTML = '確認時段並需將瓦斯桶放置門外';
  } else {
    confirmBtn.removeAttribute('href');
    confirmBtn.classList.add('disabled');
    confirmBtn.innerHTML = '確認時段';
  }
};
