import { sN } from "../../../../../Services/ProjectService";

export const getInt = (value: sN): number => {
  return typeof value === "number" ? value : parseInt(value);
};

export const getStr = (value: sN): string => {
  return typeof value === "number" ? value.toString() : value;
};

export function calculateDays(date: string | null): number {
  if (date) {
    const diff = Math.abs(new Date(date).getTime() - new Date().getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays - 1;
  } else {
    return 0;
  }
}
