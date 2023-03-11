import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";
import { RootState } from "../store";
import { userSocketState } from "../store/users/users.types";

const useUserSocket = () => {
  let socket: any;
  const { user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<userSocketState[]>([]);

  const socketDisconnect = () => {
    if (user && socket) {
      console.log("disconnect");
      socket.disconnect();
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    socket = io(BASE_URL);

    if (socket && !isConnected && user) {
      console.log("SOCKET CALLED");

      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("connect");
        setIsConnected(true);
        socket.emit(SOCKET.STATUS_CLIENT_ONLINE, user);
      });

      //socket message
      socket.on(SOCKET.MESSAGE, (message: any) => {
        console.log(SOCKET.MESSAGE, message);
      });

      //socket message
      socket.on(SOCKET.STATUS_SERVER, (OUsers: userSocketState[]) => {
        if (user) {
          const otherUsers = OUsers.filter((O) => O._id !== user._id);
          setOnlineUsers(otherUsers);
          console.log(SOCKET.STATUS_SERVER, otherUsers);
          setLoading(false);
        }
      });

      //socket disconnect
      socket.on(SOCKET.DISCONNECT, () => {
        setIsConnected(false);
        setError("Server disconnected!");
      });
    }

    return () => {
      socket.off(SOCKET.CONNECT);
      socket.off(SOCKET.DISCONNECT);
    };
  }, [user]);

  return { socket, error, loading, isConnected, socketDisconnect, onlineUsers };
};

export default useUserSocket;
