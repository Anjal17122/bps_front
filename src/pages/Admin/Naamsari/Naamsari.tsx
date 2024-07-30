import { Select, Spin } from "antd";
import Search from "antd/lib/input/Search";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProject,
  GETprojectIdNaamsari,
} from "../../../Services/CreateProjectService";
import { searchProjectsName } from "../../../Services/ProjectService";
import { MyStore, ActionType } from "../../../Store/ContextApi";
import "../../../Assets/scss/Naamsari.scss";
import NaamsariCollapse from "./NaamsariCollapse";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const Naamsari = () => {
  // const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<"id" | "name">("id");

  const { state, dispatch } = useContext(MyStore);

  const history = useNavigate();
  function onViewProject(id: number) {
    // localStorage.removeItem("adminViewProject");
    setLoading(true);
    getProject(id.toString(), setLoading)
      .then((res) => {
        dispatch({
          type: ActionType.getProject,
          payload: res.data,
        });
        setLoading(false);
        localStorage.setItem("adminViewProject", JSON.stringify(res.data));
        history("/admin/view/project/projectdetails/" + id.toString());
      })
      .catch(() => setLoading(false));
  }

  const onSelect = (val: "id" | "name") => {
    setSelect(val);
  };

  const onSearch = (val: string) => {
    if (select === "id") {
      GETprojectIdNaamsari(val, setLoading).then((res) =>
        dispatch({ type: ActionType.setNaamSariSearch, payload: [res.data] })
      );
    } else {
      searchProjectsName(0, 10, setLoading, val, "", "", "DISABLED").then(
        (res) =>
          dispatch({ type: ActionType.setNaamSariSearch, payload: res.data })
      );
    }
  };

  const { Option } = Select;
  const addonBefore = (
    <Select value={select} onChange={onSelect} className="select">
      <Option value="id">Project ID</Option>
      <Option value="name">Applicant Name</Option>
    </Select>
  );

  // const onCancel = () =>
  //   dispatch({ type: ActionType.setNaamSariModal, payload: false });

  return (
    <div className="Naamsari">
      <PageHeader title="Naam Sari" subTitle="Naam Sari of projects" />
      <div className="SearchWrapper">
        <Search
          loading={loading}
          size="large"
          addonBefore={addonBefore}
          placeholder="Search Project"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <div className="TableWrapper" style={{ width: "90%" }}>
        <Spin spinning={loading} tip="Loading...">
          <NaamsariCollapse
            onViewProject={onViewProject}
            projects={state.naamSariSearch}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Naamsari;
