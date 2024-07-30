import { useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import { Collapse } from "antd";
import { delFaq, FaqTyp, getFaqs } from "../../../Services/AdminService";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { municipalityDetails } from "../../../constants/constants";
import PageHeaderExtra from "../../../Components/Common/PageHeader/PageHeaderExtra";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

const Faq = () => {
  const [faqs, setFaqs] = useState<FaqTyp[]>();
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();
  const { Panel } = Collapse;
  const history = useNavigate();

  const { dispatch } = useContext(MyStore);

  useEffect(() => {
    getFaqs().then((res) => setFaqs(res.data));
    return () => setFaqs(undefined);
  }, []);

  const genExtra = (data: FaqTyp, index: number) => (
    <div>
      <EditOutlined
        style={{ marginRight: 10 }}
        onClick={(event) => {
          dispatch({ type: ActionType.setFaq, payload: data });
          history("/admin/faqedit");
          event.stopPropagation();
        }}
      />
      <DeleteOutlined
        disabled={disabled}
        onClick={(event) => {
          if (window.confirm("Are you sure you want to delete?")) {
            delFaq(data.id, messageApi).then(() => {
              const init = faqs ? [...faqs] : [];
              init.splice(index, 1);
              setFaqs(init);
            });
          } else {
            messageApi.error("cancelled");
          }
          event.stopPropagation();
        }}
      />
    </div>
  );

  return (
    <div>
      <PageHeaderExtra
        title="बारम्बार सोधिएको प्रश्न र उत्तर"
        subTitle={
          "भेट्नु भएन भने सम्पर्क गर्नुहोस: " + municipalityDetails.phone
        }
        extra={[
          <Link key={1} to="/admin/addfaq">
            <Button type="primary">Add Faq</Button>
          </Link>,
        ]}
      />
      {contextHolder}
      <div className="uploadFWrapper">
        {faqs ? (
          <Collapse accordion className="expandcard">
            {faqs.map((data, indx) => (
              <Panel
                header={data.question}
                key={data.id}
                extra={genExtra(data, indx)}
              >
                <p>{data.answer}</p>
              </Panel>
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

export default Faq;
