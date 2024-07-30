import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import {
  HourglassOutlined,
  RetweetOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Tabs, message } from "antd";
import MyInfoBtn from "../../../Common/InfoIcon/MyInfoBtn";
import NotSubmittedTable from "./NotSubmittedTable/NotSubmittedTable";
import SubmittedTable from "./SubmittedTable/SubmittedTable";
import AddRevisionModal from "./ConsultantModals/AddRevisionModal";
import ViewProjectImages from "./ConsultantModals/ViewProjectImages";
import { useStoreModalCon } from "../../../Store/StoreModalCon/StoreModalCon";
import UploadAutoCad from "./ConsultantModals/UploadAutoCad";
import useStoreViewProj from "../../../Store/StoreViewProject/StoreViewProj";
import ViewProjTransLogModal from "../../Admin/OnDeskFinal/AdminViewProjFInal/Modals/ViewProjTransLogModal";
import ViewRemarksModal from "./ConsultantModals/ViewRemarksModal";
import PlinthModalCon from "./ConsultantModals/PlinthModalCon";
import { ShowCommentsModal } from "./ConsultantModals/ShowCommentsModal";
import { useQueryClient } from "@tanstack/react-query";
import { MyQueriesCon } from "../../../constants/MyQueries/MyQueries";
import { ViewProjectCon } from "../../../Services/CreateProjectService";
import { useNavigate } from "react-router-dom";
import { dispatchGlobal } from "../../../Store/StoreGlobal/StoreGlobal";
import { AcG } from "../../../Store/StoreGlobal/types";
import NoticeTableConFinal from "./NoticeTableConFinal/NoticeTableConFinal";
import { useContext } from "react";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import ApprovedTableCon from "./ApprovedTableCon/ApprovedTableCon";
import MuchulkaTableCon from "./MuchulkaTableCon/MuchulkaTableCon";
import ReturnedTableCon from "./ReturnedTableCon/ReturnedTableCon";
import RevisionTableCon from "./RevisionTableCon/RevisionTableCon";
import ViewRevisionDetailsModal from "./ConsultantModals/ViewRevisionDetailsModal";
import { sN } from "../../../Services/ProjectService";
import {
  forwardGetHashFinal,
  forwardWithDigitalSign,
  getReturnedProjectHashFinal,
  sendSignedReturnedProject,
} from "../../../Services/DigitalSignatureService";
import { Common } from "../../../constants/constants";
import SignDocument from "../../../Components/TestWebsocket";
import { isNagarjun } from "../../../constants/CommonFunctions";
import AgreementModal from "../../common/Agreement/AgreementModal";

