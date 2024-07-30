import { get, getWSub } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const getNoticeApproved = () =>
  get("/project/perma/own/notice/approved");

export const finalNoticeApprove = (id: sN, sets: setSTyp) =>
  getWSub("/project/perma/publish/notice?id=" + id, sets);

export const PublishNoticeBoth = (
  id: sN,
  patraSankhya: string,
  chalani: string,
  publishDate: string,
  sets: setSTyp
) =>
  getWSub(
    `/project/perma/publish/notice?id=${id}&chalani=${chalani}&patra=${patraSankhya}&pdfDate=${publishDate}`,
    sets
  );
