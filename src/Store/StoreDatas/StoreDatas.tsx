import { createStore } from "react-hooks-global-state";
import { AcD, ActionData, StateData } from "./types";

const reducer = (state: StateData, action: ActionData) => {
  switch (action.type) {
    case AcD.setAll:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const initialState: StateData = {
  areaCat: [],
  buildingCat: [],
  floorCat: [],
  floorRate: [],
};

export const {
  dispatch: dispatchData,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreData() {
  const floorCat = useStoreState("floorCat");
  const floorRate = useStoreState("floorRate");
  const areaCat = useStoreState("areaCat");
  const buildingCat = useStoreState("buildingCat");

  return {
    floorCat,
    floorRate,
    areaCat,
    buildingCat,
  };
}
