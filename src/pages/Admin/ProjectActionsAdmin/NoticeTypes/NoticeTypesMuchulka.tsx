import { Modal } from "antd";
import { GETNoticePublishBody } from "../../../../Services/NoticeTypeService";
// import { ProfileOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";
import { NoticeTypesTable } from "./NoticeTypesTable";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  projectId: number;
  noticePublish: GETNoticePublishBody[] | undefined;
};

const NoticeTypesMuchulka = ({
  isVisible,
  onClose,
  projectId,
  noticePublish,
}: Props) => {
  return (
    <Modal
      title={"सुचनाको प्रकारs: " + projectId}
      // className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      width={800}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <NoticeTypesTable noticePublish={noticePublish} projectId={projectId} />
    </Modal>
  );
};

export default NoticeTypesMuchulka;
