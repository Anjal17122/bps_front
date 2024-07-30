import { useState } from "react";
import { Cascader, message } from "antd";
import MyPopconfirm from "../../../../../Common/Popconfirm/MyPopconfirm";
import useStoreViewProj from "../../../../../Store/StoreViewProject/StoreViewProj";
import { userTypes } from "./OnDeskVars";
import { getStr } from "../helper/helperAdminViewP";
import { onTransferProj } from "../../OnDeskService/OnDeskService/OnDeskService";
import { useQueryClient } from "@tanstack/react-query";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";

type Props = {
  index: number;
  projectId: number;
};

const SendProjectRow = ({ index, projectId }: Props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [value, setValue] = useState<string>("");
  const { disabled } = useStoreViewProj();
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const onSendProject = () => {
    onTransferProj(projectId, value, messageApi).then(() => {
      queryClient.invalidateQueries({ queryKey: [MyQueries.Unapproved] });
      queryClient.invalidateQueries({ queryKey: [MyQueries.OnDesk] });
    });
    // const onDeskData: OnDeskProjects[] | undefined = queryClient.getQueryData([
    //   "OnDesk",
    //   OnDeskPage,
    // ]);
    // const updatedArray = onDeskData?.filter((proj) => proj.id !== projectId);
    // queryClient.setQueriesData(["OnDesk", OnDeskPage], updatedArray);
  };

  return (
    <div style={{ display: "flex" }}>
      {contextHolder}
      <Cascader
        allowClear
        onDropdownVisibleChange={() => setCurrIndex(index)}
        placeholder="Select..."
        style={{ width: 100 }}
        options={userTypes}
        value={currIndex === index ? [value] : undefined}
        onChange={(value) => setValue(getStr(value[0]))}
      />
      <MyPopconfirm
        disabled={disabled}
        onConfirm={() => onSendProject()}
        button="Send"
        size="middle"
      />
    </div>
  );
};

export default SendProjectRow;
