import {
  CheckCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Cascader, Tabs, TabsProps, message } from "antd";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import { toList } from "../../../../Common/Form/FormData";
import { FilterWards } from "../../../../Common/Constants";
import OnDeskTableFinal from "./OnDeskFinal/OnDeskTableFinal";
import RevisionTableFinal from "./RevisionTableFinal/RevisionTableFinal";
import { getProject } from "../OnDeskService/OnDeskService/OnDeskService";
import { useNavigate } from "react-router-dom";
import { ActionType, MyStore } from "../../../../Store/ContextApi";
import { ProjectType } from "../../../Consultant/ProjectCreate/SelectProjectType";
import { useContext } from "react";
import PageHeader from "../../../../Components/Common/PageHeader/PageHeader";
import useStoreViewProj from "../../../../Store/StoreViewProject/StoreViewProj";
import RevenueModalFinal from "./Modals/RevenueModalFinal";
import ViewProjTransLogModal from "./Modals/ViewProjTransLogModal";
import NapiModalFinal from "./Modals/NapiModalFinal";
import SearchBar from "./SearchBar/SearchBar";
import { useStoreModal } from "../../../../Store/StoreModal/StoreModal";
import AddDartaNoModalFinal from "./Modals/AddDartaNoModalFinal";
import AdditionalDocumentsModalFinal from "./Modals/AdditionalDocumentsModalFinal";
import PlinthModalFinal from "./Modals/ApprovedModal/PlinthModalFinal";
import { CommentsModalFinal } from "./Modals/CommentsModalFinal";
import ImagesProjModal from "./Modals/ImagesProjModal";
import MuchulkaViewNoticeModal from "./Modals/MuchulkaModal/MuchulkaViewNoticeModal";
import MuchulkaUploadModalFinal from "./Modals/MuchulkaUploadModalFinal";
import NoticePubModalFinal from "./Modals/NoticePubModalFinal";
import MuchulkaNoticeModalFinal from "./Modals/NoticeTabModals/MuchulkaNoticeModalFinal";
import MuchulkaRemarksModal from "./Modals/NoticeTabModals/MuchulkaRemarksModal";
import RevisionStatusModalFinal from "./Modals/RevisionModalsAdmin/RevisionStatusModalFinal";
import ViewRevisionModalFinal from "./Modals/RevisionModalsAdmin/ViewRevisionModalFinal";
import ViewAutoCadModal from "./Modals/ViewAutoCadModal";
import MuchulkaTableFinal from "./MuchulkaTableFinal/MuchulkaTableFinal";
import NoticeTableFinal from "./NoticeTableFinal/NoticeTableFinal";
import ApprovedTableFinal from "./ApprovedTableFinal/ApprovedTableFinal";
import NirmanSampannaTableFinal from "./ApprovedTableFinal/NirmanSampannaTableFinal";
import PlinthTableFinal from "./ApprovedTableFinal/PlinthTableFinal";
import SuperStructureTableFinal from "./ApprovedTableFinal/SuperStructureTableFinal";
import NewMuchulkaModal from "./Modals/NewMuchulkaModal";
import SarjiminMuchulkaModal from "./Modals/SarjiminMuchulkaModal";
import DigitalSignatureTableFinal from "./DigitalSignatureTableFinal/DigitalSignatureTableFinal";
import { isNagarjun } from "../../../../constants/CommonFunctions";
import AllTableFinal from "./AllProjectFinal/AllTableFinal";

