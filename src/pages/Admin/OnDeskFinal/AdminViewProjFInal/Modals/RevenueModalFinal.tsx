import { Button, Cascader, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { Link } from "react-router-dom";
import { IMG_SAVE_URL } from "../../../../../Services/Api";
import { getToken } from "../../../../../Services/UserService";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import RasidList from "../../../ProjectActionsAdmin/RasidActions/RasidList";
import {
  GETrasidList,
  RasidListType,
} from "../../../../../Services/FloorService";
import {
  copyImageFinal,
  GETfloorPerma,
  POSTrasidNo,
} from "../../OnDeskService/OnDeskService/OnDeskService";
import {
  dispatchData,
  useStoreData,
} from "../../../../../Store/StoreDatas/StoreDatas";
import {
  GETareaCategory,
  GETbuildingCategory,
  GETfloorCategory,
  GETfloorRate,
} from "../../../../../Services/SuperAdminService";
import { getMappedAreaCat } from "../../../../SuperAdmin/FloorRate/FloorRate";
import { AcD } from "../../../../../Store/StoreDatas/types";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { FloorRow, POSTRasidBody } from "../common/types";
import {
  calculateNagarjunRevenue,
  isNagarjun,
} from "../../../../../constants/CommonFunctions";
import {
  ProjectPermaBody,
  getProjectPermaOnly,
} from "../../../../../Services/TechnicalService";

const RevenueModalFinal = () => {
  const [rasidList, setRasidList] = useState<RasidListType[]>();
  const [revenueData, setRevenueData] = useState<FloorRow[]>();

  const { TextArea } = Input;
  const { currentPid, revenueModal, disabled } = useStoreViewProj();
  const { floorRate, areaCat, buildingCat } = useStoreData();
  const [messageApi, contextHolder] = message.useMessage();

  const [projectDetails, setProjectDetails] = useState<ProjectPermaBody>();

  useEffect(() => {
    if (!floorRate.length) {
      getProjectPermaOnly(currentPid).then((res) => {
        setProjectDetails(res.data);
      });

      GETareaCategory().then((areaCat) => {
        const mappedAreaCat = getMappedAreaCat(areaCat);

        GETbuildingCategory().then((buildingCat) => {
          const mappedBuildingCat = getMappedAreaCat(buildingCat);

          GETfloorCategory().then((floorCat) => {
            GETfloorRate().then((floorRate) => {
              dispatchData({
                payload: {
                  areaCat: mappedAreaCat,
                  buildingCat: mappedBuildingCat,
                  floorCat: floorCat.data,
                  floorRate: floorRate.data,
                },
                type: AcD.setAll,
              });
            });
          });
        });
      });
    }

    GETrasidList(currentPid).then((res) => {
      setRasidList(res.data);
      GETfloorPerma(currentPid, messageApi).then((res) => {
        setRevenueData(JSON.parse(res.data.floorDetail));
      });
    });

    return () => {
      setRevenueData(undefined);
      setRasidList(undefined);
    };
  }, []);

  const [total, setTotal] = useState({ amount: 0, rate: 0, taxableAmount: 0 });

  const [totalRevenue, setTotalRevenue] = useState(0);

  const [rasidNo, setRasidNo] = useState("");
  const [rasidDate, setRasidDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [fine, setFine] = useState(0);
  const [amount, setAmount] = useState(0);
  const [filename, setFilename] = useState("");
  const [remarks, setRemarks] = useState("");

  const getData = (filters: {
    floorId: number;
    areaCategoryId: number;
    buildingCategoryId: number;
  }) => {
    const filteredData = floorRate.filter((floRate: any) =>
      Object.entries(filters).every(([k, v]) => floRate[k] === v)
    );
    return filteredData?.length ? parseInt(filteredData[0].rate) : 0;
  };

  const [buildingId, setBuildingId] = useState(0);
  const [areaId, setAreaId] = useState(0);

  const props = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
    onChange(info: UploadChangeParam<UploadFile>) {
      if (info.file.status === "done") {
        messageApi.success(`${info.file.name} file uploaded successfully`);
        setFilename(info.file.response.message);
      } else if (info.file.status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const addRasid = () => {
    // check if date is in YYYY-MM-DD formate or else return invalid date error
    if (!rasidDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return messageApi.error("Invalid date format. Please use YYYY-MM-DD");
    }
    const addRasidBOdy: POSTRasidBody = {
      amount,
      discount: discount.toString(),
      fine: fine.toString(),
      projectId: currentPid,
      total: (amount + fine - discount).toString(),
      fileName: filename,
      rasidNo: rasidNo,
      rasidDate: rasidDate,
      remarks: remarks,
    };
    if (!addRasidBOdy.rasidNo || !addRasidBOdy.amount)
      return messageApi.error("Rasid No. and Amount must be filled!");

    POSTrasidNo(addRasidBOdy, messageApi).then((res: any) => {
      const initArr = [...(rasidList ?? [])];
      const added = [...initArr, { ...addRasidBOdy, id: res?.id ?? 0 }];

      setRasidList(added);
      if (addRasidBOdy.fileName) {
        copyImageFinal(
          [{ dir: "rasid", fileName: addRasidBOdy.fileName }],
          messageApi
        );
      }
    });
  };

  return (
    <Modal
      width={900}
      className="RevenueFloorModal"
      open={revenueModal}
      footer={false}
      maskClosable={true}
      onCancel={() => {
        setBuildingId(0);
        setAreaId(0);
        setTotal({ amount: 0, rate: 0, taxableAmount: 0 });
        setRasidNo("");
        setDiscount(0);
        setRasidDate("");
        setFine(0);
        setAmount(0);
        dispatch({
          type: Ac.setRevenueModal,
          payload: {
            currentPid: 0,
            revenueModal: false,
          },
        });
      }}
      destroyOnClose={true}
      title={"Revenue Details"}
    >
      {contextHolder}
      <div className="FloorTableCover" style={{ marginTop: 15 }}>
        <div style={{ marginBottom: 10 }}>
          {isNagarjun() ? null : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                    color: "#203346ce",
                  }}
                >
                  Select Category:
                </div>
                <Link
                  to="/admin/floorrate"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Button type="link">Floor Rate</Button>
                </Link>
              </div>
              <Cascader
                allowClear={false}
                style={{ width: 180 }}
                options={areaCat}
                onChange={(val) => {
                  const myareaId = parseInt(val[0]);
                  setAreaId(myareaId);
                  if (buildingId) {
                    const init = [...revenueData!];
                    const newData = init.map((myfloor) => {
                      const rateRow = getData({
                        floorId: myfloor?.id || 0,
                        areaCategoryId: myareaId,
                        buildingCategoryId: buildingId,
                      });
                      return {
                        ...myfloor,
                        rate: rateRow,
                        total: rateRow * (myfloor.countable + myfloor.ncT),
                      };
                    });
                    setRevenueData(newData);
                  }
                }}
              />
              <Cascader
                allowClear={false}
                style={{ width: 150 }}
                options={buildingCat}
                onChange={(val) => {
                  const mybuildingId = parseInt(val[0]);
                  setBuildingId(mybuildingId);
                  if (areaId) {
                    const init = [...revenueData!];
                    const newData = init.map((myfloor) => {
                      const rateRow = getData({
                        floorId: myfloor?.id || 0,
                        areaCategoryId: areaId,
                        buildingCategoryId: mybuildingId,
                      });
                      return {
                        ...myfloor,
                        rate: rateRow,
                        total: rateRow * (myfloor.countable + myfloor.ncT),
                      };
                    });

                    setRevenueData(newData);
                  }
                }}
              />
            </div>
          )}
        </div>
        <table className="FloorTable">
          <thead>
            <tr>
              <th style={{ textAlign: "left", width: 20 }}>S.N.</th>
              <th style={{ textAlign: "left" }}>Floor</th>
              <th>Taxable Area</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {revenueData ? (
              revenueData?.map((floor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{floor.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {floor.ncT + floor.countable}
                    {/* {projectDetails?.type == "Already Build Building(Regular)"
                      ? ((floor.ncT + floor.countable) * 3).toFixed(2)
                      : floor.ncT + floor.countable} */}
                  </td>
                  <td>{floor.rate}</td>
                  <td>{floor.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            )}
          </tbody>
          <tfoot style={{ position: "relative" }}>
            {/* {totalRevenue ? (
              <NagarjunRevenueDetail total={totalRevenue} />
            ) : null} */}
            <tr>
              <td>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    const amount: number =
                      revenueData?.reduce((a, b) => a + (b?.total || 0), 0) ||
                      0;
                    const rate: number =
                      revenueData?.reduce((a, b) => a + (b?.rate || 0), 0) || 0;
                    const taxableAmount =
                      revenueData?.reduce(
                        (a, b) => a + (b.ncT + b.countable),
                        0
                      ) || 0;

                    setTotal({ taxableAmount, amount, rate });

                    setTotalRevenue(
                      calculateNagarjunRevenue(
                        taxableAmount,
                        projectDetails?.buildingPurposeName
                      )
                    );
                  }}
                >
                  Calculate
                </Button>
              </td>
              <td></td>
              <td style={{ textAlign: "center", color: "#6b7280" }}>
                {projectDetails?.type == "Already Build Building(Regular)"
                  ? (total.taxableAmount * 3).toFixed(2)
                  : total.taxableAmount}
              </td>
              <td>{total.rate}</td>
              <td>{total.amount}</td>
            </tr>
            {isNagarjun() ? (
              <tr className="RevenueFooter">
                <td colSpan={2}>Total Revenue</td>
                <td style={{ textAlign: "center" }}>
                  NRS.{" "}
                  {projectDetails?.type == "Already Build Building(Regular)"
                    ? (totalRevenue * 3).toFixed(2)
                    : totalRevenue}
                </td>
                <td></td>
                <td></td>
              </tr>
            ) : null}
          </tfoot>
        </table>
      </div>
      <div className="FloorTableCover">
        <h2>Rasid Details</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 10px 10px 0",
          }}
        >
          <div
            className="BillSubmitInput"
            style={{
              // justifyContent: "flex-end",
              display: "flex",
              backgroundColor: "rgb(239, 246, 255)",
              padding: "5px 10px",
              width: "100%",
            }}
          >
            <div>
              <label> Bill No. </label>
              <Input
                style={{ width: 80 }}
                placeholder="Bill No."
                onChange={(e) => setRasidNo(e.target.value)}
              />
            </div>
            <div>
              <label> Date (B.S.)</label>
              <Input
                // size="large"
                style={{ width: 80 }}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setRasidDate(e.target.value)}
              />
            </div>
            <div>
              <label>Amount</label>
              <Input
                // size="large"
                style={{ width: 100 }}
                placeholder="Amount"
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Fine</label>
              <Input
                // size="large"
                style={{ width: 80 }}
                placeholder="Fine"
                onChange={(e) => setFine(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Discount</label>
              <Input
                // size="large"
                style={{ width: 80 }}
                placeholder="Discount"
                onChange={(e) => setDiscount(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label>Total</label>
              <Input
                value={amount + fine - discount}
                // size="large"
                style={{ width: 110 }}
                placeholder="Total"
                // onChange={(e) => setrasidTotal(parseInt(e.target.value))}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <h4>Upload</h4>
              <Upload {...props} maxCount={1} className="RasidUpload">
                <Button icon={<UploadOutlined />}>Rasid</Button>
              </Upload>
            </div>
            <Button
              style={{ marginTop: 21 }}
              type="primary"
              disabled={disabled}
              onClick={() => addRasid()}
            >
              Submit
            </Button>
          </div>
        </div>
        <div style={{ padding: "0px 10px", marginBottom: 10 }}>
          <label>Remarks</label> <br />
          <TextArea
            // size="large"
            // style={{ width: 120 }}
            placeholder="Remarks.."
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <RasidList
          onRasidEditSuccess={() => {
            GETrasidList(currentPid).then((res) => {
              setRasidList(res.data);
            });
          }}
          rasidList={rasidList}
          // onRasidDel={(id: number) => onRasidDel(id)}
        />
      </div>
    </Modal>
  );
};

export default RevenueModalFinal;
