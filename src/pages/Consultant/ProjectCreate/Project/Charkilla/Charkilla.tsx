import { useParams } from "react-router-dom";
import StepsHeader from "../../../../../Common/Headers/StepsHeader";
import NoticeHeader from "../../../../../Components/Consultant/NoticeHeader/NoticeHeader";

import CharkillaDiv from "./CharkillaDiv";

const Charkilla = ({ oldData = true }: { oldData?: boolean }) => {
  const params: { pid?: string; tempId?: string } = useParams();

  return (
    <div>
      <StepsHeader
        id={params.pid ?? "0"}
        title="Charkilla"
        step="Step 4: "
        prev={`/project/create/landinfo/${params.pid}`}
        next={`/project/create/landowners/${params.pid}`}
      />

      <CharkillaDiv />
    </div>
  );
};

export default Charkilla;

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
