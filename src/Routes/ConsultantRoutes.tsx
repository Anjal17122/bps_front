import { Route } from "react-router-dom";
import ConsultantViewProj from "../pages/Consultant/ViewProjectFinal/ConsultantViewProj";
import { lazy } from "react";
import ConsultantOldPermit from "../pages/common/OldPermit/ConsultantOldPermit";
import CertificateNotifications from "../Components/Consultant/Notification/CertificateNotifications";
import OrgConsultantsTabs from "../Components/Consultant/OrganizationConsultant/component/OrgConsultantsTabs";
import UploadNirsampannaPdf from "../pages/Consultant/ProjectCreate/ConBuildingReport/UploadNirsampannaPdf";

const RequestCorrectionModalCon = lazy(
  () =>
    import("../pages/Consultant/ApprovedTab/PlinthForm/RequestCorrectionCon")
);
export const ViewProject = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Project/ViewProject/ViewProject"
    )
);

export const ViewApplicantAdmin = lazy(
  () =>
    import("../pages/Admin/ViewProject/Consultant/Applicant/ViewApplicantAdmin")
);

export const LandInfoAdmin = lazy(
  () =>
    import("../pages/Admin/ViewProject/Consultant/Project/LandInfo/LandInfo")
);

export const ViewCharkillaAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Project/Charkilla/ViewCharkillaAd"
    )
);

export const AddPlinth = lazy(
  () => import("../pages/Consultant/ApprovedTab/PlinthForm/AddPlinth")
);

export const ViewPlinthForm = lazy(
  () => import("../pages/Consultant/ApprovedTab/PlinthForm/ViewPlinthForm")
);

export const EditPlinthForm = lazy(
  () => import("../pages/Consultant/ApprovedTab/PlinthForm/EditPlinth")
);

export const DesignFloorAdmin = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/DesignFloor/DesignFloorAdmin"
    )
);
export const PlinthPratibedan = lazy(
  () => import("../pages/Consultant/ApprovedTab/PlinthForm/PlinthPratibedan")
);

export const ViewLandOwnersAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Project/LandOwner/ViewOwnersAd"
    )
);
export const ViewBylawsAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/BuildingByLaws/ViewBylawsAd"
    )
);
export const ViewArchitecturalAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/Architectural/ViewArchitecturalAd"
    )
);

export const EditSuperSt = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/ConSuperStructure/EditSuperSt")
);
export const ViewSuperSt = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/ConSuperStructure/ViewSuperSt")
);
export const ViewStructuralAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/Structural/ViewStructuralAd"
    )
);

export const AddSuperStructure = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/ConSuperStructure/AddSuperStructure"
    )
);

export const ViewElectricalAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/Electrical/ViewElectricalAd"
    )
);

export const ViewSanitationAd = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/Sanitation/ViewSanitationAd"
    )
);
export const ViewUploadsAdmin = lazy(
  () =>
    import(
      "../pages/Admin/ViewProject/Consultant/Technical/UploadedFiles/ViewUploadsAdmin"
    )
);

export const ConsultantRoutes = (
  <>
    <Route
      path="notification/certificates"
      element={<CertificateNotifications />}
    />
    <Route path="org/cons" element={<OrgConsultantsTabs />} />

    <Route path="project/pending" element={<ConsultantViewProj />} />
    <Route path="project/permits" element={<ConsultantOldPermit />} />
    <Route
      path="viewcorrection/:type/:pid"
      element={<RequestCorrectionModalCon />}
    />
    <Route path="view/project/projectdetails/:pid" element={<ViewProject />} />
    <Route
      path="viewproject/applicant/:pid"
      element={<ViewApplicantAdmin admin={false} />}
    />
    <Route path="viewproject/land/:pid" element={<LandInfoAdmin />} />
    <Route path="viewproject/charkilla/:pid" element={<ViewCharkillaAd />} />
    <Route path="viewproject/owners/:pid" element={<ViewLandOwnersAd />} />
    <Route path="viewproject/floor/:pid" element={<DesignFloorAdmin />} />
    <Route path="viewproject/bylaws/:pid" element={<ViewBylawsAd />} />
    <Route
      path="viewproject/architectural/:pid"
      element={<ViewArchitecturalAd />}
    />
    <Route path="viewproject/structural/:pid" element={<ViewStructuralAd />} />
    <Route path="viewproject/electrical/:pid" element={<ViewElectricalAd />} />
    <Route path="viewproject/sanitation/:pid" element={<ViewSanitationAd />} />
    <Route path="viewproject/uploads/:pid" element={<ViewUploadsAdmin />} />

    <Route path="addplinthdata/:pid" element={<AddPlinth />} />
    <Route path="editplinth/:pid" element={<EditPlinthForm />} />
    <Route path="viewplinth/:pid" element={<ViewPlinthForm />} />
    <Route path="addsuperst/:pid" element={<AddSuperStructure />} />
    <Route path="viewplinthdata/:pid" element={<PlinthPratibedan />} />

    <Route path="viewsuperst/:pid" element={<ViewSuperSt />} />
    <Route path="editsuperst/:pid/:superstid" element={<EditSuperSt />} />
    <Route
      path="upload/Nirmsampanna/:projectId"
      element={<UploadNirsampannaPdf />}
    />
  </>
);
