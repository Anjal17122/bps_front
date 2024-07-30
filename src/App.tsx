import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./Common/Footer/Footer";

import "./Assets/scss/Table.scss";
import "./Assets/scss/CSSApp.scss";
import "./Assets/scss/CommonComponents.scss";
import "./Assets/scss/MyPageHeaderFinal.scss";
import "./Assets/scss/NewNaamSari.scss";
import "./Assets/scss/Pages.scss";
import "./Assets/scss/MoreMenu.scss";
import "./Assets/scss/PlinthModal.scss";
import "./Assets/scss/TableFloor.scss";
import "./Assets/scss/HomeNav.scss";

import { NaamSariRoutes } from "./Routes/NaamSariRoutes";
import SuperAdminRoutes from "./Routes/SuperAdminRoutes";
import ConTechnicalRoutes from "./Routes/ConTechnicalRoutes";
import {
  ConModalRoutes,
  ConUptoLand,
  ConUptoLandModal,
} from "./Routes/ConUptoLandRoutes";
import { StoreyRoutes } from "./Routes/StoreyRoutes";
import MessagingRoutes from "./Routes/MessagingRoutes";
import { AdminPublic } from "./Routes/AdminPublic";
import {
  ConsultantRoutes,
  LandInfoAdmin,
  ViewApplicantAdmin,
  ViewCharkillaAd,
  ViewProject,
} from "./Routes/ConsultantRoutes";
import { FallbackLoader } from "./Components/Common/FallbackLoader/FallbackLoader";
import StampPdfOnly from "./Components/DigitalSignatureLocal/StampPdfOnly";
import SarjiminMuchulkaPDF from "./pages/common/FinalPDF/Nagarjung/SarjiminMuchulkaPDF";
import NewMuchulkaPDF from "./pages/common/FinalPDF/Nagarjung/NewMuchulkaPDF";
import SignMuchulka from "./pages/Admin/ProjectActionsAdmin/UploadCertificate/SignMuchulka";
import VideoPlayer from "./Components/Common/VideoPlayer";
import { isNagarjun } from "./constants/CommonFunctions";
import FinalPDFNoticeNagarjun from "./pages/common/FinalPDF/NoticePDFDesign/FinalPDFNoticeNagarjun";
import FinalPDFNaamsariNagarjun from "./pages/common/FinalPDF/Nagarjung/FinalPDFNaamsariNagarjun";
import OldPermitPlinth from "./pages/common/OldPermit/OldPermitPlinth";
import OldPermitSuperSt from "./pages/common/OldPermit/OldPermitSuperSt";
import PlinthTippaniFinal from "./pages/common/FinalPDF/Dhulikhel/PlinthTippaniFinal";
import SuperStTippaniFinal from "./pages/common/FinalPDF/Dhulikhel/SuperStTippani";
import FinalRegularPdf from "./pages/common/FinalPDF/Nagarjung/FinalRegularPdf";
import ConsultantViewDrawings from "./Components/Consultant/Notification/ConsultantViewDrawings";
import NirmanSampannaTippaniPdf from "./pages/common/FinalPDF/Dhulikhel/NirmanSampannaTippaniPdf";
import AgreementPdf from "./pages/common/Agreement/AgreementPdf";
import FinalReportPdf from "./Common/PrintPdf/FinalReportPdf";
import { BuildingCompletionReportPdf } from "./pages/common/FinalPDF/DhulikhelBuildingCompletionReport/BuildingCompletionReportPdf";
import FinalBuildingCompleteReport from "./pages/common/FinalPDF/DhulikhelBuildingCompletionReport/FinalBuildingCompletionReport";
import AddBuildingReport from "./pages/Consultant/ProjectCreate/ConBuildingReport/AddConBuildingReport";
import EditBuildingReport from "./pages/Consultant/ProjectCreate/ConBuildingReport/EditBuildingReport";
import DigitalSignExtra from "./Components/DigitalSignatureLocal/DigitalSignExtra";

