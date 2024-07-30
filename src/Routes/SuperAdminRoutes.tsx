import React, { lazy } from "react";
import { Route } from "react-router-dom";

const SuperAdminUnapprovedProjects = lazy(
  () =>
    import(
      "../pages/SuperAdmin/UnapprovedProjects/SuperAdminUnapprovedProjects"
    )
);

const SuperAdminWrapper = lazy(
  () => import("../Components/Common/Headers/SuperAdminHeader")
);
const ViewUsers = lazy(() => import("../pages/Admin/Consultants/ViewUsers"));
const Downloads = lazy(() => import("../pages/Admin/Downloads/Downloads"));
const Faq = lazy(() => import("../pages/Public/Faq/Faq"));
const Notice = lazy(() => import("../pages/Admin/Notice/Notice"));
const PublicMessages = lazy(
  () => import("../pages/Admin/PublicMessages/PublicMessages")
);
const EditAddress = lazy(
  () => import("../pages/Consultant/ProjectCreate/Address/EditAddress")
);
const AddAdmin = lazy(() => import("../pages/SuperAdmin/AddAdmin/AddAdmin"));
const AdminList = lazy(() => import("../pages/SuperAdmin/AddAdmin/AdminList"));
const ViewAdmin = lazy(() => import("../pages/SuperAdmin/AddAdmin/ViewAdmin"));
const EditConsultantFinal = lazy(
  () => import("../pages/SuperAdmin/EditConsultant/EditConsultantFinal")
);
const EditOrganization = lazy(
  () => import("../pages/SuperAdmin/EditConsultant/EditOrganization")
);
const AddFloorRate = lazy(
  () => import("../pages/SuperAdmin/FloorRate/AddFloorRate")
);
const FloorRate = lazy(() => import("../pages/SuperAdmin/FloorRate/FloorRate"));
const Holidays = lazy(() => import("../pages/SuperAdmin/Holidays/Holidays"));
const TechnicalMembers = lazy(
  () => import("../pages/SuperAdmin/TechnicalMembers/TechnicalMembers")
);
const TransferSetting = lazy(
  () => import("../pages/SuperAdmin/TransferSetting/TransferSetting")
);

const SuperAdminRoutes = (
  <Route path="superadmin" element={<SuperAdminWrapper />}>
    <Route path="projects" element={<SuperAdminUnapprovedProjects />} />
    <Route path="transfersetting" element={<TransferSetting />} />
    <Route path="viewadmin/:id" element={<ViewAdmin />} />
    <Route path="addadmin" element={<AddAdmin />} />
    <Route path="home" element={<AdminList />} />
    <Route path="messages" element={<PublicMessages />} />
    <Route path="users" element={<ViewUsers />} />
    <Route path="notice" element={<Notice />} />
    <Route path="faq" element={<Faq />} />
    <Route path="technicalmembers" element={<TechnicalMembers />} />
    <Route path="holidays" element={<Holidays />} />
    <Route path="downloads" element={<Downloads />} />
    <Route path="floordata" element={<FloorRate />} />
    <Route path="addfloordata" element={<AddFloorRate />} />
    <Route path="edit/organization/:id" element={<EditOrganization />} />
    <Route
      path="edit/approved/user/:id"
      element={<EditConsultantFinal type="perma" />}
    />
    <Route
      path="edit/unapproved/user/:id"
      element={<EditConsultantFinal type="nonperma" />}
    />
    <Route
      path="edit/address/approved/:userid/:addressid/:type"
      element={<EditAddress perma />}
    />
    <Route
      path="edit/address/unapproved/:userid/:addressid/:type"
      element={<EditAddress perma={false} />}
    />
  </Route>
);
// };

export default SuperAdminRoutes;
