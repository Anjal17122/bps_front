export const UrlsOnDesk = (
  actions: AcGetUrls,
  payload: string | number,
  payload2 = ""
): string => {
  switch (actions) {
    // On desk
    case AcGetUrls.OnDeskSearchByWard:
      return `/project/perma/wardid/${payload}?page=`;

    case AcGetUrls.OnDeskSearchById:
      return `/project/perma/on/desk/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.OnDeskSearchByName:
      return `/project/perma/on/desk/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.OnDeskSearchByKittaNo:
      return `/project/perma/on/desk/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.OnDeskSearchByDate:
      return `/project/perma/on/desk/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    //   Unapproved

    case AcGetUrls.UnapprovedSearchByWard:
      return `/project/perma/filter/by/desk?desk=WARD&ward=${payload}&page=`;
      
    case AcGetUrls.UnapprovedSearchById:
      return `/project/perma/unapproved/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.UnapprovedSearchByName:
      return `/project/perma/unapproved/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.UnapprovedSearchByKittaNo:
      return `/project/perma/on/desk/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.UnapprovedSearchByDate:
      return `/project/perma/unapproved/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    // Notice

    case AcGetUrls.NoticeSearchByWard:
      return `/project/perma/notice/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.NoticeSearchById:
      return `/project/perma/notice/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.NoticeSearchByName:
      return `/project/perma/notice/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.NoticeSearchByKittaNo:
      return `/project/perma/notice/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.NoticeSearchByDate:
      return `/project/perma/notice/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    //   Muchulka
    case AcGetUrls.MuchulkaSearchByWard:
      return `/project/perma/muchulka/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.MuchulkaSearchById:
      return `/project/perma/muchulka/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.MuchulkaSearchByName:
      return `/project/perma/muchulka/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.MuchulkaSearchByKittaNo:
      return `/project/perma/muchulka/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.MuchulkaSearchByDate:
      return `/project/perma/muchulka/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    // Approved
    case AcGetUrls.ApprovedSearchByWard:
      return `/project/perma/approved/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.ApprovedSearchById:
      return `/project/perma/approved/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.ApprovedSearchByName:
      return `/project/perma/approved/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.ApprovedSearchByKittaNo:
      return `/project/perma/approved/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.ApprovedSearchByDate:
      return `/project/perma/approved/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    //   Returned

    case AcGetUrls.ReturnedSearchByWard:
      return `/project/perma/return/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.ReturnedSearchById:
      return `/project/perma/return/search/by/projectid?id=${payload}&page=`;

    case AcGetUrls.ReturnedSearchByName:
      return `/project/perma/return/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.ReturnedSearchByKittaNo:
      return `/project/perma/return/search/by/kittano?kittaNo=${payload}&page=`;

    case AcGetUrls.ReturnedSearchByDate:
      return `/project/perma/return/search/by/date?startDate=${payload}&endDate=${payload2}&page=`;

    //   Plinth

    // case AcGetUrls.PlinthSearchByWard:
    //   return `/project/perma/return/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.PlinthSearchById:
      return `/project/perma/projectstatus/search/by/projectid?status=PLINTH&id=${payload}&page=`;

    case AcGetUrls.PlinthSearchByName:
      return `/project/perma/projectstatus/search/by/applicant?status=PLINTH&name=${payload}&page=`;

    case AcGetUrls.PlinthSearchByKittaNo:
      return `/project/perma/projectstatus/search/by/kittano?status=PLINTH&kittaNo=${payload}&page=`;

    case AcGetUrls.PlinthSearchByDate:
      return `/project/perma/projectstatus/search/by/date?status=PLINTH&startDate=${payload}&endDate=${payload2}&page=`;

    //   SuperStructure

    // case AcGetUrls.PlinthSearchByWard:
    //   return `/project/perma/return/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.SuperStructureSearchById:
      return `/project/perma/projectstatus/search/by/projectid?status=SUPERSTRUCTURE&id=${payload}&page=`;

    case AcGetUrls.SuperStructureSearchByName:
      return `/project/perma/projectstatus/search/by/applicant?status=SUPERSTRUCTURE&name=${payload}&page=`;

    case AcGetUrls.SuperStructureSearchByKittaNo:
      return `/project/perma/projectstatus/search/by/kittano?status=SUPERSTRUCTURE&kittaNo=${payload}&page=`;

    case AcGetUrls.SuperStructureSearchByDate:
      return `/project/perma/projectstatus/search/by/date?status=SUPERSTRUCTURE&startDate=${payload}&endDate=${payload2}&page=`;

    //   NirmanSampanna

    // case AcGetUrls.PlinthSearchByWard:
    //   return `/project/perma/return/search/by/applicant?name=${payload}&page=`;

    case AcGetUrls.NirmanSampannaSearchById:
      return `/project/perma/projectstatus/search/by/projectid?status=NIRMANSAMPANNA&id=${payload}&page=`;

    case AcGetUrls.NirmanSampannaSearchByName:
      return `/project/perma/projectstatus/search/by/applicant?status=NIRMANSAMPANNA&name=${payload}&page=`;

    case AcGetUrls.NirmanSampannaSearchByKittaNo:
      return `/project/perma/projectstatus/search/by/kittano?status=NIRMANSAMPANNA&kittaNo=${payload}&page=`;

    case AcGetUrls.NirmanSampannaSearchByDate:
      return `/project/perma/projectstatus/search/by/date?status=NIRMANSAMPANNA&startDate=${payload}&endDate=${payload2}&page=`;

    default:
      return "";
  }
};

