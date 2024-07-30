import { sN } from "../Services/ProjectService";

const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export const ConvertToNepali = (number: sN | undefined | null) => {
  const amount_np = number?.toString().replace(/[0123456789]/g, function (s) {
    return devanagariDigits[parseInt(s)];
  });

  return amount_np;
};
