import { Button, Modal } from "antd";
import MyButton from "../../../Common/TableButton/MyButton";
import { Link } from "react-router-dom";
import LeftBorderBtn from "../../../Common/TableButton/LeftBorderBtn";
import { getToken } from "../../../Services/UserService";

type Props = {
  isOpen: boolean;
  id: number;
  onClose: () => void;
};

const PermitActions = ({ id, isOpen, onClose }: Props) => {
  const token = getToken();
  return (
    <Modal
      open={isOpen}
      width={550}
      footer={null}
      onCancel={onClose}
      title={null}
      centered
      destroyOnClose={true}
      styles={{
        content: { backgroundColor: "#e5e7eb", padding: "50px 40px" },
      }}
    >
      <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
        <Link to={"/project/permit/view/" + id}>
          <LeftBorderBtn color="green">View</LeftBorderBtn>
        </Link>
        <Link to={"/project/permit/edit/" + id}>
          <LeftBorderBtn color="fuchsia">Edit</LeftBorderBtn>
        </Link>
        <a
          href={
            "https://naksadata-nagarjun.navya.com.np/set/c/" + id + `/${token}`
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          <LeftBorderBtn color="fuchsia">Upload Document</LeftBorderBtn>
        </a>
        {/* <LeftBorderBtn color="blue">Naam Sari</LeftBorderBtn>
        <LeftBorderBtn color="violet">Upload Document</LeftBorderBtn>
        <LeftBorderBtn color="amber">View Document</LeftBorderBtn> */}
      </div>
    </Modal>
  );
};

export default PermitActions;