export enum AcGetUrls {
  OnDeskSearchById = "OnDeskSearchById",
  OnDeskSearchByName = "OnDeskSearchByName",
  OnDeskSearchByKittaNo = "OnDeskSearchByKittaNo",
  OnDeskSearchByWard = "OnDeskSearchByWard",
  OnDeskSearchByDate = "OnDeskSearchByDate",

  UnapprovedSearchById = "UnapprovedSearchById",
  UnapprovedSearchByName = "UnapprovedSearchByName",
  UnapprovedSearchByKittaNo = "UnapprovedSearchByKittaNo",
  UnapprovedSearchByWard = "UnapprovedSearchByWard",
  UnapprovedSearchByDate = "UnapprovedSearchByDate",

  NoticeSearchById = "NoticeSearchById",
  NoticeSearchByName = "NoticeSearchByName",
  NoticeSearchByKittaNo = "NoticeSearchByKittaNo",
  NoticeSearchByWard = "NoticeSearchByWard",
  NoticeSearchByDate = "NoticeSearchByDate",

  MuchulkaSearchById = "MuchulkaSearchById",
  MuchulkaSearchByName = "MuchulkaSearchByName",
  MuchulkaSearchByKittaNo = "MuchulkaSearchByKittaNo",
  MuchulkaSearchByWard = "MuchulkaSearchByWard",
  MuchulkaSearchByDate = "MuchulkaSearchByDate",

  ApprovedSearchById = "ApprovedSearchById",
  ApprovedSearchByName = "ApprovedSearchByName",
  ApprovedSearchByKittaNo = "ApprovedSearchByKittaNo",
  ApprovedSearchByWard = "ApprovedSearchByWard",
  ApprovedSearchByDate = "ApprovedSearchByDate",

  ReturnedSearchById = "ReturnedSearchById",
  ReturnedSearchByName = "ReturnedSearchByName",
  ReturnedSearchByKittaNo = "ReturnedSearchByKittaNo",
  ReturnedSearchByWard = "ReturnedSearchByWard",
  ReturnedSearchByDate = "ReturnedSearchByDate",

  PlinthSearchById = "PlinthSearchById",
  PlinthSearchByName = "PlinthSearchByName",
  PlinthSearchByKittaNo = "PlinthSearchByKittaNo",
  PlinthSearchByWard = "PlinthSearchByWard",
  PlinthSearchByDate = "PlinthSearchByDate",

  SuperStructureSearchById = "SuperStructureSearchById",
  SuperStructureSearchByName = "SuperStructureSearchByName",
  SuperStructureSearchByKittaNo = "SuperStructureSearchByKittaNo",
  SuperStructureSearchByWard = "SuperStructureSearchByWard",
  SuperStructureSearchByDate = "SuperStructureSearchByDate",

  NirmanSampannaSearchById = "NirmanSampannaSearchById",
  NirmanSampannaSearchByName = "NirmanSampannaSearchByName",
  NirmanSampannaSearchByKittaNo = "NirmanSampannaSearchByKittaNo",
  NirmanSampannaSearchByWard = "NirmanSampannaSearchByWard",
  NirmanSampannaSearchByDate = "NirmanSampannaSearchByDate",


}
