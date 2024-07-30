import { Button, Dropdown } from "antd";
import {
  EyeOutlined,
  MenuOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { OnDeskProjects } from "../../../../Services/ProjectService";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { checkIfPDF } from "../../ProjectCreate/Project/LandInfo/LandCard";
import { MUCHULKA_DW, MUCHULKA_PDF } from "../../../../Services/Api";
import { dispatch } from "../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { AGREEMENT_URL } from "../../../../constants/constants";

interface Props {
  project: OnDeskProjects;
}

const MoreConsultant = ({ project }: Props) => {
  const MoreItems = (): ItemType[] => {
    const _commonItems: ItemType[] = [
      {
        key: "1",
        label: (
          <div
            onClick={() => {
              dispatchModalCon({
                type: AcMCon.setAddRevisionModal,
                payload: true,
              });
              dispatch({ type: Ac.setCurrentPid, payload: project.id });
            }}
          >
            <PlusOutlined style={{ color: "#9E339F" }} /> &nbsp; Add Revision
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            onClick={() => {
              dispatchModalCon({
                type: AcMCon.setviewProjectImages,
                payload: true,
              });
              dispatch({ type: Ac.setCurrentPid, payload: project.id });
            }}
          >
            <EyeOutlined style={{ color: "#F4801A" }} /> &nbsp; Images
          </div>
        ),
      },
      {
        key: "agreement",
        label: (
          <div
            onClick={() => {
              dispatchModalCon({
                type: AcMCon.setAgreementModalCon,
                payload: true,
              });
              dispatch({ type: Ac.setCurrentPid, payload: project.id });
            }}
          >
            <ProfileOutlined style={{ color: "green" }} /> &nbsp; Agreement
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div>
            {project.muchulka ? (
              <>
                <a
                  href={
                    (checkIfPDF(project.muchulka)
                      ? MUCHULKA_PDF
                      : MUCHULKA_DW) + project.muchulka
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span style={{ width: 100 }}>View Muchulka:</span>
                  <span style={{ width: 60 }}>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      size="small"
                    ></Button>
                  </span>
                </a>
              </>
            ) : (
              <div style={{ display: "flex" }}>
                <span style={{ width: 100, marginRight: 10 }}>
                  View Muchulka:
                </span>
                <span style={{ width: 60, color: "#1677FF" }}>No Data</span>
              </div>
            )}
          </div>
        ),
      },
    ];
    return _commonItems;
  };

  return (
    <div>
      <Dropdown
        placement="bottom"
        trigger={["click"]}
        menu={{ items: MoreItems() }}
      >
        <Button type="link" icon={<MenuOutlined />}></Button>
      </Dropdown>
    </div>
  );
};

export default MoreConsultant;

// overlay={
//   <Menu style={{ width: 250 }} className="">
//     <Menu.SubMenu
//       key="sub2"
//       icon={<img src={PayIcon} width={"auto"} height={14} alt="" />}
//       title="Pay Revenue"
//     >
//       <Menu.Item key="esewa">
//         <Link to="/consultant/payesewa" target={"_blank"}>
//           E-sewa
//         </Link>
//       </Menu.Item>
//     </Menu.SubMenu>
//     <Menu.Item
//       key={36371}
//       icon={<PlusOutlined />}
//       onClick={onAddRevision}
//     >
//       Add Revision
//     </Menu.Item>

//     <Menu.Item key="1" icon={<FileImageFilled />}>
//       <span style={{ display: "table-cell", width: "200px" }}>
//         Images
//       </span>
//       <span style={{ display: "table-cell", width: 100 }}>
//         <Button
//           onClick={uploadImageModal}
//           type="link"
//           icon={<UploadOutlined />}
//           size="small"

//           // onClick={() => {
//           //   setImagesModal(true);
//           //   setCurrentID(project.id);
//           // }}
//         ></Button>
//         <Divider type="vertical"></Divider>
//         <Button
//           type="link"
//           icon={<EyeOutlined />}
//           onClick={openImageModal}

//           // onClick={() => {
//           //   setViewImagesModal(true);
//           //     .then((res: any) => setProjectImages(res.data))
//           //     .catch(() => {
//           //       setViewImagesModal(false);
//           //     });
//           // }}
//           size="small"
//         ></Button>
//       </span>
//     </Menu.Item>

//     <Menu.Item key="3" icon={<FileMarkdownOutlined />}>
//       {project.muchulka ? (
//         <>
//           <a
//             href={
//               (checkIfPDF(project.muchulka)
//                 ? MUCHULKA_PDF
//                 : MUCHULKA_DW) + project.muchulka
//             }
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             <span style={{ display: "table-cell", width: "200px" }}>
//               View Muchulka
//             </span>
//             <span style={{ display: "table-cell", width: 100 }}>
//               <Button
//                 type="link"
//                 icon={<EyeOutlined />}
//                 size="small"
//               ></Button>
//             </span>
//           </a>
//         </>
//       ) : (
//         <>
//           <span style={{ display: "table-cell", width: "200px" }}>
//             View Muchulka
//           </span>
//           <span style={{ display: "table-cell", width: 100 }}>
//             No Data
//           </span>
//         </>
//       )}
//     </Menu.Item>
//   </Menu>
// }
