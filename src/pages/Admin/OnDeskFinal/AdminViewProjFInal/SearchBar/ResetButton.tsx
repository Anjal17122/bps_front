import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  dispatchUrl,
  initialUrl,
} from "../../../../../Store/StoreUrls/StoreUrls";
import { AcUrl, UrlState } from "../../../../../Store/StoreUrls/types";
import useStoreViewProj from "../../../../../Store/StoreViewProject/StoreViewProj";
import { TabTy } from "../types/typesAdminViewProj";
import { dispatchPage } from "../../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../../Store/StorePagination/types";

interface Props {
  type: TabTy;
}

const ResetButton = ({ type }: Props) => {
  const { disabled } = useStoreViewProj();
  const queryClient = useQueryClient();

  return (
    <Button
      disabled={disabled}
      icon={<SyncOutlined />}
      type="primary"
      ghost
      onClick={() => {
        dispatchUrl({
          type: ("set" + type + "Url") as AcUrl,
          payload: initialUrl[(type + "Url") as keyof UrlState],
        });
        queryClient.invalidateQueries({ queryKey: [type] });
        dispatchPage({ type: ("set" + `${type}Page`) as AcP, payload: 0 });
      }}
      className="RefreshButton"
    ></Button>
  );
};

export default ResetButton;
