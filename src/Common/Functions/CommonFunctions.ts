import { sN } from "../../Services/ProjectService";

export const delArr = <T>(initi: T[] | undefined, id: sN) => {
  const filtered = [...(initi ?? [])].filter((init: any) => init.id !== id);
  return filtered;
};


export const convertToFeetAndInches = (metersString: string): string => {
  const meters = parseFloat(metersString);
  if (isNaN(meters)) {
    return "";
  }

  // Convert meters to inches
  const totalInches = meters * 39.3701;

  // Convert total inches to feet and inches
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${feet}'${inches}"`;
};