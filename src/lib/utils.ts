import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActivePath = (currentPath: string, path: string) => {
  return currentPath.split('/')[1] === path;
};

export const BrandNames = {
  aws: 'AWS',
  s3: 'S3',
  github: 'GitHub',
  javascript: 'JavaScript',
  gatsby: 'Gatsby',
} as const;

export function replaceAll(text: string, correctWords: Record<string, string>) {
  const pattern = new RegExp(Object.keys(correctWords).join('|'), 'gi');

  return text.replace(pattern, function (matched) {
    return correctWords[matched.toLowerCase()];
  });
}

export function generateSlug(text: string) {
  return `${text
    .trim()
    // eslint-disable-next-line no-useless-escape
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()}`;
}
