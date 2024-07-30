import "../../../Assets/scss/EditNaamSari.scss";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Input, Radio, message } from "antd";
// import EditAvatar from "../../../Common/Avatar/EditAvatar";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import {
  PUTnaamsariLand,
  putNaamsariLand,
} from "../../../Services/NaamSariService";
import { getUser, getUserTyp } from "../../../Services/UserService";
import { FormProps } from "../../../Common/Form/FormData";
import { useNavigate, useParams } from "react-router-dom";
import { getProvinces } from "../../../Services/AddressService";
import NewAddress from "../../../Common/NewAddress/NewAddress";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import EditAvatar from "../../../Components/Common/Avatar/EditAvatar";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { copyImageFinal } from "../OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";

// export const CheckIFSameAdd = (data: string, same: boolean) => {
//   if (same) {
//   }
// };

const EditNaamSari = () => {
  const params = useParams<{ pid: string; landid: string }>();
  const [img, setImgNames] = useState({
    person: "",
    citizenship: "",
  });
  const { dispatch, state } = useContext(MyStore);
  const [user, setUser] = useState<getUserTyp>();
  // const [province, setProvince] = useState<CommonType[]>([]);
  // const [districts, setDistricts] = useState<CommonType[]>([]);
  // const [munis, setMunis] = useState<CommonType[]>([]);
  // const [wards, setWards] = useState<CommonType[]>([]);
  // const [provinceTemp, setProvinceTemp] = useState<CommonType[]>([]);
  // const [districtTemp, setDistrictTemp] = useState<CommonType[]>([]);
  // const [munisTemp, setmunisTemp] = useState<CommonType[]>([]);
  // const [wardTemp, setwardTemp] = useState<CommonType[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // const initialAdds = { state: "", district: "", muni: "", ward: "" };
  // const tempAddInit = { state: "", district: "", muni: "", ward: "" };

  // const [selected, setSelected] = useState(initialAdds);
  // const [tempAdd, setTempAdd] = useState(tempAddInit);

  // const fetchDists = getDist(setSelected, selected);
  // const getMunis = getMun(selected, setSelected);
  // const getWards = getWard(selected);

  // const fetchDistsTemp = getDist(setTempAdd, tempAdd);
  // const getMunisTemp = getMun(tempAdd, setTempAdd);
  // const getWardsTemp = getWard(tempAdd);

  useEffect(() => {
    getUser(params.landid ?? "0").then((user) => setUser(user.data));
    if (!state.provincePerma.length) {
      getProvinces().then((province) =>
        dispatch({ type: ActionType.setProviPerma, payload: province.data })
      );
    }
    // getProvinces().then((province) => setProvince(province.data));
    return () => {
      setUser(undefined);
      // setProvince([]);
    };
  }, [params.landid]);

  const history = useNavigate();

  const onSubmit = (value: {
    citizenIssueDate: string;
    citizenIssueDist: string;
    citizenshipNo: string;
    districtId: string[];
    districtIdTemp: string[];
    email: string;
    fatherNameEng: string;
    fatherNameNep: string;
    gender: string;
    grandfatherNameEng: string;
    grandfatherNameNep: string;
    maritalStatus: string;
    muni: string[];
    muniTemp: string[];
    nameEng: string;
    nameNep: string;
    phone: string;
    provinceId: string[];
    provinceIdTemp: string[];
    toleEng: string;
    toleEngTemp: string;
    toleNep: string;
    toleNepTemp: string;
    wardId: string[];
    wardIdTemp: string[];
  }) => {
    const { person, citizenship: cship } = img;
    const idOfPermanent = user?.addresses.filter(
      (add) => add.type === "PERMANENT"
    );
    const idOfCurrent = user?.addresses.filter((add) => add.type === "CURRENT");
    const body: PUTnaamsariLand = {
      id: parseInt(params.landid ?? "0"),
      citizenIssueDate: value.citizenIssueDate,
      citizenIssueDist: value.citizenIssueDist,
      citizenshipNo: value.citizenshipNo,
      email: value.email,
      fatherNameEng: value.fatherNameEng,
      fatherNameNep: value.fatherNameNep,
      gender: value.gender,
      grandfatherNameEng: value.grandfatherNameEng,
      grandfatherNameNep: value.grandfatherNameNep,
      maritalStatus: value.maritalStatus,
      nameEng: value.nameEng,
      nameNep: value.nameNep,
      primaryPhone: value.phone,
      addresses: [
        {
          districtId: parseInt(value.districtId[0]),
          municipalityId: parseInt(value.muni[0]),
          toleEng: value.toleEng,
          toleNep: value.toleNep,
          wardId: parseInt(value.wardId[0]),
          provinceId: parseInt(value.provinceId[0]),
          type: "PERMANENT",
          id: idOfPermanent ? idOfPermanent[0].id : 0,
        },
        {
          districtId: state.sameTempAndPermaAdd
            ? parseInt(value.districtId[0])
            : parseInt(value.districtIdTemp[0]),
          municipalityId: state.sameTempAndPermaAdd
            ? parseInt(value.muni[0])
            : parseInt(value.muniTemp[0]),
          toleEng: state.sameTempAndPermaAdd
            ? value.toleEng
            : value.toleEngTemp,
          toleNep: state.sameTempAndPermaAdd
            ? value.toleNep
            : value.toleNepTemp,
          wardId: state.sameTempAndPermaAdd
            ? parseInt(value.wardId[0])
            : parseInt(value.wardIdTemp[0]),
          provinceId: state.sameTempAndPermaAdd
            ? parseInt(value.provinceId[0])
            : parseInt(value.provinceIdTemp[0]),
          type: "CURRENT",
          id: idOfCurrent ? idOfCurrent[0].id : 0,
        },
      ],
      citizenshipFileName: cship || user?.citizenshipFileName || "",
      photoFileName: person || user?.photoFileName || "",
      secondaryPhone: "",
    };
    copyImageFinal(
      [
        { dir: imgFolders.person, fileName: img.person },
        {
          dir: imgFolders.citizenship,
          fileName: img.citizenship,
        },
      ],
      messageApi
    ).then(() => {
      putNaamsariLand(body).then(() => history(-1));
    });
  };

  return (
    <div className="CenterForm">
      {contextHolder}
      <h2>Edit Person</h2>
      {!user ? (
        <RollingLoading height="70vh" />
      ) : (
        <Form size="middle" layout="vertical" onFinish={onSubmit}>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <EditAvatar
                src={
                  img.person
                    ? IMG_GET_URL + `/${imgFolders.temp}/` + img.person
                    : IMG_GET_URL +
                      `/${imgFolders.person}/` +
                      user.photoFileName
                }
                name="Profile Image"
                getImgName={(p) => setImgNames({ ...img, person: p })}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <EditAvatar
                src={
                  img.citizenship
                    ? IMG_GET_URL + `/${imgFolders.temp}/` + img.citizenship
                    : IMG_GET_URL +
                      `/${imgFolders.citizenship}/` +
                      user.citizenshipFileName
                }
                name="Citizenship"
                getImgName={(p) => setImgNames({ ...img, citizenship: p })}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.nameNep}
                {...FormProps("nameNep", "निबेदकको नाम")}
              >
                <Input placeholder="निबेदकको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.nameEng}
                {...FormProps("nameEng", "Applicant Name")}
              >
                <Input placeholder="Applicant Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.primaryPhone}
                {...FormProps("phone", "Phone")}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.email}
                {...FormProps("email", "Email")}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.citizenshipNo}
                {...FormProps("citizenshipNo", "Citizenship No")}
              >
                <Input placeholder="Citizenship No" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.citizenIssueDate}
                {...FormProps("citizenIssueDate", "Citizenship Issue Date")}
              >
                <Input placeholder="Issue Date" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.citizenIssueDist}
                {...FormProps("citizenIssueDist", "Citizenship Issue District")}
              >
                <Input placeholder="Citizenship Issue District" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            initialValue={user.gender}
            {...FormProps("gender", "Gender:")}
            className="RadioButtons"
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="others">Others</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            initialValue={user.maritalStatus}
            {...FormProps("maritalStatus", "Marital Status:")}
            className="RadioButtons"
          >
            <Radio.Group>
              <Radio value="married">Married</Radio>
              <Radio value="unmarried">Unmarried</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.fatherNameNep}
                {...FormProps("fatherNameNep", "बुवाको नाम")}
              >
                <Input placeholder="बुवाको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.fatherNameEng}
                {...FormProps("fatherNameEng", "Father's Name")}
              >
                <Input placeholder="Father's Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.grandfatherNameNep}
                {...FormProps("grandfatherNameNep", "हजुर बुवाको नाम")}
              >
                <Input placeholder="हजुर बुवाको नाम" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                initialValue={user.grandfatherNameEng}
                {...FormProps("grandfatherNameEng", "Grand Father's Name")}
              >
                <Input placeholder="Grand Father's Name" />
              </Form.Item>
            </Col>
          </Row>
          {NewAddress(dispatch, state)}

          <Row justify="end">
            <SubmitBtn />
          </Row>
        </Form>
      )}
    </div>
  );
};

export default EditNaamSari;
