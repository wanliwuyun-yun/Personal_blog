import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getTagColor(index: number): string {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#61DAFB", "#FFD93D",
    "#6C5CE7", "#A8E6CF", "#FF85A2", "#45B7D1",
    "#F9CA24", "#686DE0", "#E056A0", "#5F27CD",
  ];
  return colors[index % colors.length];
}
