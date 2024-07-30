import { getWLoad, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { ResOnDesk, sN } from "./ProjectService";

export const searchProjectDateCon = (
  page: sN,
  size: sN,
  startDate: sN,
  endDate: sN,
  setS: setSTyp
) =>
  getWLoad(
    `/project/by/date/own?page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`,
    setS
  );

export const GETsearchOnDeskName = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/on/desk/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchUnapproved = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/unapproved/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchNotice = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/notice/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchMuchulka = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/muchulka/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchApproved = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/approved/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchReturn = (name: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/return/search/by/applicant?page=0&size=50&name=${name}`,
    sets
  );

export const GETsearchOnDeskId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/on/desk/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchUnapprovedId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/unapproved/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchNoticeId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/notice/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchMuchulkaId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/muchulka/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchApprovedId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/approved/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchReturnId = (id: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/return/search/by/projectid?id=${id}`,
    sets
  );

export const GETsearchOnDeskDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/on/desk/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchUnapprovedkDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/unapproved/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchNoticeDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/notice/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchMuchulkaDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/muchulka/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchApprovedDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/approved/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchReturnDate = (
  startDate: string,
  endDate: string,
  sets: setSTyp
) =>
  getWSub<ResOnDesk>(
    `/project/perma/return/search/by/date?startDate=${startDate}&endDate=${endDate}`,
    sets
  );

export const GETsearchOnDeskKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/on/desk/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const GETsearchUnapprovedKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/unapproved/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const GETsearchNoticeKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/notice/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const GETsearchmuchulkaKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/muchulka/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const GETsearchApprovedKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/approved/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const GETsearchReturnKitta = (kittaNo: string, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/return/search/by/kittano?kittaNo=${kittaNo}`,
    sets
  );

export const FilterByWards = (wardNo: sN, sets: setSTyp) =>
  getWSub<ResOnDesk>(
    `/project/perma/filter/by/desk?page=0&size=20&desk=WARD&ward=${wardNo}`,
    sets
  );

export const FilterByWardsOnDesk = (wardNo: sN, sets: setSTyp) =>
  getWSub<ResOnDesk>(`/project/perma/wardid/${wardNo}/0/10`, sets);
