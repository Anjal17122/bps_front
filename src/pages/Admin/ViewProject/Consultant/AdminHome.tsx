import { Pagination } from "antd";
import Search from "antd/lib/input/Search";
import React, { useContext, useEffect, useState } from "react";
import { DatePicker } from "antd";
import RollingLoading from "../../../../Common/Loading/RollingLoading";
import TableButton from "../../../../Common/TableButton/TableButton";
import { ProjectType } from "../../../../Services/CreateProjectService";
import { getProjectId, getProjects } from "../../../../Services/ProjectService";
import ProjectsTable from "./ProjectsTable";
import { ActionType, MyStore } from "../../../../Store/ContextApi";

const { RangePicker } = DatePicker;

const CHome = () => {
  const [projects, setProjects] = useState<ProjectType[]>();

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
    return () => setProjects(undefined);
  }, []);

  //Use case
  const { dispatch } = useContext(MyStore);

  function onViewProject(id: number) {
    getProjectId("/project?id=", id.toString()).then((res) => {
      dispatch({ type: ActionType.getProject, payload: res.data });
    });
  }

  return (
    <div className="CenterForm10" style={{ padding: "10px 2% 1% 2%" }}>
      <h1>View Projects</h1>
      <div className="withShadow marginBot50">
        <div className="TableHead">
          <Search
            className="MySearch"
            placeholder="Application Name"
            enterButton
          />
          <Search
            className="MySearch"
            placeholder="Application No."
            enterButton
          />
          <div>
            <RangePicker />
            <TableButton bgColor="blue">Search</TableButton>
            {/* <Button icon={<SearchOutlined />}>Search</Button> */}
          </div>
        </div>
        <div className="TableWrapper">
          {projects ? (
            <ProjectsTable projects={projects} onViewProject={onViewProject} />
          ) : (
            <RollingLoading height="30vh" />
          )}

          <Pagination style={{ background: "white", padding: 10 }} />
        </div>
      </div>
      <div className="withShadow">
        <div className="TableHead">
          <Search
            className="MySearch"
            placeholder="Application Name"
            enterButton
          />
          <Search
            className="MySearch"
            placeholder="Application No."
            enterButton
          />
          <div>
            <RangePicker />
            <TableButton bgColor="blue">Search</TableButton>
          </div>
        </div>
        {/* <EndTable /> */}
        <Pagination style={{ background: "white", padding: 10 }} />
      </div>
    </div>
  );
};

export default CHome;
