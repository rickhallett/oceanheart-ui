import { cookies } from 'next/headers';

export const THEME_COOKIE = 'saigo-theme';

export function getSaigoTheme(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(THEME_COOKIE)?.value;
}
