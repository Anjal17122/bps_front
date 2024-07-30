import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import PDFcharkilla from "../../../../../../Common/ProjectPDFs/PDFcharkilla";
import AdProjectFooter from "../../../../../../Components/Admin/Footers/AdProjectFooter";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import { ifCon } from "../ViewProject/ViewProject";
// import { MyStore } from "../../../../../../Store/ContextApi";
import CharkillaTable from "./CharkillaTable";

interface Props {
  admin?: boolean;
}

const ViewCharkillaAd = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);
  const lands = state.project.id ? state.project.lands : null;
  const params = useParams();
  const pid: string = params.pid ?? "";
  return (
    <div style={{ paddingBottom: 20 }}>
      <ViewProjectHeader
        id={pid}
        title="Charkilla"
        step="Step 4: "
        prev={
          admin
            ? `/admin/viewproject/land/${pid}`
            : `/user/viewproject/land/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/owners/${pid}`
            : `/user/viewproject/owners/${pid}`
        }
      />
      <PDFcharkilla projectId={pid} data={lands} />
      {ifCon() ? null : <AdProjectFooter pid={pid} />}
      <div className="CenterForm10">
        {lands ? (
          lands.map((land) => (
            <div
              key={land.id}
              className="marginAll20 withShadow"
              style={{ background: "white" }}
            >
              <div className="bluehead" style={{ padding: "5px 2%" }}>
                <h2>Kitta No: {land.landParcelNo}</h2>
                {/* <div>
              <Link to={`/project/create/addcharkilla/${x.id}`}>
                <TableButton bgColor="green" width="150px">
                  Add Charkilla
                </TableButton>
              </Link>
            </div> */}
              </div>
              <CharkillaTable data={land.charKillas} />
              {/* <CharkillaTable
            data={x.charKillas}
            delItem={(id) => delItem(id)}
          /> */}
            </div>
          ))
        ) : (
          <GoBackToProjects />
        )}
        <div className="flexEnd nextDiv">
          {/* <Link to={`/project/create/landowners/${pid}`}>
          <TableButton bgColor="blue">Next {">>"} </TableButton>
        </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ViewCharkillaAd;

/* {data.map((x, i) => (
      <tr key={i}>
        <td style={{ width: "20px" }}>{i + 1}</td>
        <td>{x.productName}</td>
        <td>{x.quantity}</td>
        <td>{x.rate}</td>
        <td>{x.total}</td>
        <td style={{ width: "20px" }}>
          <input
            type="checkbox"
            onChange={(e) => setSelected(e.target.checked, x)}
          />
        </td>
      </tr>
    ))} */
