import { FC, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Person from "../../PersonAdd/Person";
import { CloseOutlined } from "@ant-design/icons";

const Cheader = lazy(
  () => import("../../../../../Components/Common/Headers/Cheader")
);

const AddLandOwner: FC = () => {
  const params = useParams();
  const pid = params.pid ?? "";
  const landid = params.landid ?? "";

  const history = useNavigate();

  return (
    <div style={{ background: "grey" }}>
      <Cheader />
      <div
        className="CenterForm10"
        style={{
          padding: "10px 20px 20px 20px",
          background: "white",
          marginTop: 10,
        }}
      >
        <div
          style={{ cursor: "pointer", position: "absolute", right: "11%" }}
          onClick={() => {
            history(-1);
          }}
        >
          <CloseOutlined />
        </div>
        <div style={{ paddingTop: 30 }}>
          <Person
            addPersonUrl={
              localStorage.getItem("isPerma") === "true"
                ? "/person/perma/owner/perma"
                : "/person/perma/owner"
            }
            pId={pid}
            landId={parseInt(landid)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLandOwner;
