import { Col, Descriptions, Form, Input, Modal, Row, message } from "antd";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import {
  FormNotReq,
  InputDateValid,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import FormListSarjim from "../../../../../Components/Common/FormListSarjim";
import { SarjiminMuchulkaValues } from "./NewMuchulkaModal";
import {
  GetNewMuchulkaBody,
  PostSarjiminMuchulkaDataBody,
  getCharkillaPid,
  getSarjiminMuchulka,
  postSarjiminMuchulka,
} from "../../../../../Services/NewMuchulkaService";
import { Link } from "react-router-dom";
import MyButton from "../../../../../Common/TableButton/MyButton";
import { useQuery } from "@tanstack/react-query";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import SarjiminMuchulkaTable from "./SarjiminMuchulkaTable";
import { convertBStoAD } from "../../../../common/OldPermit/useOldPermit";
import { CharKilla } from "../../../../../Services/PDFService";

const SarjiminMuchulkaModal = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { currentPid, sarjiminMuchulka } = useStoreViewProj();

  const { data, refetch } = useQuery<GetNewMuchulkaBody, { message: string }>({
    queryKey: [MyQueries.sarjiminMuchulka, currentPid],
    queryFn: () =>
      getSarjiminMuchulka(currentPid, messageApi).then((res) => res.data),
    retry: 2,
  });

  const { data: charkillas, refetch: refetchCharkilla } = useQuery<
    CharKilla[],
    { message: string }
  >({
    queryKey: [MyQueries.getCharkillaByProjectId, currentPid],
    queryFn: () =>
      getCharkillaPid(currentPid, messageApi).then((res) => res.data),
    retry: 2,
  });

  const landList =
    charkillas?.filter((chark) => chark.landscapeType === "Land") ?? [];
  const houseList =
    charkillas?.filter((chark) => chark.landscapeType === "House") ?? [];

  const landHome =
    [...landList, ...houseList]?.map((charkilla) => ({
      dateOfBirth: "",
      direction: [charkilla.direction],
      kittaNo: charkilla.kittaNo ?? "",
      name: charkilla.nameNep,
    })) ?? [];

  const initialVals: SarjiminMuchulkaValues = {
    witnesses: landHome,
  };

  const onSubmit = (values: SarjiminMuchulkaValues) => {
    const body: PostSarjiminMuchulkaDataBody = {
      muchulka: {
        date: values.date,
        projectId: currentPid,
        remarks: values.remarks,
        time: values.time,
      },
      witnesses: values.witnesses.map((witness) => ({
        // citizenshipPhoto:
        //   (witness.citizenshipPhoto || [])[0]?.response?.message || "",
        dateOfBirth: witness.dateOfBirth
          ? convertBStoAD(witness.dateOfBirth)
          : "",
        // citizenshipPhoto:
        //   (witness.citizenshipPhoto || [])[0]?.response?.message || "",
        // dateOfBirth: witness.dateOfBirth,
        name: witness.name,
        kittaNo: witness.kittaNo,
        direction: witness.direction[0],
      })),
    };

    postSarjiminMuchulka(body, messageApi).then(() => {
      messageApi.success("Successfully Submitted");
      refetch();
    });
  };

  return (
    <Modal
      className="SelectUserModal"
      open={sarjiminMuchulka}
      footer={false}
      maskClosable={true}
      width={700}
      onCancel={() =>
        dispatch({
          type: Ac.setSarjiminMuchulka,
          payload: false,
        })
      }
      destroyOnClose={true}
    >
      {contextHolder}
      <h2>सर्जमिन मुचुल्काको विवरण भर्नुहोस</h2>
      <Form
        initialValues={initialVals}
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item {...InputDateValid("date", "मिति (वि. सं.)")}>
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
        <h4>सँधियारहरूको विवरण भर्नुहोस</h4>
        <FormListSarjim />
        <SubmitBtn />
      </Form>
      <Link
        to={"/admin/pdf/generate/sarjamin/" + currentPid}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MyButton color="fuchsia">मुचुल्का निकाल्नुहोस</MyButton>
      </Link>
      <div style={{ marginTop: 20 }}>
        <Descriptions
          title="सँधियारहरूको विवरण"
          items={mapDescriptions(data)}
        />
      </div>
      <SarjiminMuchulkaTable data={data?.witnesses} />
    </Modal>
  );
};

export default SarjiminMuchulkaModal;

export const mapDescriptions = (data: GetNewMuchulkaBody | undefined) => {
  return [
    {
      key: "1",
      label: "मिति",
      children: <span>{data?.date}</span>,
    },
    {
      key: "2",
      label: "समय",
      children: <span>{data?.time}</span>,
    },
    {
      key: "3",
      label: "कैफियत",
      children: <span>{data?.remarks}</span>,
    },
  ];
};
