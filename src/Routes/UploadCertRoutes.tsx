import { lazy } from "react";
import { Route } from "react-router-dom";

export const UploadCertRoutes = () => {
  const UploadCertificate = lazy(
    () =>
      import(
        "../pages/Admin/ProjectActionsAdmin/UploadCertificate/UploadCertificate"
      )
  );
  const UploadNotice = lazy(
    () =>
      import(
        "../pages/Admin/ProjectActionsAdmin/UploadCertificate/UploadNotice"
      )
  );
  return (
    <>
      <Route
        path="upload/certificate/:certificatetype/:pid/:id/:projectType/:buildingPurpose/:filename"
        element={<UploadCertificate />}
      />
      <Route
        path="upload/notice/:certificatetype/:pid/:id/:projectType/:buildingPurpose/:filename/:patrasankhya/:chalanino/:date"
        element={<UploadNotice />}
      />
    </>
  );
};
