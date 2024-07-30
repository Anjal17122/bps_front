import { useEffect, useState } from "react";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import { DownloadsBody, getDownloads } from "../../../Services/AdminService";
import { imgFolders, IMG_GET_URL, PDF_URL } from "../../../Services/Api";
import { checkIfPDF } from "../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const Downloads = () => {
  const [downloads, setDownloads] = useState<DownloadsBody[]>();

  useEffect(() => {
    getDownloads().then((res) => setDownloads(res.data));
    return () => setDownloads(undefined);
  }, []);

  return (
    <div>
      <PageHeader
        title="डाउनलोड पृष्ठ"
        subTitle="घर नक्सा शाखा सम्बन्धि डाउनलोडहरु"
      />
      <div className="uploadFWrapper">
        {downloads ? (
          downloads.map((x) => (
            <div className="UploadDiv" key={x.id}>
              <div
                className="uploadFiles"
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <b>{x.title}</b>
                <span style={{ paddingLeft: "2%" }}>{x.description}</span>
                {/* <div></div> */}
              </div>
              <>
                {x.publicFileDetails.map((pubFile) => (
                  <div className="DownloadList" key={pubFile.id}>
                    <a
                      rel="noopener noreferrer"
                      href={
                        (checkIfPDF(pubFile.fileName) ? PDF_URL : IMG_GET_URL) +
                        `/${imgFolders.downloads}/${pubFile.fileName}`
                      }
                      target="_blank"
                    >
                      {pubFile.title}
                    </a>
                    <a
                      rel="noopener noreferrer"
                      href={
                        (checkIfPDF(pubFile.fileName) ? PDF_URL : IMG_GET_URL) +
                        `/${imgFolders.downloads}/${pubFile.fileName}`
                      }
                      target="_blank"
                    >
                      <button className="NoStyleBtnSm">Download</button>
                    </a>
                  </div>
                ))}
              </>
            </div>
          ))
        ) : (
          <RollingLoading height="40vh" />
        )}
      </div>
    </div>
  );
};

export default Downloads;