const FinalAbhilekikaran = lazy(
  () =>
    import("./pages/common/FinalPDF/AbhilekhikaranPDFDesign/FinalAbhilekikaran")
);
const ModalWrapper = lazy(() => import("./Common/Wrapper/ModalWrapper"));
const AdminHeader = lazy(
  () => import("./Components/Common/Headers/AdminHeader")
);
const Cheader = lazy(() => import("./Components/Common/Headers/Cheader"));

// const TestPdfSignatures = lazy(() => import("./Test/TestPdfSignatures"));

//only Digital sign routes
const DigitalSignConsultantLocal = lazy(
  () => import("./Components/DigitalSignatureLocal/DigitalSignConsultantLocal")
);
const DigitalSignatureLocal = lazy(
  () => import("./Components/DigitalSignatureLocal/DigitalSignatureLocal")
);
const DigitalSignNoticeLocal = lazy(
  () => import("./Components/DigitalSignatureLocal/DigitalSignNoticeLocal")
);
const SuperAdminHeader = lazy(
  () => import("./Components/Common/Headers/SuperAdminHeader")
);
const DigitalSignatureDrawings = lazy(
  () => import("./Components/DigitalSignatureLocal/DigitalSignatureDrawings")
);
const SignDrawings = lazy(
  () => import("./Components/DigitalSignatureLocal/SignDrawings")
);
const DrawingSigners = lazy(
  () => import("./pages/SuperAdmin/FloorRate/DigitalSigners/DrawingSigners")
);
const DigitalSigners = lazy(
  () => import("./pages/SuperAdmin/FloorRate/DigitalSigners/DigitalSigners")
);

export const AddPlinth = lazy(
  () => import("./pages/Consultant/ApprovedTab/PlinthForm/AddPlinth")
);
const PublicNav = lazy(() => import("./Common/HomeNav/PublicHeader"));
const LandingPage = lazy(
  () => import("./pages/common/LandingPage/LandingPage")
);
const PublicDownloads = lazy(
  () => import("./pages/Public/PublicDownloads/PublicDownloads")
);
const PubNotice = lazy(() => import("./pages/Public/PublicNotice/PubNotice"));
const PublicFaq = lazy(() => import("./pages/Public/PublicFaq/PublicFaq"));
const ViewUsers = lazy(() => import("./pages/Admin/Consultants/ViewUsers"));

const AdminViewOneTabFinal = lazy(
  () =>
    import("./pages/Admin/OnDeskFinal/AdminViewProjFInal/AdminViewProjOnDesk")
);

export const ViewPlinthForm = lazy(
  () => import("./pages/Consultant/ApprovedTab/PlinthForm/ViewPlinthForm")
);

export const EditPlinthForm = lazy(
  () => import("./pages/Consultant/ApprovedTab/PlinthForm/EditPlinth")
);

export const DesignFloorAdmin = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/DesignFloor/DesignFloorAdmin"
    )
);
export const PlinthPratibedan = lazy(
  () => import("./pages/Consultant/ApprovedTab/PlinthForm/PlinthPratibedan")
);
const ForgotPassword1 = lazy(
  () => import("./pages/common/forgot_password/ForgotPassword1")
);
const ForgotPassword2 = lazy(
  () => import("./pages/common/forgot_password/ForgotPassword2")
);
export const ViewLandOwnersAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Project/LandOwner/ViewOwnersAd"
    )
);
export const ViewBylawsAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/BuildingByLaws/ViewBylawsAd"
    )
);
export const ViewArchitecturalAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/Architectural/ViewArchitecturalAd"
    )
);
export const ViewStructuralAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/Structural/ViewStructuralAd"
    )
);
export const ViewElectricalAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/Electrical/ViewElectricalAd"
    )
);
export const ViewSanitationAd = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/Sanitation/ViewSanitationAd"
    )
);
export const ViewUploadsAdmin = lazy(
  () =>
    import(
      "./pages/Admin/ViewProject/Consultant/Technical/UploadedFiles/ViewUploadsAdmin"
    )
);

