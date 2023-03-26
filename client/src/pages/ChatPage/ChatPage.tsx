import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS, SOCKET } from "../../data/constants";
import useChatSocket from "../../hooks/useChatSocket";
import { useSocket } from "../HomeContainer/HomeContainer";
import { socketMsg } from "../../types/common.types";
import { useEffect, useState } from "react";
import { handleCommonError } from "../../utils/common-utils";

const ChatPage = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [chat, setChat] = useState<socketMsg | null>(null);
  // const { socket, isConnected, socketSendMsg } = useChatSocket();

  const { selectedUser } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isConnected, setIsConnected] = useState(false);

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  const handleSendMsg = (msg: string) => {
    if (user && selectedUser) {
      // socketSendMsg({ msg, sender: user, reciever: selectedUser });
      const data = { msg, sender: user, reciever: selectedUser };
      if (socket) {
        console.log("SOCKET SEND MSG", data);
        socket.emit(SOCKET.CHAT_MESSAGE, data);
      }
    }
  };

  useEffect(() => {
    if (socket && user && !isConnected) {
      handleCommonError("");

      console.log("SOCKET INITIALIZED");

      if (socket && !isConnected && user) {
        //socket connect
        socket.on(SOCKET.CONNECT, () => {
          console.log("SOCKET CONNECTED");
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
    }
  }, []);

  if (!selectedUser) return <Navigate to={ROUTE_PATHS.AUTH} />;
  return (
    <div className="">
      <Drawer>
        <>
          <Header hasBack user={selectedUser} handleUserClick={handleUserHeaderClick} />
          <ChatList chat={chat} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      </Drawer>
    </div>
  );
};

export default ChatPage;
