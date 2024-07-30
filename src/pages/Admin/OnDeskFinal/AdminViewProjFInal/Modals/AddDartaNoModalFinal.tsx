import { Form, Input, Modal, message } from "antd";
import {
  FormProps,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { postDartaDetails } from "../../../../../Services/AdminViewProjService/RegistrationService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

const AddDartaNoModalFinal = () => {
  const { currentPid, addDartaNoModal } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (val: any) => {
    postDartaDetails(
      {
        projectId: currentPid,
        dartaNo: val.dartaNo,
        dartaDateEng: val.dartaDateEng,
        dartaDateNep: val.dartaDateNep,
      },
      messageApi
    ).then(() => {
      dispatch({
        type: Ac.setAddDartaNoModal,
        payload: { currentPid: 0, addDartaNoModal: false },
      });
    });
  };

  return (
    <Modal
      width={340}
      bodyStyle={{ borderRadius: 16, padding: "0px 24px 24px 24px" }}
      open={addDartaNoModal}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        dispatch({
          type: Ac.setAddDartaNoModal,
          payload: { currentPid: 0, addDartaNoModal: false },
        });
      }}
      destroyOnClose={true}
      title={"Add Darta No"}
    >
      {contextHolder}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item {...FormProps("dartaNo", "Darta No")}>
          <Input placeholder="Darta No" />
        </Form.Item>
        <Form.Item {...FormProps("dartaDateEng", "Darta Date(A.D)")}>
          <Input placeholder="Darta Date" />
        </Form.Item>
        <Form.Item {...FormProps("dartaDateNep", "Darta Date(B.S)")}>
          <Input placeholder="Darta Date" />
        </Form.Item>
        <SubmitBtn />
      </Form>
    </Modal>
  );
};

export default AddDartaNoModalFinal;
