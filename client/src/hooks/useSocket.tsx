import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { handleCommonError } from "../utils/common-utils";
import { socketMsg, userSocketState } from "../types/common.types";
import { Socket, io } from "socket.io-client";
import { setChats } from "../store/chat/chatSlice";
import { BASE_URL } from "../config";

const useSocket = () => {
  const socketConnectRef = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedUser } = useSelector((state: RootState) => state.chat);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const socketSendMsg = (data: socketMsg) => {
    if (socket) {
      console.log("SOCKET SEND MSG", data);
      socket.emit(SOCKET.CHAT_MESSAGE, data);
      dispatch(setChats({ data, type: "send" }));
    }
  };
  let skt: Socket;
  useEffect(() => {
    //used ref to eliminate 2 times calling of useeffect
    if (socketConnectRef.current) return;
    socketConnectRef.current = true;
    //socket start

    if (!socket && !skt && !isConnected && user) {
      handleCommonError("");
      const skt = io(BASE_URL);
      setSocket(skt);
      setLoading(false);

      //socket connect
      skt.on(SOCKET.CONNECT, () => {
        console.log("SOCKET ONLINE CONNECTED");
        setIsConnected(true);
        const { token, ...remUser } = user;
        skt.emit(SOCKET.STATUS_CLIENT_ONLINE, remUser);
      });

      //socket message
      skt.on(SOCKET.STATUS_SERVER, (OUsers: userSocketState[]) => {
        if (selectedUser) {
          console.log("SOCKET SERVER STATUS RECIEVED");
          const isFoundOnline = OUsers.find((O) => O._id === selectedUser._id);
          if (isFoundOnline) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
          }
        }
      });

      //socket message
      skt.on(SOCKET.MESSAGE, (data: socketMsg) => {
        console.log("SOCKET MESSAGE RECIEVED", data);
        dispatch(setChats({ data, type: "recieve" }));
      });

      //socket disconnect
      skt.on(SOCKET.DISCONNECT, () => {
        console.log("SOCKET SERVER DISCONNECTED");
        setIsConnected(false);
      });
    }
  }, []);

  return { socket, isConnected, socketSendMsg, isOnline };
};

export default useSocket;
