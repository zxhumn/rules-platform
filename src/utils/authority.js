import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('my-authority') : str;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('my-authority', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}
export function getToken() {
  return localStorage.getItem('my-token') || '';
}

export function setToken(token) {
  localStorage.setItem('my-token', token);
}

export function getAccessToken() {
  return localStorage.getItem('my-access-token') || '';
}

export function setAccessToken(accessToken) {
  localStorage.setItem('my-access-token', accessToken);
}

export function getTopMenus() {
  return JSON.parse(localStorage.getItem('my-top-menus')) || [];
}

export function setTopMenus(menus) {
  localStorage.removeItem('my-top-menus');
  localStorage.setItem('my-top-menus', JSON.stringify(menus));
}

export function getRoutes() {
  return JSON.parse(localStorage.getItem('my-routes')) || [];
}

export function setRoutes(routes) {
  localStorage.removeItem('my-routes');
  localStorage.setItem('my-routes', JSON.stringify(routes));
}

export function getButtons() {
  return JSON.parse(localStorage.getItem('my-buttons')) || [];
}

export function getButton(code) {
  const buttons = getButtons();
  const data = buttons.filter((d) => {
    return d.code === code;
  });
  return data.length === 0 ? [] : data[0].buttons;
}

export function hasButton(buttons, code) {
  return buttons.filter((button) => button.code === code).length > 0;
}

export function setButtons(buttons) {
  localStorage.removeItem('my-buttons');
  localStorage.setItem('my-buttons', JSON.stringify(buttons));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('my-current-user'));
}

export function setCurrentUser(account) {
  localStorage.setItem('my-current-user', JSON.stringify(account));
}

export function setCaptchaKey(key) {
  localStorage.removeItem('my-captcha-key');
  localStorage.setItem('my-captcha-key', key);
}

export function getCaptchaKey() {
  return localStorage.getItem('my-captcha-key');
}

// 获取用户基本信息
export function setUserInfo(key) {
  localStorage.removeItem('my-user-info');
  localStorage.setItem('my-user-info', JSON.stringify(key));
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem('my-user-info'));
}

export function removeAll() {
  localStorage.removeItem('my-authority');
  localStorage.removeItem('my-token');
  localStorage.removeItem('my-top-menus');
  localStorage.removeItem('my-routes');
  localStorage.removeItem('my-buttons');
  localStorage.removeItem('my-current-user');
  localStorage.removeItem('my-captcha-key');
  localStorage.removeItem('my-user-info');
  sessionStorage.removeItem('MyVoucherStep1');
  sessionStorage.removeItem('MakeBillStep1');
  sessionStorage.removeItem('MakeBillStep2');
  sessionStorage.removeItem('firstSign');
  sessionStorage.removeItem('firstEditPass');
  localStorage.clear()
}
// 手机用户名手机号
export function setRegInfo(key) {
  sessionStorage.removeItem('Reg-info');
  sessionStorage.setItem('Reg-info', JSON.stringify(key));
}
export function getRegInfo() {
  return JSON.parse(sessionStorage.getItem('Reg-info'));
}
// 企业Id
export function setentId(key) {
  sessionStorage.removeItem('entId');
  sessionStorage.setItem('entId', JSON.stringify(key));
}
export function getentId() {
  return JSON.parse(sessionStorage.getItem('entId'));
}
export function removeCertInfo() {
  sessionStorage.removeItem('Reg-info');
  sessionStorage.removeItem('entId');
}
