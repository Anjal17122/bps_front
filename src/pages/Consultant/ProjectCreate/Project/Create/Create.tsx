import { Row, Col, Form, Input, Cascader, Button, message, Modal } from "antd";
import React, { Dispatch, useState } from "react";
import {
  ColHeight,
  FormNReq,
  FormProps,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import { createProject } from "../../../../../Services/CreateProjectService";
import {
  getMunPerson,
  getNECPerson,
} from "../../../../../Services/UserService";
import { ProjectType } from "../../SelectProjectType";
import { bclass, bpur } from "./EditProject";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MAP_API } from "../../../../../Services/Api";
import { checkIfLatitude } from "../../../../../constants/GlobalFunctions";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { municipalityDetails } from "../../../../../constants/constants";

const Create = () => {
  type setSt = Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      type: string;
    }>
  >;

  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();
  const type: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" =
    params.type as
      | "a"
      | "b"
      | "c"
      | "d"
      | "e"
      | "f"
      | "g"
      | "h"
      | "i"
      | "j"
      | "k";
  const history = useNavigate();
  // const [bclass, setBClass] = useState<CommonType[]>([]);
  // const [bpur, setBpur] = useState<CommonType[]>([]);
  const [designer, setDesigner] = useState({ id: 0, name: "", type: "" });
  const [supervisor, setSupervisor] = useState({ id: 0, name: "", type: "" });
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // const [waris, setWaris] = useState<CommonType[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_API,
  });

  // const ktmCenter = { lat: 27.670336895752378, lng: 85.32300952395173 };

  if (loadError) return <div>Error Loading Map</div>;
  if (!isLoaded) return <div>Loading...</div>;
  // useEffect(() => {
  // getBuildingClass().then((bclass) => setBClass(bclass.data));
  // getBuildingPur().then((bpur) => setBpur(bpur.data));
  // getWaris().then((bpur) => setWaris(bpur.data));
  //   return () => setBClass([] as CommonType[]);
  // }, []);

  const onDesSearch = (value: string, setS: setSt, state: any) => {
    if (state.type === "nec") {
      getNECPerson(value).then((res) => {
        if (!res.data) {
          return messageApi.error(res.message);
        } else {
          setS({ ...state, id: res.data.id, name: res.data.name });
        }
      });
    } else {
      getMunPerson(value).then((res) => {
        !res.data
          ? messageApi.error(res.message)
          : setS({ ...state, id: res.data.id, name: res.data.name });
      });
    }
  };

  const onSubmit = (val: any) => {
    localStorage.setItem("isPerma", "false");
    localStorage.setItem("adminViewProject", "");
    if (municipalityDetails.address1 === "Mandandeupur, Kavrepalanchok") {
      console.log("Mandandeupur");
    } else {
      if (!checkIfLatitude(val.lat)) {
        return messageApi.error("Latitude format should be: 27.71161988716947");
      }
      if (!checkIfLatitude(val.lon)) {
        return messageApi.error(
          "Longitude format should be: 27.71161988716947"
        );
      }
    }

    const body = {
      // applicationDate: val.date.toISOString().split("T")[0],
      buildingPurposeId: val.buildingPurpose[0],
      buildingClassId: val.nbcClass[0],
      waris: val.waris,
      supervisorId: supervisor.id,
      designerId: designer.id,
      lon: val.lon,
      lat: val.lat,
      type: ProjectType[type],
    };
    // return;

    createProject(body, messageApi)
      .then((res) => history("/project/create/applicant/" + res.data))
      .catch((e) => alert(JSON.stringify(e)));
  };
  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div className="CenterForm Register">
      {contextHolder}
      <Modal
        open={modalOpen}
        width={400}
        footer={null}
        onCancel={() => setModalOpen(false)}
        title={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        {lat && lon ? (
          <GoogleMap
            // id="map"
            mapContainerStyle={mapStyle}
            zoom={14}
            center={{ lat: parseFloat(lat), lng: parseFloat(lon) }}
          >
            <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lon) }} />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Create Project: Step 1</h1>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Form.Item {...FormProps("buildingPurpose", "Building Purpose")}>
              <Cascader
                allowClear={false}
                placeholder="Building Purpose"
                options={bpur}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Form.Item {...FormProps("nbcClass", "NBC Class")}>
              <Cascader
                allowClear={false}
                placeholder="NBC Class"
                options={bclass}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Form.Item {...FormNReq("waris", "Waris")}>
              <Input placeholder="Waris Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Form.Item
              {...FormProps("lat", "Latitude  ")}
              tooltip="(eg. 27.71161988716947)"
            >
              <Input
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={20} sm={20} md={20} lg={6} xl={6}>
            <Form.Item
              {...FormProps("lon", "Longitude")}
              tooltip="(eg. 85.32518866251804)"
            >
              <Input
                placeholder="Longitude"
                onChange={(e) => setLon(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={4} sm={4} md={4} lg={2} xl={2}>
            {" "}
            {municipalityDetails.address1 ===
            "Mandandeupur, Kavrepalanchok" ? null : (
              <Button
                type="link"
                onClick={() => {
                  checkIfLatitude(lat) && checkIfLatitude(lon)
                    ? setModalOpen(true)
                    : message.error(
                        "Latitude/Longitude format should be: 27.71161988716947"
                      );
                }}
                disabled={lat && lon ? false : true}
              >
                See Map
              </Button>
            )}
          </Col>

          {/* <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Form.Item {...FormProps("date", "NBC Date")}>
              <DatePicker />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={20}>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("idType", "Designer ID Type")}>
              <Cascader
                allowClear={false}
                options={[
                  { value: "mun", label: "Mun No." },
                  { value: "nec", label: "Nec No." },
                ]}
                placeholder="ID Type"
                onChange={(e) =>
                  setDesigner({ ...designer, type: e[0].toString() })
                }
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("designerid", "Search Designer ID")}>
              <Input.Search
                disabled={designer.type ? false : true}
                placeholder="Search ID here"
                onSearch={(value) => onDesSearch(value, setDesigner, designer)}
                onBlur={(e) =>
                  onDesSearch(e.target.value, setDesigner, designer)
                }
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
                allowClear={false}
                options={[
                  { value: "mun", label: "Mun No." },
                  { value: "nec", label: "Nec No." },
                ]}
                placeholder="ID Type"
                onChange={(e) =>
                  setSupervisor({ ...supervisor, type: e[0].toString() })
                }
              />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...FormProps("Supervisorid", "Search Supervisor ID")}>
              <Input.Search
                disabled={supervisor.type ? false : true}
                placeholder="Search ID here"
                enterButton
                onSearch={(value) =>
                  onDesSearch(value, setSupervisor, supervisor)
                }
                onBlur={(e) =>
                  onDesSearch(e.target.value, setSupervisor, supervisor)
                }
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
          <SubmitBtn />
        </Row>
      </Form>
    </div>
  );
};

export default Create;