const ConsultantViewProj = () => {
  const {
    addRevisionModal,
    viewProjectImages,
    viewNoticeRemarks,
    uploadAutoCad,
    plinthModalCon,
    viewComments,
    revisionDetails,
    agreementModalCon,
  } = useStoreModalCon();
  const { projTransferModal } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const CheckCircle = <CheckCircleOutlined style={{ color: "#00d924" }} />;

  // function onForwardProject(id: number) {
  //   submitProject(id.toString(), messageApi).then((res) => {
  //     queryClient.invalidateQueries([
  //       MyQueriesCon.NotSubmitted,
  //       NotSubmittedUrl,
  //     ]);
  //   });
  // }
  const history = useNavigate();

  const { dispatch } = useContext(MyStore);

  // function onReFowardProject(id: number) {
  //   reForwardProj(id.toString(), messageApi).then((res) => {
  //     queryClient.invalidateQueries([
  //       MyQueriesCon.ReturnedCon,
  //       NotSubmittedUrl,
  //     ]);
  //   });
  // }

  function onReFowardProject(id: number) {
    isNagarjun()
      ? sendSignedReturnedProject(id, {}, messageApi)
      : getReturnedProjectHashFinal(id, messageApi).then((res) => {
          const successCallback = (msg: string, id: sN, hashedVal: string) => {
            const siglast = msg.indexOf(Common);
            const sig = msg.substring(10, siglast);
            sendSignedReturnedProject(
              id,
              {
                hashedValue: hashedVal,
                signature: sig,
              },
              messageApi
            ).then(() => {
              queryClient.invalidateQueries({
                queryKey: [MyQueriesCon.ReturnedCon],
              });
            });
          };
          SignDocument(res.data, id, successCallback);
          messageApi.success(res.message);
        });
  }

  function onForwardProject(id: number) {
    isNagarjun()
      ? forwardWithDigitalSign(id, {}, messageApi)
      : forwardGetHashFinal(id, messageApi).then((res) => {
          const successCallback = (msg: string, id: sN, hashedVal: string) => {
            const siglast = msg.indexOf(Common);
            const sig = msg.substring(10, siglast);
            forwardWithDigitalSign(
              id,
              { hashedValue: hashedVal, signature: sig },
              messageApi
            ).then(() => {
              queryClient.invalidateQueries({
                queryKey: [MyQueriesCon.NotSubmitted],
              });
            });
          };
          SignDocument(res.data, id, successCallback);
        });
  }

  const onViewProject = (id: number) => {
    ViewProjectCon(id.toString(), messageApi).then((res) => {
      localStorage.setItem("ProjectType", res.data.type);
      localStorage.setItem("isPerma", "true");
      localStorage.setItem("showBothBtns", "true");
      // if (res.data.type === ProjectType.e) {
      //   localStorage.setItem("ProjectType", ProjectType.e);
      // }
      localStorage.setItem("adminViewProject", JSON.stringify(res.data));
      dispatchGlobal({
        type: AcG.setProjectData,
        payload: res.data,
      });
      dispatch({
        type: ActionType.getProject,
        payload: res.data,
      });
      history("/user/view/project/projectdetails/" + id.toString());
    });
  };

  return (
    <div>
      {contextHolder}
      {addRevisionModal ? <AddRevisionModal /> : null}
      {viewProjectImages ? <ViewProjectImages /> : null}
      {viewNoticeRemarks ? <ViewRemarksModal /> : null}
      {uploadAutoCad ? <UploadAutoCad /> : null}
      {projTransferModal ? <ViewProjTransLogModal /> : null}
      {plinthModalCon ? <PlinthModalCon /> : null}
      {viewComments ? <ShowCommentsModal /> : null}
      {revisionDetails ? <ViewRevisionDetailsModal /> : null}
      {agreementModalCon ? <AgreementModal /> : null}

      <PageHeader
        title="Submitted Projects"
        subTitle="Projects submitted to Municipality"
      />

      <div className="CenterFormsm">
        <Tabs
          className="tabs"
          type="card"
          defaultActiveKey="1"
          items={[
            // Not Submitted
            {
              key: "1",
              label: (
                <span>
                  Not Submitted &nbsp;
                  <HourglassOutlined style={{ color: "darkblue" }} />
                </span>
              ),
              children: (
                <>
                  <NotSubmittedTable onForwardProject={onForwardProject} />
                </>
              ),
            },
            //  Submitted
            {
              key: "2",
              label: (
                <span>
                  Submitted &nbsp;
                  <CheckCircleFilled style={{ color: "#00d924" }} />
                </span>
              ),
              children: (
                <>
                  <SubmittedTable onViewProject={onViewProject} />
                </>
              ),
            },
            // Notice
            {
              key: "3",
              label: (
                <span>
                  {CheckCircle}
                  Notice &nbsp;{" "}
                  <CheckCircleFilled style={{ color: "#00d924" }} />
                </span>
              ),
              children: (
                <>
                  <NoticeTableConFinal onViewProject={onViewProject} />
                </>
              ),
            },
            {
              key: "4",
              label: (
                <span>
                  {CheckCircle}
                  Muchulka &nbsp;
                  <MyInfoBtn info="Muchulka Uploaded Projects" />
                </span>
              ),
              children: (
                <>
                  <MuchulkaTableCon onViewProject={onViewProject} />
                </>
              ),
            },
            {
              key: "5",
              label: (
                <span>
                  {CheckCircle}
                  Approved &nbsp;
                  <MyInfoBtn info="Project Approved by Executive" />
                </span>
              ),
              children: (
                <>
                  <ApprovedTableCon onViewProject={onViewProject} />
                </>
              ),
            },
            {
              key: "6",
              label: (
                <span>
                  <RetweetOutlined style={{ color: "red" }} />
                  Returned &nbsp;
                  <MyInfoBtn info="Projects Returned to Consultant by Commenting" />
                </span>
              ),
              children: (
                <>
                  <ReturnedTableCon onForwardProject={onReFowardProject} />
                </>
              ),
            },
            {
              key: "7",
              label: (
                <span>
                  <RetweetOutlined style={{ color: "red" }} />
                  Revision &nbsp;
                  <MyInfoBtn info="Revision of Approved Projects" />
                </span>
              ),
              children: (
                <>
                  <RevisionTableCon onViewProject={onViewProject} />
                </>
              ),
            },
          ]}
        ></Tabs>
      </div>
    </div>
  );
};

export default ConsultantViewProj;
