import { Route } from "react-router-dom";
import { lazy } from "react";

export const EditFaq = lazy(() => import("../pages/Public/Faq/EditFaq"));
export const EditNotice = lazy(
  () => import("../pages/Admin/Notice/EditNotice")
);
export const EditDownload = lazy(
  () => import("../pages/Admin/Downloads/EditDownload")
);
export const AddNotice = lazy(() => import("../pages/Admin/Notice/AddNotice"));
export const AddDownloads = lazy(
  () => import("../pages/Admin/Downloads/AddDownloads")
);
export const AddFaq = lazy(() => import("../pages/Public/Faq/AddFaq"));

export const AdminPublic = (
  <>
    <Route path="faqedit" element={<EditFaq />} />

    <Route path="addfaq" element={<AddFaq />} />

    <Route path="downloads/add" element={<AddDownloads />} />
    <Route path="notice/add" element={<AddNotice />} />
    <Route path="downloads/edit/:id" element={<EditDownload />} />
    <Route path="notice/edit/:id" element={<EditNotice />} />
  </>
);
