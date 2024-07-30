import { useContext, useState } from "react";
import { Button, Collapse, Divider, Tooltip, message } from "antd";
import { CaretRightOutlined, EyeOutlined } from "@ant-design/icons";
import { Land, ProjectTypeFinal, sN } from "../../../Services/ProjectService";
import "../../../Assets/scss/NaamsariCollapse.scss";
import { useNavigate } from "react-router-dom";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalViewCurrentOwner from "./ModalViewCurrentOwner";
import { getNaamsariLog, NaamsariLog } from "../../../Services/NaamSariService";
import ModalViewNaamsariLogs from "./ModalViewNaamsariLogs";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";
import {
  dispatchModal,
  useStoreModal,
} from "../../../Store/StoreModal/StoreModal";
import ModalGenerateNaamsari from "./ModalGenerateNaamsari";
import { AcModal } from "../../../Store/StoreModal/types";
import { Ac } from "../../../Store/StoreViewProject/types";
import { dispatch } from "../../../Store/StoreViewProject/StoreViewProj";

interface Props {
  projects: ProjectTypeFinal[];
  onViewProject: (id: number) => void;
}

interface modalDetails {
  currentLand: undefined | Land;
  type: "owner" | "houseOwner";
}

interface logDetails {
  logs: undefined | NaamsariLog[];
  type: "owner" | "houseOwner";
}

