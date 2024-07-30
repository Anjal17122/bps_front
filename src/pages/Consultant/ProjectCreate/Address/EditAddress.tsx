import { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button, Select, Input, message } from "antd";
import { FormProps, getWard } from "../../../../Common/Form/FormData";
import {
  CommonType,
  editAddress,
  editAddressPerma,
  getAddress,
  getProvinces,
  PutAddress,
} from "../../../../Services/AddressService";
import { ActionType, MyStore } from "../../../../Store/ContextApi";
import { getDist, getMun } from "../../Register/RegisterHelper";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { SubmitBtn } from "../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  perma: boolean;
}

const EditAddress = ({ perma = false }: Props) => {
  const params = useParams();
  const userid: string = params.userid ?? "";
  const addressid: string = params.addressid ?? "";
  const type: string = params.type ?? "";
  const history = useNavigate();

  const [districts, setDistricts] = useState<CommonType[]>([]);
  const [munis, setMunis] = useState<CommonType[]>([]);
  const [wards, setWards] = useState<CommonType[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const initialAdds = { state: "", district: "", muni: "", ward: "" };
  const [selected, setSelected] = useState(initialAdds);

  const fetchDists = getDist(setSelected, selected);
  const getMunis = getMun(selected, setSelected);
  const getWards = getWard(selected);
  const { state, dispatch } = useContext(MyStore);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getDatas = () => {
      getAddress(perma ? "/address/perma?id=" : "/address?id=", addressid).then(
        (res) => {
          dispatch({ type: ActionType.setAddress, payload: res.data });
        }
      );
      getProvinces().then((province) =>
        dispatch({ type: ActionType.setProviPerma, payload: province.data })
      );
    };
    getDatas();
  }, [rerender]);

  interface AddPut {
    province: number;
    district: number;
    municipality: number;
    ward: number;
    toleEng: string;
    toleNep: string;
  }

  const onSubmit = (val: AddPut) => {
    const body: PutAddress = {
      id: userid,
      addresses: [
        {
          id: addressid,
          districtId: val.district,
          provinceId: val.province,
          municipalityId: val.municipality,
          wardId: val.ward,
          toleNep: val.toleNep,
          toleEng: val.toleEng,
          type: type,
        },
      ],
    };
    perma
      ? editAddressPerma(body, messageApi).then(() => setRerender(true))
      : editAddress(body, messageApi).then(() => setRerender(true));
  };
  return (
    <div className="CenterForm30">
      {contextHolder}
      {!state.address.id ? (
        <div
          style={{
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button type="primary" onClick={() => history(-1)}>
            <ArrowLeftOutlined /> Loading...
          </Button>
        </div>
      ) : (
        <div className="PurpleCard">
          <h2>Edit {type === "0" ? "Permanent" : "Current"} Address</h2>
          <div
            className="PurpleCard EditAddDiv"
            style={{ backgroundColor: "wheat" }}
          >
            <h2>Old Address</h2>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>Province:</span>
                <p>{state.address.province.name}</p>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>District:</span>
                <p>{state.address.district.name}</p>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>Municipality</span>
                <p>{state.address.municipality.name}</p>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>Ward:</span>
                <p>{state.address.ward.name}</p>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>{"टोल​:"}</span>
                <p>{state.address.toleNep}</p>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <span>Tole:</span>
                <p>{state.address.toleEng}</p>
              </Col>
            </Row>
          </div>
          <Form size="middle" layout="vertical" onFinish={onSubmit}>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("province", "State")}>
                  <Select
                    showSearch
                    placeholder="Select..."
                    optionFilterProp="children"
                    onChange={(v) => fetchDists(v, setDistricts)}
                    filterOption={(input, option) =>
                      (option?.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {state.provincePerma.map((prov) => (
                      <Select.Option key={prov.id} value={prov.id}>
                        {prov.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("district", "District")}>
                  <Select
                    showSearch
                    placeholder="District..."
                    optionFilterProp="children"
                    onChange={(v) => getMunis(v, setMunis)}
                    filterOption={(input, option) =>
                      (option?.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {districts.map((prov) => (
                      <Select.Option key={prov.id} value={prov.id}>
                        {prov.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("municipality", "Municipality")}>
                  <Select
                    showSearch
                    placeholder="Municipality..."
                    optionFilterProp="children"
                    onChange={(v) => getWards(v, setWards)}
                    filterOption={(input, option: any) =>
                      (option?.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {munis.map((muni) => (
                      <Select.Option key={muni.id} value={muni.id}>
                        {muni.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("ward", "ward")}>
                  <Select
                    showSearch
                    placeholder="ward..."
                    optionFilterProp="children"
                    onChange={(v) => getWards(v, setWards)}
                    filterOption={(input, option) =>
                      (option?.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {wards.map((ward) => (
                      <Select.Option key={ward.id} value={ward.id}>
                        {ward.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("toleEng", "Tole")}>
                  <Input placeholder="Tole" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item {...FormProps("toleNep", "टोल")}>
                  <Input placeholder="टोल" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="end">
              <SubmitBtn />
            </Row>
          </Form>
        </div>
      )}
    </div>
  );
};

export default EditAddress;
