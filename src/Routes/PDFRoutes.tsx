import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

export const ViewPDFROutes = () => {
  const FinalPDFNirman = lazy(
    () =>
      import("../pages/common/FinalPDF/NirmanSampanaPDFDesign/FinalPDFNirman")
  );
  const FinalPDFNotice = lazy(
    () => import("../pages/common/FinalPDF/NoticePDFDesign/FinalPDFNotice")
  );
  const FinalPDFPlinth = lazy(
    () => import("../pages/common/FinalPDF/FinalPDFPlinth")
  );
  const FinalPDFSuperSt = lazy(
    () => import("../pages/common/FinalPDF/FinalPDFSuperSt")
  );

  return (
    <>
      <Route
        path="noticepdf/:pid/:chalanino/:patrasankhya/:date/:type"
        element={<FinalPDFNotice />}
      />
      {/* <Route
        path="plinthpdf/:pid/:projectType/:buildingPurpose"
        element={<FinalPDFPlinth />}
      /> */}
      <Route
        path="superstructurepdf/:pid/:projectType/:buildingPurpose"
        element={<FinalPDFSuperSt />}
      />
      <Route
        path="buildingcompletepdf/:pid/:projectType/:buildingPurpose"
        element={<FinalPDFNirman />}
      />
    </>
  );
};
