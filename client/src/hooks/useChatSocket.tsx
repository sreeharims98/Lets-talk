import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import io from "socket.io-client";
import { handleCommonError } from "../utils/common-utils";
import { socketMsg } from "../types/common.types";

const useChatSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  // let socket: any;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const socketDisconnect = () => {
    if (user && socket) {
      console.log("SOCKET DISCONNECTED");
      socket.disconnect();
    }
  };

  const socketSendMsg = (data: socketMsg) => {
    if (socket) {
      console.log("SOCKET SEND MSG", data);
      socket.emit(SOCKET.CHAT_MESSAGE, data);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleCommonError("");

    let skt = io(BASE_URL);
    setSocket(io(BASE_URL));
    console.log("SOCKET INITIALIZED");

    if (skt && !isConnected && user) {
      //socket connect
      skt.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CONNECTED");
        setIsConnected(true);
        setLoading(false);
      });

      //socket message
      skt.on(SOCKET.MESSAGE, (message: any) => {
        console.log("SOCKET MESSAGE RECIEVED", message);
      });

      //socket disconnect
      skt.on(SOCKET.DISCONNECT, () => {
        console.log("SOCKET SERVER DISCONNECTED");
        setIsConnected(false);
      });
    }

    return () => {
      console.log("SOCKET OFF");
      skt.off(SOCKET.CONNECT);
      skt.off(SOCKET.DISCONNECT);
    };
  }, [user]);

  return { socket, loading, isConnected, socketDisconnect, socketSendMsg };
};

export default useChatSocket;
