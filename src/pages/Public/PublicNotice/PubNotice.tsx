import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotices, NoticeBody } from "../../../Services/AdminService";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const PubNotice = () => {
  const [notice, setNotice] = useState<NoticeBody[]>();

  useEffect(() => {
    getNotices().then((res) => setNotice(res.data));
    return () => setNotice(undefined);
  }, []);

  return (
    <div>
      <PageHeader
        title="सूचना पाटी"
        subTitle="घर नक्सा शाखाबाट प्रदान हुने सेवाहरु सम्बन्धि सूचनाहरु"
      />
      <div className="uploadFWrapper">
        {notice ? (
          notice.map((x) => (
            <div className="UploadDiv" key={x.id}>
              <Link
                to="/public/viewnotice"
                onClick={() =>
                  localStorage.setItem("PubNotice", JSON.stringify(x))
                }
              >
                <div className="NoticeCard">
                  {/* {x.noticeDetails.length ? (
                    // ? JSON.stringify(IMAGE_URL + x.noticeDetails[0].fileName)
                    <img
                      // src={
                      //   IMAGE_URL + x.noticeDetails[0].fileName
                      // }
                      src={IMG_GET_URL + x.noticeDetails[0].fileName}
                      alt=""
                      height="80px"
                      width="auto"
                    />
                  ) : null} */}
                  <div className="NoticeTitle">
                    <b>{x.title}</b>
                    {/* <span>{x.description}</span> */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
    </div>
  );
};

export default PubNotice;
