import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { userSocketState } from "../store/users/users.types";
import { setOnlineUsers } from "../store/users/usersSlice";
import io from "socket.io-client";

const useUserSocket = () => {
  let socket: any;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

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
    setError("");

    socket = io(BASE_URL);
    console.log("SOCKET INITIALIZED");

    if (socket && !isConnected && user) {
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CONNECTED");
        setIsConnected(true);
        socket.emit(SOCKET.STATUS_CLIENT_ONLINE, user);
        setLoading(false);
      });

      //socket message
      socket.on(SOCKET.MESSAGE, (message: any) => {
        console.log("SOCKET MESSAGE RECIEVED", message);
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

  return { socket, error, loading, isConnected, socketDisconnect };
};

export default useUserSocket;
