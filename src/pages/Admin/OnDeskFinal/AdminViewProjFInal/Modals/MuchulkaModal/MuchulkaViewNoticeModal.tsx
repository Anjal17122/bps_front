import { Modal, message } from "antd";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { NoticeTypesTable } from "../../../../ProjectActionsAdmin/NoticeTypes/NoticeTypesTable";
import { useEffect, useState } from "react";
import { GETnoticePublished } from "../../../OnDeskService/NoticeServiceFinal/NoticeServiceFinal";
import { GETNoticePublishBody } from "../../../OnDeskService/NoticeServiceFinal/types";
import { AcModal } from "../../../../../../Store/StoreModal/types";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
// import { ProfileOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";

// type Props = {
//   isVisible: boolean;
//   onClose: () => void;
//   projectId: number;
//   noticePublish: GETNoticePublishBody[] | undefined;
// };

const MuchulkaViewNoticeModal = () => {
  const { currentPid } = useStoreViewProj();
  const { muchulkaViewNotice } = useStoreModal();
  const [noticePublish, setNoticePublish] = useState<GETNoticePublishBody[]>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETnoticePublished(currentPid, messageApi).then((res) =>
      setNoticePublish(res.data)
    );

    return () => {
      setNoticePublish(undefined);
    };
  }, []);

  return (
    <Modal
      title={"सुचनाको प्रकारs: " + currentPid}
      // className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      width={800}
      open={muchulkaViewNotice}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        dispatch({ type: Ac.setCurrentPid, payload: 0 });
        dispatchModal({ type: AcModal.setMuchulkaViewNotice, payload: false });
      }}
      destroyOnClose={true}
    >
      {contextHolder}
      <NoticeTypesTable noticePublish={noticePublish} projectId={currentPid} />
    </Modal>
  );
};

export default MuchulkaViewNoticeModal;
