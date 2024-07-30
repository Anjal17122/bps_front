import { useEffect, useState } from "react";
import {
  GETTechnicalMemBOdy,
  GETtechnicalMembers,
} from "../../../Services/SuperAdminService";
import TechnicalMemTable from "./TechnicalMemTable";
import "./TechnicalMembers.scss";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { message } from "antd";

const TechnicalMemAdmin = () => {
  const [technicalMem, setTechnicalMem] = useState<GETTechnicalMemBOdy[]>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETtechnicalMembers(messageApi).then((res) => setTechnicalMem(res.data));
    return () => {
      setTechnicalMem(undefined);
    };
  }, []);
  return (
    <div>
      {contextHolder}
      <PageHeader
        title="Technical Members"
        subTitle="All Members of Technical Department"
      />
      <div className="TechnicalMembers">
        <div className="MembersTable">
          {technicalMem ? (
            <TechnicalMemTable
              technicalMem={technicalMem}
              // handleDelMem={handleDelMem}
            />
          ) : (
            <div>Loading... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalMemAdmin;
