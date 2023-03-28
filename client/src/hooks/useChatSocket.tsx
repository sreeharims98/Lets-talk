import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { handleCommonError } from "../utils/common-utils";
import { socketMsg } from "../types/common.types";
import { Socket } from "socket.io-client";
import { setChats } from "../store/chat/chatSlice";

const useChatSocket = ({ socket }: { socket: Socket | null }) => {
  const socketConnectRef = useRef(false);

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const [isConnected, setIsConnected] = useState(false);

  const socketSendMsg = (data: socketMsg) => {
    if (socket) {
      console.log("SOCKET SEND MSG", data);
      socket.emit(SOCKET.CHAT_MESSAGE, data);
      dispatch(setChats({ data, type: "send" }));
    }
  };

  useEffect(() => {
    //used ref to eliminate 2 times calling of useeffect
    if (socketConnectRef.current) return;
    socketConnectRef.current = true;

    //socket start
    if (socket && !isConnected) {
      handleCommonError("");
      //socket connect
      socket.on(SOCKET.CONNECT, () => {
        console.log("SOCKET CHAT CONNECTED");
        setIsConnected(true);
      });

      //socket message
      socket.on(SOCKET.MESSAGE, (data: socketMsg) => {
        console.log("SOCKET MESSAGE RECIEVED", data);
        dispatch(setChats({ data, type: "recieve" }));
      });

      //socket disconnect
      socket.on(SOCKET.DISCONNECT, () => {
        console.log("SOCKET SERVER DISCONNECTED");
        setIsConnected(false);
      });
    }
  }, []);

  return { socket, isConnected, socketSendMsg };
};

export default useChatSocket;
