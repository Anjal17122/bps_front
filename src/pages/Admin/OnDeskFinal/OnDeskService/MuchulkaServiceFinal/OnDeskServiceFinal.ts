import { ActionViewProj } from "../../../../../Store/StoreViewProject/types";

export type dispatchTyp = (action: ActionViewProj) => ActionViewProj;

export const sUrls = {
  OnDeskId: "/project/perma/on/desk/search/by/projectid?id=",
  OnDeskName: "/project/perma/on/desk/search/by/applicant?page=0&size=50&name=",
  OnDeskDate: "/project/perma/on/desk/search/by/date?startDate=",
  OnDeskKitta: "/project/perma/on/desk/search/by/kittano?kittaNo=",
  //
  UnapprovedId: "/project/perma/unapproved/search/by/projectid?id=",
  UnapprovedName:
    "/project/perma/unapproved/search/by/applicant?page=0&size=50&name=",
  UnapprovedDate: "/project/perma/unapproved/search/by/date?startDate=",
  UnapprovedKitta: "/project/perma/unapproved/search/by/kittano?kittaNo=",
  //
  NoticeId: "/project/perma/notice/search/by/projectid?id=",
  NoticeName: "/project/perma/notice/search/by/applicant?page=0&size=50&name=",
  NoticeDate: "/project/perma/notice/search/by/date?startDate=",
  NoticeKitta: "/project/perma/notice/search/by/kittano?kittaNo=",
  //
  MuchulkaId: "/project/perma/muchulka/search/by/projectid?id=",
  MuchulkaName:
    "/project/perma/muchulka/search/by/applicant?page=0&size=50&name=",
  MuchulkaDate: "/project/perma/muchulka/search/by/date?startDate=",
  MuchulkaKitta: "/project/perma/muchulka/search/by/kittano?kittaNo=",
  //
  ApprovedId: "/project/perma/approved/search/by/projectid?id=",
  ApprovedName:
    "/project/perma/approved/search/by/applicant?page=0&size=50&name=",
  ApprovedDate: "/project/perma/approved/search/by/date?startDate=",
  ApprovedKitta: "/project/perma/approved/search/by/kittano?kittaNo=",
  //
  ReturnedId: "/project/perma/return/search/by/projectid?id=",
  ReturnedName:
    "/project/perma/return/search/by/applicant?page=0&size=50&name=",
  ReturnedDate: "/project/perma/return/search/by/date?startDate=",
  ReturnedKitta: "/project/perma/return/search/by/kittano?kittaNo=",
  //
  FilterByWardOnDesk: "/project/perma/wardid/", ///project/perma/wardid/${wardNo}/0/10
};
