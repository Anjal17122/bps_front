import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Upload,
  Radio,
  message,
  Cascader,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ColHeight,
  InputDateValid,
  FormProps,
  submitFailedFinal,
} from "../../../../Common/Form/FormData";
import NewAddress, {
  handleFormValuesChange,
} from "../../../../Common/NewAddress/NewAddress";
import {
  getProvinces,
  getDistrictsAll,
  copyImageFinal,
} from "../../../../Services/AddressService";
import { imgFolders, IMG_SAVE_URL } from "../../../../Services/Api";
import { addPersonFinal } from "../../../../Services/CreateProjectService";
import { MyStore, ActionType } from "../../../../Store/ContextApi";
import { useNavigate } from "react-router-dom";

import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";
import { PersonVal } from "./types";
import { filter, normFile } from "../../../../constants/antdConstants";
import { RcFile } from "antd/lib/upload";
import { municipalityDetails } from "../../../../constants/constants";

interface Props {
  addPersonUrl: string;
  pId: string;
  landId?: number;
}

const Person = ({ addPersonUrl, pId, landId }: Props) => {
  const history = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { state, dispatch } = useContext(MyStore);

  const [allDistricts, setAllDistricts] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (!state.provincePerma.length) {
      getProvinces().then((province) =>
        dispatch({ type: ActionType.setProviPerma, payload: province.data })
      );
    }

    getDistrictsAll().then((res) => {
      setAllDistricts(
        res.data?.map((dist) => ({
          label: dist.name.replace(" District", ""),
          value: dist.name.replace(" District", ""),
        }))
      );
    });
    return () => setAllDistricts([]);
  }, []);

  const onSubmit = (val: PersonVal) => {
    const citizenshipImg: string = val.citizenshipImg[0].response.message;
    const personImg: string = val.personimg[0].response.message;
    const body = {
      landId: landId ?? 0,
      pId,
      nameEng: val.nameEng,
      sabik: val.sabik,
      nameNep: val.nameNep,
      email: val.email,
      primaryPhone: val.phone,
      secondaryPhone: val.phone,
      citizenshipNo: val.citizenshipNo,
      citizenIssueDist: val.citizenIssueDist[0],
      citizenIssueDate: val.citizenIssueDate,
      fatherNameNep: val.fatherNameNep,
      fatherNameEng: val.fatherNameEng,
      grandfatherNameEng: val.grandfatherNameEng,
      grandfatherNameNep: val.grandfatherNameNep,
      gender: val.gender,
      maritalStatus: val.maritalStatus,
      user: {
        username: val.Username ?? "",
        password: val.password ?? "",
      },
      addresses: [
        {
          provinceId: val.provinceIdPerma[0],
          districtId: val.districtIdPerma[0],
          municipalityId: val.municipalityIdPerma[0],
          wardId: val.wardIdPerma[0],
          type: 0,
          toleNep: val.toleNepPerma,
          toleEng: val.toleEngPerma,
        },
        {
          provinceId: state.sameTempAndPermaAdd
            ? val.provinceIdPerma[0]
            : val.provinceIdTemp
            ? val.provinceIdTemp[0]
            : 0,
          districtId: state.sameTempAndPermaAdd
            ? val.districtIdPerma[0]
            : val.districtIdTemp
            ? val.districtIdTemp[0]
            : 0,
          municipalityId: state.sameTempAndPermaAdd
            ? val.municipalityIdPerma[0]
            : val.municipalityIdTemp
            ? val.municipalityIdTemp[0]
            : 0,
          wardId: state.sameTempAndPermaAdd
            ? val.wardIdPerma[0]
            : val.wardIdTemp
            ? val.wardIdTemp[0]
            : 0,
          type: 1,
          toleNep: state.sameTempAndPermaAdd
            ? val.toleNepPerma
            : val.toleNepTemp ?? "",
          toleEng: state.sameTempAndPermaAdd
            ? val.toleEngPerma
            : val.toleEngTemp ?? "",
        },
      ],
      citizenshipFileName: citizenshipImg,
      photoFileName: personImg,
    };

    addPersonFinal(addPersonUrl, body, messageApi).then(() => {
      copyImageFinal(
        [
          { dir: imgFolders.person, fileName: personImg },
          {
            dir: imgFolders.citizenship,
            fileName: citizenshipImg,
          },
        ],
        messageApi
      ).then(() => {
        history(-1);
      });
    });
  };

  // function beforePPUpload(file: RcFile) {
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const arrayBuffer = new Uint16Array(e.target.result);

  //     // Parse Exif data using exif-js
  //     const exifData = EXIF.readFromBinaryFile(arrayBuffer.buffer);

  //     if (exifData && Object.keys(exifData).length > 0) {
  //       console.log("The file has Exif data:", exifData);
  //       // Process the file with Exif data
  //     } else {
  //       console.log("The file does not have Exif data.");
  //       // Process the file without Exif data
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);
  //   return false;
  //   beforeUpload(file);
  // }

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const [form] = Form.useForm();

  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("unmarried");

  const isFatherInLaw = () => {
    return gender === "female" && maritalStatus === "married" ? true : false;
  };

  const isMandan = () => {
    return municipalityDetails.name === "मण्डनदेउपुर नगरपालिका" ? true : false;
  };

  const fatherOrNot =
    isFatherInLaw() && isMandan() ? "ससुराको नाम" : "बुवाको नाम";
  const isFatherOrNotEng =
    isFatherInLaw() && isMandan() ? "Father In Law" : "Father's Name";
  const isHusbandNep =
    isFatherInLaw() && isMandan() ? "श्रीमानको नाम" : "हजुर बुवाको नाम";
  const isHusbandEng =
    isFatherInLaw() && isMandan() ? "Husband's Name" : "Grandfather's Name";

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        onValuesChange={(val) => handleFormValuesChange(val, form, dispatch)}
        size="middle"
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={20}>
          <Col {...ColHeight(4)}>
            <Form.Item
              label="Your Photo (pp size)"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name="personimg"
            >
              <Upload
                name="file"
                action={IMG_SAVE_URL}
                listType="picture-card"
                maxCount={1}
                beforeUpload={beforeUpload}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
          <Col {...ColHeight(10)}>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("nameNep", "निबेदकको नाम")}>
                  <Input placeholder="निबेदकको नाम (नेपालीमा)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("nameEng", "Applicant Name")}>
                  <Input placeholder="Applicant Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("phone", "Phone")}>
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("email", "Email")}>
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("citizenshipNo", "Citizenship No")}>
                  <Input placeholder="Citizenship No" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  {...InputDateValid(
                    "citizenIssueDate",
                    "Citizenship Issue Date (in B.S.)"
                  )}
                >
                  <Input type="text" placeholder="YYYY-MM-DD" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  // rules={[uploadImgRule(imgNames.citizenship)]}
                  name="citizenshipImg"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    maxCount={1}
                    name="file"
                    action={IMG_SAVE_URL}
                    listType="text"
                    beforeUpload={beforeUpload}
                  >
                    <Button>
                      <UploadOutlined /> Upload Citizenship
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("citizenIssueDist", "Issue District")}>
                  <Cascader
                    options={allDistricts}
                    placeholder="Please select"
                    showSearch={{ filter }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              {...FormProps("gender", "Gender:")}
              className="RadioButtons"
            >
              <Radio.Group onChange={(e) => setGender(e.target.value)}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...FormProps("maritalStatus", "Marital Status:")}
              className="RadioButtons"
            >
              <Radio.Group onChange={(e) => setMaritalStatus(e.target.value)}>
                <Radio value="married">Married</Radio>
                <Radio value="unmarried">Unmarried</Radio>
              </Radio.Group>
            </Form.Item>

            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("fatherNameNep", fatherOrNot)}>
                  <Input placeholder={fatherOrNot} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("fatherNameEng", isFatherOrNotEng)}>
                  <Input placeholder={isFatherOrNotEng} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item {...FormProps("grandfatherNameNep", isHusbandNep)}>
                  <Input placeholder="हजुर बुवाको नाम (in Nepali)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item {...FormProps("grandfatherNameEng", isHusbandEng)}>
                  <Input placeholder={isHusbandEng} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Form.Item {...FormProps("sabik", "साबिक (पुरा ठेगाना)")}>
                  <Input placeholder="eg. धुलिखेल - ६ क" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col {...ColHeight(10)}>
            {NewAddress(dispatch, state)}
            <Row justify="end">
              <SubmitBtn />
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Person;
