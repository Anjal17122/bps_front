// import create from "zustand";
// import { RasidListType } from "../../../../Services/FloorService";
// import { OnDeskProjects as onD } from "../../../../Services/ProjectService";
export const test213123123 = "";
// interface OnDeskFinal {
//   onDesk: onD[];
//   setItems: (onDesk: onD[]) => void;
//   approveProjById: (id: number) => void;
//   removeProjById: (id: number) => void;
// }

// export const useOnDeskStore = create<OnDeskFinal>((set) => ({
//   onDesk: [],
//   setItems: (onDesk: onD[]) => set(() => ({ onDesk })),
//   approveProjById: (id: number) =>
//     set((state) => {
//       const initArr = [...state.onDesk];
//       const myIndex = initArr.findIndex((obj) => obj.id === id);
//       const myRow = initArr[myIndex];
//       const newRow = { ...myRow, [getRoleOnDesk()]: true };
//       initArr[myIndex] = newRow;
//       return { onDesk: initArr };
//     }),
//   removeProjById: (id: number) =>
//     set((state) => {
//       return { onDesk: state.onDesk.filter((onDes) => onDes.id !== id) };
//     }),
// }));

// interface modalsDataStore {
//   rasidList: RasidListType[];
//   setItems: (onDesk: RasidListType[]) => void;
// }

// export const useRasidListStore = create<modalsDataStore>((set) => ({
//   rasidList: [],
//   setItems: (rasidList: RasidListType[]) => set(() => ({ rasidList })),
// }));

// export const getRoleOnDesk = (): keyof onD => {
//   return (localStorage.getItem("role") ?? "")
//     .substring(5, 0)
//     .toLowerCase() as keyof onD;
// };