const NaamsariCollapse = ({ projects, onViewProject }: Props) => {
  const { Panel } = Collapse;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<modalDetails>({
    currentLand: undefined,
    type: "owner",
  });
  const { disabled } = useStoreGlobal();

  const [logDetails, setLogDetails] = useState<logDetails>({
    logs: undefined,
    type: "owner",
  });

  const { dispatch: dispatchContext } = useContext(MyStore);
  const history = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const ChangeLandOwner = (pId: number, landid: number, land: Land) => {
    dispatchContext({ payload: land, type: ActionType.setNaamsariLand });
    localStorage.setItem("landNaamsari", JSON.stringify(land));
    history(`/admin/newnaamsari/landowner/${pId}/${landid}`);
  };

  const ChangeHomeOwner = (pId: number, landid: number, land: Land) => {
    dispatchContext({ payload: land, type: ActionType.setNaamsariLand });
    localStorage.setItem("landNaamsari", JSON.stringify(land));
    history(`/admin/newnaamsari/homeowner/${pId}/${landid}`);
  };

  const editCurrentLand = (pId: number, landid: number, land: Land) => {
    history(`/admin/naamsari/editcurrentlandowner/${pId}/${land.owner?.id}`);
  };

  const editCurrentHome = (pId: number, landid: number, land: Land) => {
    history(
      `/admin/naamsari/editcurrenthomeowner/${pId}/${land.houseOwner?.id}`
    );
  };

  const [logIsOpen, setLogIsOpen] = useState(false);

  const viewOldOwners = (landId: sN, type: "owner" | "houseOwner") => {
    getNaamsariLog(landId, messageApi).then((res) =>
      setLogDetails({ type, logs: res.data })
    );
    setLogIsOpen(true);
  };
  const viewCurrentOwner = (land: Land, type: "owner" | "houseOwner") => {
    setModalIsOpen(true);
    setModalDetails({ type, currentLand: land });
  };
  const onModalCancel = () => {
    setModalIsOpen(false);
    setModalDetails({ currentLand: undefined, type: "owner" });
  };
  const onLogModalCancel = () => {
    setLogIsOpen(false);
    setLogDetails({ logs: undefined, type: "owner" });
  };

  const openNaamsariModal = (pid: number) => {
    dispatchModal({ type: AcModal.setModalGenerateNaamsari, payload: true });
    dispatch({ type: Ac.setCurrentPid, payload: pid });
  };
  const { modalGenerateNaamsari } = useStoreModal();

  return (
    <div>
      {contextHolder}
      <Tooltip title="List of Naamsari Projects">
        <h2>Project List:</h2>
        {JSON.stringify({ modalGenerateNaamsari })}
      </Tooltip>
      {modalGenerateNaamsari ? <ModalGenerateNaamsari /> : null}
      <ModalViewCurrentOwner
        isOpen={modalIsOpen}
        onCancel={onModalCancel}
        landNaamsari={modalDetails.currentLand}
        type={modalDetails.type}
      />
      <ModalViewNaamsariLogs
        isOpen={logIsOpen}
        onCancel={onLogModalCancel}
        logs={logDetails.logs}
        type={logDetails.type}
      />

      <Collapse
        className="MyCollapse"
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {projects.length ? (
          projects.map((proj) => (
            <Panel
              header={
                <div className="myheader">
                  <div className="maindiv">
                    <div className="id">{proj.id}</div>
                    <div className="name">{proj?.applicant?.nameEng}</div>
                    <div className="email">{proj.applicant?.email}</div>
                  </div>
                  <div className="actions">
                    <Button size="small">Start नामसारी</Button>
                    <Divider type="vertical"></Divider>
                    <Button
                      size="small"
                      onClick={() => openNaamsariModal(proj.id)}
                    >
                      Generate नामसारी
                    </Button>
                    <Divider type="vertical"></Divider>
                    <Tooltip title="View Project">
                      <Button
                        size="small"
                        onClick={() => onViewProject(proj.id)}
                      >
                        <EyeOutlined />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              }
              key={proj.id}
              className="site-collapse-custom-panel"
            >
              <div>
                <span>Land Owners:</span>
                {proj.lands?.map((land) => (
                  <div key={land.id} className="landData">
                    <div className="mainDiv">
                      <div className="landid">
                        Land Id: <span>{land?.id}</span>
                      </div>
                      <div className="LandOwner">
                        <span>Land Owner:</span>
                        {land.owner?.nameEng} <br />
                        <span>Home Owner:</span>
                        {land.houseOwner?.nameEng}
                      </div>
                    </div>
                    <div className="action">
                      <Dropdown
                        menu={{
                          items: [
                            // {
                            //   key: 1,
                            //   label: (
                            //     <Link
                            //       to={"/admin/naamsari/generate/" + proj.id}
                            //     >
                            //       <button className="transparentBtn">
                            //         Generate नामसारी
                            //       </button>
                            //     </Link>
                            //   ),
                            // },
                            {
                              key: 2,
                              label: (
                                <button className="transparentBtn">
                                  Change Land Owner
                                </button>
                              ),
                              onClick: () =>
                                ChangeLandOwner(proj.id, land.id, land),
                            },
                            {
                              key: 3,
                              label: (
                                <Button
                                  loading={disabled}
                                  className="transparentBtn"
                                >
                                  Old Owners
                                </Button>
                              ),
                              onClick: () => viewOldOwners(land.id, "owner"),
                            },
                            {
                              key: 4,
                              label: (
                                <button className="transparentBtn">
                                  Edit Current
                                </button>
                              ),
                              onClick: () =>
                                editCurrentLand(proj.id, land.id, land),
                            },
                            {
                              key: 5,
                              label: (
                                <button className="transparentBtn">
                                  Current Owner
                                </button>
                              ),
                              onClick: () => viewCurrentOwner(land, "owner"),
                            },
                          ],
                        }}
                        trigger={["click"]}
                      >
                        <button
                          className="naamsariDropdown transparentBtn"
                          onClick={(e) => e.preventDefault()}
                        >
                          Land Owner <DownOutlined />
                        </button>
                      </Dropdown>
                      &nbsp;&nbsp;&nbsp;
                      <Divider type="vertical" />
                      &nbsp;&nbsp;&nbsp;
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 1,
                              label: (
                                <button
                                  className="transparentBtn"
                                  onClick={() =>
                                    ChangeHomeOwner(proj.id, land.id, land)
                                  }
                                >
                                  Change Home Owner
                                </button>
                              ),
                            },
                            {
                              key: 2,
                              label: (
                                <button
                                  className="transparentBtn"
                                  onClick={() =>
                                    viewOldOwners(land.id, "houseOwner")
                                  }
                                >
                                  Old Owners
                                </button>
                              ),
                            },
                            {
                              key: 3,
                              label: (
                                <button
                                  disabled={land.houseOwner ? false : true}
                                  className="transparentBtn"
                                  onClick={() =>
                                    editCurrentHome(proj.id, land.id, land)
                                  }
                                >
                                  Edit Current
                                </button>
                              ),
                            },
                            {
                              key: 4,
                              label: (
                                <button
                                  className="transparentBtn"
                                  onClick={() =>
                                    viewCurrentOwner(land, "houseOwner")
                                  }
                                >
                                  Current Owner
                                </button>
                              ),
                            },
                          ],
                        }}
                        trigger={["click"]}
                      >
                        <button
                          className={`transparentBtn ${
                            land.houseOwner
                              ? "naamsariDropdown"
                              : "nsDropDownDisabled"
                          }`}
                          onClick={(e) => e.preventDefault()}
                        >
                          Home Owner <DownOutlined />
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          ))
        ) : (
          <div>No Data</div>
        )}
      </Collapse>
    </div>
  );
};

export default NaamsariCollapse;
/* <Dropdown
                      menu={
                        <Menu>
                          <Menu.Item icon={<EyeOutlined />}>
                            <button
                              className="transparentBtn"
                              onClick={() => viewCurrentOwner()}
                            >
                              Current Owner
                            </button>
                          </Menu.Item>
                          <Menu.Item icon={<EyeOutlined />}>
                            <button
                              disabled={land.houseOwner ? false : true}
                              className="transparentBtn"
                              onClick={() =>
                                editCurrentHome(x.id, land.id, land)
                              }
                            >
                              Old Owners
                            </button>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <button
                        className={"transparentBtn naamsariDropdown"}
                        onClick={(e) => e.preventDefault()}
                      >
                        <EyeOutlined />
                      </button>
                    </Dropdown>
                    <Divider type="vertical" />
                    &nbsp;&nbsp;&nbsp; */
