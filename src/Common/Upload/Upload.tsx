import { useState } from "react";
import { Upload, UploadFile, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload";

interface Props {
  uploadURL: string;
  label: string;
  getImgName: (x: string) => void;
}

export const UploadButton = ({ uploadURL, label, getImgName }: Props) => {
  const [myMessageApi, contextHolder] = message.useMessage();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  function beforeUpload(file: any) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "application/pdf";
    if (!isJpgOrPng) {
      myMessageApi.error("You can only upload JPG/PNG/webp/pdf file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      myMessageApi.error("File must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const [value, setValue] = useState({
    loading: false,
    imageUrl: "",
    imageName: "",
  });

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setValue({ ...value, loading: true });
      return;
    } else if (info.file.status === "error") {
      setValue({ ...value, loading: false });
      return;
    } else if (info.file.status === "done") {
      getImgName(info.file.response.message);
      getBase64(info.file.originFileObj as RcFile, (imageUrl: any) => {
        setValue({
          imageUrl,
          loading: false,
          imageName: info.file.response.message,
        });
      });
    }
  };

  // const handleChange = (info: any) => {

  //   if (info.file.status === "uploading") {
  //     setValue({ ...value, loading: true });
  //     info.file.status = "done";
  //     // return;
  //   } else if (info.file.status === "error") {
  //     setValue({ ...value, loading: false });
  //     return;
  //   } else if (info.file.status === "done") {
  //     getImgName(info.file.response.message);
  //     getBase64(info.file.originFileObj, () => {
  //       const file = info.file.originFileObj;
  //       return onDrop(file);
  //     });
  //     // getBase64(info.file.originFileObj, (imageUrl: any) => {
  //     //   setValue({
  //     //     imageUrl,
  //     //     loading: false,
  //     //     imageName: info.file.response.message,
  //     //   });
  //     // });
  //   }
  // };

  const uploadButton = (
    <div>
      {value.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div id="MyUploadWrapper">
      {contextHolder}
      <Upload
        // fileList={fileList}
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadURL}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        // customRequest={({ file, onSuccess, onError }: any) => {
        //   Promise.resolve().then(() => onSuccess());
        // }}
      >
        {value.imageUrl ? (
          //   <span>{JSON.stringify(value.imageUrl)}</span>
          // ) : (
          (value.imageName as any).split(".").pop() === "pdf" ? (
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                fontSize: 11,
              }}
            >
              <div>
                <CheckCircleOutlined style={{ color: "#00d924" }} />
              </div>
              <div>
                ..{value.imageName.substring(value.imageName.length - 16)}
              </div>
            </div>
          ) : (
            <img
              src={value.imageUrl}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          )
        ) : (
          uploadButton
        )}
      </Upload>
      <span style={{ paddingRight: 10 }}>{label}</span>
    </div>
  );
};

// const handleChange = (info: any) => {
//   if (info.file.status === "uploading") {
//     setValue({ ...value, loading: true });
//     return;
//   }
//   if (info.file.status === "error") {
//     setValue({ ...value, loading: false });
//     ErrorMessage("Failed to upload image", info.file.response.message);
//     return;
//   }
//   if (info.file.status === "done") {
//     dispatch(
//       Dispatches.setImageName(
//         Actions.SET_IMAGENAME,
//         info.file.response.imageName
//       )
//     );
//     getBase64(info.file.originFileObj, (imageUrl: any) =>
//       setValue({ ...value, imageUrl, loading: false })
//     );
//   }
// };
