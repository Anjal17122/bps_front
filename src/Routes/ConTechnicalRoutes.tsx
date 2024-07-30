import { lazy } from "react";
import { Route } from "react-router-dom";

const Cheader = lazy(() => import("../Components/Common/Headers/Cheader"));
const Architectural = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/Technical/Architectural/Architectural"
    )
);
const BuildingByLaws = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/Technical/BuildingByLaws/BuildingByLaws"
    )
);
const DesignFloor = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/Technical/DesignFloor/DesignFloor"
    )
);
const EditDesignFloor = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/Technical/DesignFloor/EditDesignFloor"
    )
);
const Electrical = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/Technical/Electrical/Electrical")
);
const Sanitation = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/Technical/Sanitation/Sanitation")
);
const Structural = lazy(
  () =>
    import("../pages/Consultant/ProjectCreate/Technical/Structural/Structural")
);
const UploadFiles = lazy(
  () =>
    import(
      "../pages/Consultant/ProjectCreate/Technical/UploadFiles/UploadFiles"
    )
);

// const ConTechnicalRoutes = (props: Props) => {
const ConTechnicalRoutes = (
  <Route path="project" element={<Cheader />}>
    <Route path="create/designfloor/:pid" element={<DesignFloor />} />
    <Route path="edit/designfloor/:pid" element={<EditDesignFloor />} />
    <Route path="create/buildingbylaws/:pid" element={<BuildingByLaws />} />
    <Route path="create/architectural/:pid" element={<Architectural />} />
    <Route path="create/structural/:pid" element={<Structural />} />
    <Route path="create/electrical/:pid" element={<Electrical />} />
    <Route path="create/sanitation/:pid" element={<Sanitation />} />
    <Route path="create/uploadfiles/:pid" element={<UploadFiles />} />
    {/* <Route path="create/designfloor/:pid/:tempId" element={<DesignFloor />} />
    <Route path="edit/designfloor/:pid/:tempId" element={<EditDesignFloor />} />
    <Route
      path="create/buildingbylaws/:pid/:tempId"
      element={<BuildingByLaws />}
    />
    <Route
      path="create/architectural/:pid/:tempId"
      element={<Architectural />}
    />
    <Route path="create/structural/:pid/:tempId" element={<Structural />} />
    <Route path="create/electrical/:pid/:tempId" element={<Electrical />} />
    <Route path="create/sanitation/:pid/:tempId" element={<Sanitation />} />
    <Route path="create/uploadfiles/:pid/:tempId" element={<UploadFiles />} /> */}
  </Route>
);
// };

export default ConTechnicalRoutes;
