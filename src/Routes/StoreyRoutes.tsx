import { Route } from "react-router-dom";
import { lazy } from "react";

const Cheader = lazy(() => import("../Components/Common/Headers/Cheader"));
const StoreyAdditionDesignFloor = lazy(
  () => import("../pages/Consultant/StoreyAddition/StoreyAdditionDesignFloor")
);
const StoreyUploadFiles = lazy(
  () => import("../pages/Consultant/StoreyAddition/StoreyUploadFiles")
);

// const StoreyRoutes = (props: Props) => {
// const withUser = (
//   props: any,
//   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
// ) => <Cheader component={component} {...props} />;

// const StoreyDesignFloor = lazy(
//   () =>
//     import(
//       "../Components/Consultant/StoreyAddition/StoreyAdditionDesignFloor"
//     )
// );

// const StoreyUploadFiles = lazy(
//   () => import("../Components/Consultant/StoreyAddition/StoreyUploadFiles")
// );

export const StoreyRoutes = (
  <Route path="project" element={<Cheader />}>
    <Route
      path="create/storey/designfloor/:pid"
      element={<StoreyAdditionDesignFloor />}
    />
    <Route path="create/storey/upload/:pid" element={<StoreyUploadFiles />} />
  </Route>
);
// };

// export default StoreyRoutes;
