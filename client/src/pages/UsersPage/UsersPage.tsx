import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
import UserList from "../../components/UserList/UserList";
import { ROUTE_PATHS } from "../../data/constants";
import useUserSocket from "../../hooks/useUserSocket";
import { AppDispatch, RootState } from "../../store";
import Message from "../../components/Message/Message";
import { setSelectedUser } from "../../store/chat/chatSlice";
import { userState } from "../../store/auth/auth.types";

const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, socketDisconnect, onlineUsers } = useUserSocket();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleUserClick = (user: userState) => {
    dispatch(setSelectedUser(user));
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    return () => {
      socketDisconnect();
    };
  }, []);

  let content;
  if (loading) {
    content = <Spinner isFull={false} />;
  } else if (error) {
    content = <Alert msg={error} type="error" />;
  } else if (onlineUsers.length) {
    content = onlineUsers.map((u) => <UserList key={u.email} user={u} handleClick={handleUserClick} />);
  } else {
    content = <Message text="No users were discovered online 😥" />;
  }

  if (!user) return <Navigate to={ROUTE_PATHS.HOME} />;
  return (
    <div className="">
      <Drawer>
        <>
          <Header hasBack={false} user={user} handleUserClick={handleUserHeaderClick} />
          <div className="p-2 z-1 z-0 h-[calc(100vh-6rem)] overflow-y-scroll overflow-x-hidden py-2">{content}</div>
        </>
      </Drawer>
    </div>
  );
};

export default UsersPage;
