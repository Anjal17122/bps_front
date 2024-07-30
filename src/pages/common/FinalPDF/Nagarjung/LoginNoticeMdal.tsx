import React, { useState } from "react";
import { Button, Modal } from "antd";
import { isNagarjun } from "../../../../constants/CommonFunctions";
import { Link } from "react-router-dom";

const LoginNoticeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {isNagarjun() ? (
        <Modal
          title="सूचना"
          open={isModalOpen}
          width={500}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered={true}
        >
          <p>
            यस नागार्जुन नगरपालिकाका अन्तर्गत नक्सा पास प्रणालीमा दर्ता हुनु
            भएका सम्पूर्ण परामर्शदाताहरु आर्थिक वर्ष २०८१/०८२ मा परामर्श सेवा
            प्रदान गर्नको लागि अनिवार्य रुपमा नवीकरण गर्नुहुन अनुरोध गर्दछु।
          </p>
          <h3>
            <strong>सूचना</strong>
          </h3>
          <p>
            यस नागार्जुन नगरपालिकाका अन्तर्गत नक्सा पास प्रणालीमा नगरपालिका
            कार्यालय, घर धनी र परामर्शदाता बीच त्रि पक्षीय सम्झौता पत्र अनिवार्य
            भरेर प्रणालीमा upload गर्न सूचित गरिएको छ।
          </p>
          <p>
            नोट: सम्झौता पत्र सिस्टमबाट generate गरी upload गर्नको लागि उल्लेखित
            प्रक्रिया अनुसरण गर्नुहोला।
          </p>
          <Link
            to="/tutorial/aggrement"
            target="_blank"
            rel="noreferrer noopener"
            style={{ display: "flex", justifyContent: "center" }}
          >
            View Tutorial
          </Link>
        </Modal>
      ) : null}
    </>
  );
};

export default LoginNoticeModal;
