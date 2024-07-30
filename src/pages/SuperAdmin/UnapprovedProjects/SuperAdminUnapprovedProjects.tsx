import { useContext } from "react";
import UnapprovedTableFinal from "../../Admin/OnDeskFinal/AdminViewProjFInal/UnapprovedFinal/UnapprovedTableFinal";
import { Cascader, Tabs, message } from "antd";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { useNavigate } from "react-router-dom";
import { getProject } from "../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { CheckCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import { FilterWards } from "../../../Common/Constants";
import { toList } from "../../../Common/Form/FormData";
import MyInfoBtn from "../../../Common/InfoIcon/MyInfoBtn";
import { dispatchPage } from "../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../Store/StorePagination/types";
import { dispatchUrl } from "../../../Store/StoreUrls/StoreUrls";
import { AcUrl } from "../../../Store/StoreUrls/types";
import { UrlsOnDesk, AcGetUrls } from "../../../constants/MyUrls/MyUrls";
import SearchBar from "../../Admin/OnDeskFinal/AdminViewProjFInal/SearchBar/SearchBar";
import ApprovedTableFinal from "../../Admin/OnDeskFinal/AdminViewProjFInal/ApprovedTableFinal/ApprovedTableFinal";

const SuperAdminUnapprovedProjects = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();
  const { dispatch } = useContext(MyStore);
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

  const CheckCircle = <CheckCircleOutlined style={{ color: "#00d924" }} />;

  return (
    <>
      {contextHolder}
      <PageHeader title="Projects" subTitle="Unapproved Projects" />
      <div className="CenterFormsm">
        <Tabs
          className="tabs"
          type="card"
          defaultActiveKey="1"
          items={[
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
                  <SearchBar type="Approved" />
                  <ApprovedTableFinal onViewProject={onViewProject} />
                </>
              ),
            },
          ]}
        ></Tabs>
      </div>
    </>
  );
};

export default SuperAdminUnapprovedProjects;
