import { NoticeBody } from "../../../Services/AdminService";
import { imgFolders, IMG_GET_URL } from "../../../Services/Api";

const ViewPublicNotice = () => {
  const noticeDetails: NoticeBody = JSON.parse(
    localStorage.getItem("PubNotice") ?? ""
  );

  return (
    <div style={{ background: "#F2F2F2" }}>
      <div style={{ padding: "20px 5%" }} className="CenterForm">
        <h2>
          <b>{noticeDetails.title}</b>
        </h2>
        <div style={{ paddingTop: 10 }}>
          {noticeDetails.noticeDetails.map((noticeDet) => (
            <img
              width={"auto"}
              height={480}
              key={noticeDet.id}
              src={IMG_GET_URL + `/${imgFolders.notice}/${noticeDet.fileName}`}
              alt={noticeDet.title}
            />
          ))}
          <p>{noticeDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPublicNotice;
