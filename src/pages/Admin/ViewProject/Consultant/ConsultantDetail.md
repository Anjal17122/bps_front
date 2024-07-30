import { Row, Col, Button } from "antd";
import React from "react";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import "../../../../Assets/scss/Consultant.scss";
import { Link } from "react-router-dom";
import MyAvatar from "../../../../Common/Avatar/Avatar";
import { Colheight } from "../../../../Common/Form/FormDatas";
import TableButton from "../../../../Common/TableButton/TableButton";
// import MyAvatar from "../../Common/Avatar/Avatar";
// import { Colheight } from "../../Common/Form/FormDatas";
// import TableButton from "../../Common/TableButton/TableButton";

const ConsultantDetail = () => {
return (
<div className="CenterForm">
<Row justify="space-between">
<Col {...Colheight(10)}>
<div className="flexRow">
<MyAvatar />
<div className="flexColEnd paddingLeft20">
<h2>Ram Kumar Shrestha</h2>
<p>
<b>Email:</b> thisistestemail@gmail.com
</p>
<p>
<b>Phone: </b> 9803146768
</p>
</div>
</div>
</Col>
<Col {...Colheight(10)} className="paddingTop">
<div className="flexSpaceB ">
<TableButton bgColor="green">Enable</TableButton>{" "}
<div>
<Link to={"/user/profile/edit"}>
<Button type="primary" icon={<EditOutlined />} />
</Link>
</div>
</div>
<div className="paddingTop">
<div className="paddingBot10">
<b>Nepal Engineering Council No:</b> 108467486
</div>
<Button type="primary" icon={<EyeOutlined />}>
View NEC Certificate
</Button>
<Button type="primary" ghost icon={<EyeOutlined />}>
View Citizenship
</Button>
</div>
</Col>
</Row>
<Row>
<Col {...Colheight(24)}>
<div className="paddingTop">
<p>
<b>Citizenship No:</b> 84867/110
</p>
<p>
<b>Citizenship Issue Date:</b> 2070-10-11
</p>
<p>
<b>Citizenship Issue District:</b> Lalitpur
</p>
</div>
</Col>
</Row>
<Row>
<Col {...Colheight(24)}>
<div className="paddingTop">
<p>
<b>Father Name:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Grandfather Name::</b> MAdan Bahadur Shrestha
</p>
</div>
</Col>
</Row>
<Row justify="space-between">
<Col {...Colheight(10)}>
<div className="PurpleCard EditAddDiv">
<div className="EditDiv">Edit</div>
<h2>Permanent Address</h2>
<p>
<b>State:</b> Ram Bahadur Shrestha
</p>
<p>
<b>District:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Municipality:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Ward:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Tole:</b> Ram Bahadur Shrestha
</p>
</div>
</Col>
<Col {...Colheight(10)}>
<div className="PurpleCard EditAddDiv">
<div className="EditDiv">Edit</div>
<h2>Current Address</h2>
<p>
<b>State:</b> Ram Bahadur Shrestha
</p>
<p>
<b>District:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Municipality:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Ward:</b> Ram Bahadur Shrestha
</p>
<p>
<b>Tole:</b> Ram Bahadur Shrestha
</p>
</div>
</Col>
</Row>
</div>
);
};

export default ConsultantDetail;
