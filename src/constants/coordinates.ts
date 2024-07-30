import { message } from "antd";
import { municipalityDetails } from "./constants";

export const getCoordinates = (
  type: pdfSizes,
  position: number
): string | undefined => {
  message.info(JSON.stringify({ type, position }));
  if (type === "a1") {
    if (position === 1) return "2030,1450,2130,1480";
    if (position === 2) return "2110,1450,2210,1480";
    if (position === 3) return "2200,1450,2300,1480";
    if (position === 4) return "2280,1450,2380,1480";

    if (position === 5) return "2030,1270,2130,1300";
    if (position === 6) return "2110,1270,2210,1300";
    if (position === 7) return "2200,1270,2300,1300";
    if (position === 8) return "2280,1270,2380,1300";

    if (position === 9) return "2030,1110,2130,1140";
    if (position === 10) return "2110,1110,2210,1140";
    if (position === 11) return "2200,1110,2300,1140";
    if (position === 12) return "2280,1110,2380,1140";

    if (position === 13) return "2030,950,2130,980";
    if (position === 14) return "2110,950,2210,980";
    if (position === 15) return "2200,950,2300,980";
    if (position === 16) return "2280,950,2380,980";

    // 2030,1250,2150,1290
    if (position === 17) return "2030,1250,2140,1290";
    // if (position === 18) return "2110,1250,2220,1290";
    if (position === 19) return "2160,1250,2300,1290";
    if (position === 20) return "2260,1250,2380,1290";



    if (position === 100) return "2280,850,2380,880";
  }
  if (type === "a3") {
    if (position === 1) return "960,650,1020,670";
    if (position === 2) return "1010,650,1070,670";
    if (position === 3) return "1060,650,1120,670";
    if (position === 4) return "1110,650,1170,670";
    if (position === 5) return "960,530,1020,550";
    if (position === 6) return "1010,530,1070,550";
    if (position === 7) return "1060,530,1120,550";
    if (position === 8) return "1110,530,1170,550";
    if (position === 9) return "960,410,1020,430";
    if (position === 10) return "1010,410,1070,430";
    if (position === 11) return "1010,410,1070,430";
    if (position === 12) return "1110,410,1170,430";
    if (position === 13) return "960,290,1020,310";
    if (position === 14) return "1010,290,1070,310";
    if (position === 15) return "1060,290,1120,310";
    if (position === 16) return "1110,290,1170,310";
    if (position === 100) return "1110,240,1170,260";
  }
  if (type === "a4") {
    const ifMandan =
      municipalityDetails.address1 === "Mandandeupur, Kavrepalanchok";

    if (ifMandan && position === 1) return "60,60,160,95";
    if (ifMandan && position === 2) return "190,60,290,95";
    if (ifMandan && position === 3) return "340,60,480,95";
    if (ifMandan && position === 4) return "462,60,580,95";
    if (ifMandan && position === 100) return "562,100,680,100";

    if (position === 1) return "60,43,160,85";
    if (position === 2) return "190,43,290,85";
    if (position === 3) return "340,43,480,85";
    if (position === 4) return "462,43,580,85";
    if (position === 52) return "260,43,380,85";
    if (position === 100) return "562,100,680,100";
  }
};

export type pdfSizes = "a3" | "a1" | "a4";
export type pdfPositions =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 100;
