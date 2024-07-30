import { FormInstance, Modal, message } from "antd";
import MapdandaForm from "./MapdandaForm";
import { MapdandaValues } from "./types";
import { putMapdanda } from "../../../Services/MapdandaService";
import { convertToPostMapdandaBody } from "./utils";
import { useMapdandaPid } from "./useMapdanda";

type Props = { pid: number; onClose: () => void };

const EditMapdandaModal = ({ pid, onClose }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mapdandaPid, refetch } = useMapdandaPid(pid, messageApi, true);

  const handleFinish = (values: MapdandaValues, form: FormInstance<any>) => {
    const data = convertToPostMapdandaBody(values, pid);

    putMapdanda(data, messageApi).then((res) => {
      messageApi.success("Mapdanda Edited Successfully!");
      refetch();
    });
  };

  return (
    <Modal
      open={true}
      width={600}
      footer={null}
      onCancel={onClose}
      title={false}
      centered={true}
      destroyOnClose={true}
    >
      {contextHolder}
      <h2>मापदण्ड Edit</h2>
      {mapdandaPid ? (
        <MapdandaForm initialValues={mapdandaPid} handleFinish={handleFinish} />
      ) : (
        <>Loading...</>
      )}
    </Modal>
  );
};

export default EditMapdandaModal;
