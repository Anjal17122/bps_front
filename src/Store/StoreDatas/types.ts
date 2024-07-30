import { MappedAreaCat } from "../../pages/SuperAdmin/FloorRate/FloorRate";
import { FloorListBody, FloorRateBody } from "../../Services/SuperAdminService";

export type ActionData = {
  type: AcD.setAll;
  payload: {
    floorCat: FloorListBody[];
    areaCat: MappedAreaCat[];
    buildingCat: MappedAreaCat[];
    floorRate: FloorRateBody[];
  };
};

export enum AcD {
  setFloorCategory = "setFloorCategory",
  setFloorRate = "setFloorRate",
  setAreaCategory = "setAreaCategory",
  setBuildingCategory = "setBuildingCategory",
  setAll = "setAll",
}

export interface StateData {
  floorCat: FloorListBody[];
  areaCat: MappedAreaCat[];
  buildingCat: MappedAreaCat[];
  floorRate: FloorRateBody[];
}
