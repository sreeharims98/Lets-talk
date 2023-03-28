import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { SOCKET } from "../data/constants";
import { RootState } from "../store";
import { userSocketState } from "../types/common.types";

const useOnlineSocket = ({ socket }: { socket: Socket | null }) => {
  const socketConnectRef = useRef(false);

  const { user } = useSelector((state: RootState) => state.auth);

  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<userSocketState[]>([]);

  useEffect(() => {
    //used ref to eliminate 2 times calling of useeffect
    if (socketConnectRef.current) return;
    socketConnectRef.current = true;

    //socket start
    if (socket && user) {
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET ONLINE CONNECTED");
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
  }, []);

  return { socket, onlineUsers, isConnected };
};

export default useOnlineSocket;
