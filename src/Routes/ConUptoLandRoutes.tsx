import { Route } from "react-router-dom";
import { lazy } from "react";
import OldPermit from "../pages/common/OldPermit/OldPermit";
import EditOldPermit from "../pages/common/OldPermit/EditOldPermit";
import ViewOldPermit from "../pages/common/OldPermit/ViewOldPermit";

const Cheader = lazy(() => import("../Components/Common/Headers/Cheader"));
const ModalWrapper = lazy(() => import("../Common/Wrapper/ModalWrapper"));
const Applicant = lazy(
  () => import("../pages/Consultant/ProjectCreate/Applicant/Applicant")
);
const ViewApplicant = lazy(
  () => import("../pages/Consultant/ProjectCreate/Applicant/ViewApplicant")
);
const AddCharkilla = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/Project/Charkilla/AddCharkilla")
);
const Charkilla = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/Charkilla/Charkilla")
);
const Create = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/Create/Create")
);
const EditProject = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/Create/EditProject")
);
const EditProject2 = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/Create/EditProject2")
);
const ViewCreate = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/Create/ViewCreate")
);
const AddLandInfo = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/LandInfo/AddLandInfo")
);
const EditLandInfo = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/LandInfo/EditLand")
);
const LandInfo = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/LandInfo/LandInfo")
);
const AddHomeOwner = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/Project/LandOwner/AddHomeOwner")
);
const LandOwners = lazy(
  () => import("../pages/Consultant/ProjectCreate/Project/LandOwner/LandOwners")
);
const SelectProjectType = lazy(
  () => import("../pages/Consultant/ProjectCreate/SelectProjectType")
);
const SearchStoreyAddition = lazy(
  () => import("../pages/Consultant/StoreyAddition/SearchStoreyAddition")
);

// const router = createBrowserRouter([
//   {
//     path: "project",
//     element: <Cheader />,
//     children: [
//       {
//         path: "create/project/:type",
//         element: <Create />,
//       }, {
//         path: "create/search/storeyaddition",
//         element: <SearchStoreyAddition />,
//       }, {
//         path: "create/project",
//         element: <SelectProjectType />,
//       }, {
//         path: "edit/project/:pid",
//         element: <EditProject />,
//       }, {
//         path: "createasdadsadasd",
//         element: <Create />,
//       },
//     ],
//   },
// ]);
export const ConUptoLand = (
  <Route path="project" element={<Cheader />}>
    <Route
      path="create/search/storeyaddition"
      element={<SearchStoreyAddition />}
    />
    <Route path="create/project" element={<SelectProjectType />} />
    <Route path="create/permit/:type" element={<OldPermit />} />
    {/* <Route path="permit/add" element={<OldPermit />} /> */}
    <Route path="permit/edit/:id" element={<EditOldPermit />} />
    <Route path="permit/view/:id" element={<ViewOldPermit />} />
    <Route path="edit/project/:pid" element={<EditProject />} />
    <Route path="view/project/:pid" element={<ViewCreate />} />
    <Route path="edit/supervisor/:pid" element={<EditProject2 />} />
    {/* <Route path="view/project/:pid/:tempId" element={<ViewCreate  />} /> */}
    <Route path="create/applicant/:pid" element={<ViewApplicant />} />

    <Route path="create/landinfo/:pid" element={<LandInfo />} />
    <Route path="edit/landinfo/:pid/:landid" element={<EditLandInfo />} />
    <Route path="create/charkilla/:pid" element={<Charkilla />} />
    <Route path="create/landowners/:pid" element={<LandOwners />} />
    <Route path="create/project/:type" element={<Create />} />
    <Route path="create/landinfo/:pid/:tempId" element={<LandInfo oldData />} />
    <Route path="view/project/:pid/:tempId" element={<ViewCreate oldData />} />
    <Route
      path="create/applicant/:pid/:tempId"
      element={<ViewApplicant oldData />}
    />
    <Route
      path="edit/landinfo/:pid/:tempId/:landid"
      element={<EditLandInfo />}
    />
    <Route
      path="create/charkilla/:pid/:tempId"
      element={<Charkilla oldData />}
    />
    <Route
      path="create/landowners/:pid/:tempId"
      element={<LandOwners oldData />}
    />
  </Route>
);
export const ConUptoLandModal = (
  <Route path="project" element={<ModalWrapper width={"100%"} />}>
    <Route path="add/applicant/:pid" element={<Applicant />} />
    <Route path="create/addhomeowner/:pid/:landid" element={<AddHomeOwner />} />
  </Route>
);

export const ConModalRoutes = (
  <Route path="project" element={<ModalWrapper width={800} />}>
    <Route path="create/addlandinfo/:pid" element={<AddLandInfo />} />
    <Route path="create/addcharkilla/:pid" element={<AddCharkilla />} />
  </Route>
);
