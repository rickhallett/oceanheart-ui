export const THEME_COOKIE = 'saigo-theme';

export function setSaigoTheme(theme: string) {
  // This function runs on the client side and uses document.cookie
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000`; // 1 year
}
