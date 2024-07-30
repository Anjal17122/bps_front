import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../../../Assets/scss/Project.scss";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { Tabs, TabsProps } from "antd";
import {
  getLandsWithOwner,
  GETLandWithOwner,
} from "../../../../../../Services/CreateProjectService";
import { ifCon } from "../ViewProject/ViewProject";
import PDFlandowner from "../../../../../../Common/ProjectPDFs/PDFlandowner";
import AdProjectFooter from "../../../../../../Components/Admin/Footers/AdProjectFooter";
import LandOwnerCard from "../../../../../Consultant/ProjectCreate/Project/LandOwner/LandOwnerCard";
import MyInfoBtn from "../../../../../../Common/InfoIcon/MyInfoBtn";

interface Props {
  admin?: boolean;
}

const ViewLandOwnersAd = ({ admin = false }: Props) => {
  const params = useParams();
  const pid: string = params.pid ?? "";

  const [owners, setOwners] = useState<GETLandWithOwner[]>();

  useEffect(() => {
    getLandsWithOwner("/land/perma/owner?id=", pid).then((res) =>
      setOwners(res.data)
    );
    return () => setOwners(undefined);
  }, []);

  //       prev: `/user/viewproject/charkilla/${props.match.params.pid}`,
  //       next: `/user/viewproject/floor/${props.match.params.pid}`,

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `Land Owners`,
      children: (
        <div>
          {owners?.map((landWitOwner) => (
            <LandOwnerCard
              data={landWitOwner}
              key={landWitOwner.id}
              type="landOwner"
              isAdmin={true}
              
            />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: `House Owners`,
      children: (
        <div>
          <MyInfoBtn info="Only submit data if House Owners and Land Owners are different" />
          {owners?.map((landWithOwner) => (
            <LandOwnerCard
              key={landWithOwner.id}
              data={landWithOwner}
              type="houseOwner"
              isAdmin={true}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 20 }}>
      {ifCon() ? null : <AdProjectFooter pid={pid} />}

      <ViewProjectHeader
        id={pid}
        step="Step 5: "
        title="Land Owners Information"
        prev={
          admin
            ? `/admin/viewproject/charkilla/${pid}`
            : `/user/viewproject/charkilla/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/floor/${pid}`
            : `/user/viewproject/floor/${pid}`
        }
      />
      <div className="CenterForm10 LandOwnersDiv">
        {owners && (
          <div className="DownloadBtn">
            <PDFlandowner landOwners={owners} projectId={pid} />
          </div>
        )}
        <Tabs defaultActiveKey="1" items={items()}></Tabs>
      </div>
    </div>
  );
};

export default ViewLandOwnersAd;
