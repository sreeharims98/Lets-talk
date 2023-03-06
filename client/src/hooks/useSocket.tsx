import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";
import { RootState } from "../store";
import { userSocketState } from "../store/users/users.types";

const socket = io(BASE_URL);
const useSocket = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<userSocketState[]>([]);

  useEffect(() => {
    if (socket && !isConnected) {
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        setIsConnected(true);
        socket.emit(SOCKET.STATUS_CLIENT_ONLINE, user);
      });

      //socket message
      socket.on(SOCKET.MESSAGE, (message) => {
        console.log(SOCKET.MESSAGE, message);
      });

      //socket message
      socket.on(SOCKET.STATUS_SERVER, (OUsers: userSocketState[]) => {
        if (user) {
          const otherUsers = OUsers.filter((O) => O._id !== user._id);
          setOnlineUsers(otherUsers);
          console.log(SOCKET.STATUS_SERVER, otherUsers);
        }
      });

      //socket disconnect
      socket.on(SOCKET.DISCONNECT, () => {
        setIsConnected(false);
      });
    }

    return () => {
      socket.off(SOCKET.CONNECT);
      socket.off(SOCKET.DISCONNECT);
    };
  }, []);

  return { socket, isConnected, onlineUsers };
};

export default useSocket;
