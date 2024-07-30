export interface floorTotal {
  nCNT: number;
  other: number;
  prev: number;
  total: number;
  countable: number;
  ncT: number;
  totalTax: number;
}

export interface FloorTotalString {
  nCNT: string;
  other: string;
  prev: string;
  total: number;
  countable: string;
  ncT: string;
  totalTax: number;
}
// export const floorTypes = [
//   { label: "Basement2", value: "Basement2" },
//   { label: "Basement1", value: "Basement1" },
//   { label: "Semi Basement", value: "Semi Basement" },
//   { label: "Ground Floor", value: "Ground Floor" },
//   { label: "Floor1", value: "Floor1" },
//   { label: "Floor2", value: "Floor2" },
//   { label: "Floor3", value: "Floor3" },
//   { label: "Floor4", value: "Floor4" },
//   { label: "Floor5", value: "Floor5" },
//   { label: "Floor6", value: "Floor6" },
//   { label: "Floor7", value: "Floor7" },
//   { label: "Floor8", value: "Floor8" },
//   { label: "Floor9", value: "Floor9" },
//   { label: "Floor10", value: "Floor10" },
// ];

export const floorTypes = [
  {
    id: 9,
    label: "भूमिगत तल्ला",
    value: "भूमिगत तल्ला",
  },
  {
    id: 10,
    label: "जमिन तल्ला",
    value: "जमिन तल्ला",
  },
  {
    id: 11,
    label: "पहिलो तल्ला",
    value: "पहिलो तल्ला",
  },
  {
    id: 12,
    label: "दोश्रो तल्ला",
    value: "दोश्रो तल्ला",
  },
  {
    id: 13,
    label: "तेश्रो तल्ला",
    value: "तेश्रो तल्ला",
  },
  {
    id: 14,
    label: "चौथो तल्ला",
    value: "चौथो तल्ला",
  },
  {
    id: 15,
    label: "पाचौ तल्ला",
    value: "पाचौ तल्ला",
  },
  {
    id: 16,
    label: "छैठौ तल्ला",
    value: "छैठौ तल्ला",
  },
  {
    id: 17,
    label: "सातौं तल्ला",
    value: "सातौं तल्ला",
  },
  {
    id: 18,
    label: "आठौं तल्ला",
    value: "आठौं तल्ला",
  },
  {
    id: 19,
    label: "नवौं तल्ला",
    value: "नवौं तल्ला",
  },
  {
    id: 20,
    label: "दसौं तल्ला",
    value: "दसौं तल्ला",
  },
  {
    id: 8,
    label: "भूमिगत तल्ला मुनि",
    value: "भूमिगत तल्ला मुनि",
  },
];

export interface DesignFloorObj {
  name: string[];
  other: number;
  prev: number;
  nCNT: number;
  ncT: number;
  countable: number;
}

export interface getFloorBody {
  id: number;
  name: string;
  other: number;
  prev: number;
  nCNT: number;
  ncT: number;
  countable: number;
}

export type floorProps = "other" | "prev" | "nCNT" | "ncT" | "countable";
