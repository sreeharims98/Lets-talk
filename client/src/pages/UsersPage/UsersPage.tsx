import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
import UserList from "../../components/UserList/UserList";
import { ROUTE_PATHS } from "../../data/constants";
import useSocket from "../../hooks/useSocket";
import { AppDispatch, RootState } from "../../store";
import { getAllUsers } from "../../store/users/usersSlice";
import { userSocketState } from "../../store/users/users.types";

const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isConnected, onlineUsers } = useSocket();

  const { user } = useSelector((state: RootState) => state.auth);
  const { users, error, loading } = useSelector((state: RootState) => state.users);

  const handleUserClick = () => {
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAllUsers(""));
  }, []);

  let content;
  if (loading) {
    content = <Spinner isFull={false} />;
  } else if (error) {
    content = <Alert msg={error} type="error" />;
  } else if (onlineUsers.length) {
    content = onlineUsers.map((u) => (
      <UserList key={u.email} avatar={u.username[0]} email={u.email} name={u.username} handleClick={handleUserClick} />
    ));
  }

  if (!user) return null;
  return (
    <div className="">
      <Drawer>
        <>
          <Header
            hasBack={false}
            name={user.username}
            email={user.email}
            avatar={user.username[0]}
            handleUserClick={handleUserHeaderClick}
          />
          <div className="p-2 z-1 z-0 h-[calc(100vh-6rem)] overflow-y-scroll overflow-x-hidden py-2">{content}</div>
        </>
      </Drawer>
    </div>
  );
};

export default UsersPage;
