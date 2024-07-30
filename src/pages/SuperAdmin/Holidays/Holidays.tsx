import { useEffect, useState } from "react";
import { delArr } from "../../../Common/Functions/CommonFunctions";
import {
  DELholiday,
  GETholidayBody,
  GETholidays,
  POSTholidayBody,
  POSTholidays,
} from "../../../Services/HolidaysService";
import HolidaysTable from "./HolidaysTable";
import "../TechnicalMembers/TechnicalMembers.scss";
import { Button, Col, Form, Input, Row, message } from "antd";
import {
  FormProps,
  InputDateValid,
  submitFailed,
} from "../../../Common/Form/FormData";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { bsToAd } from "../../Admin/OnDeskFinal/AdminViewProjFInal/Modals/NoticeTabModals/MuchulkaNoticeModalFinal";

const Holidays = () => {
  const [holidaysData, setHolidaysData] = useState<GETholidayBody[]>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GETholidays().then((res) => setHolidaysData(res.data));

    return () => {
      setHolidaysData(undefined);
    };
  }, []);

  const handleDelHoliday = (id: number) => {
    const init = [...(holidaysData ?? [])];
    setHolidaysData(delArr<GETholidayBody>(holidaysData, id));
    DELholiday(id, messageApi).catch(() => {
      setHolidaysData(init);
    });
  };

  const onSubmit = (values: any) => {
    const body: POSTholidayBody = {
      description: values.description,
      title: values.title,
      nepDate: values.nepDate,
      engDate: bsToAd(values.nepDate),
    };
    POSTholidays(body, messageApi).then((res) => {
      const init: GETholidayBody[] = [...(holidaysData ?? []), res];
      setHolidaysData(init);
    });
  };

  const [form] = Form.useForm();
  return (
    <>
      {contextHolder}
      <PageHeader title="Holidays" subTitle="List of Public Holidays" />
      <div className="TechnicalMembers">
        <div className="AddMember">
          <h2>Add Holiday</h2>
          <Form
            form={form}
            onFinishFailed={submitFailed}
            size="middle"
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row gutter={18}>
              <Col span={12}>
                <Form.Item {...FormProps("title", "Title")}>
                  <Input placeholder="Title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...InputDateValid("nepDate", "Date")}>
                  <Input type="text" placeholder="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item {...FormProps("description", "Description")}>
                  <Input placeholder="Description" />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex" }}>
              <SubmitBtn />
              <Form.Item>
                <Button type="primary" ghost onClick={() => form.resetFields()}>
                  Clear Form
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="MembersTable">
          {holidaysData ? (
            <HolidaysTable
              holidaysData={holidaysData}
              handleDelHoliday={handleDelHoliday}
            />
          ) : (
            <div>Loading... </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Holidays;

export const addZero = (data: number) => {
  if (data < 10) {
    return `0${data}`;
  } else {
    return data;
  }
};
