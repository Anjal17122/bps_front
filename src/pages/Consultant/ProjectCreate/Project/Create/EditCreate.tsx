import { Row, Col, Cascader, Input, Form, message } from "antd";
import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColHeight,
  FormProps,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import {
  editProject,
  GetProject,
} from "../../../../../Services/CreateProjectService";
import { getProjectId } from "../../../../../Services/ProjectService";
import {
  getMunPerson,
  getNECPerson,
} from "../../../../../Services/UserService";
import { switchUrl } from "./ViewCreate";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { SingleValueType } from "../../../../../constants/typesGlobal";

type setSt = Dispatch<
  React.SetStateAction<{
    id: number;
    name: string;
  }>
>;

export const bpur = [
  { value: "1", label: "Residential" },
  { value: "2", label: "Commercial" },
  { value: "3", label: "Health" },
  { value: "4", label: "Education" },
  { value: "5", label: "Tourism" },
  { value: "6", label: "Others(Specify)" },
  { value: "7", label: "Asthai Tahara" },
];

export const bclass = [
  { value: "1", label: "Class A" },
  { value: "2", label: "Class B" },
  { value: "3", label: "Class C" },
  { value: "4", label: "Class D" },
];

export const waris = [
  { value: 1, label: "Binod Chaudhary" },
  { value: 2, label: "Sushant Sharma" },
  { value: 3, label: "None" },
];

export const projectTyp = [
  {
    value: "Vacant Land",
    label: "Vacant Land",
  },

  { value: "Old & Demolish Building", label: "Old & Demolish Building" },

  { value: "Plinth Extension", label: "Plinth Extension" },

  {
    value: "Boundary Wall & Construction",
    label: "Boundary Wall & Construction",
  },

  { value: "Story Addition", label: "Story Addition" },
  { value: "Facade Change", label: "Facade Change" },
  { value: "Roof Change", label: "Roof Change" },
  { value: "Super Structure Permit", label: "Super Structure Permit" },
  {
    value: "Application for Complition",
    label: "Application for Complition",
  },
  { value: "Already Build Building", label: "Already Build Building" },
  { value: "DPC Renew", label: "DPC Renew" },
];

const EditCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const params = useParams();
  const pid = params.pid ?? "";
  const history = useNavigate();

  // const [bclass, setBClass] = useState<CommonType[]>([]);
  // const [bpur, setBpur] = useState<CommonType[]>([]);
  const [designer, setDesigner] = useState({ id: 0, name: "" });
  const [supervisor, setSupervisor] = useState({ id: 0, name: "" });
  const [selected, setSelected] = useState<"mun" | "nec">("nec");

  // const [waris, setWaris] = useState<CommonType[]>([]);
  const [project, setProject] = useState<GetProject>();

  useEffect(() => {
    getProjectId(switchUrl("/project?id=", "/project/perma?id="), pid).then(
      (res) => setProject(res.data)
    );
    return () => setProject(undefined);
  }, []);

  const onSubmit = (val: any) => {
    const body = {
      id: parseInt(pid),
      // applicationDate: val.date.toISOString().split("T")[0],
      buildingPurposeId: parseInt(val.buildingPurpose[0]),
      buildingClassId: parseInt(val.nbcClass[0]),
      waris: val.waris,
      lat: val.lat,
      lon: val.lon,
      supervisorId: supervisor.id,
      designerId: designer.id,
      type: val.type[0],
    };

    editProject(switchUrl("/project", "/project/perma"), body)
      .then(() => history(-1))
      .catch((e) => alert(JSON.stringify(e)));
  };

  const onDesSearch = (value: string, setS: setSt) => {
    if (selected === "nec") {
      getNECPerson(value).then((res) => {
        if (!res.data) {
          return messageApi.error(res.message);
        } else {
          setS({ id: res.data.id, name: res.data.name });
        }
      });
    } else {
      getMunPerson(value).then((res) => {
        !res.data
          ? messageApi.error(res.message)
          : setS({ id: res.data.id, name: res.data.name });
      });
    }
  };

  return (
    <div className="CenterForm Register">
      {contextHolder}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Edit Project: Step 1</h1>
        <div className="PurpleCard EditAddDiv">
          <span className="lText1" style={{ fontWeight: 500 }}>
            Old Details:
          </span>

          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <span className="lText1">Designer Name:</span>
              <p>{project?.designer?.name}</p>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <span className="lText1">Supervisor Name:</span>
              <p>{project?.supervisor?.name}</p>
            </Col>
          </Row>
        </div>
        {project ? (
          <>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={[project?.buildingPurpose.id.toString()]}
                  {...FormProps("buildingPurpose", "Building Purpose")}
                >
                  <Cascader placeholder="Building Purpose" options={bpur} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={[project?.buildingClass.id.toString()]}
                  {...FormProps("nbcClass", "NBC Class")}
                >
                  <Cascader placeholder="NBC Class" options={bclass} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={project?.waris}
                  {...FormProps("waris", "Waris")}
                >
                  <Input placeholder="Waris" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={[project?.type]}
                  {...FormProps("type", "Project Type")}
                >
                  <Cascader placeholder="Project Type" options={projectTyp} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={project?.lat}
                  {...FormProps("lat", "Latitude")}
                >
                  <Input placeholder="Latitude" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item
                  initialValue={project?.lon}
                  {...FormProps("lon", "Longitude")}
                >
                  <Input placeholder="Longitude" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : null}
        <Row gutter={20}>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("idType", "Designer ID Type")}>
              <Cascader
                options={[
                  { value: "mun", label: "Mun No." },
                  { value: "nec", label: "Nec No." },
                ]}
                placeholder="ID Type"
                onChange={(e) => setSelected(e[0].toString() as any)}
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("designerid", "Search Designer ID")}>
              <Input.Search
                disabled={designer ? false : true}
                placeholder="Search ID here"
                onSearch={(value) => onDesSearch(value, setDesigner)}
                onBlur={(e) => onDesSearch(e.target.value, setDesigner)}
                enterButton
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <label>Designer Name</label>
            <Input
              className="disabledBtn"
              disabled
              placeholder="Designer Name"
              value={designer.name}
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("supIdType", "Supervisor ID Type")}>
              <Cascader
                options={[
                  { value: "mun", label: "Mun No." },
                  { value: "nec", label: "Nec No." },
                ]}
                placeholder="ID Type"
                onChange={(e) => setSelected(e[0].toString() as any)}
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("Supervisorid", "Search Supervisor ID")}>
              <Input.Search
                disabled={selected ? false : true}
                placeholder="Search ID here"
                enterButton
                onSearch={(value) => onDesSearch(value, setSupervisor)}
                onBlur={(e) => onDesSearch(e.target.value, setSupervisor)}
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <label>Supervisor Name</label>
            <Input
              disabled
              value={supervisor.name}
              className="disabledBtn"
              placeholder="Supervisor Name"
            />
          </Col>
        </Row>
        <Row justify="end">
          <SubmitBtn text="Edit" />
        </Row>
      </Form>
    </div>
  );
};

export default EditCreate;
