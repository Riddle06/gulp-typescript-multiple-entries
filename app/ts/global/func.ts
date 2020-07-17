//* 回上頁
export const goBack = (el: string) => {
  document.querySelector(el)!.addEventListener('click', () => {
    console.log('test');
    history.go(-1);
    return false;
  });
};

//* Menu開關
export const menuTransition = (eventTarget: string, target: string, position: 'left' | 'right') => {
  document.querySelector(eventTarget)!.addEventListener('click', () => {
    if (position === 'left') {
      document.querySelector(eventTarget)!.classList.toggle('menu-close');
      document.querySelector(target)!.classList.toggle('menu-left-show');
      document.querySelector('.right-menu')!.classList.remove('menu-right-show');
      document.querySelector('.cube')!.classList.remove('cube__rotate');
    }
    if (position === 'right') {
      document.querySelector(eventTarget)!.classList.toggle('cube__rotate');
      document.querySelector(target)!.classList.toggle('menu-right-show');
      document.querySelector('.left-menu-btn')!.classList.remove('menu-close');
      document.querySelector('.menu')!.classList.remove('menu-left-show');
    }
  });
};

//* SlideToggle
const getHeight = function (el: HTMLElement) {
  let el_style = window.getComputedStyle(el),
    el_display = el_style.display,
    el_position = el_style.position,
    el_visibility = el_style.visibility,
    el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
    wanted_height = 0;

  if (el_display !== 'none' && el_max_height !== '0') {
    return el.offsetHeight;
  }

  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  wanted_height = el.offsetHeight;

  el.style.display = el_display;
  el.style.position = el_position;
  el.style.visibility = el_visibility;

  return wanted_height;
};

export const toggleSlide = function (el: HTMLElement) {
  var el_max_height: number | string = 0;

  if (el.getAttribute('data-max-height')) {
    if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
      el.style.maxHeight = el.getAttribute('data-max-height')!;
    } else {
      el.style.maxHeight = '0';
    }
  } else {
    el_max_height = getHeight(el) + 'px';
    el.style['transition'] = 'max-height 0.5s ease-in-out';
    el.style.overflowY = 'hidden';
    el.style.maxHeight = '0';
    el.setAttribute('data-max-height', el_max_height);
    el.style.display = 'block';

    setTimeout(function () {
      el.style.maxHeight = el_max_height.toString();
    }, 10);
  }
};
