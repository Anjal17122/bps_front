import { message, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import {
  changeMsgStatus,
  getHelps,
  Help,
} from "../../../Services/AdminService";
import MessagesTable from "./PublicMessagesTable";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

const Messages = () => {
  const [msgs, setMsgs] = useState<Help[]>();
  const [modal, setModal] = useState(false);
  const [view, setView] = useState<Help>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHelps().then((res) => setMsgs(res.data));
    return () => {
      setMsgs(undefined);
    };
  }, []);

  function onDel(id: number) {
    alert("Working on it : " + id);
  }
  function onStatus(id: number, status: "SEEN" | "NOTSEEN", index: number) {
    changeMsgStatus(id, status, setLoading).then(() => {
      message.success("Changed status successfully!");
      const init = msgs ? [...msgs] : [];
      const row = { ...init[index] };
      row.status = status;
      init[index] = row;
      setMsgs(init);
    });
  }
  function onView(data: Help) {
    setModal(true);
    setView(data);
  }

  return (
    <div>
      <PageHeader title="Messages" subTitle="View Messages from People" />
      <Modal
        footer={null}
        open={modal}
        onCancel={() => {
          setModal(false);
          setView(undefined);
        }}
      >
        <div id="HelpModal">
          <div className="TextWrapper">
            <div className="titles">Name:</div>
            <div className="data">{view?.name}</div>
          </div>
          <div className="TextWrapper">
            <div className="titles">Email:</div>

            <div className="data">{view?.email}</div>
          </div>
          <div className="TextWrapper">
            <div className="titles">Phone:</div>

            <div className="data">{view?.phone}</div>
          </div>
          <div className="TextWrapper">
            <div className="titles">Message:</div>

            <div className="data">{view?.message}</div>
          </div>
        </div>
      </Modal>
      <div className="MessagesWrapper">
        <MessagesTable
          data={msgs}
          onDel={onDel}
          onStatus={onStatus}
          onView={onView}
          loading={loading}
        />
        <Pagination className="PaginAll" total={50} />
      </div>
    </div>
  );
};

export default Messages;
