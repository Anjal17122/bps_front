import { useContext, useState } from "react";
import {
  CheckCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
  HourglassOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Cascader, Tabs, TabsProps, message } from "antd";
import { FilterWards } from "../../../../Common/Constants";
import { toList } from "../../../../Common/Form/FormData";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import OnDeskTableFinal from "./OnDeskFinal/OnDeskTableFinal";
import AllTableFinal from "./AllProjectFinal/AllTableFinal";
import { ActionType, MyStore } from "../../../../Store/ContextApi";
import { useNavigate } from "react-router-dom";
import { ProjStoreProvider } from "./ProjContext";
import NapiModalFinal from "./Modals/NapiModalFinal";
import ViewAutoCadModal from "./Modals/ViewAutoCadModal";
import ViewProjTransLogModal from "./Modals/ViewProjTransLogModal";
import { useStoreViewProj } from "../../../../Store/StoreViewProject/StoreViewProj";
import MuchulkaUploadModalFinal from "./Modals/MuchulkaUploadModalFinal";
import NoticePubModalFinal from "./Modals/NoticePubModalFinal";
import RevenueModalFinal from "./Modals/RevenueModalFinal";
import AdditionalDocumentsModalFinal from "./Modals/AdditionalDocumentsModalFinal";
import ImagesProjModal from "./Modals/ImagesProjModal";
import { CommentsModalFinal } from "./Modals/CommentsModalFinal";
import UnapprovedTableFinal from "./UnapprovedFinal/UnapprovedTableFinal";
import NoticeTableFinal from "./NoticeTableFinal/NoticeTableFinal";
import AddDartaNoModalFinal from "./Modals/AddDartaNoModalFinal";
import { getProject } from "../OnDeskService/OnDeskService/OnDeskService";
import MuchulkaNoticeModalFinal from "./Modals/NoticeTabModals/MuchulkaNoticeModalFinal";
import { useStoreModal } from "../../../../Store/StoreModal/StoreModal";
import MuchulkaRemarksModal from "./Modals/NoticeTabModals/MuchulkaRemarksModal";
import MuchulkaTableFinal from "./MuchulkaTableFinal/MuchulkaTableFinal";
import MuchulkaViewNoticeModal from "./Modals/MuchulkaModal/MuchulkaViewNoticeModal";
import PlinthModalFinal from "./Modals/ApprovedModal/PlinthModalFinal";
import ApprovedTableFinal from "./ApprovedTableFinal/ApprovedTableFinal";
import ReturnedTableFinal from "./ReturnedTableFinal/ReturnedTableFinal";
import RevisionTableFinal from "./RevisionTableFinal/RevisionTableFinal";
import RevisionStatusModalFinal from "./Modals/RevisionModalsAdmin/RevisionStatusModalFinal";
import ViewRevisionModalFinal from "./Modals/RevisionModalsAdmin/ViewRevisionModalFinal";
import PageHeader from "../../../../Components/Common/PageHeader/PageHeader";
import { dispatchPage } from "../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../Store/StorePagination/types";
import { dispatchUrl } from "../../../../Store/StoreUrls/StoreUrls";
import { AcUrl } from "../../../../Store/StoreUrls/types";
import { AcGetUrls, UrlsOnDesk } from "../../../../constants/MyUrls/MyUrls";
import DigitalSignatureTableFinal from "./DigitalSignatureTableFinal/DigitalSignatureTableFinal";
import SearchBar from "./SearchBar/SearchBar";
import PlinthTableFinal from "./ApprovedTableFinal/PlinthTableFinal";
import SuperStructureTableFinal from "./ApprovedTableFinal/SuperStructureTableFinal";
import NirmanSampannaTableFinal from "./ApprovedTableFinal/NirmanSampannaTableFinal";
import NewMuchulkaModal from "./Modals/NewMuchulkaModal";
import SarjiminMuchulkaModal from "./Modals/SarjiminMuchulkaModal";
import { getRole } from "../../../../constants/constants";
import { ShowCommentsModal } from "../../../Consultant/ViewProjectFinal/ConsultantModals/ShowCommentsModal";
import { useStoreModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import AgreementModal from "../../../common/Agreement/AgreementModal";

const AdminViewProjFinal = () => {
  const history = useNavigate();
  const [ward, setWard] = useState("0");
  const { dispatch } = useContext(MyStore);

  const {
    autocadModal,
    projTransferModal,
    revenueModal,
    additionalDocsModal,
    imagesModal,
    commentsModal,
    addDartaNoModal,
    muchulkaModal,
    napiModal,
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

  const [messageApi, contextHolder] = message.useMessage();

  const onViewProject = (id: number) => {
    getProject(id.toString(), messageApi).then((res) => {
      localStorage.setItem("ProjectType", res.data.type);
      localStorage.setItem("isPerma", "true");
      localStorage.setItem("isNotice", "true");
      localStorage.setItem("showBothBtns", "true");
      localStorage.setItem("onlyTechnical", "");
      // if (res.data.type === ProjectType.e) {
      // }
      dispatch({
        type: ActionType.getProject,
        payload: res.data,
      });
      localStorage.setItem("adminViewProject", JSON.stringify(res.data));
      history("/admin/view/project/projectdetails/" + id.toString());
    });
  };
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
  const { viewComments, agreementModalCon } = useStoreModalCon();

  const CheckCircle = <CheckCircleOutlined style={{ color: "#00d924" }} />;
  return (
    <ProjStoreProvider>
      <div>
        {contextHolder}
        {agreementModalCon ? <AgreementModal /> : null}
        {viewComments ? <ShowCommentsModal /> : null}
        {muchulkaModal ? <MuchulkaUploadModalFinal /> : null}
        {noticePubModal ? <NoticePubModalFinal /> : null}
        {napiModal ? <NapiModalFinal /> : null}
        {commentsModal ? <CommentsModalFinal /> : null}
        {revenueModal ? <RevenueModalFinal /> : null}
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

        <PageHeader
          title="Projects"
          subTitle="Projects submitted by consultants"
        />
        <div className="CenterFormsm">
          <Tabs
            className="tabs"
            type="card"
            defaultActiveKey="1"
            items={[
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
                      {getRole() === "ROLE_Ward" ? null : (
                        <Cascader
                          placeholder="Ward"
                          style={{ width: 80 }}
                          options={toList(FilterWards)}
                          onChange={(val) => {
                            dispatchPage({
                              type: AcP.setOnDeskPage,
                              payload: 0,
                            });
                            dispatchUrl({
                              type: AcUrl.setOnDeskUrl,
                              payload: UrlsOnDesk(
                                AcGetUrls.OnDeskSearchByWard,
                                val[0]
                              ),
                            });
                          }}
                        />
                      )}
                    </SearchBar>
                    <OnDeskTableFinal onViewProject={onViewProject} />
                  </>
                ),
              },
              {
                key: "2",
                label: (
                  <span>
                    <HourglassOutlined style={{ color: "red" }} />
                    Unapproved &nbsp;
                    <MyInfoBtn info="All Unapproved Projects" />
                  </span>
                ),
                children: (
                  <>
                    <SearchBar type="Unapproved">
                      <Cascader
                        placeholder="Ward"
                        style={{ width: 80 }}
                        options={toList(FilterWards)}
                        onChange={(val) => {
                          dispatchPage({
                            type: AcP.setUnapprovedPage,
                            payload: 0,
                          });
                          dispatchUrl({
                            type: AcUrl.setUnapprovedUrl,
                            payload: UrlsOnDesk(
                              AcGetUrls.UnapprovedSearchByWard,
                              val[0]
                            ),
                          });
                        }}
                      />
                    </SearchBar>
                    <UnapprovedTableFinal onViewProject={onViewProject} />
                  </>
                ),
              },
              {
                key: "3",
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
                    <SearchBar type="Muchulka" />
                    <MuchulkaTableFinal onViewProject={onViewProject} />
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
                  <div style={{ padding: "0px 50px" }}>
                    <Tabs items={approvedItems} />
                  </div>
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
                    <SearchBar type="Returned" />
                    <ReturnedTableFinal onViewProject={onViewProject} />
                  </>
                ),
              },
              {
                key: "7",
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
              },
              {
                key: "8",
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
                key: "9",
                label: (
                  <span>
                    {CheckCircle}
                    All &nbsp;
                    <MyInfoBtn info="All Projects" />
                  </span>
                ),
                children: (
                  <>
                    <SearchBar type="All" ward={ward}>
                      {getRole() === "ROLE_Ward" ? null : (
                        <Cascader
                          placeholder="Ward"
                          style={{ width: 80 }}
                          options={toList(FilterWards)}
                          onChange={(val) => {
                            setWard(String(val[0]));
                            dispatchPage({
                              type: AcP.setAllPage,
                              payload: 0,
                            });
                            dispatchUrl({
                              type: AcUrl.setAllUrl,
                              payload: UrlsOnDesk(
                                AcGetUrls.AllSearchByWard,
                                val[0]
                              ),
                            });
                          }}
                        />
                      )}
                    </SearchBar>
                    <AllTableFinal onViewProject={onViewProject} />
                  </>
                ),
                // children: (
                //   <>
                //     <SearchBar type="Revision" />
                //     <RevisionTableFinal onViewProject={onViewProject} />
                //   </>
                // ),
              },
            ]}
          ></Tabs>
        </div>
      </div>
    </ProjStoreProvider>
  );
};

export default AdminViewProjFinal;
