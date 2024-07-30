import { useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import MyPopconfirm from "../../../../../Common/Popconfirm/MyPopconfirm";
import {
  OnDeskProjects,
  approveByOne,
  sN,
} from "../../../../../Services/ProjectService";
import useStoreViewProj from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Common } from "../../../../../constants/constants";
import {
  getTypeByRole,
  sendSignedAdmin,
} from "../../../../../Services/DigitalSignatureService";
import SignDocument from "../../../../../Components/TestWebsocket";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { getApprovedStatus } from "../../../../../constants/helper";
import { useQueryClient } from "@tanstack/react-query";
import { sendDartaNo } from "../../OnDeskService/OnDeskService/OnDeskService";
import { isMandandeupur } from "../../../../../constants/CommonFunctions";
import { ApproveComment } from "./ApproveComment";

type Props = {
  project: OnDeskProjects;
};

const ApproveRow = ({ project }: Props) => {
  const approvedStatus = getApprovedStatus(project);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // const ApproveSuccess = () => {
  //   const onDeskData: OnDeskProjects[] | undefined = queryClient.getQueryData([
  //     "OnDesk",
  //     OnDeskPage,
  //   ]);
  //   const updatedArray = onDeskData?.map((proj) => {
  //     if (proj.id === project.id) {
  //       return { ...proj, [getroleOnD()]: true };
  //     }
  //     return proj;
  //   });
  //   queryClient.setQueriesData(["OnDesk", OnDeskPage], updatedArray);
  // };

  // function handleApproveByOne(id: number) {
  // approveByOne(id, messageApi).then(() => {
  // message.info("Success");
  // });
  // }

  function handleApproveByOne(id: number, comment: string) {
    approveByOne(id, messageApi).then((res: any) => {
      const successCallback = (msg: string, id: sN, hashedVal: string) => {
        const sigLast = msg.indexOf(Common);
        const sig = msg.substring(10, sigLast);
        sendSignedAdmin(
          id,
          {
            isSignature: true,
            signatureByType: getTypeByRole(),
            hashedValue: hashedVal,
            signature: sig,
            comment: comment,
          },
          messageApi
        ).then(() => {
          queryClient.invalidateQueries({
            queryKey: [MyQueries.OnDesk],
          });
          messageApi.success("Approved by this department!");
        });
      };
      SignDocument(res.message, id, successCallback);
    });
  }

  const { disabled } = useStoreViewProj();
  const [dartaNo, setDartaNo] = useState("0");

  if (localStorage.getItem("role") === "ROLE_Registration") {
    return (
      <div style={{ display: "flex" }}>
        {contextHolder}
        <Input
          style={{ width: 90 }}
          placeholder="Darta No."
          onChange={(e) => setDartaNo(e.target.value)}
        />

        <Button
          className="NoStyleBtnSm"
          disabled={disabled}
          onClick={() =>
            sendDartaNo({ id: project.id, registrationNo: dartaNo }, messageApi)
          }
        >
          Submit
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        {contextHolder}
        {isMandandeupur() ? (
          <ApproveComment
            disabled={disabled}
            popDisabled={approvedStatus}
            onConfirm={(comment: string) =>
              handleApproveByOne(project.id, comment)
            }
            button={
              approvedStatus ? (
                <span>
                  <CheckCircleFilled style={{ color: "#52c41a" }} /> Done
                </span>
              ) : (
                "Approve"
              )
            }
            type="link"
          />
        ) : (
          <MyPopconfirm
            disabled={disabled}
            popDisabled={approvedStatus}
            onConfirm={() => handleApproveByOne(project.id, "")}
            button={
              approvedStatus ? (
                <span>
                  <CheckCircleFilled style={{ color: "#52c41a" }} /> Done
                </span>
              ) : (
                "Approve"
              )
            }
            type="link"
          />
        )}
      </div>
    );
  }
};

export default ApproveRow;
