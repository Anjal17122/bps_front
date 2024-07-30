import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Radio, message } from "antd";
import { ColHeight, FormProps } from "../../../../Common/Form/FormData";
import { useNavigate, useParams } from "react-router-dom";
import RollingLoading from "../../../../Common/Loading/RollingLoading";
import EditAvatar from "../../../../Components/Common/Avatar/EditAvatar";
import { copyImageFinal } from "../../../../Services/AddressService";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import {
  getUserTyp,
  getUser,
  editPerson,
} from "../../../../Services/UserService";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";

// import { ifCon } from "../Admin/ViewProject/Consultant/Project/ViewProject/ViewProject";

const EditUser = () => {
  const params = useParams();
  const personid: string = params.personid ?? "";

  const [img, setImgNames] = useState({
    person: "",
    citizenship: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState<getUserTyp>();

  const history = useNavigate();

  useEffect(() => {
    getUser(personid).then((user) => setUser(user.data));
    return () => setUser(undefined);
  }, [personid]);

  const onSubmit = (val: any) => {
    const { person, citizenship: cship } = img;
    const body = {
      id: personid,
      nameNep: val.nameNep,
      nameEng: val.nameEng,
      primaryPhone: val.phone,
      email: val.email,
      photoFileName: person || user?.photoFileName || "",
      citizenshipFileName: cship || user?.citizenshipFileName || "",
      citizenshipNo: val.citizenshipNo,
      citizenIssueDist: val.citizenIssueDist,
      citizenIssueDate: val.citizenIssueDate,
      fatherNameNep: val.fatherNameNep,
      fatherNameEng: val.fatherNameEng,
      grandfatherNameNep: val.grandfatherNameNep,
      grandfatherNameEng: val.grandfatherNameEng,
      gender: val.gender,
      maritalStatus: val.maritalStatus,
      sabik: val.sabik,
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
      editPerson(body as any, messageApi).then(() => history(-1));
    });
  };

  // const isMandan = () => {
  //   return municipalityDetails.name === "मण्डनदेउपुर नगरपालिका" ? true : false;
  // };
  // const fatherOrNot =
  //   isFatherInLaw() && isMandan() ? "ससुराको नाम" : "बुवाको नाम";
  // const isFatherOrNotEng =
  //   isFatherInLaw() && isMandan() ? "Father In Law" : "Father's Name";
  // const isHusbandNep =
  //   isFatherInLaw() && isMandan() ? "श्रीमानको नाम" : "हजुर बुवाको नाम";
  // const isHusbandEng =
  //   isFatherInLaw() && isMandan() ? "Husband's Name" : "Grandfather's Name";

  return (
    <div className="CenterForm">
      {contextHolder}
      <Button onClick={() => history(-1)}>Back</Button> <h2>Edit Person</h2>
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
            <Col {...ColHeight(8)}>
              <Form.Item
                initialValue={user?.sabik}
                {...FormProps("sabik", "साबिक Address")}
              >
                <Input placeholder="साबिक Address" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <SubmitBtn />
          </Row>
        </Form>
      )}
    </div>
  );
};

export default EditUser;
