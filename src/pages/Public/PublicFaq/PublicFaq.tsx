import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import { FaqTyp, getFaqs } from "../../../Services/AdminService";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const PublicFaq = () => {
  const [faqs, setFaqs] = useState<FaqTyp[]>();

  useEffect(() => {
    getFaqs().then((res) => setFaqs(res.data));
    return () => setFaqs(undefined);
  }, []);
  return (
    <div>
      <PageHeader
        title="बारम्बार सोधिएको प्रश्न"
        subTitle={"उत्तर भेट्नु भएन भने सम्पर्क गर्नुहोस"}
      />
      <div className="uploadFWrapper">
        {faqs ? (
          <Collapse accordion className="expandcard">
            {faqs.map((data, ) => (
              <Collapse.Panel header={data.question} key={data.id}>
                <p>{data.answer}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        ) : (
          <div>
            <RollingLoading height="50vh" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicFaq;
