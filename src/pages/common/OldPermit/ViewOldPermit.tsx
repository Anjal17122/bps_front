import { Descriptions, DescriptionsProps, Spin, message } from "antd";
import OldPermitForm from "./OldPermitForm";
import { useParams } from "react-router-dom";
import { useOldPermitId, convertToInitialOldPermit } from "./useOldPermit";

type Props = {};

const ViewOldPermit = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();

  const { oldPermitId, refetch } = useOldPermitId(
    Number(params.id) ?? 0,
    messageApi
  );

  // Items
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name (English)",
      children: "userDetailData?.user.nameEng",
    },
    {
      key: "2",
      label: "Name (Nepalese)",
      children: "userDetailData?.user.nameNep",
    },
    {
      key: "3",
      label: "Email",
      children: "userDetailData?.user.email",
    },
    {
      key: "4",
      label: "Gender",
      children: "userDetailData?.user.gender",
    },
    {
      key: "5",
      label: "Marital Status",
      children: "userDetailData?.user.maritalStatus",
    },
    {
      key: "6",
      label: "Phone Number",
      children: "userDetailData?.user.phoneNo",
    },
    {
      key: "7",
      label: "Status",
      children: "userDetailData?.user.status",
    },
    {
      key: "8",
      label: "Identity Number",
      children: "userDetailData?.userDocument.identityNo",
    },
    {
      key: "9",
      label: "Issued Place",
      children: "userDetailData?.userDocument.issuedPlace",
    },
  ];
  return (
    <div>
      <h1></h1>
      <div className="CenterForm" style={{ backgroundColor: "#f5f5f5" }}>
        {contextHolder}
        {oldPermitId ? (
          <OldPermitForm
            handleFinish={() => {}}
            initialValues={convertToInitialOldPermit(oldPermitId)}
            disabled={true}
          />
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default ViewOldPermit;
