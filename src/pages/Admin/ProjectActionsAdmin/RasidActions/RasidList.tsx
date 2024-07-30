import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  message,
  Popover,
  Upload,
  UploadProps,
} from "antd";
import { useState } from "react";
import MyInfoBtn from "../../../../Common/InfoIcon/MyInfoBtn";
import {
  IMG_GET_URL,
  imgFolders,
  IMG_SAVE_URL,
} from "../../../../Services/Api";
import { RasidListType } from "../../../../Services/FloorService";
import { PatchRasidDetails } from "../../../../Services/ProjectService";
import { getToken } from "../../../../Services/UserService";
import { checkIfPDF } from "../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import useStoreViewProj from "../../../../Store/StoreViewProject/StoreViewProj";

interface Props {
  rasidList: RasidListType[] | undefined;
  onRasidEditSuccess: () => void;
}
const RasidList = ({ rasidList, onRasidEditSuccess }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreViewProj();

  const props: UploadProps = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
    onChange(info) {
      if (info.file.status === "done") {
        setFileName(info.file.response.message);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [rasidNo, setRasidNo] = useState<string>();
  const [rasidDate, setRasidDate] = useState<string>();
  const [amount, setAmount] = useState<string>();

  // const [editRasid, setEditRasid] = useState<RasidListType>();
  const [fileName, setFileName] = useState<string>();

  const onSubmit = (id: number) => {
    const body: {
      id: number;
      rasidNo?: string;
      rasidDate?: string;
      amount?: string;
      fileName?: string;
    } = { id };

    if (rasidNo) body.rasidNo = rasidNo;
    if (rasidDate) body.rasidDate = rasidDate;
    if (amount) body.amount = amount;
    if (fileName) body.fileName = fileName;
    // 1340
    PatchRasidDetails(body, messageApi).then(() => {
      onRasidEditSuccess();
    });
  };

  return (
    <div>
      {contextHolder}
      <table className="FloorTable">
        <thead>
          <tr>
            <th style={{ textAlign: "left", width: 20 }}>S.N.</th>
            <th style={{ textAlign: "left", width: 80 }}>Date(B.S.)</th>
            <th style={{ textAlign: "left", width: 80 }}>Rasid No.</th>
            <th>Amount</th>
            <th>Fine</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Remarks</th>
            <th>File</th>
            <th>
              Edit <MyInfoBtn info="Add Rasid No. and Payment" />{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {rasidList ? (
            rasidList?.map((rasidData, index) => (
              <tr key={rasidData.id}>
                <td>{rasidData.id}</td>
                <td style={{ textAlign: "center" }}>{rasidData?.rasidDate}</td>
                <td style={{ textAlign: "center" }}>{rasidData.rasidNo}</td>
                <td style={{ textAlign: "center" }}>{rasidData.amount}</td>

                <td style={{ textAlign: "center" }}>{rasidData.fine}</td>
                <td style={{ textAlign: "center" }}>{rasidData.discount}</td>
                <td style={{ textAlign: "center" }}>{rasidData.total}</td>
                <td style={{ textAlign: "center" }}>
                  <Popover content={<span>{rasidData.remarks}</span>}>
                    <span
                      style={{
                        paddingLeft: 6,
                        color: "skyblue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      view
                    </span>
                  </Popover>
                </td>
                <td style={{ textAlign: "center" }}>
                  {checkIfPDF("Test") ? (
                    <Button type="link">view</Button>
                  ) : (
                    <Image
                      width={50}
                      height={22}
                      src={
                        IMG_GET_URL +
                        `/${imgFolders.rasid}/${rasidData.fileName}`
                      }
                    />
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Popover
                    content={
                      <div style={{ width: 200 }}>
                        <div style={{ marginBottom: 10 }}>
                          <label>Rasid No:</label>
                          <Input
                            defaultValue={rasidData.rasidNo}
                            onChange={(e) => setRasidNo(e.target.value)}
                          />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label>Rasid Date:</label>
                          <Input
                            defaultValue={rasidData.rasidDate}
                            onChange={(e) => setRasidDate(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: 10 }}>
                          <label>Amount:</label>
                          <Input
                            defaultValue={rasidData.amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: 10 }}>
                          <Upload
                            maxCount={1}
                            {...props}
                            defaultFileList={[
                              {
                                uid: rasidData.fileName ?? "",
                                name: rasidData.fileName ?? "",
                                status: "done",
                                response: {
                                  message: rasidData.fileName,
                                },
                                url:
                                  IMG_GET_URL +
                                  `/${imgFolders.rasid}/${rasidData.fileName}`,
                              },
                            ]}
                          >
                            <Button icon={<UploadOutlined />}>Payment</Button>
                          </Upload>
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            type="primary"
                            loading={disabled}
                            onClick={() => onSubmit(rasidData.id)}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    }
                    title="Title"
                    trigger="click"
                  >
                    <Button
                      type="primary"
                      ghost
                      size="small"
                      // onClick={() => {
                      //   setEditRasid(rasidData);
                      // }}
                    >
                      Edit
                    </Button>
                  </Popover>
                  {/* <MyPopconfirm
                    disabled={false}
                    onConfirm={() => onRasidDel(rasidData.id)}
                    button={"Del"}
                    type="primary"
                  /> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RasidList;
