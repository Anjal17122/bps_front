import { Row, Col, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RollingLoading from "../../../../../Common/Loading/RollingLoading";
import NotFound from "../../../../../Common/NotFound";
import TableButton from "../../../../../Common/TableButton/TableButton";
import { GetProject } from "../../../../../Services/CreateProjectService";
import { getProjectId } from "../../../../../Services/ProjectService";
import {
  GOOGLE_MAP_API,
  municipalityDetails,
} from "../../../../../constants/constants";
import PDFproject from "../../../../../Common/ProjectPDFs/PDFproject";
import { switchUrl } from "./ViewCreate";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const ViewProjectOnlyDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [project, setProject] = useState<GetProject>();
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API,
  });

  useEffect(() => {
    getProjectId(
      switchUrl("/project?id=", "/project/perma?id="),
      params.pid ?? "0"
    ).then((res) => setProject(res.data));
    return () => setProject(undefined);
  }, []);

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        width={400}
        footer={null}
        onCancel={() => setModalOpen(false)}
        title={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        {isLoaded ? (
          <GoogleMap
            // id="map"
            mapContainerStyle={mapStyle}
            zoom={14}
            center={{
              lat: parseFloat(project?.lat || ""),
              lng: parseFloat(project?.lon || ""),
            }}
          >
            <Marker
              position={{
                lat: parseFloat(project?.lat || ""),
                lng: parseFloat(project?.lon || ""),
              }}
            />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
      {project ? (
        <div className="viewcreate_content CenterForm10">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/project/edit/project/${params.pid ?? "0"}`}>
              <TableButton bgColor="blue">Edit</TableButton>
            </Link>
            <PDFproject
              data={project as GetProject}
              projectId={params.pid ?? "0"}
            />
          </div>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Building Purpose:</b>
              <br /> {project.buildingPurpose?.name}
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>NBC Class: </b> <br /> {project.buildingClass?.name}
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <>
                <b>Waris: </b> <br /> {project?.waris}
              </>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Project Type: </b> <br /> {project?.type}
            </Col>
          </Row>
          <Link to={"/project/edit/supervisor/" + project.id}>
            Edit Supervisor/Designer
          </Link>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Designer Mun ID: </b> <br /> {project.designer?.id}
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Designer Name: </b> <br /> {project.designer?.name}
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Supervisor Mun ID: </b> <br /> {project.supervisor?.id}
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Supervisor Name: </b> <br /> {project.supervisor?.name}
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <b>Latitude: </b> <br /> {project.lat}
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <b>Longitude: </b> <br /> {project.lon}
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              {municipalityDetails.address1 ===
              "Mandandeupur, Kavrepalanchok" ? null : (
                <Button
                  type="link"
                  onClick={() => setModalOpen(true)}
                  disabled={project.lat && project.lon ? false : true}
                >
                  See Map
                </Button>
              )}
            </Col>
          </Row>
        </div>
      ) : project === null ? (
        <NotFound text="Project Not found!" />
      ) : (
        <RollingLoading height="60vh" />
      )}
    </div>
  );
};

export default ViewProjectOnlyDiv;
