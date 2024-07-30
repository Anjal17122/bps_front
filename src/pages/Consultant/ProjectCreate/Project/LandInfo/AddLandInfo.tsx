import { useState, useEffect } from "react";
import { Form, Row, Col, Input, Cascader, InputNumber, message } from "antd";
import {
  ColHeight,
  FormNReq,
  FormProps,
  UnicodeValid,
  submitFailedFinal,
  toList,
} from "../../../../../Common/Form/FormData";
import {
  CommonType,
  copyImageFinal,
  getWardsForLand,
} from "../../../../../Services/AddressService";
import {
  addLand,
  PostLandBody,
} from "../../../../../Services/CreateProjectService";
import { useNavigate, useParams } from "react-router-dom";
import { UploadButton } from "../../../../../Common/Upload/Upload";
import { IMG_SAVE_URL, imgFolders } from "../../../../../Services/Api";
import { uploadImgRule } from "../../../../../pages/Consultant/Register/RegisterHelper";
import { convertToBiggha } from "./convertToBiggha";
import { ropaniToSq } from "./ropaniToSq";
import { convertToRopani } from "./convertToRopani";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { isUnicode } from "../../../../../constants/constants";
import { switchUrl } from "../Create/ViewCreate";
// import { InfoCircleOutlined } from "@ant-design/icons";

