export const extractNum = (text: string | undefined) => {
  if (!text) return "";
  const txt = text;
  const numb = txt.match(/\d+(\.\d+)?/g);
  return numb?.join("") ?? "";
};

export function checkIfLatitude(latitude: string): boolean {
  const pattern = new RegExp("^-?[0-9]*.?[0-9]+$");

  return pattern.test(latitude);
}
