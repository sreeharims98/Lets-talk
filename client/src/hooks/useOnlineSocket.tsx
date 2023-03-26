import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { setOnlineUsers } from "../store/users/usersSlice";
import io from "socket.io-client";
import { handleCommonError } from "../utils/common-utils";
import { userSocketState } from "../types/common.types";

const useOnlineSocket = () => {
  let socket: any;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  // const [onlineUsers, setOnlineUsers] = useState<userSocketState[]>([]);

  const socketDisconnect = () => {
    if (user && socket) {
      console.log("SOCKET DISCONNECTED");
      socket.disconnect();
    }
  };

  useEffect(() => {
    setLoading(true);
    handleCommonError("");

    socket = io(BASE_URL);
    console.log("SOCKET INITIALIZED");

    if (socket && !isConnected && user) {
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CONNECTED");
        setIsConnected(true);
        const { token, ...remUser } = user;
        socket.emit(SOCKET.STATUS_CLIENT_ONLINE, remUser);
        setLoading(false);
      });

      //socket message
      socket.on(SOCKET.STATUS_SERVER, (OUsers: userSocketState[]) => {
        if (user) {
          console.log("SOCKET SERVER STATUS RECIEVED", OUsers);
          const otherUsers = OUsers.filter((O) => O._id !== user._id);
          dispatch(setOnlineUsers(otherUsers));
        }
      });

      //socket disconnect
      socket.on(SOCKET.DISCONNECT, () => {
        console.log("SOCKET SERVER DISCONNECTED");
        setIsConnected(false);
      });
    }

    return () => {
      console.log("SOCKET OFF");
      socket.off(SOCKET.CONNECT);
      socket.off(SOCKET.DISCONNECT);
    };
  }, [user]);

  return { socket, loading, isConnected, socketDisconnect };
};

export default useOnlineSocket;
