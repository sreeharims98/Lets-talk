import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import UserList from "../../components/UserList/UserList";
import { ROUTE_PATHS, SOCKET } from "../../data/constants";
import { AppDispatch, RootState } from "../../store";
import Message from "../../components/Message/Message";
import { setSelectedUser } from "../../store/chat/chatSlice";
import { userSocketState, userState } from "../../types/common.types";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../store/users/usersSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useSocket } from "../HomeContainer/HomeContainer";

const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSocket();

  const { user } = useSelector((state: RootState) => state.auth);
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [onlineUsers, setOnlineUsers] = useState<userSocketState[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const handleUserClick = (user: userState) => {
    dispatch(setSelectedUser(user));
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleUserHeaderClick = () => {
    // navigate(-1);
  };

  const checkUserOnline = (user: userState) => {
    if (user && onlineUsers.length && onlineUsers.find((o) => o._id === user._id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAllUsers(""));
  }, []);

  useEffect(() => {
    if (socket && user && !isConnected) {
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CONNECTED");
        setIsConnected(true);
        const { token, ...remUser } = user;
        socket.emit(SOCKET.STATUS_CLIENT_ONLINE, remUser);
      });

      //socket message
      socket.on(SOCKET.STATUS_SERVER, (OUsers: userSocketState[]) => {
        if (user) {
          console.log("SOCKET SERVER STATUS RECIEVED");
          const otherUsers = OUsers.filter((O) => O._id !== user._id);
          setOnlineUsers(otherUsers);
        }
      });

      //socket disconnect
      socket.on(SOCKET.DISCONNECT, () => {
        console.log("SOCKET SERVER DISCONNECTED");
        setIsConnected(false);
      });
    }
    return () => {
      if (socket) {
        console.log("SOCKET OFF");
        socket.off(SOCKET.CONNECT);
        socket.off(SOCKET.DISCONNECT);
      }
    };
  }, []);

  let content;
  if (loading) {
    content = <Spinner isFull={false} />;
  } else if (users.length) {
    content = users.map((u) => <UserList key={u.email} user={u} handleClick={handleUserClick} isOnline={checkUserOnline(u)} />);
  } else {
    content = <Message text="No users found" />;
  }

  if (!user) return <Navigate to={ROUTE_PATHS.AUTH} />;
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
