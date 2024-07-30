import { Switch } from "antd";
import { sN } from "../../../Services/ProjectService";
import { GetTransferSettingBody } from "../../../Services/TransferSettingService";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

interface Props {
  data: GetTransferSettingBody[];
  changeActiveStatus: (status: boolean, index: number, id: sN) => void;
  isMandatory?: boolean;
}

export const TransferSettingTable = ({
  data,
  changeActiveStatus,
  isMandatory = false,
}: Props) => {
  const { disabled } = useStoreGlobal();
  return (
    <div className="MyTableOuter">
      <table className="MyTable">
        <thead>
          <tr>
            <th>SN</th>
            <th>Role</th>
            <th>Active Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transferr, index) => (
            <tr key={transferr.id}>
              <td>{index + 1}</td>
              <td>{transferr.name}</td>
              <td>
                <Switch
                  disabled={disabled}
                  size="small"
                  checked={
                    isMandatory ? transferr.mandatoryApproval : transferr.active
                  }
                  onChange={(value) =>
                    changeActiveStatus(value, index, transferr.id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
