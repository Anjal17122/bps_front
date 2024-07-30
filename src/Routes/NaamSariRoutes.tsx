import { lazy } from "react";
import { Route } from "react-router-dom";

const AdminHeader = lazy(
  () => import("../Components/Common/Headers/AdminHeader")
);
const EditNaamSari = lazy(() => import("../pages/Admin/Naamsari/EditNaamSari"));
const Naamsari = lazy(() => import("../pages/Admin/Naamsari/Naamsari"));
const NewNaamSari = lazy(() => import("../pages/Admin/Naamsari/NewNaamSari"));

// export const NaamSariRoutes = () => {
// withAdmin: (
//   props: any,
//   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
// ) => JSX.Element
// const withAdmin = (
//   props: any,
//   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
// ) => <AdminHeader component={component} {...props} />;
// //naamsari
// const Naamsari = lazy(() => import("../pages/Admin/Naamsari/Naamsari"));
// const NewNaamsari = lazy(() => import("../pages/Admin/Naamsari/NewNaamSari"));
// const EditNaamSari = lazy(
//   () => import("../pages/Admin/Naamsari/EditNaamSari")
// );
export const NaamSariRoutes = (
  <Route path="admin" element={<AdminHeader />}>
    <Route path="naamsari" element={<Naamsari />} />
    <Route
      path="newnaamsari/landowner/:pid/:landid"
      element={<NewNaamSari type="owner" />}
    />
    <Route
      path="newnaamsari/homeowner/:pid/:landid"
      element={<NewNaamSari type="houseOwner" />}
    />
    <Route
      path="naamsari/editcurrentlandowner/:pid/:landid"
      element={<EditNaamSari />}
    />
    <Route
      path="naamsari/editcurrenthomeowner/:pid/:landid"
      element={<EditNaamSari />}
    />
  </Route>
);
//   return routes;
// };
