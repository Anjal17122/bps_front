import { Pagination, message } from "antd";
import { useEffect, useState } from "react";
import { Common } from "../../../constants/constants";
import { OwnProjectBody } from "../../../Services/CreateProjectService";
import {
  forwardGetHash,
  forwardWithDigitalSign,
} from "../../../Services/DigitalSignatureService";
import { getOwnProjects, sN } from "../../../Services/ProjectService";
import SignDocument from "../../TestWebsocket";
import PageHeader from "../../Common/PageHeader/PageHeader";
import NotSubmittedTable from "../../../pages/Consultant/ViewProjectFinal/NotSubmittedTable/NotSubmittedTable";

const NotSubmittedProjects = () => {
  const [projects, setProjects] = useState<OwnProjectBody[]>();
  const [search, setSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getOwnProjects(0, messageApi).then((res) => {
      setProjects(res.data);
    });
    return () => {
      setSearch(false);
      setProjects(undefined);
    };
  }, []);

  function onPageChange(page: number) {
    getOwnProjects(page - 1, messageApi).then((res) => setProjects(res.data));
  }
  function onForwardProject(id: number) {
    forwardWithDigitalSign(id, messageApi).then(() => window.location.reload());
    // forwardGetHash(id, messageApi).then((res) => {
    //   const successCallback = (msg: string, id: sN, hashedVal: string) => {
    //     const siglast = msg.indexOf(Common);
    //     const sig = msg.substring(10, siglast);
    //     forwardWithDigitalSign(
    //       id,
    //       { hashedValue: hashedVal, signature: sig },
    //       messageApi
    //     ).then(() => window.location.reload());
    //   };
    //   SignDocument(res.data, id, successCallback);
    // });
  }

  return (
    <div>
      {contextHolder}
      <PageHeader
        title="Pending Projects"
        subTitle="Projects: Work in Progress"
      />

      <div className="CenterForm10">
        {/* <div className="TableHead">
            <Search
              className="MySearch"
              placeholder="Application Name"
              enterButton
              onSearch={onSearchName}
            />
            <Search
              className="MySearch"
              placeholder="Application No."
              enterButton
              onSearch={onSearchNo}
            />
            <div>
              <RangePicker onChange={onDateChange} />
            </div>
          </div> */}
        <div className="TableWrapper" style={{ minHeight: 400 }}>
          {projects ? (
            <NotSubmittedTable onForwardProject={onForwardProject} />
          ) : null}
          <Pagination
            disabled={search}
            onChange={onPageChange}
            total={50}
            showSizeChanger={false}
            style={{ background: "white", padding: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotSubmittedProjects;
