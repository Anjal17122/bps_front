import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { OnDeskProjects } from "../../../../../Services/ProjectService";

export interface NoticePubVals {
  patraSankhya: string;
  chalaniNum: string;
  publishDateNep: string;
  tala: string;
}
export type setOnDTyp = Dispatch<SetStateAction<OnDeskProjects[] | undefined>>;

export type TabTypes =
  | "onDesk"
  | "unapproved"
  | "notice"
  | "muchulka"
  | "returned"
  | "approved"
  | "revision";

export type TabTy =
  | "OnDesk"
  | "Unapproved"
  | "Notice"
  | "Muchulka"
  | "Approved"
  | "Returned"
  | "Revision"
  | "Plinth"
  | "SuperStructure"
  | "NirmanSampanna";

export type RefetchTyp = <TPageData>(
  options?: RefetchOptions & RefetchQueryFilters<TPageData>
) => Promise<QueryObserverResult<unknown, unknown>>;

export type N = number;

export interface SearchOnDTyp {
  OnDesk: boolean;
  Unapproved: boolean;
  Notice: boolean;
  Muchulka: boolean;
  Approved: boolean;
  Returned: boolean;
  Revision: boolean;
}

export type searchTyp = "id" | "name" | "kitta";

// const onApproveTechnicalFn = (permaId: sN) => {
//   approveTechnical(permaId, setSubmit).then(() => {
//     const filterArr = [...(technicalApproved ? technicalApproved : [])];
//     const newArr = filterArr.filter((data) => data.id !== permaId);

//     setTechnicalApproved(newArr);

//     const deletedObj = filterArr.filter((data) => data.id === permaId);

//     setApproved([...deletedObj, ...(approved ? approved : [])]);
//   });
// };
