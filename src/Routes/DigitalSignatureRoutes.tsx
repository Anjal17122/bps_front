import { Routes, Route } from "react-router-dom";
import SuperAdminHeader from "../Components/Common/Headers/SuperAdminHeader";
import DigitalSignatureDrawings from "../Components/DigitalSignatureLocal/DigitalSignatureDrawings";
import DigitalSignatureLocal from "../Components/DigitalSignatureLocal/DigitalSignatureLocal";
import DigitalSignConsultantLocal from "../Components/DigitalSignatureLocal/DigitalSignConsultantLocal";
import DigitalSignNoticeLocal from "../Components/DigitalSignatureLocal/DigitalSignNoticeLocal";
import SignDrawings from "../Components/DigitalSignatureLocal/SignDrawings";
import DigitalSigners from "../pages/SuperAdmin/FloorRate/DigitalSigners/DigitalSigners";
import DrawingSigners from "../pages/SuperAdmin/FloorRate/DigitalSigners/DrawingSigners";
// import SAwrap from "../Components/Admin/Header/SuperAdminHeader";

export const DigitalSignatureRoutes = () => {
  // const withSA = (
  //   props: any,
  //   component: LazyExoticComponent<ComponentClass<any> | FunctionComponent<any>>
  // ) => <SAwrap component={component} {...props} />;

  //naamsari
  // const DigitalSignatureLocal = lazy(
  //   () => import("../Components/DigitalSignatureLocal/DigitalSignatureLocal")
  // );
  // const DigitalSignNoticeLocal = lazy(
  //   () => import("../Components/DigitalSignatureLocal/DigitalSignNoticeLocal")
  // );

  // const DigitalSignConsultantLocal = lazy(
  //   () =>
  //     import("../Components/DigitalSignatureLocal/DigitalSignConsultantLocal")
  // );

  // const DigitalSignatureDrawings = lazy(
  //   () => import("../Components/DigitalSignatureLocal/DigitalSignatureDrawings")
  // );

  // const DrawingSigners = lazy(
  //   () => import("../Components/SuperAdmin/DigitalSigners/DrawingSigners")
  // );

  // const SignDrawings = lazy(
  //   () => import("../Components/DigitalSignatureLocal/SignDrawings")
  // );

  return (
    <Routes>
      <Route
        path="signconsultant/:pid"
        element={<DigitalSignConsultantLocal />}
      />
      {/* <Route
        path="signpdf/:pid/:name/:type"
        element={<DigitalSignatureLocal />}
      /> */}
      <Route
        path="signnotice/:pid/:chalaninum/:patrasankhya/:date/:type/:filename/:id"
        element={<DigitalSignNoticeLocal />}
      />
      <Route
        path="view/drawings/sign/:pid"
        element={<DigitalSignatureDrawings />}
      />
      <Route
        path="sign/drawings/:pid/:type/:documentid/:signer/:foldertype/:filename/:filetype/:filesize"
        element={<SignDrawings />}
      />
      <Route path="superadmin" element={<SuperAdminHeader />}>
        <Route path="drawing/signers" element={<DrawingSigners />} />
        <Route path="digitalsigners" element={<DigitalSigners />} />
      </Route>
    </Routes>
  );
};
