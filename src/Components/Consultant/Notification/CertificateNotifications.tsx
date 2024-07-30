import { Link } from "react-router-dom";
import {
  useConNotification,
  useConSignedP,
  useConSubmittedP,
} from "../../Common/Headers/useHeader";
import PageHeader from "../../Common/PageHeader/PageHeader";
import { Button, Table, Tabs, TabsProps, message } from "antd";
import { getConCertificateNotificationBody } from "../../../Services/UserService";
import { PDF_URL } from "../../../Services/Api";
import {
  GETapprovedConFinal,
  OnDeskProjects,
  ResOnDesk,
} from "../../../Services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { MyQueriesCon } from "../../../constants/MyQueries/MyQueries";
import { isDhulikhel } from "../../../constants/CommonFunctions";

const CertificateNotifications = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { conNotification, isLoading } = useConNotification(messageApi);
  // const { conSubmittedP, isLoading: isLoading1 } = useConSubmittedP(messageApi);
  const { conSignedP, isLoading: isLoading1 } = useConSignedP(messageApi);

  const { data: approvedP, isLoading: isLoading2 } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueriesCon.ApprovedCon],
    queryFn: () => GETapprovedConFinal(0, messageApi).then((res) => res),
    retry: 1,
  });

  const localPDFUrl = (type: getConCertificateNotificationBody): string => {
    const urlData =
      PDF_URL + "/" + type.certificateType.toLowerCase() + "/" + type.filename;

    if (type.certificateType === "PLINTH") {
      return urlData;
    } else if (type.certificateType.includes("SUPER")) {
      return urlData;
    } else if (type.certificateType.includes("NIRMAN")) {
      return urlData;
    } else {
      return urlData;
      // `${pid}/${patrasa}/${projectPerma?.buildingPurposeName}`
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Id",
      dataIndex: "projectPermaId",
      key: "projectPermaId",
    },
    {
      title: "TYPE",
      dataIndex: "certificateType",
      key: "certificateType",
    },
    {
      title: "ACTION",
      key: "action",
      render: (text: getConCertificateNotificationBody) => (
        <Link to={localPDFUrl(text)} target="_blank" rel="noopener noreferrer">
          <Button type="link">View</Button>
        </Link>
      ),
    },
  ];

  const drawingsCol = [
    {
      title: "Project Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "ACTION",
      // dataIndex: "action",
      key: "action",
      render: (text: OnDeskProjects) => (
        // <Link to={localPDFUrl(text)} target="_blank" rel="noopener noreferrer">
        //   <Button type="link">View</Button>
        // </Link>
        <Link to={"/consultant/signed/drawings/" + text.id}>View</Link>
      ),
    },
  ];

  if (!conNotification) {
    return <div>Loading...</div>;
  }
  if (!conSignedP) {
    return <div>Loading...</div>;
  }
  if (!approvedP) {
    return <div>Loading...</div>;
  }
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Certificate",
      children: isDhulikhel() ? null : (
        <Table dataSource={conNotification} columns={columns} />
      ),
    },
    {
      key: "2",
      label: "Drawings",
      children: (
        <Table
          // dataSource={[...conSubmittedP, ...approvedP.data]}
          dataSource={conSignedP}
          columns={drawingsCol}
        />
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <PageHeader title="Notification" subTitle="Notification" />

      <div className="CenterForm">
        <Tabs defaultActiveKey="1" items={items} />;
      </div>
    </div>
  );
};

export default CertificateNotifications;
