import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Image,
  message,
  Switch,
  TabsProps,
  Tooltip,
} from "antd";
import { Tabs } from "antd";
import ImagePopup from "../../../../../Common/ImagePopup/ImagePopup";
import TableButton from "../../../../../Common/TableButton/TableButton";
import { IMG_GET_URL, PDF_URL, imgFolders } from "../../../../../Services/Api";
import { GETLandWithOwner } from "../../../../../Services/CreateProjectService";
import { setSameLand } from "../../../../../Services/LandService";
import { getAddresses } from "../../../../../Services/UserService";
import { MyStore, ActionType } from "../../../../../Store/ContextApi";
import MyInfoBtn from "../../../../../Common/InfoIcon/MyInfoBtn";
import { LandOwnerCardTab } from "./LandOwnerCardTab";
import { useManjurinama } from "./useLandOwners";
import { checkIfPDF } from "../LandInfo/LandCard";

interface Props {
  data: GETLandWithOwner;
  type: "landOwner" | "houseOwner";
  isAdmin?: boolean;
}

const LandOwnerCard = ({ data, type, isAdmin: isAdmin = false }: Props) => {
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");
  const [switchStatus, setSwitchStatus] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();

  const { manjurinama } = useManjurinama(params.pid);

  function onViewCitizenS(imgsrc: string) {
    setImgsrc(IMG_GET_URL + `/${imgFolders.citizenship}/` + imgsrc);
    setModal(true);
  }
  function onViewPhoto(imgsrc: string) {
    setImgsrc(IMG_GET_URL + `/${imgFolders.person}/` + imgsrc);
    setModal(true);
  }
  const { dispatch } = useContext(MyStore);
  function editAddressClick(address: getAddresses) {
    dispatch({ type: ActionType.setAddress, payload: address });
  }
  const onSwitchChange = (value: boolean, id: number) => {
    if (value) {
      if (window.confirm("Are you sure ?")) {
        setSameLand(
          { id, ownerType: type === "landOwner" ? "LandOwner" : "HouseOwner" },
          messageApi,
          localStorage.getItem("isPerma") === "true"
            ? "/land/perma/same/owner"
            : "/land/same/owner"
        )
          .then(() => {
            setSwitchStatus(value);
            messageApi.success("House Owner set as Applicant!");
          })
          .then(() => window.location.reload());
      } else {
        setSwitchStatus(false);
        messageApi.warning("Cancelled");
      }
    }
  };

  // const onManjurinamaDel = () => {};
  // function onManjurinamaUpload(info: UploadChangeParam<UploadFile>, id: sN) {
  //   if (info.file.status === "done") {
  //     messageApi.success(`${info.file.name} file uploaded successfully`);
  //     uploadManjurinama(id, info.file.response.message, messageApi);
  //   } else if (info.file.status === "error") {
  //     messageApi.error(`${info.file.name} file upload failed.`);
  //   }
  // }

  const items = (): TabsProps["items"] => {
    return data[type].map((landowner, index: number) => ({
      key: index.toString(),
      label:
        (type === "houseOwner" ? "House" : "Land") + `Owner - ${index + 1}`,
      children: (
        <LandOwnerCardTab
          landowner={landowner}
          onViewPhoto={onViewPhoto}
          onViewCitizenS={onViewCitizenS}
          editAddressClick={editAddressClick}
        />
      ),
    }));
  };

  const manjurimanaUrl =
    IMG_GET_URL + `/${imgFolders.manjurinama}/` + manjurinama?.manjurinama;

  const manjurimanaPdfUrl =
    PDF_URL + `/${imgFolders.manjurinama}/` + manjurinama?.manjurinama;
  return (
    <div className="marginAll20 withShadow" style={{ background: "white" }}>
      {contextHolder}
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => setModal(false)}
      />
      <div className="bluehead" style={{ padding: "5px 2%" }}>
        <h2>Kitta No: {data.landParcelNo}</h2>{" "}
        {manjurinama ? (
          <div
            style={{
              paddingTop: 0,
              position: "absolute",
              right: 320,
            }}
          >
            <div style={{}}>
              View Manjurinama: &nbsp; &nbsp;
              {checkIfPDF(manjurinama?.manjurinama) ? null : (
                <Image
                  src={manjurimanaUrl}
                  width={30}
                  height={30}
                  style={{ border: "2px solid #d97706" }}
                />
              )}
              &nbsp; &nbsp;
              <Link
                to={
                  checkIfPDF(manjurinama?.manjurinama)
                    ? manjurimanaPdfUrl
                    : manjurimanaUrl
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button type="primary" size="small">
                  <DownloadOutlined />
                </Button>
              </Link>
              &nbsp; &nbsp;
              <MyInfoBtn info="View Manjurinama" />
            </div>
          </div>
        ) : null}
        <div>
          {switchStatus ? null : (
            <>
              {type === "landOwner" ? (
                isAdmin ? null : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link
                      to={`/project/create/addlandowner/${data.id}/${data.id}`}
                    >
                      <TableButton bgColor="grey" width="150px">
                        Add Land Owner
                      </TableButton>
                    </Link>
                    <Divider type="vertical"></Divider>
                    <Link to={`/project/create/addorgowner/${data.id}`}>
                      <button className="GreenBtn">
                        {" "}
                        <PlusOutlined style={{ fontSize: 12 }} /> Org
                      </button>
                    </Link>{" "}
                    &nbsp;
                    <MyInfoBtn info="If the land is in Organization's name." />
                  </div>
                )
              ) : isAdmin ? null : (
                <>
                  <Tooltip title="Only add if Land and Home owner are different">
                    <Link
                      to={`/project/create/addhomeowner/${data.id}/${data.id}`}
                    >
                      <TableButton bgColor="grey" width="150px">
                        Add Home Owner
                      </TableButton>
                    </Link>
                  </Tooltip>
                  <Divider type="vertical"></Divider>
                  <Link to={`/project/create/house/addorgowner/${data.id}`}>
                    <button className="GreenBtn">
                      {" "}
                      <PlusOutlined style={{ fontSize: 12 }} /> Org
                    </button>
                  </Link>{" "}
                  &nbsp;
                  <MyInfoBtn info="If the house is in Organization's name." />
                </>
              )}
            </>
          )}
        </div>
      </div>
      {data[type].length ? (
        <Tabs type="card" items={items()}></Tabs>
      ) : localStorage.getItem("role") === "ROLE_Consultant" ? (
        <div className="CheckLandOwner">
          <div>
            Is the Applicant and{" "}
            {type === "landOwner" ? "Land Owner" : "House Owner"} same? &nbsp;
            <Switch
              checked={switchStatus}
              onChange={(a) => onSwitchChange(a, data.id)}
            />
          </div>
          <div></div>
        </div>
      ) : (
        <div style={{ height: 100 }}></div>
      )}
    </div>
  );
};

export default LandOwnerCard;
