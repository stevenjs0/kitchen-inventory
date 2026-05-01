import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTextColorForBackground(
  hexColor: string | undefined,
): 'text-white' | 'text-black' {
  if (!hexColor) return 'text-white';

  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Fórmula de luminancia relativa WCAG
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Si la luminancia es alta (color claro), usar texto oscuro
  return luminance > 0.5 ? 'text-black' : 'text-white';
}
