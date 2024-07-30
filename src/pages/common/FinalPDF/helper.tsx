import { Text } from "@react-pdf/renderer";
import { Underline } from "./AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { FloorRow } from "./PDFtypes";

export function underline(string: string | number | undefined): JSX.Element {
  return <Text style={Underline}>{string}</Text>;
}

export function findHiAndLow(floors: FloorRow[]) {
  if (floors.length === 0) {
    return { highest: undefined, lowest: undefined };
  }

  const values = floors.map(
    (obj) => obj.countable + obj.ncT + obj.nCNT + obj.other + obj.prev
  ); // Assuming the numeric property is named "value"

  const highest = Math.max(...values);
  const lowest = Math.min(...values);

  return { highest, lowest };
}
