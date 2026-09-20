const NOTICE_STORAGE_KEY = 'cookieNoticeDismissed';
export const OPEN_COOKIE_NOTICE_EVENT = 'open-cookie-notice';

export function isCookieNoticeDismissed() {
  return window.localStorage.getItem(NOTICE_STORAGE_KEY) === 'true';
}

export function dismissCookieNotice() {
  window.localStorage.setItem(NOTICE_STORAGE_KEY, 'true');
}
