import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Cascader, message } from "antd";
import {
  ColHeight,
  FormNReq,
  FormProps,
  submitFailedFinal,
  toList,
} from "../../../../../Common/Form/FormData";
import {
  CommonType,
  getWardsForLand,
} from "../../../../../Services/AddressService";
import {
  editLand,
  getLand,
  Land,
  LandOne,
} from "../../../../../Services/CreateProjectService";
import { useNavigate, useParams } from "react-router-dom";
import { imgFolders, IMG_GET_URL } from "../../../../../Services/Api";
import RollingLoading from "../../../../../Common/Loading/RollingLoading";
import { convertToRopani } from "./convertToRopani";
import { convertToBiggha } from "./convertToBiggha";
import { switchUrl } from "../Create/ViewCreate";
import EditAvatar from "../../../../../Components/Common/Avatar/EditAvatar";
import { sN } from "../../../../../Services/ProjectService";
import PageHeader from "../../../../../Components/Common/PageHeader/PageHeader";
import { copyImageFinal } from "../../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

const EditLandInfo = () => {
  const params = useParams();
  const pid = params.pid ?? "";
  const landid = params.landid ?? "";

  const [wards, setWards] = useState<CommonType[]>([]);
  const [landImg, setLandImg] = useState("");
  const [traceNaksa, settraceNaksa] = useState("");
  const [tiroRasid, settiroRasid] = useState("");
  const [charkillaLetter, setcharkillaLetter] = useState("");
  const [ropani, setRopani] = useState({
    ropani: 0,
    aana: 0,
    paisa: 0,
    daam: 0,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [biggha, setBiggha] = useState({ biggha: 0, kattha: 0, dhur: 0 });

  const [land, setLand] = useState<LandOne>();
  const history = useNavigate();

  useEffect(() => {
    getWardsForLand().then((res) => setWards(res.data));
    getLand(switchUrl("/land/one?id=", "/land/perma/one?id="), landid).then(
      (res) => setLand(res.data)
    );
    return () => {
      setWards([]);
      setLand(undefined);
    };
  }, [landid]);

  const onSubmit = (val: {
    mapSheetNo: string;
    landParcelNo: string;
    ropani: string;
    remarks: string;
    toleNep: string;
    toleEng: string;
    wardId: sN[];
  }) => {
    const body: Land = {
      id: land?.id || 0,
      projectId: pid,
      mapSheetNo: val.mapSheetNo,
      landParcelNo: val.landParcelNo,
      sabik: val.sabik,
      ropani: val.ropani,
      traceNaksa: traceNaksa || land?.traceNaksa || "",
      tiroRasid: tiroRasid || land?.tiroRasid || "",
      charkillaLetter: charkillaLetter || land?.charkillaLetter || "",
      // aana: val.aana,
      // paisa: val.paisa,
      // daam: val.daam,
      remarks: val.remarks,
      landImageName: landImg || land?.landImageName || "",
      address: {
        id: land?.address.id,
        toleNep: val.toleNep,
        toleEng: val.toleEng,
        wardId: val.wardId[0],
      },
    };
    copyImageFinal(
      [
        { dir: imgFolders.lalpurja, fileName: landImg },
        { dir: imgFolders.tiroRasid, fileName: tiroRasid },
        { dir: imgFolders.traceNaksa, fileName: traceNaksa },
        { dir: imgFolders.charkillaLetter, fileName: charkillaLetter },
      ],
      messageApi
    ).then(() => {
      editLand(switchUrl("/land", "/land/perma"), body, messageApi).then(() =>
        history(-1)
      );
    });
  };

  return (
    <React.Fragment>
      <PageHeader title="Edit Land" subTitle="Edit Land Details" />
      {contextHolder}
      <div className="CenterForm">
        {/* <h2>Edit Land</h2> */}
        <Form
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          {land ? (
            <>
              <Row gutter={20}>
                <Col {...ColHeight(6)}>
                  <EditAvatar
                    src={
                      landImg
                        ? IMG_GET_URL + "/temp/" + landImg
                        : IMG_GET_URL +
                          `/${imgFolders.lalpurja}/` +
                          land.landImageName
                    }
                    name="Lalpurja"
                    getImgName={(p) => setLandImg(p)}
                  />
                </Col>
                <Col {...ColHeight(6)}>
                  <EditAvatar
                    src={
                      traceNaksa
                        ? IMG_GET_URL + "/temp/" + traceNaksa
                        : IMG_GET_URL +
                          `/${imgFolders.traceNaksa}/` +
                          land.traceNaksa
                    }
                    name="Trace नक्सा"
                    getImgName={(p) => settraceNaksa(p)}
                  />
                </Col>
                <Col {...ColHeight(6)}>
                  <EditAvatar
                    src={
                      tiroRasid
                        ? IMG_GET_URL + "/temp/" + tiroRasid
                        : IMG_GET_URL +
                          `/${imgFolders.tiroRasid}/` +
                          land.tiroRasid
                    }
                    name="तिरो तिरेको रसिद"
                    getImgName={(p) => settiroRasid(p)}
                  />
                </Col>
                <Col {...ColHeight(6)}>
                  <EditAvatar
                    src={
                      charkillaLetter
                        ? IMG_GET_URL + "/temp/" + charkillaLetter
                        : IMG_GET_URL +
                          `/${imgFolders.charkillaLetter}/` +
                          land.charkillaLetter
                    }
                    name="चारकिल्ला सिफारिस"
                    getImgName={(p) => setcharkillaLetter(p)}
                  />
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={land.mapSheetNo}
                    {...FormProps("mapSheetNo", "Map Sheet No")}
                  >
                    <Input placeholder="Map Sheet No" />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={land.landParcelNo}
                    {...FormProps("landParcelNo", "Parcel Kitta No.")}
                  >
                    <Input placeholder="Parcel Kitta No." />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={land.sabik}
                    {...FormProps("sabik", "साबिक Address")}
                  >
                    <Input placeholder="साबिक Address" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={[land.address.ward.id]}
                    {...FormProps("wardId", "Ward")}
                  >
                    <Cascader
                      allowClear={false}
                      placeholder="Ward"
                      options={toList(wards)}
                    />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={land.address.toleNep}
                    {...FormProps("toleNep", "टोल​")}
                  >
                    <Input placeholder="टोल​" />
                  </Form.Item>
                </Col>
                <Col {...ColHeight(8)}>
                  <Form.Item
                    initialValue={land.address.toleEng}
                    {...FormProps("toleEng", "Tole")}
                  >
                    <Input placeholder="Tole" />
                  </Form.Item>
                </Col>
              </Row>
              <div>
                <h2>Area</h2>
                <Row gutter={20}>
                  <Col {...ColHeight(8)}>
                    <Row gutter={20}>
                      <Col {...ColHeight(24)}>
                        <Form.Item
                          initialValue={land.ropani}
                          {...FormProps("ropani", "Square Meter")}
                        >
                          <Input
                            placeholder="Square Meter"
                            onChange={(e) => {
                              convertToRopani(
                                setRopani,
                                parseInt(e.target.value)
                              );
                              convertToBiggha(
                                setBiggha,
                                parseInt(e.target.value)
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col {...ColHeight(16)}>
                    <Form.Item
                      initialValue={land.remarks}
                      {...FormNReq("remarks", "Remarks")}
                    >
                      <Input.TextArea rows={4} placeholder="Remarks" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col {...ColHeight(12)}>
                    <div className="PurpleCard RopaniCard">
                      <span>
                        Ropani: <b>{ropani.ropani}</b>
                      </span>

                      <span>
                        Aana: <b>{ropani.aana}</b>
                      </span>

                      <span>
                        Paisa: <b>{ropani.paisa}</b>
                      </span>

                      <span>
                        Dam: <b>{ropani.daam}</b>
                      </span>
                    </div>
                  </Col>
                  <Col {...ColHeight(12)}>
                    <div className="PurpleCard RopaniCard">
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
              </div>
              <Row justify="end">
                <SubmitBtn text="Edit Land" />
              </Row>
            </>
          ) : (
            <RollingLoading height="50vh" />
          )}
        </Form>
      </div>
    </React.Fragment>
  );
};

export default EditLandInfo;
