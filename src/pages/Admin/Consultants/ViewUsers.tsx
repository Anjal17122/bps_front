import { useContext, useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import {
  CheckCircleFilled,
  CloseCircleTwoTone,
  StopOutlined,
} from "@ant-design/icons";
import {
  getApprovedConsultants,
  getDisabledConsultants,
  getUnapprovedConsultants,
  UserToVerify,
} from "../../../Services/UserService";
import "../../../Assets/scss/ViewUsers.scss";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import ConsultantsListTable from "./ConsultantsListTable";
import ConsultantDetail from "./ConsultantDetail";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

interface CurrentUser {
  currentUser: undefined | UserToVerify;
}

const ViewUsers = () => {
  const { state, dispatch } = useContext(MyStore);

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    currentUser: undefined,
  });

  const [userIsPerma, setUserIsPerma] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getUnapprovedConsultants().then((users) => {
      dispatch({ type: ActionType.getUnapprovedUsers, payload: users.data });
      getApprovedConsultants().then((users) => {
        dispatch({
          type: ActionType.getApprovedUsers,
          payload: users.data.adminList,
        });
        getDisabledConsultants().then((users) => {
          dispatch({
            type: ActionType.getDisabledUsers,
            payload: users.data.adminList,
          });
        });
      });
    });
    return () => {
      dispatch({ type: ActionType.getUnapprovedUsers, payload: undefined });
      dispatch({ type: ActionType.getApprovedUsers, payload: undefined });
      dispatch({ type: ActionType.getDisabledUsers, payload: undefined });
    };
  }, [dispatch]);

  const mappedApproved = state.approvedUsers?.map((approved) => ({
    ...approved,
    key: approved.id,
    id: approved.id,
    name: approved.nameEng,
    email: approved.email,
    phone: approved.primaryPhone,
    approved: true,
    emSignerStatus: approved.emSignerStatus,
  }));

  const mappedUnApproved = state.unapprovedUsers?.map((unapp) => ({
    ...unapp,
    key: unapp.id,
    id: unapp.id,
    name: unapp.nameEng,
    email: unapp.email,
    phone: unapp.primaryPhone,
    approved: false,
    emSignerStatus: unapp?.emSignerStatus ?? "Inactive",
  }));

  const mappedDisabled = state.disabledUsers?.map((unapp) => ({
    ...unapp,
    key: unapp.id,
    id: unapp.id,
    name: unapp.nameEng,
    email: unapp.email,
    phone: unapp.primaryPhone,
    approved: false,
  }));

  const onUnapprovedEnable = (myId: number) => {
    setUserIsPerma(false);

    const currentuser = state.unapprovedUsers?.filter(
      (user) => user.id === myId
    );

    setCurrentUser({
      currentUser: currentuser ? currentuser[0] : undefined,
    });
    setModalIsOpen(true);
  };

  const onApprovedView = (myId: number, perma = false) => {
    const currentuser = state.approvedUsers?.filter((user) => user.id === myId);

    setUserIsPerma(perma);

    setCurrentUser({
      currentUser: currentuser ? currentuser[0] : undefined,
    });
    setModalIsOpen(true);
  };
  const onDisabledView = (myId: number, perma = false) => {
    const currentuser = state.disabledUsers?.filter((user) => user.id === myId);

    // console.log(myId);
    // console.log(state.unapprovedUsers);
    // console.log(currentUser);
    setUserIsPerma(perma);

    setCurrentUser({
      currentUser: currentuser ? currentuser[0] : undefined,
    });
    setModalIsOpen(true);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setCurrentUser({ ...currentUser, currentUser: undefined });
  };

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: (
        <span>
          <CloseCircleTwoTone twoToneColor="#f23557" />
          Unapproved
        </span>
      ),
      children: (
        <ConsultantsListTable
          type="unapproved"
          data={mappedUnApproved}
          onClick={onUnapprovedEnable}
          onDigitalSignStatusSuccess={() => {}}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <CheckCircleFilled style={{ color: "#32cd32" }} />
          Approved
        </span>
      ),
      children: (
        <ConsultantsListTable
          type="approved"
          data={mappedApproved}
          onClick={(id) => onApprovedView(id, true)}
          onDigitalSignStatusSuccess={(status, id) => {
            getApprovedConsultants().then((users) => {
              dispatch({
                type: ActionType.getApprovedUsers,
                payload: users.data.adminList,
              });
            });
          }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <StopOutlined color="#f23557" />
          Disabled
        </span>
      ),
      children: (
        <ConsultantsListTable
          type="disabled"
          data={mappedDisabled}
          onClick={(id) => onDisabledView(id, true)}
          onDigitalSignStatusSuccess={() => {}}
        />
      ),
    },
  ];

  return (
    <div>
      <ConsultantDetail
        user={currentUser.currentUser}
        isOpen={modalIsOpen}
        onCancel={onModalClose}
        perma={userIsPerma}
      />
      <PageHeader
        title="Consultant Verification"
        subTitle="List of Consultant for verification"
      />
      <div className="CenterForm10 TabsDiv">
        <Tabs items={items()} defaultActiveKey="1" className="UsersTab"></Tabs>
      </div>
      {/* <div className="CenterForm10">
        <div className="withShadow marginBot50">
          <div className="TableHead">
            <Search
              className="MySearch"
              placeholder="Applicant No."
              enterButton
            />
            <Search
              className="MySearch"
              placeholder="Applicant Name"
              enterButton
            />
            <div>
              <RangePicker />
              <TableButton bgColor="blue">Search</TableButton>
            </div>
            <Cascader
              placeholder="Sort By:"
              options={[
                { label: "Date (new)", value: "date" },
                { label: "Date (old)", value: "date0" },
                { label: "Applicant Id", value: "applicant" },
              ]}
            />
          </div>
          <div className="TableWrapper">
            {users ? (
              <VerifyUsers users={users} onVerify={() => {}} />
            ) : (
              <RollingLoading height="30vh" />
            )}
            <Pagination style={{ background: "white", padding: 10 }} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewUsers;

//Use case

// function onVerifyUser(id: number) {
//   if (window.confirm("Are you sure?")) {
//     verifyUser(id, ).then(() =>
//       setUsers(users?.filter((x) => x.id !== id))
//     );
//   } else {
//   }
// }
// function onViewProject(id: number) {
//   getProject(id.toString()).then((res) => {
//     dispatch({ type: ActionType.getProject, payload: res.data });
//     history("/admin/viewproject/projectdetails");
//   });
// }
