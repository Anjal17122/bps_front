import { PostMapdandaBody } from "../../../Services/MapdandaService";
import { MapdandaValues } from "./types";

export type MapdandaType =
  | "groundCoverage"
  | "totalFloorArea"
  | "talla"
  | "row"
  | "setBack"
  | "highTension"
  | "river"
  | "far";

// Function to convert MapdandaValues to PostMapdandaBody array
export // Function to convert MapdandaValues to PostMapdandaBody array
function convertToPostMapdandaBody(
  values: MapdandaValues,
  projectId: number
): PostMapdandaBody[] {
  const keys = [
    "groundCoverage",
    "totalFloorArea",
    "talla",
    "row",
    "setBack",
    "highTension",
    "river",
    "far",
  ];
  const result: PostMapdandaBody[] = keys.map((key) => ({
    projectId,
    actual: values[key + "Actual"] ?? "",
    standard: values[key + "Standard"] ?? "",
    remarks: values[key + "Remarks"] ?? "",
    type: key as MapdandaType,
  }));

  return result;
}
