import { Card } from "antd";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const NaamSariList = () => {
  const [expand, setExpand] = useState(false);

  // useEffect(() => {
  //   if (!state.landNaamsari) {

  //   }
  //   return () => { };
  // }, []);
  return (
    <div>
      <Card className="NaamSariCard">
        <a
          style={{ fontSize: 12 }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? <UpOutlined /> : <DownOutlined />} Collapse
        </a>
      </Card>
    </div>
  );
};

export default NaamSariList;
