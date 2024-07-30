import { lazy } from "react";
import { Route } from "react-router-dom";

export const AdminRoutes = () => {
  const AdminFloorRate = lazy(
    () => import("../pages/Admin/AllAdminViewFloorRate/AllAdminViewFloorRate")
  );

  return (
    <>
      <Route path="admin/floorrate" element={<AdminFloorRate />} />
    </>
  );
};
