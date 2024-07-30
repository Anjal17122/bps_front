import { useNavigate, useParams } from "react-router-dom";
import { postPlinth, POSTplinthReq } from "../../../../Services/PlinthService";
import PlinthForm from "./PlinthForm";
import "../../../../Assets/scss/AddPlinth.scss";
import { imgFolders } from "../../../../Services/Api";
import { copyImageFinal } from "../../../Admin/OnDeskFinal/OnDeskService/OnDeskService/OnDeskService";
import { message } from "antd";

const AddPlinth = () => {
  // const [plinthData, setPlinthData] = useState<PlinthTableData>();

  const [messageApi, contextHolder] = message.useMessage();

  const params = useParams();
  const pid = params.pid ?? "";

  const history = useNavigate();

  const onSubmit = (val: any) => {
    const filterImage = { ...val };
    delete filterImage.upload;
    const imagesOnly: {
      imageName: string;
      imageUrl: string;
    }[] = val.upload.map((val: any) => {
      if (val.status === "done") {
        return { imageName: val.name, imageUrl: val.response.message };
      } else {
        return {};
      }
    });
    const body: POSTplinthReq = {
      projectId: pid,
      requestForm: JSON.stringify(filterImage),
      images: JSON.stringify(imagesOnly),
    };
    copyImageFinal(
      imagesOnly.map((data) => ({
        fileName: data.imageUrl,
        dir: imgFolders.plinth,
      })),
      messageApi
    ).then(() => {
      postPlinth(body, messageApi).then(() => history(-1));
    });
  };

  return (
    <div className="AddPlinth">
      {contextHolder}
      <div className="HeadBar">
        <div></div>
        <h1>
          <span className="title">Fill Plinth Form</span>
        </h1>

        <div></div>
      </div>

      <PlinthForm onSubmit={onSubmit} />
      {/* {plinthData?.requestForm ? (
        <PlinthFormEdit />
      ) : (
      )} */}
    </div>
  );
};

export default AddPlinth;