const ConsultantChange = lazy(
  () => import("./pages/Admin/ConsultantChange/ConsultantChange")
);
const ExcelExport = lazy(() => import("./pages/Admin/ExportExcel/ExcelExport"));
const TechnicalMemAdmin = lazy(
  () => import("./pages/SuperAdmin/TechnicalMembers/TechnicalMemAdmin")
);
const EditAddress = lazy(
  () => import("./pages/Consultant/ProjectCreate/Address/EditAddress")
);
const ViewProfile = lazy(() => import("./pages/common/Profile/ViewProfile"));
// const EditProfile = lazy(() => import("./pages/common/Profile/EditProfile"));
const Faq = lazy(() => import("./pages/Public/Faq/Faq"));
const PublicMessages = lazy(
  () => import("./pages/Admin/PublicMessages/PublicMessages")
);
const SelectProjectType = lazy(
  () => import("./pages/Consultant/ProjectCreate/SelectProjectType")
);

export const AddSuperStructure = lazy(
  () =>
    import(
      "./pages/Consultant/ProjectCreate/ConSuperStructure/AddSuperStructure"
    )
);
const GetVersion = lazy(() => import("./Common/GetVersion"));

const Downloads = lazy(() => import("./pages/Admin/Downloads/Downloads"));

const Notice = lazy(() => import("./pages/Admin/Notice/Notice"));
const ChangePassword = lazy(
  () => import("./pages/common/ChangePassword/ChangePassword")
);
const EsewaButton = lazy(
  () => import("./pages/Consultant/ProjectActionsCon/Esewa/EsewaButton")
);
const EsewaSuccessPage = lazy(
  () => import("./pages/Consultant/ProjectActionsCon/Esewa/EsewaSuccessPage")
);
const PayEsewaPage = lazy(
  () => import("./pages/Consultant/ProjectActionsCon/Esewa/PayEsewaPage")
);
export const EditSuperSt = lazy(
  () => import("./pages/Consultant/ProjectCreate/ConSuperStructure/EditSuperSt")
);
export const ViewSuperSt = lazy(
  () => import("./pages/Consultant/ProjectCreate/ConSuperStructure/ViewSuperSt")
);
const EditUser = lazy(
  () => import("./pages/Consultant/ProjectCreate/EditUser/EditUser")
);
const Register = lazy(() => import("./pages/Consultant/Register/Register"));
const Signin = lazy(() => import("./pages/common/Login/Login"));

const ViewPublicNotice = lazy(
  () => import("./pages/Public/PublicNotice/ViewPublicNotice")
);
const FinalPDFNotice = lazy(
  () => import("./pages/common/FinalPDF/NoticePDFDesign/FinalPDFNotice")
);
const FinalPDFPlinth = lazy(
  () => import("./pages/common/FinalPDF/FinalPDFPlinth")
);
const FinalPDFSuperSt = lazy(
  () => import("./pages/common/FinalPDF/FinalPDFSuperSt")
);
const FinalPDFNirman = lazy(
  () => import("./pages/common/FinalPDF/NirmanSampanaPDFDesign/FinalPDFNirman")
);

const AdminFloorRate = lazy(
  () => import("./pages/Admin/AllAdminViewFloorRate/AllAdminViewFloorRate")
);
const UploadCertificate = lazy(
  () =>
    import(
      "./pages/Admin/ProjectActionsAdmin/UploadCertificate/UploadCertificate"
    )
);
const UploadNotice = lazy(
  () =>
    import("./pages/Admin/ProjectActionsAdmin/UploadCertificate/UploadNotice")
);
const ResetPasswordLink = lazy(
  () => import("./pages/common/forgot_password/ResetPasswordLink")
);
const AddLandOwner = lazy(
  () =>
    import("./pages/Consultant/ProjectCreate/Project/LandOwner/AddLandOwner")
);
const AddOrganizationOwner = lazy(
  () =>
    import(
      "./pages/Consultant/ProjectCreate/Project/LandOwner/AddOrganizationOwner"
    )
);
const EditOrgOwner = lazy(
  () =>
    import("./pages/Consultant/ProjectCreate/Project/LandOwner/EditOrgOwner")
);
const RegisterAdmin = lazy(
  () => import("./pages/Admin/RegisterAdmin/RegisterAdmin")
);

