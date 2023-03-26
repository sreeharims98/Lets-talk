import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "../data/constants";
import { AppDispatch, RootState } from "../store";
import { handleCommonError } from "../utils/common-utils";
import { allChatsState, socketMsg } from "../types/common.types";
import { Socket } from "socket.io-client";
import { setChats } from "../store/chat/chatSlice";

const useChatSocket = ({ socket }: { socket: Socket | null }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { chats } = useSelector((state: RootState) => state.chat);

  const getChats = () => {
    return JSON.parse(JSON.stringify(chats));
  };

  // const [chat, setChat] = useState<socketMsg | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const socketSendMsg = (data: socketMsg) => {
    if (socket) {
      console.log("SOCKET SEND MSG", data);
      socket.emit(SOCKET.CHAT_MESSAGE, data);

      const newChats: allChatsState[] = getChats();
      const { token, ...user } = data.sender;
      const singleMsg = { user: user, msg: data.msg };
      const chatUserIndex = newChats.findIndex((c) => c.user._id === data.reciever._id);
      if (chatUserIndex >= 0) {
        newChats[chatUserIndex] = {
          user: newChats[chatUserIndex].user,
          msgs: [...newChats[chatUserIndex].msgs, singleMsg],
        };
      } else {
        newChats.push({ user: data.reciever, msgs: [singleMsg] });
      }
      dispatch(setChats(newChats));
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
      socket.on(SOCKET.MESSAGE, (data: socketMsg) => {
        console.log("SOCKET MESSAGE RECIEVED", data);
        console.log(getChats().length);
        const newChats: allChatsState[] = getChats();
        const { token, ...user } = data.sender;
        const singleMsg = { user: user, msg: data.msg };
        console.log(newChats.length);
        const chatUserIndex = newChats.findIndex((c) => c.user._id === data.sender._id);
        console.log("haha", chatUserIndex);
        if (chatUserIndex >= 0) {
          newChats[chatUserIndex] = {
            user: newChats[chatUserIndex].user,
            msgs: [...newChats[chatUserIndex].msgs, singleMsg],
          };
        } else {
          newChats.push({ user: data.sender, msgs: [singleMsg] });
        }

        dispatch(setChats(newChats));
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

  return { socket, isConnected, socketSendMsg };
};

export default useChatSocket;
