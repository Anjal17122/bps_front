import React from "react";
import { Button, Popover } from "antd";
import { CommentType } from "../../Services/CommentService";
import "../../Assets/scss/LogTable.scss";
import { EyeOutlined } from "@ant-design/icons";

interface Props {
  data: CommentType[];
  myclass?: string;
}

const CommentsTable = ({ data, myclass = "LogTable" }: Props) => {
  //eslint-disable-next-line
  const mydata = [
    {
      id: 1104,
      type: "Project Details",
      comment: "Building purpose not valid (test)",
      project: null,
      commentDate: "2021-02-07T04:59:16.474+00:00",
      commentBY: {
        nameEng: "sushil",
      },
    },
    {
      id: 1105,
      type: "Project Details",
      comment:
        "Building purpose not valid hello world this is long commentBuilding purpose not valid hello world this is long commentBuilding purpose not valid hello world this is long commentBuilding purpose not valid hello world this is long commentBuilding purpose not valid hello world this is long comment",
      project: null,
      commentDate: "2021-02-07T04:59:16.474+00:00",
      commentBY: {
        nameEng: "sushil",
      },
    },
  ];

  return (
    <div>
      <table className={myclass} style={{ fontSize: 12 }}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Date</th>
            <th>On Section</th>
            <th>Comment</th>
            <th>Comment by</th>
          </tr>
        </thead>
        <tbody>
          {data.map((comment, i) => (
            <tr key={comment?.id}>
              <td>{i + 1}</td>
              <td>{comment.commentDate.substr(0, 10)}</td>
              <td>{comment.type}</td>
              <td>
                {comment.comment.substr(0, 50)}...{" "}
                <Popover
                  className="CommentPopover"
                  // style={{
                  //   boxShadow: "-5px 30px 197px 1000px rgba(0, 0, 0, 0.5)",
                  // }}
                  content={
                    <div
                      style={{
                        width: 350,
                      }}
                    >
                      {comment.comment}
                    </div>
                  }
                  title="Comment:"
                  trigger="click"
                >
                  <Button type="link" icon={<EyeOutlined />}></Button>{" "}
                </Popover>
              </td>
              <td>{comment.commentBY.nameEng}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