const AddLandInfo = () => {
  const params = useParams();
  const pid = params.pid ?? "";
  const [wards, setWards] = useState<CommonType[]>([]);
  const [landImg, setLandImg] = useState("");
  const [traceNaksa, settraceNaksa] = useState("");
  const [tiroRasid, settiroRasid] = useState("");
  const [charkillaLetter, setcharkillaLetter] = useState("");
  const [sqM, setSqM] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const history = useNavigate();

  useEffect(() => {
    getWardsForLand().then((res) => setWards(res.data));
    return () => setWards([] as CommonType[]);
  }, []);

  interface PostLandVal {
    projectId: string;
    mapSheetNo: string;
    landParcelNo: string;
    sqM: string;
    traceNaksa: string;
    tiroRasid: string;
    charkillaLetter: string;
    remarks: string;
    landImageName: string;
    wardId: number[];
    toleNep: string;
    toleEng: string;
    sabik: string;
  }

  const onSubmit = (val: PostLandVal) => {
    const body: PostLandBody = {
      projectId: pid,
      mapSheetNo: val.mapSheetNo,
      landParcelNo: val.landParcelNo,
      ropani: val.sqM,
      traceNaksa,
      tiroRasid,
      charkillaLetter,
      remarks: val.remarks,
      sabik: val.sabik,
      landImageName: landImg,
      address: {
        wardId: val.wardId[0],
        toleNep: val.toleNep,
        toleEng: val.toleEng,
      },
    };
    copyImageFinal(
      [
        { fileName: landImg, dir: imgFolders.lalpurja },
        { fileName: traceNaksa, dir: imgFolders.traceNaksa },
        { fileName: tiroRasid, dir: imgFolders.tiroRasid },
        { fileName: charkillaLetter, dir: imgFolders.charkillaLetter },
      ],
      messageApi
    ).then(() => {
      addLand(body, messageApi, switchUrl("/land", "/land/perma")).then(() =>
        history(-1)
      );
    });
  };

  const [ropani, setRopani] = useState({
    ropani: 0,
    aana: 0,
    paisa: 0,
    daam: 0,
  });

  const [biggha, setBiggha] = useState({ biggha: 0, kattha: 0, dhur: 0 });

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
      size="middle"
      layout="vertical"
      onFinish={onSubmit}
    >
      {contextHolder}
      <Row gutter={20}>
        <Col {...ColHeight(6)}>
          <Form.Item name="orgClogo" rules={[uploadImgRule(landImg)]}>
            <UploadButton
              uploadURL={IMG_SAVE_URL}
              getImgName={(x) => setLandImg(x)}
              label="लालपुर्जा"
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(6)}>
          <Form.Item name="traceNaksa" rules={[uploadImgRule(traceNaksa)]}>
            <UploadButton
              uploadURL={IMG_SAVE_URL}
              getImgName={(x) => settraceNaksa(x)}
              label="Trace नक्सा"
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(6)}>
          <Form.Item name="tiroRasid" rules={[uploadImgRule(tiroRasid)]}>
            <UploadButton
              uploadURL={IMG_SAVE_URL}
              getImgName={(x) => settiroRasid(x)}
              label="तिरो तिरेको रसिद"
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(6)}>
          <Form.Item
            name="charkillaLetter"
            rules={[uploadImgRule(charkillaLetter)]}
          >
            <UploadButton
              uploadURL={IMG_SAVE_URL}
              getImgName={(x) => setcharkillaLetter(x)}
              label="चारकिल्ला सिफारिस"
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("mapSheetNo", "Map Sheet No")}>
            <Input placeholder="Map Sheet No" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("landParcelNo", "Parcel Kitta No.")}>
            <Input placeholder="eg.1221, 1521, 5432" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("wardId", "Ward")}>
            <Cascader
              allowClear={false}
              placeholder="Ward"
              options={toList(wards)}
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("toleNep", "टोल​")}>
            <Input placeholder="टोल​" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("toleEng", "Tole")}>
            <Input placeholder="Tole" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item
            {...UnicodeValid(
              "sabik",
              "साविक (न.पा./गा.वि.स, वार्ड, युनिकोडमा)"
            )}
          >
            <Input
              placeholder="युनिकोड मात्र"
              onBlur={(e) => {
                if (!isUnicode(e.target.value))
                  messageApi.error("Only nepali Unicode is allowed");
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col {...ColHeight(12)}>
          <Form.Item
            // tooltip={{
            //   title: "Tooltip with customize icon",
            //   icon: <InfoCircleOutlined />,
            // }}
            {...FormProps("sqM", "Square Meter")}
          >
            <InputNumber
              min={0}
              placeholder="Square Meter"
              value={sqM}
              onChange={(e) => {
                convertToRopani(setRopani, e as number);
                convertToBiggha(setBiggha, e as number);
                setSqM(e as number);
              }}
            />
          </Form.Item>
        </Col>
        <Col {...ColHeight(12)} style={{ position: "relative" }}>
          <div
            className="PurpleCard RopaniCard"
            style={{ position: "absolute", bottom: 5, width: "90%" }}
          >
            <span>
              Bigha: <b>{biggha.biggha}</b>
            </span>

            <span>
              Kattha: <b>{biggha.kattha}</b>
            </span>

            <span>
              Dhur: <b>{biggha.dhur}</b>
            </span>
          </div>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col {...ColHeight(6)}>
          <label> Ropani </label>
          <InputNumber
            placeholder="Ropani"
            min={0}
            value={ropani.ropani}
            onChange={(e) => {
              setRopani({ ...ropani, ropani: e as number });
              const sqM = ropaniToSq(
                e as number,
                ropani.aana,
                ropani.paisa,
                ropani.daam
              );
              form.setFieldsValue({ sqM });
            }}
          />
        </Col>
        <Col {...ColHeight(6)}>
          <label> Aana </label>
          <InputNumber
            placeholder="Aana"
            min={0}
            value={ropani.aana}
            onChange={(e) => {
              setRopani({ ...ropani, aana: e as number });
              const sqM = ropaniToSq(
                ropani.ropani,
                e as number,
                ropani.paisa,
                ropani.daam
              );
              form.setFieldsValue({ sqM });
            }}
          />
        </Col>
        <Col {...ColHeight(6)}>
          <label> Paisa </label>
          <InputNumber
            placeholder="Paisa"
            min={0}
            value={ropani.paisa}
            onChange={(e) => {
              setRopani({ ...ropani, paisa: e as number });
              const sqM = ropaniToSq(
                ropani.ropani,
                ropani.aana,
                e as number,
                ropani.daam
              );
              form.setFieldsValue({ sqM });
            }}
          />
        </Col>
        <Col {...ColHeight(6)}>
          <label> Daam </label>
          <InputNumber
            placeholder="Daam"
            min={0}
            value={ropani.daam}
            onChange={(e) => {
              setRopani({ ...ropani, daam: e as number });
              const sqM = ropaniToSq(
                ropani.ropani,
                ropani.aana,
                ropani.paisa,
                e as number
              );
              form.setFieldsValue({ sqM });
            }}
          />
        </Col>
      </Row>
      <Row gutter={20}>
        {/* <Col {...Colheight(6)}>
          <label> Biggha </label>
          <InputNumber placeholder="Biggha" min={0} defaultValue={0} />
        </Col>
        <Col {...Colheight(6)}>
          <label> Kattha </label>
          <InputNumber placeholder="Kattha" min={0} defaultValue={0} />
        </Col>
        <Col {...Colheight(6)}>
          <label> Dhur </label>
          <InputNumber placeholder="Dhur" min={0} defaultValue={0} />
        </Col> */}
      </Row>
      <Col {...ColHeight(12)}>
        <Form.Item {...FormNReq("remarks", "Remarks")}>
          <Input.TextArea rows={2} placeholder="Remarks" />
        </Form.Item>
      </Col>
      <Row justify="end">
        <SubmitBtn />
      </Row>
    </Form>
  );
};

export default AddLandInfo;
