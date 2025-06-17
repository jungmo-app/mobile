import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const darkenColor = (hexColor: string, factor: number = 0.15) => {
  let color = hexColor.replace('#', '');
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));

  return `rgb(${r}, ${g}, ${b})`;
};