const AdminViewProjOnDesk = () => {
  const history = useNavigate();
  const { dispatch } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();

  const onViewProject = (id: number) => {
    getProject(id.toString(), messageApi).then((res) => {
      if (res.data.type === ProjectType.e) {
        localStorage.setItem("ProjectType", ProjectType.e);
        localStorage.setItem("isPerma", "true");
        localStorage.setItem("isNotice", "true");
        localStorage.setItem("showBothBtns", "true");
        localStorage.setItem("onlyTechnical", "");
      }
      dispatch({
        type: ActionType.getProject,
        payload: res.data,
      });
      localStorage.setItem("adminViewProject", JSON.stringify(res.data));
      history("/admin/view/project/projectdetails/" + id.toString());
    });
  };

  const {
    projTransferModal,
    revenueModal,
    napiModal,
    autocadModal,
    additionalDocsModal,
    imagesModal,
    commentsModal,
    addDartaNoModal,
    muchulkaModal,
    noticePubModal,
    newMuchulka,
    sarjiminMuchulka,
  } = useStoreViewProj();

  const {
    muchulkaNoticeModal,
    noticeMuchulkaRemarks,
    muchulkaViewNotice,
    approvedPlinthModal,
    revisionViewDetails,
    revisionStatusModal,
  } = useStoreModal();

  const CheckCircle = <CheckCircleOutlined style={{ color: "#00d924" }} />;

  const approvedItems: TabsProps["items"] = [
    {
      key: "1111",
      label: `Approved`,
      children: (
        <>
          <SearchBar type="Approved" />
          <ApprovedTableFinal onViewProject={onViewProject} />,
        </>
      ),
    },
    {
      key: "1112",
      label: `Plinth`,
      children: (
        <>
          <SearchBar type="Plinth" />
          <PlinthTableFinal onViewProject={onViewProject} />,
        </>
      ),
    },
    {
      key: "1113",
      label: `SuperStructure`,
      children: (
        <>
          <SearchBar type="SuperStructure" />
          <SuperStructureTableFinal onViewProject={onViewProject} />,
        </>
      ),
    },
    {
      key: "1114",
      label: "NirmanSampanna",
      children: (
        <>
          <SearchBar type="NirmanSampanna" />
          <NirmanSampannaTableFinal onViewProject={onViewProject} />,
        </>
      ),
    },
  ];
  const approvedTab = {
    key: "4",
    label: (
      <span>
        {CheckCircle}
        Approved &nbsp;
        <MyInfoBtn info="Project Approved by Executive - Wards" />
      </span>
    ),
    children: (
      <div style={{ padding: "0px 50px" }}>
        <Tabs items={approvedItems} />
      </div>
    ),
  };
  const items = [
    {
      key: "1",
      label: (
        <span>
          <EnvironmentOutlined />
          On Desk &nbsp;
          <MyInfoBtn info="Projects On Current Desk" />
        </span>
      ),
      children: (
        <>
          <SearchBar type="OnDesk">
            <Cascader
              placeholder="Ward"
              style={{ width: 80 }}
              options={toList(FilterWards)}
            />
          </SearchBar>
          <OnDeskTableFinal onViewProject={onViewProject} />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          {CheckCircle}
          Notice &nbsp;
          <MyInfoBtn info="Notice Published Projects" />
        </span>
      ),
      children: (
        <>
          <SearchBar type="Notice" />
          <NoticeTableFinal onViewProject={onViewProject} />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          {CheckCircle}
          Muchulka &nbsp;
          <MyInfoBtn info="Muchulka Uploaded Projects" />
        </span>
      ),
      children: (
        <>
          <SearchBar type="Muchulka" />
          <MuchulkaTableFinal onViewProject={onViewProject} />
        </>
      ),
    },

    // isNagarjun()
    //   ? {
    //       key: "4",
    //       label: (
    //         <span>
    //           {CheckCircle}
    //           Approved &nbsp;
    //           <MyInfoBtn info="Project Approved by Executive" />
    //         </span>
    //       ),
    //       children: (
    //         <div style={{ padding: "0px 50px" }}>
    //           <Tabs items={approvedItems} />
    //         </div>
    //       ),
    //     }
    //   : null,
    isNagarjun()
      ? {
          key: "5",
          label: (
            <span>
              <EditOutlined style={{ color: "#00d924" }} />
              Digital Signature &nbsp;
              <MyInfoBtn info="Sign Certificates" />
            </span>
          ),
          children: (
            <>
              <DigitalSignatureTableFinal onViewProject={onViewProject} />
            </>
          ),
        }
      : null,
    {
      key: "6",
      label: (
        <span>
          <RetweetOutlined style={{ color: "red" }} />
          Revision &nbsp;
          <MyInfoBtn info="Revision of Approved Projects" />
        </span>
      ),
      children: (
        <>
          <SearchBar type="Revision" />
          <RevisionTableFinal onViewProject={onViewProject} />
        </>
      ),
    },
    {
      key: "7",
      label: (
        <span>
          <EnvironmentOutlined />
          All &nbsp;
          <MyInfoBtn info="Projects On Current Desk" />
        </span>
      ),
      children: (
        <>
          <SearchBar type="OnDesk">
            <Cascader
              placeholder="Ward"
              style={{ width: 80 }}
              options={toList(FilterWards)}
            />
          </SearchBar>
          <AllTableFinal onViewProject={onViewProject} />
        </>
      ),
    },
  ];

  const role = localStorage.getItem("role");
  if (
    role === "ROLE_Napi" ||
    role === "ROLE_Ward_Technical" ||
    role === "ROLE_Ward" ||
    role === "ROLE_Revenue"
  ) {
    items.splice(3, 0, approvedTab);
  }

  return (
    <div>
      {contextHolder}
      <PageHeader
        title="Projects"
        subTitle="Projects submitted by consultants"
      />
      {revenueModal ? <RevenueModalFinal /> : null}
      {projTransferModal ? <ViewProjTransLogModal /> : null}
      {napiModal ? <NapiModalFinal /> : null}

      {muchulkaModal ? <MuchulkaUploadModalFinal /> : null}
      {noticePubModal ? <NoticePubModalFinal /> : null}
      {napiModal ? <NapiModalFinal /> : null}
      {commentsModal ? <CommentsModalFinal /> : null}
      {autocadModal ? <ViewAutoCadModal /> : null}
      {projTransferModal ? <ViewProjTransLogModal /> : null}
      {imagesModal ? <ImagesProjModal /> : null}
      {additionalDocsModal ? <AdditionalDocumentsModalFinal /> : null}
      {addDartaNoModal ? <AddDartaNoModalFinal /> : null}
      {muchulkaNoticeModal ? <MuchulkaNoticeModalFinal /> : null}
      {noticeMuchulkaRemarks ? <MuchulkaRemarksModal /> : null}
      {muchulkaViewNotice ? <MuchulkaViewNoticeModal /> : null}
      {approvedPlinthModal ? <PlinthModalFinal /> : null}
      {revisionViewDetails ? <ViewRevisionModalFinal /> : null}
      {revisionStatusModal ? <RevisionStatusModalFinal /> : null}
      {newMuchulka ? <NewMuchulkaModal /> : null}
      {sarjiminMuchulka ? <SarjiminMuchulkaModal /> : null}

      <div className="CenterFormsm">
        <Tabs
          className="tabs"
          type="card"
          defaultActiveKey="1"
          items={items}
        ></Tabs>
      </div>
    </div>
  );
};

export default AdminViewProjOnDesk;
