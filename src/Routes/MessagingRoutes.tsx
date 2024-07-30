import { lazy } from "react";
import { Route } from "react-router-dom";

const AdminHeader = lazy(
  () => import("../Components/Common/Headers/AdminHeader")
);
const MessagingSystem = lazy(
  () => import("../pages/Admin/MessagingSystem/MessagingSystem")
);

// const StoreyRoutes = (props: Props) => {
const MessagingRoutes = (
  <Route path="admin" element={<AdminHeader />}>
    <Route path="messages/:pid" element={<MessagingSystem />} />
  </Route>
);
// };

export default MessagingRoutes;
