import { Row, Col, Modal, Button } from "antd";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import NotFound from "../../../../../../Common/NotFound";
import { ViewProjectLog } from "../../../../../../Services/ProjectService";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { setSTyp } from "../../../../../../Services/CreateProjectService";
import { MAP_API } from "../../../../../../Services/Api";
import PDFproject from "../../../../../../Common/ProjectPDFs/PDFproject";
import AdProjectFooter from "../../../../../../Components/Admin/Footers/AdProjectFooter";
import { municipalityDetails } from "../../../../../../constants/constants";

interface Props {
  admin?: boolean;
}

const ViewProject = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);
  const params = useParams();
  const pid: string = params.pid ?? "";

  const [modalOpen, setModalOpen] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_API,
  });

  if (loadError) return <div>Error Loading Map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  const project = state.project;

  return (
    <div className="ViewCreate">
      <Modal
        open={modalOpen}
        width={400}
        footer={null}
        onCancel={() => setModalOpen(false)}
        title={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        {project?.lat && project.lon ? (
          <GoogleMap
            // id="map"
            mapContainerStyle={mapStyle}
            zoom={14}
            center={{
              lat: parseFloat(project.lat),
              lng: parseFloat(project.lon),
            }}
          >
            <Marker
              position={{
                lat: parseFloat(project.lat),
                lng: parseFloat(project.lon),
              }}
            />
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
      {ifCon() ? null : <AdProjectFooter pid={pid} />}
      <ViewProjectHeader
        step="Step 1: "
        id={pid}
        title="Project Details"
        prev={""}
        next={
          admin
            ? `/admin/viewproject/applicant/${pid}`
            : `/user/viewproject/applicant/${pid}`
        }
      />
      <PDFproject data={project as any} projectId={pid} />
      {project.id ? (
        ProjectCommon(project, setModalOpen)
      ) : project === null ? (
        <NotFound text="Project Not found!" />
      ) : (
        <GoBackToProjects />
      )}
    </div>
  );
};

export default ViewProject;

export function ProjectCommon(
  project: ViewProjectLog,
  setModalOpen: setSTyp
): React.ReactNode {
  return (
    <div className="viewcreate_content">
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
            <b>Waris: </b> <br /> {project.waris}
          </>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <b>NBC Date: </b> <br /> {project.applicationDate}
        </Col>
      </Row>
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
        <Col xs={18} sm={18} md={18} lg={8} xl={8}>
          <b>Longitude: </b> <br /> {project.lon}
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          {municipalityDetails.address1 ===
          "Mandandeupur, Kavrepalanchok" ? null : (
            <Button
              // type="link"
              onClick={() => setModalOpen(true)}
              disabled={project.lat && project.lon ? false : true}
            >
              See Map
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

export const ifCon = (): boolean => {
  if (localStorage.getItem("role") === "ROLE_Consultant") {
    return true;
  } else {
    return false;
  }
};
