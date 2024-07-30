export interface FloorTotal {
  nCNT: number;
  other: number;
  prev: number;
  total: number;
  countable: number;
  ncT: number;
  totalTax: number;
}
export const floorTypes = [
  { label: "Basement3", value: "Basement3" },
  { label: "Basement2", value: "Basement2" },
  { label: "Basement1", value: "Basement1" },
  { label: "Semi Basement", value: "Semi Basement" },
  { label: "Ground Floor", value: "Ground Floor" },
  { label: "Floor1", value: "Floor1" },
  { label: "Floor2", value: "Floor2" },
  { label: "Floor3", value: "Floor3" },
  { label: "Floor4", value: "Floor4" },
  { label: "Floor5", value: "Floor5" },
  { label: "Floor6", value: "Floor6" },
  { label: "Floor7", value: "Floor7" },
  { label: "Floor8", value: "Floor8" },
  { label: "Floor9", value: "Floor9" },
  { label: "Floor10", value: "Floor10" },
];

export interface DesignFloorObj {
  name: string[];
  other: number;
  prev: number;
  nCNT: number;
  ncT: number;
  countable: number;
}

export interface getFloor {
  name: string;
  other: number;
  prev: number;
  nCNT: number;
  ncT: number;
  countable: number;
}

export type floorProps = "other" | "prev" | "nCNT" | "ncT" | "countable";