const AdminViewProjFinal = lazy(
  () =>
    import("./pages/Admin/OnDeskFinal/AdminViewProjFInal/AdminViewProjFinal")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="oldpermitpdf/plinth/:id" element={<OldPermitPlinth />} />
          <Route path="check/pdf" element={<DigitalSignExtra />} />

          <Route path="tippani/plinth/:pid" element={<PlinthTippaniFinal />} />
          <Route path="agreementpdf/:pid/:date" element={<AgreementPdf />} />
          <Route
            path="buildingreport/generate/:pid"
            element={<FinalBuildingCompleteReport />}
          />
          <Route
            path="buildingreport/generate/:pid"
            element={<AddBuildingReport />}
          />
          <Route
            path="consultant/signed/drawings/:pid"
            element={<ConsultantViewDrawings />}
          />

          <Route
            path="tippani/superstructure/:pid"
            element={<SuperStTippaniFinal />}
          />
          <Route
            path="tippani/nirman_sampanna/:pid"
            element={<NirmanSampannaTippaniPdf />}
          />

          <Route path="regularpdf/:pid" element={<FinalRegularPdf />} />

          <Route path="tutorial/:video" element={<VideoPlayer />} />
          <Route
            path="permit/plinthpdf/:pid/:projectType/:buildingPurpose"
            element={<OldPermitPlinth />}
          />
          <Route
            path="permit/superstructurepdf/:pid/:projectType/:buildingPurpose"
            element={<OldPermitSuperSt />}
          />
          <Route path="admin/register" element={<RegisterAdmin />} />
          <Route
            path="admin/naamsari/generate/:pid"
            element={<FinalPDFNaamsariNagarjun />}
          />
          <Route path="admin/stamp" element={<StampPdfOnly />} />
          <Route path="admin/sign/:type/:pid" element={<SignMuchulka />} />
          <Route
            path="admin/pdf/generate/muchulka/:pid"
            element={<NewMuchulkaPDF />}
          />
          <Route
            path="admin/pdf/generate/sarjamin/:pid"
            element={<SarjiminMuchulkaPDF />}
          />
          <Route
            path="project/create/addlandowner/:pid/:landid"
            element={<AddLandOwner />}
          />
          <Route
            path="project/create/addorgowner/:landid"
            element={<AddOrganizationOwner />}
          />

          <Route
            path="project/create/house/addorgowner/:landid"
            element={<AddOrganizationOwner houseOwner />}
          />
          <Route element={<PublicNav />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          {ConUptoLand}
          {ConUptoLandModal}
          {ConModalRoutes}
          {NaamSariRoutes}
          <Route
            path="noticepdf/:pid/:chalanino/:patrasankhya/:date/:type"
            element={
              isNagarjun() ? <FinalPDFNoticeNagarjun /> : <FinalPDFNotice />
            }
          />
          <Route
            path="plinthpdf/:pid/:projectType/:buildingPurpose"
            element={<FinalPDFPlinth />}
          />
          <Route
            path="superstructurepdf/:pid/:projectType/:buildingPurpose"
            element={<FinalPDFSuperSt />}
          />
          <Route
            path="buildingcompletepdf/:pid/:projectType/:buildingPurpose"
            element={<FinalPDFNirman />}
          />
          <Route
            path="abhilekhikaranpdf/:pid"
            element={<FinalAbhilekikaran />}
          />
          {/* <DigitalSignatureRoutes /> */}
          <Route
            path="signconsultant/:pid"
            element={<DigitalSignConsultantLocal />}
          />
          <Route
            path="signpdf/:pid/:chalaniId/:name/:type"
            element={<DigitalSignatureLocal />}
          />
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
          {/* <AdminRoutes /> */}
          <Route path="admin/floorrate" element={<AdminFloorRate />} />
          {/* <UploadCertRoutes /> */}
          <Route
            path="upload/certificate/:certificatetype/:pid/:id/:projectType/:buildingPurpose/:filename"
            element={<UploadCertificate />}
          />
          <Route
            path="upload/notice/:certificatetype/:pid/:id/:projectType/:buildingPurpose/:filename/:patrasankhya/:chalanino/:date"
            element={<UploadNotice />}
          />
          {StoreyRoutes}
          {MessagingRoutes}
          {ConTechnicalRoutes}
          {SuperAdminRoutes}
          {/* Edit User */}
          {/* <Route path="/editperson/:id" element={<EditPerson/>} /> */}
          <Route path="changepassword" element={<ChangePassword />} />
          {/* <Route path="editprofile" element={<EditProfile />} /> */}
          <Route path="view/profile" element={<ViewProfile />} />
          {/* <Route path="testwebsocket" element={<TestWebsocket />} /> */}
          <Route path="getversion" element={<GetVersion />} />
          {/* Esewa Links */}
          <Route path="consultant/esewa" element={<EsewaButton />} />
          <Route path="consultant/payesewa" element={<PayEsewaPage />} />
          <Route
            path="page/esewa_payment_success"
            element={<EsewaSuccessPage />}
          />
          <Route path="consultant/menu" element={<SelectProjectType />} />
          <Route path="user/edit/:personid" element={<EditUser />} />
          <Route path="org/edit/:personid" element={<EditOrgOwner />} />
          <Route
            path="address/edit/:userid/:addressid/:type"
            element={<EditAddress perma={true} />}
          />
          <Route path="public" element={<PublicNav />}>
            <Route
              path="resetpassword/:token"
              element={<ResetPasswordLink />}
            />
            <Route path="forgotpassword-step1" element={<ForgotPassword1 />} />

            <Route path="forgotpassword-step2" element={<ForgotPassword2 />} />
            <Route path="downloads" element={<PublicDownloads />} />
            <Route path="notice" element={<PubNotice />} />
            <Route path="viewnotice" element={<ViewPublicNotice />} />
            <Route path="faqs" element={<PublicFaq />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Signin />} />
          </Route>
          <Route path="admin" element={<AdminHeader />}>
            <Route path="technicalmembers" element={<TechnicalMemAdmin />} />
            <Route path="exportdata" element={<ExcelExport />} />
            <Route path="consultantchange" element={<ConsultantChange />} />
            <Route path="view/user" element={<ViewUsers />} />
            <Route path="messages" element={<PublicMessages />} />
            <Route path="notice" element={<Notice />} />
            <Route path="faq" element={<Faq />} />
            <Route
              path="adminpanel/technical"
              element={<AdminViewProjFinal />}
            />
            <Route
              path="adminpanel/ondesk"
              element={<AdminViewOneTabFinal />}
            />
            <Route path="adminpanel/ward" element={<AdminViewOneTabFinal />} />
            <Route path="users" element={<ViewUsers />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="viewplinth/:pid" element={<ViewPlinthForm />} />
            <Route path="viewsuperst/:pid" element={<ViewSuperSt />} />
            <Route
              path="view/project/projectdetails/:pid"
              element={<ViewProject admin />}
            />
            <Route
              path="viewproject/applicant/:pid"
              element={<ViewApplicantAdmin admin />}
            />
            <Route
              path="viewproject/land/:pid"
              element={<LandInfoAdmin admin />}
            />
            <Route
              path="viewproject/charkilla/:pid"
              element={<ViewCharkillaAd admin />}
            />
            <Route
              path="viewproject/owners/:pid"
              element={<ViewLandOwnersAd admin />}
            />
            <Route
              path="viewproject/floor/:pid"
              element={<DesignFloorAdmin admin />}
            />
            <Route
              path="viewproject/bylaws/:pid"
              element={<ViewBylawsAd admin />}
            />
            <Route
              path="viewproject/architectural/:pid"
              element={<ViewArchitecturalAd admin />}
            />
            <Route
              path="viewproject/structural/:pid"
              element={<ViewStructuralAd admin />}
            />
            <Route
              path="viewproject/electrical/:pid"
              element={<ViewElectricalAd admin />}
            />
            <Route
              path="viewproject/sanitation/:pid"
              element={<ViewSanitationAd admin />}
            />
            <Route
              path="viewproject/uploads/:pid"
              element={<ViewUploadsAdmin admin />}
            />
          </Route>
          <Route path="user" element={<Cheader />}>
            {ConsultantRoutes}
          </Route>
          <Route path="admin" element={<ModalWrapper />}>
            {AdminPublic}
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route
  path="/user/addsuperst/:pid"
  element={(props: any) => withUser({ ...props }, AddSuperSt)}
/> */
}
