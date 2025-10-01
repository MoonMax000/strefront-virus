import Cookies from 'js-cookie';

const defaultOptions = {
  domain: '.tyriantrade.com',
  path: '/',
  sameSite: 'None' as const,
  secure: true,
};

export function setCookie(
  name: string,
  value: string,
  options: Partial<typeof defaultOptions> = {},
): void {
  Cookies.set(name, value, { ...defaultOptions, ...options });
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function removeCookie(name: string, options: Partial<typeof defaultOptions> = {}): void {
  Cookies.remove(name, { ...defaultOptions, ...options });
}
