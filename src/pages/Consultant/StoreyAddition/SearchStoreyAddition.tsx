import { useContext, useState } from "react";
import { Button, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import { GETprojectIdNaamsari } from "../../../Services/CreateProjectService";
import { searchProjectsName } from "../../../Services/ProjectService";
import { MyStore, ActionType } from "../../../Store/ContextApi";
import "../../../Assets/scss/Naamsari.scss";
import { PlusOutlined } from "@ant-design/icons";
import { CopyProjectStorey } from "../../../Services/StoreyAdditionService";
import { useNavigate } from "react-router-dom";
import { setStoreyInLocal } from "../ProjectCreate/SelectProjectType";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const SearchStoreyAddition = () => {
  // const [projects, setProjects] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<"id" | "name">("id");

  const { state, dispatch } = useContext(MyStore);
  const { Option } = Select;

  const history = useNavigate();

  const onSelect = (val: "id" | "name") => {
    setSelect(val);
  };
  const addonBefore = (
    <Select value={select} onChange={onSelect} className="select">
      <Option value="id">Project ID</Option>
      <Option value="name">Applicant Name</Option>
    </Select>
  );
  const onSearch = (val: string) => {
    if (select === "id") {
      GETprojectIdNaamsari(val, setLoading).then((res) =>
        dispatch({ type: ActionType.setStoreySearch, payload: [res.data] })
      );
    } else {
      searchProjectsName(
        0,
        10,
        setLoading,
        val,
        "APPROVED",
        "",
        "DISABLED"
      ).then((res) =>
        dispatch({ type: ActionType.setStoreySearch, payload: res.data })
      );
    }
  };

  const columns = [
    {
      title: "S.N.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "ProjectId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Darta No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    {
      title: "Applicant Name",
      key: "applicantName",
      render: (row: OnDeskProjects) => <span>{row.applicant.nameEng}</span>,
    },
    {
      title: "Land Owners",
      key: "landowners",
      render: (row: OnDeskProjects) => (
        <span>
          {JSON.stringify(
            row.land != null && row.land != undefined
              ? row.land[0].owners != null && row.land[0] != undefined
                ? row.lands[0].owners.map((owner) => owner.owner.nameEng)
                : ""
              : ""
          )}
        </span>
      ),
    },
    {
      title: "Submitted Date",
      key: "creationDate",
      render: (row: OnDeskProjects) => (
        <span>{row.creationDate.substr(0, 10)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (row: OnDeskProjects) => (
        <span>
          <Button
            style={{ padding: 0 }}
            type="link"
            icon={<PlusOutlined />}
            onClick={() => {
              setStoreyInLocal();
              CopyProjectStorey(row.id, setLoading).then((res: any) =>
                history("/project/create/storey/designfloor/" + res.data.id)
              );
            }}
          >
            Storey
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="paddBot50">
      <div className="Naamsari">
        <PageHeader
          title="Search Existing Project:"
          subTitle="for Storey Addition"
        />
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
        <div
          style={{
            width: "96%",
            backgroundColor: "white",
            margin: "0 2%",
            padding: "1%",
            borderTop: "3px solid #40a9ff",
          }}
        >
          <Table
            columns={columns}
            dataSource={state.storeySearch.map((storey) => ({
              ...storey,
              key: storey.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchStoreyAddition;
