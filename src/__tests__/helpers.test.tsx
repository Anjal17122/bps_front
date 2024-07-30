import { expect, describe, it } from "vitest";
import {
  checkSetback,
  getAddress,
  getHouseOwnerAndLandOwnerName,
} from "../pages/common/FinalPDF/AbhilekhikaranPDFDesign/mandandeupurHelper";
import { CharKilla } from "../Services/PDFService";

describe("checkSetback", () => {
  it("should return true if actual setback is equal to standard setback", () => {
    const charKilla = [
      {
        actualSetBack: "5 ft",
        standardSetBack: "5 dt",
      },
    ];
    const result = checkSetback(charKilla as CharKilla[]);
    expect(result).toBe(true);
  });

  it("should return false if actual setback is less than standard setback", () => {
    const charKilla = [
      {
        actualSetBack: "5 ft",
        standardSetBack: "6 standard",
      },
    ];
    const result = checkSetback(charKilla as CharKilla[]);
    expect(result).toBe(false);
  });
});

describe("checkSetback", () => {
  it("should return true when all characters have the same actual and standard setback", () => {
    const charKilla = [
      { id: 1, actualSetBack: "5", standardSetBack: "5" },
      { id: 2, actualSetBack: "3", standardSetBack: "3" },
      { id: 3, actualSetBack: "2", standardSetBack: "2" },
    ];
    expect(checkSetback(charKilla)).toBe(true);
  });

  it("should return true when at least one character has a greater actual setback than the standard setback", () => {
    const charKilla = [
      { actualSetBack: "5", standardSetBack: "5" },
      { actualSetBack: "4", standardSetBack: "3" },
      { actualSetBack: "2", standardSetBack: "2" },
    ];
    expect(checkSetback(charKilla)).toBe(true);
  });

  it("should return true when the charKilla array is empty", () => {
    const charKilla: CharKilla[] = [];
    expect(checkSetback(charKilla)).toBe(true);
  });

  it("should return true when the charKilla array is empty", () => {
    const charKilla = undefined;
    expect(checkSetback(charKilla)).toBe(true);
  });

  it("should return true when the actualSetBack and standardSetBack are undefined for all characters", () => {
    const charKilla = [
      { actualSetBack: undefined, standardSetBack: undefined },
      { actualSetBack: undefined, standardSetBack: undefined },
      { actualSetBack: undefined, standardSetBack: undefined },
    ];
    expect(checkSetback(charKilla)).toBe(true);
  });
});

describe("getAddress", () => {
  it("should return empty strings when data is undefined", () => {
    const data = null;
    const type = "CURRENT";
    const result = getAddress(data, type);
    expect(result.province).toEqual("");
    expect(result.district).toEqual("");
    expect(result.municipality).toEqual("");
    expect(result.ward).toEqual("");
    expect(result.tole).toEqual("");
  });

  it("should return empty strings when address is not found for the given type", () => {
    const data = {
      applicant: {
        addresses: [
          {
            type: "PERMANENT",
            province: {
              nameNep: "Province 1",
            },
            district: {
              nameNep: "District 1",
            },
            municipality: {
              nameNep: "Municipality 1",
            },
            ward: {
              name: "Ward 1",
            },
            toleNep: "Tole 1",
          },
        ],
      },
    };
    const type = "CURRENT";
    const result = getAddress(data, type);
    expect(result.province).toEqual("");
    expect(result.district).toEqual("");
    expect(result.municipality).toEqual("");
    expect(result.ward).toEqual("");
    expect(result.tole).toEqual("");
  });

  it("should return the address fields when address is found for the given type", () => {
    const data = {
      applicant: {
        addresses: [
          {
            type: "CURRENT",
            province: {
              nameNep: "Province 1",
            },
            district: {
              nameNep: "District 1",
            },
            municipality: {
              nameNep: "Municipality 1",
            },
            ward: {
              name: "Ward 1",
            },
            toleNep: "Tole 1",
          },
        ],
      },
    };
    const type = "CURRENT";
    const result = getAddress(data, type);
    expect(result.province).toEqual("Province 1");
    expect(result.district).toEqual("District 1");
    expect(result.municipality).toEqual("Municipality 1");
    expect(result.ward).toEqual("Ward 1");
    expect(result.tole).toEqual("Tole 1");
  });
});

describe("getHouseOwnerAndLandOwnerName", () => {
  it("should return empty string if data.applicant is undefined", () => {
    const data = { land: undefined };
    const result = getHouseOwnerAndLandOwnerName(data as any);
    expect(result).toBe("");
  });
  it("should return empty string if data is undefined", () => {
    const result = getHouseOwnerAndLandOwnerName(undefined);
    expect(result).toBe("");
  });

  it("should return empty string if data.land.houseowner is undefined", () => {
    const data = {
      land: [{ houseOwner: [] }],
    };
    const result = getHouseOwnerAndLandOwnerName(data as any);
    expect(result).toBe("");
  });

  // it("should return empty string if landOwners and houseOwners are empty", () => {
  //   const data = {
  //     lands: [],
  //   };
  //   const result = getHouseOwnerAndLandOwnerName(data);
  //   expect(result).toBe("");
  // });

  // it("should return houseOwnerNames if houseOwners are not empty", () => {
  //   const data = {
  //     lands: [
  //       {
  //         landOwner: [],
  //         houseOwner: [
  //           {
  //             owner: {
  //               nameNep: "John Doe",
  //             },
  //           },
  //           {
  //             owner: {
  //               nameNep: "Jane Smith",
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   const result = getHouseOwnerAndLandOwnerName(data);
  //   expect(result).toBe("John Doe, Jane Smith");
  // });

  // it("should return landOwnerNames if houseOwners are empty", () => {
  //   const data = {
  //     lands: [
  //       {
  //         landOwner: [
  //           {
  //             owner: {
  //               nameNep: "John Doe",
  //             },
  //           },
  //           {
  //             owner: {
  //               nameNep: "Jane Smith",
  //             },
  //           },
  //         ],
  //         houseOwner: [],
  //       },
  //     ],
  //   };
  //   const result = getHouseOwnerAndLandOwnerName(data);
  //   expect(result).toBe("John Doe, Jane Smith");
  // });

  // it("should return landOwnerNames if houseOwners are empty and landOwners have undefined values", () => {
  //   const data = {
  //     lands: [
  //       {
  //         landOwner: [
  //           {
  //             owner: {
  //               nameNep: "John Doe",
  //             },
  //           },
  //           {
  //             owner: {
  //               nameNep: "Jane Smith",
  //             },
  //           },
  //         ],
  //         houseOwner: [],
  //       },
  //     ],
  //   };
  //   const result = getHouseOwnerAndLandOwnerName(data);
  //   expect(result).toBe("John Doe, Jane Smith");
  // });
});
