import React from "react";
import { Row, Col, Form, Input, FormInstance, Switch, Cascader } from "antd";
import { FormNotReq, FormProps } from "../Form/FormData";
import { ActionType, IAction, IState } from "../../Store/ContextApi";
import {
  CommonType,
  getDistricts,
  getMunis,
  getWards,
} from "../../Services/AddressService";
import { filter } from "../../constants/antdConstants";

const NewAddress = (dispatch: React.Dispatch<IAction>, state: IState) => {
  const GETAddressesById = (
    myId: string,
    type:
      | "GETprovince"
      | "GETdist"
      | "GETmun"
      | "GETward"
      | "GETchhetra"
      | "GETsubChhetra"
      | "GETprovinceTemp"
      | "GETdistTemp"
      | "GETmunTemp"
      | "GETwardTemp"
      | "GETchhetraTemp"
      | "GETsubChhetraTemp"
  ) => {
    switch (type) {
      case "GETprovince":
        getDistricts({ id: myId }).then((res) => {
          dispatch({ type: ActionType.setDistPerma, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "province", value: myId },
          });
        });
        break;
      case "GETdist":
        getMunis({
          provinceid: state.selectedAddress.province,
          districtid: myId,
        }).then((res) => {
          dispatch({ type: ActionType.setMunisPerma, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "district", value: myId },
          });
        });
        break;
      case "GETmun":
        getWards({
          districtid: state.selectedAddress.district,
          provinceid: state.selectedAddress.province,
          municipalityid: myId,
        }).then((res) => {
          dispatch({ type: ActionType.setWardsPerma, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "muni", value: myId },
          });
        });
        break;

      case "GETprovinceTemp":
        getDistricts({ id: myId }).then((res) => {
          dispatch({ type: ActionType.setDistTemp, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "provinceTemp", value: myId },
          });
        });
        break;
      case "GETdistTemp":
        getMunis({
          provinceid: state.selectedAddress.provinceTemp,
          districtid: myId,
        }).then((res) => {
          dispatch({ type: ActionType.setMunisTemp, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "districtTemp", value: myId },
          });
        });
        break;
      case "GETmunTemp":
        getWards({
          districtid: state.selectedAddress.districtTemp,
          provinceid: state.selectedAddress.provinceTemp,
          municipalityid: myId,
        }).then((res) => {
          dispatch({ type: ActionType.setWardsTemp, payload: res.data });
          dispatch({
            type: ActionType.setSelectedAddress,
            payload: { type: "muniTemp", value: myId },
          });
        });
        break;

      default:
        break;
    }
  };

  const CheckIfSameAdd = (isSame: boolean) => {
    dispatch({ type: ActionType.setSameTempAndPermaAdd, payload: isSame });
  };

  const toList = (value: CommonType[]): { value: number; label: string }[] =>
    value.map((data) => ({
      label: data.name,
      value: data.id,
    }));

  return (
    <React.Fragment>
      <div className="PurpleCard">
        <h3>Permanent Address</h3>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("provinceIdPerma", "Province")}>
              <Cascader
                popupClassName="permaState"
                options={toList(state.provincePerma)}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETprovince")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("districtIdPerma", "District")}>
              <Cascader
                popupClassName="permaDistrict"
                options={toList(state.districtsPerma)}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETdist")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("municipalityIdPerma", "Municipality")}>
              <Cascader
                popupClassName="permaMunicipality"
                options={toList(state.munisPerma)}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETmun")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("wardIdPerma", "Ward")}>
              <Cascader
                popupClassName="permaWard"
                options={toList(state.wardsPerma)}
                placeholder="Please select"
                showSearch={{ filter }}
                // onChange={(val) =>
                //   GETAddressesById(val[0].toString() || "", "GETmun")
                // }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("toleEngPerma", "Tole")}>
              <Input placeholder="Tole" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("toleNepPerma", "टोल")}>
              <Input placeholder="टोल" />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div
        style={{
          backgroundColor: "#FFECE8",
          border: "1px solid #ffaa99",
          padding: "4px 10px",
          marginBottom: 20,
        }}
      >
        <span>Is the Permanent and Temporary Address same ? &nbsp;</span>
        <Switch defaultChecked={false} onChange={CheckIfSameAdd} />
      </div>
      <div className="PurpleCard">
        <h3>Temporary Address</h3>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "provinceIdTemp",
                "Province"
              )}
            >
              <Cascader
                popupClassName="tempState"
                disabled={state.sameTempAndPermaAdd}
                options={toList(state.provincePerma)}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETprovinceTemp")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "districtIdTemp",
                "District"
              )}
            >
              <Cascader
                popupClassName="tempDistrict"
                options={toList(state.districtsTemp)}
                disabled={state.sameTempAndPermaAdd}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETdistTemp")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "municipalityIdTemp",
                "Municipality"
              )}
            >
              <Cascader
                popupClassName="tempMuniciality"
                options={toList(state.munisTemp)}
                disabled={state.sameTempAndPermaAdd}
                placeholder="Please select"
                showSearch={{ filter }}
                onChange={(val) =>
                  GETAddressesById(val[0].toString() || "", "GETmunTemp")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "wardIdTemp",
                "Ward"
              )}
            >
              <Cascader
                popupClassName="tempWard"
                options={toList(state.wardsTemp)}
                disabled={state.sameTempAndPermaAdd}
                placeholder="Please select"
                showSearch={{ filter }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "toleEngTemp",
                "Tole"
              )}
            >
              <Input disabled={state.sameTempAndPermaAdd} placeholder="Tole" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              {...(state.sameTempAndPermaAdd ? FormNotReq : FormProps)(
                "toleNepTemp",
                "टोल"
              )}
            >
              <Input disabled={state.sameTempAndPermaAdd} placeholder="टोल" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export const handleFormValuesChange = (
  changedValues: any,
  form: FormInstance<any>,
  dispatch: React.Dispatch<IAction>
) => {
  const formFieldName = Object.keys(changedValues)[0];
  if (formFieldName === "provinceIdPerma") {
    form.setFieldsValue({
      districtIdPerma: undefined,
      municipalityIdPerma: undefined,
      wardIdPerma: undefined,
    });
    dispatch({ payload: [], type: ActionType.setDistPerma });
    dispatch({ payload: [], type: ActionType.setMunisPerma });
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  }
  if (formFieldName === "provinceIdTemp") {
    form.setFieldsValue({
      districtIdTemp: undefined,
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setDistTemp });
    dispatch({ payload: [], type: ActionType.setMunisTemp });
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  }
  if (formFieldName === "districtIdPerma") {
    form.setFieldsValue({
      municipalityIdPerma: undefined,
      wardIdPerma: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setMunisPerma });
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  }
  if (formFieldName === "districtIdTemp") {
    form.setFieldsValue({
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setMunisTemp });
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  }
  if (formFieldName === "municipalityIdPerma") {
    form.setFieldsValue({
      wardIdPerma: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  }
  if (formFieldName === "municipalityIdTemp") {
    form.setFieldsValue({
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  }
};

export const handleFormValuesChangeRegister = (
  changedValues: any,
  form: FormInstance<any>,
  dispatch: React.Dispatch<IAction>,
  setOrgDist: React.Dispatch<React.SetStateAction<CommonType[]>>,
  setOrgMunis: React.Dispatch<React.SetStateAction<CommonType[]>>,
  setOrgWard: React.Dispatch<React.SetStateAction<CommonType[]>>
) => {
  const formFieldName = Object.keys(changedValues)[0];
  if (formFieldName === "provinceIdPerma") {
    form.setFieldsValue({
      districtIdPerma: undefined,
      municipalityIdPerma: undefined,
      wardIdPerma: undefined,
    });
    dispatch({ payload: [], type: ActionType.setDistPerma });
    dispatch({ payload: [], type: ActionType.setMunisPerma });
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  } else if (formFieldName === "provinceIdTemp") {
    form.setFieldsValue({
      districtIdTemp: undefined,
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setDistTemp });
    dispatch({ payload: [], type: ActionType.setMunisTemp });
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  } else if (formFieldName === "orgState") {
    form.setFieldsValue({
      districtIdTemp: undefined,
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    setOrgDist([]);
    setOrgMunis([]);
    setOrgWard([]);
  } else if (formFieldName === "districtIdPerma") {
    form.setFieldsValue({
      municipalityIdPerma: undefined,
      wardIdPerma: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setMunisPerma });
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  } else if (formFieldName === "districtIdTemp") {
    form.setFieldsValue({
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setMunisTemp });
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  } else if (formFieldName === "orgDistrict") {
    form.setFieldsValue({
      municipalityIdTemp: undefined,
      wardIdTemp: undefined,
    }); // reset
    setOrgMunis([]);
    setOrgWard([]);
  } else if (formFieldName === "municipalityIdPerma") {
    form.setFieldsValue({
      wardIdPerma: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setWardsPerma });
  } else if (formFieldName === "orgMunicipality") {
    form.setFieldsValue({
      wardIdPerma: undefined,
    }); // reset
    setOrgWard([]);
  } else if (formFieldName === "municipalityIdTemp") {
    form.setFieldsValue({
      wardIdTemp: undefined,
    }); // reset
    dispatch({ payload: [], type: ActionType.setWardsTemp });
  }
};

export default NewAddress;

// const NewAddress = (props: Props) => {
//   return (
//     <div className="PurpleCard">
//       <h3>Permanent Address</h3>
//       <Row gutter={20}>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("state", "State")}>
//             <Select
//   showSearch
//   style={{ width: 200 }}
//   placeholder="Select a person"
//   optionFilterProp="children"
//      onChange={(val) =>
// GETAddressesById(
//   val[0],
//   setDistrictsPerma,
//   "/district/province?id=" + val[0],
//   "GETprovince"
// )
// }
//   filterOption={(input, option:any) =>
//     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//   }
// >
//   <Option value="jack">Jack</Option>
//   <Option value="lucy">Lucy</Option>
//   <Option value="tom">Tom</Option>
// </Select>
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("district", "District")}>
//             <Cascader
//               placeholder="District"
//               options={toList(districts)}
//               onChange={(val) => getMunis(val, setMunis)}
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={20}>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("muni", "Municipality")}>
//             <Cascader
//               placeholder="Municipality"
//               options={toList(munis)}
//               onChange={(val) => getWards(val, setWards)}
//             />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("ward", "Ward")}>
//             <Cascader placeholder="Ward" options={toList(wards)} />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={20}>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("toleNep", "टोल​")}>
//             <Input placeholder="टोल​" />
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//           <Form.Item {...FormProps("toleEng", "Tole")}>
//             <Input placeholder="Tole" />
//           </Form.Item>
//         </Col>
//       </Row>
//     </div>
//   );
// };
