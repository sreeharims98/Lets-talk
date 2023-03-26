import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { handleCommonError } from "../utils/common-utils";
import { socketMsg } from "../types/common.types";
import { Socket } from "socket.io-client";

const useChatSocket = ({ socket }: { socket: Socket | null }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [chat, setChat] = useState<socketMsg | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const socketSendMsg = (data: socketMsg) => {
    if (socket) {
      console.log("SOCKET SEND MSG", data);
      socket.emit(SOCKET.CHAT_MESSAGE, data);
    }
  };

  useEffect(() => {
    if (socket && user && !isConnected) {
      handleCommonError("");
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CHAT CONNECTED");
        setIsConnected(true);
      });

      //socket message
      socket.on(SOCKET.MESSAGE, (message: any) => {
        console.log("SOCKET MESSAGE RECIEVED", message);
        setChat(message);
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

  return { chat, socket, isConnected, socketSendMsg };
};

export default useChatSocket;
