import { useEffect, useState } from "react";
import { Button, Cascader, message } from "antd";
import { delArr } from "../../../Common/Functions/CommonFunctions";
import { sN } from "../../../Services/ProjectService";
import {
  AdminBody,
  DELtechnicalMem,
  getAdminsNoSetS,
  GETtechnicalMembers,
  GETTechnicalMemBOdy,
  POSTTechnicalMember,
  POSTTechnicalMemBOdy,
} from "../../../Services/SuperAdminService";
import "./TechnicalMembers.scss";
import TechnicalMemTable from "./TechnicalMemTable";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { filter } from "../../../constants/antdConstants";

const TechnicalMembers = () => {
  const [allAdmins, setAllAdmins] = useState<AdminBody[]>();
  const [selectedAdmin, setSelectedAdmin] = useState<AdminBody>();
  const [technicalMem, setTechnicalMem] = useState<GETTechnicalMemBOdy[]>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAdminsNoSetS(150).then((res) => setAllAdmins(res.data.adminList));
    GETtechnicalMembers(messageApi).then((res) => setTechnicalMem(res.data));
    return () => {
      setAllAdmins(undefined);
      setTechnicalMem(undefined);
    };
  }, []);

  const onChangeSelectAdmin = (value: sN[]) => {
    setSelectedAdmin(
      [...(allAdmins ?? [])].filter((alladmin) => alladmin.id === value[0])[0]
    );
  };

  const onAddMember = () => {
    const body: POSTTechnicalMemBOdy = {
      department: selectedAdmin?.personRole.name ?? "",
      designation: "",
      fullName: selectedAdmin?.nameEng ?? "",
      address: `${selectedAdmin?.addresses[0]?.municipality ?? ""} ${
        selectedAdmin?.addresses[0]?.ward ?? ""
      }`,
      personId: selectedAdmin?.id ?? 0,
      status: "enable",
    };
    POSTTechnicalMember(body, messageApi).then((res) => {
      const added = [...(technicalMem ?? []), res];
      setTechnicalMem(added);
    });
  };

  const adminsCascader = (): { label: string; value: sN }[] => {
    const mapped = [...(allAdmins ?? [])]?.map((alladmin) => ({
      label: alladmin.nameEng + ` (${alladmin.personRole.name})`,
      value: alladmin.id,
    }));
    return mapped;
  };

  const handleDelMem = (id: number) => {
    const init = [...(technicalMem ?? [])];
    setTechnicalMem(delArr<GETTechnicalMemBOdy>(technicalMem, id));
    DELtechnicalMem(id, messageApi).catch(() => {
      setTechnicalMem(init);
    });
  };

  return (
    <div>
      {contextHolder}
      <PageHeader
        title="Technical Members"
        subTitle="All Members of Technical Department"
      />
      <div className="TechnicalMembers">
        <div className="AddMember">
          <h2>Add Technical Member</h2>
          <Cascader
            style={{ width: 360 }}
            showSearch={{ filter }}
            options={adminsCascader()}
            placeholder="Search Admin..."
            onChange={onChangeSelectAdmin}
          ></Cascader>
          <br />
          <Button type="primary" onClick={onAddMember}>
            Add Member
          </Button>
        </div>
        <div className="MembersTable">
          {technicalMem ? (
            <TechnicalMemTable
              technicalMem={technicalMem}
              handleDelMem={handleDelMem}
            />
          ) : (
            <div>Loading... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalMembers;
