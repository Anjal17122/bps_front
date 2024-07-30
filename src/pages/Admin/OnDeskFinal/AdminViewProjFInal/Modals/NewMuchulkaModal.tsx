import {
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import {
  FormNotReq,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import FormList from "../../../../../Components/Common/FormList";
import NewMuchulkaTable from "./NewMuchulkaTable";
import {
  GetNewMuchulkaBody,
  WitnessGet,
  getNewMuchulka,
  postNewMuchulka,
} from "../../../../../Services/NewMuchulkaService";
import { Link } from "react-router-dom";
import MyButton from "../../../../../Common/TableButton/MyButton";
import { useQuery } from "@tanstack/react-query";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { mapDescriptions } from "./SarjiminMuchulkaModal";
import { convertBStoAD } from "../../../../common/OldPermit/useOldPermit";

export type PostNewMuchulkaDataBody = {
  muchulka: { date: string; projectId: number; remarks: string; time: string };
  witnesses: Witness[];
};

type Witness = {
  citizenshipPhoto: string;
  dateOfBirth: string;
  name: string;
  ward: number;
};

const NewMuchulkaModal = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { currentPid, newMuchulka } = useStoreViewProj();

  const { data, refetch } = useQuery<GetNewMuchulkaBody, { message: string }>({
    queryKey: [MyQueries.Plinth],
    queryFn: () =>
      getNewMuchulka(currentPid, messageApi).then((res) => res.data),
    retry: 2,
  });

  const onSubmit = (values: NewMuchulkaValues) => {
    // check if date is in YYYY-MM-DD format string
    // const regex = /^\d{4}-\d{2}-\d{2}$/;
    // if(!regex.test(values.date)){
    //   return messageApi.error("Invalid date format. Please use YYYY-MM-DD");
    // }
    const body: PostNewMuchulkaDataBody = {
      muchulka: {
        date: values.date,
        projectId: currentPid,
        remarks: values.remarks,
        time: values.time,
      },
      witnesses: values.witnesses.map((witness) => ({
        citizenshipPhoto:
          (witness.citizenshipPhoto || [])[0]?.response?.message || "",
        dateOfBirth: witness.dateOfBirth
          ? convertBStoAD(witness.dateOfBirth)
          : "",
        name: witness.name,
        ward: witness.ward[0] || 0,
      })),
    };

    postNewMuchulka(body, messageApi).then(() => {
      messageApi.success("Successfully Submitted");
      refetch();
    });
  };
  return (
    <Modal
      className="SelectUserModal"
      open={newMuchulka}
      footer={false}
      maskClosable={true}
      width={700}
      onCancel={() =>
        dispatch({
          type: Ac.setNewMuchulka,
          payload: false,
        })
      }
      destroyOnClose={true}
    >
      <h2 style={{ marginBottom: 20 }}>
        सुचना टाँसेको मुचुल्काको विवरण भर्नुहोस
      </h2>
      {contextHolder}
      <Form
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item {...FormNotReq("date", "मिति (वि. सं.)")}>
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...FormNotReq("time", "समय")}>
              <Input placeholder="Time" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item {...FormNotReq("remarks", "Remarks")}>
          <Input.TextArea rows={3} placeholder="Remarks" />
        </Form.Item>
        <h4>साक्षीहरूको विवरण भर्नुहोस</h4>
        <FormList />
        <SubmitBtn />
      </Form>
      <Link
        to={"/admin/pdf/generate/muchulka/" + currentPid}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MyButton color="fuchsia">मुचुल्का निकाल्नुहोस</MyButton>
      </Link>
      <Divider type="horizontal"></Divider>
      <div style={{ marginTop: 20, position: "relative" }}>
        {/* <button style={{ position: "absolute", top: 0, right: 0 }}>Edit</button> */}
        <Descriptions title="सधियरहरूको विवरण" items={mapDescriptions(data)} />
      </div>
      <NewMuchulkaTable data={checkIfNull<WitnessGet>(data?.witnesses ?? [])} />
    </Modal>
  );
};

export default NewMuchulkaModal;

export function checkIfNull<T>(data: null | T[]): T[] {
  if (data === null) {
    return [];
  } else {
    return data;
  }
}

interface NewMuchulkaValues {
  date: string;
  time: string;
  remarks: string;
  witnesses: Witnesses[];
}

export interface SarjiminMuchulkaValues {
  date: string;
  time: string;
  remarks: string;
  witnesses: SarjiminWitness[];
}
interface SarjiminWitness {
  direction: string[];
  kittaNo: string;
  name: string;
  dateOfBirth: string;
  // citizenshipPhoto: CitizenshipPhoto[];
}

interface Witnesses {
  ward: number[];
  name: string;
  dateOfBirth: string;
  citizenshipPhoto: CitizenshipPhoto[];
}

interface CitizenshipPhoto {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: Response;
  xhr: Xhr;
}

interface Xhr {}

interface Response {
  message: string;
}

interface OriginFileObj {
  uid: string;
}
