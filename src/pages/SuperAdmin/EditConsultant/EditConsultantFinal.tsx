import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Upload,
  Radio,
  Cascader,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getConSultant, GetPerson } from "../../../Services/PersonService";
import {
  submitFailed,
  InputDateValid,
  FormProps,
} from "../../../Common/Form/FormData";
import { getDistrictsAll } from "../../../Services/AddressService";
import { imgFolders, IMG_GET_URL, IMG_SAVE_URL } from "../../../Services/Api";
import { editConsultant, EditUserTyp } from "../../../Services/UserService";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { filter, normFile } from "../../../constants/antdConstants";
import { copyImageFinal } from "../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  type?: "perma" | "nonperma";
}

const EditConsultantFinal = ({ type = "nonperma" }: Props) => {
  const params = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const [person, setPerson] = useState<GetPerson>();

  const [allDistricts, setAllDistricts] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    getConSultant(
      type === "perma" ? "/person/perma/id/" : "/person/",
      params.id ?? "0"
    ).then((res) => {
      setPerson(res.data);
    });

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

  interface PersonSubVal {
    photoFileName: PhotoFileName[];
    nameNep: string;
    nameEng: string;
    phone: string;
    email: string;
    citizenshipNo: string;
    citizenIssueDate: string;
    citizenshipFileName: PhotoFileName[];
    necFileName: PhotoFileName[];
    citizenIssueDist: string[];
    gender: string;
    maritalStatus: string;
    fatherNameNep: string;
    fatherNameEng: string;
    grandfatherNameNep: string;
    grandfatherNameEng: string;
    panNo: string;
    nec: string;
  }

  interface PhotoFileName {
    uid: string;
    name: string;
    status: string;
    url: string;
    thumbUrl: string;
    response: Response;
  }

  interface Response {
    message: string;
  }

  const onSubmit = (val: PersonSubVal) => {
    const citizenshipImg = val.citizenshipFileName[0].response.message;
    const photoCon = val.photoFileName[0].response.message;
    const necImg = val.necFileName[0].response.message;
    const body: EditUserTyp = {
      id: params.id ?? "0",
      nameEng: val.nameEng,
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
      citizenshipFileName: citizenshipImg,
      photoFileName: photoCon,
      panNo: val.panNo,
      nec: val.nec,
      necFileName: necImg,
    };

    copyImageFinal(
      [
        { dir: imgFolders.person, fileName: photoCon },
        {
          dir: imgFolders.citizenship,
          fileName: citizenshipImg,
        },
        {
          dir: imgFolders.necCert,
          fileName: necImg,
        },
      ],
      messageApi
    ).then(() => {
      editConsultant(
        type === "perma" ? "/person/perma" : "/person",
        body,
        messageApi
      );
    });
  };

  // function beforeUpload(file: any) {
  //   const isJpgOrPng =
  //     file.type === "image/jpeg" ||
  //     file.type === "image/png" ||
  //     file.type === "image/webp";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG/WEBP file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // }
  // const [form] = Form.useForm();
  const getInitialValues = () => {
    if (person) {
      const initialValues = {
        email: person.email,
        citizenIssueDate: person.citizenIssueDate,
        citizenIssueDist: [person.citizenIssueDist],
        citizenshipNo: person.citizenshipNo,
        fatherNameEng: person.fatherNameEng,
        fatherNameNep: person.fatherNameNep,
        gender: person.gender,
        grandfatherNameEng: person.grandfatherNameEng,
        grandfatherNameNep: person.grandfatherNameNep,
        maritalStatus: person.maritalStatus,
        nameEng: person.nameEng,
        nameNep: person.nameNep,
        phone: person.primaryPhone,
        pan: person.panNo,
        nec: person.nec,
        photoFileName: [
          {
            uid: person.photoFileName,
            name: person.photoFileName,
            status: "done",
            url: IMG_GET_URL + `/${imgFolders.person}/` + person.photoFileName,
            thumbUrl:
              IMG_GET_URL + `/${imgFolders.person}/` + person.photoFileName,
            response: { message: person.photoFileName },
          },
        ],
        citizenshipFileName: [
          {
            uid: person.citizenshipFileName,
            name: person.citizenshipFileName,
            status: "done",
            url:
              IMG_GET_URL +
              `/${imgFolders.citizenship}/` +
              person.citizenshipFileName,
            thumbUrl:
              IMG_GET_URL +
              `/${imgFolders.citizenship}/` +
              person.citizenshipFileName,
            response: { message: person.citizenshipFileName },
          },
        ],
        necFileName: [
          {
            uid: person.necFileName,
            name: person.necFileName,
            status: "done",
            url: IMG_GET_URL + `/${imgFolders.necCert}/` + person.necFileName,
            thumbUrl:
              IMG_GET_URL + `/${imgFolders.necCert}/` + person.necFileName,
            response: { message: person.necFileName },
          },
        ],
      };
      return initialValues;
    } else {
      return undefined;
    }
  };

  const myInitVals = getInitialValues();
  return (
    <div style={{ backgroundColor: "rgba(178, 190, 181, 0.4)" }}>
      {contextHolder}
      <PageHeader title="Edit User" subTitle="Edit User Details" />
      <div className="CenterForm">
        {person ? (
          <Form
            initialValues={myInitVals}
            size="middle"
            onFinishFailed={submitFailed}
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  label="Person Image"
                  name="photoFileName"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    maxCount={1}
                    name="file"
                    action={IMG_SAVE_URL}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("nameNep", "नाम")}>
                  <Input placeholder="नाम (नेपालीमा)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("nameEng", "Name")}>
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>

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

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("citizenIssueDist", "Issue District")}>
                  <Cascader
                    options={allDistricts}
                    placeholder="Please select"
                    showSearch={{ filter }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  label="Citizenship Image"
                  name="citizenshipFileName"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    maxCount={1}
                    name="file"
                    action={IMG_SAVE_URL}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  label="Nec Image"
                  name="necFileName"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    maxCount={1}
                    name="file"
                    action={IMG_SAVE_URL}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("nec", "NEC No")}>
                  <Input placeholder="NEC No" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("panNo", "PAN No")}>
                  <Input placeholder="PAN No" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...FormProps("gender", "Gender:")}
                  className="RadioButtons"
                >
                  <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="others">Others</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...FormProps("maritalStatus", "Marital Status:")}
                  className="RadioButtons"
                >
                  <Radio.Group>
                    <Radio value="married">Married</Radio>
                    <Radio value="unmarried">Unmarried</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("fatherNameNep", "बुवाको नाम")}>
                  <Input placeholder="बुवाको नाम (in Nepali)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("fatherNameEng", "Father's Name")}>
                  <Input placeholder="Father's Name" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  {...FormProps("grandfatherNameNep", "हजुर बुवाको नाम")}
                >
                  <Input placeholder="हजुर बुवाको नाम (in Nepali)" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  {...FormProps("grandfatherNameEng", "Grand Father's Name")}
                >
                  <Input placeholder="Grand Father's Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <SubmitBtn />
            </Row>
          </Form>
        ) : (
          <div> Loading </div>
        )}
      </div>
    </div>
  );
};

export default EditConsultantFinal;
