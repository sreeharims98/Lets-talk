import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../data/constants";
import useChatSocket from "../../hooks/useChatSocket";
import { useSocket } from "../../context/socketContext";
import { allChatsState, userState } from "../../types/common.types";

const getChat = (chats: allChatsState[], selectedUser: userState | null) => {
  if (selectedUser && chats.length) {
    const data = chats.find((c) => c.user._id === selectedUser._id);
    return data?.msgs;
  }
};

const ChatPage = () => {
  const navigate = useNavigate();
  // const { socket } = useSocket();
  const { socketSendMsg, isOnline } = useChatSocket();

  const { selectedUser, chats } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  const handleSendMsg = (msg: string) => {
    if (msg && user && selectedUser) {
      socketSendMsg({ msg, sender: user, reciever: selectedUser });
    }
  };

  if (!selectedUser) return <Navigate to={ROUTE_PATHS.AUTH} />;
  return (
    <div className="">
      <Drawer>
        <>
          <Header hasBack user={selectedUser} handleUserClick={handleUserHeaderClick} isOnline={isOnline} />
          <ChatList chat={getChat(chats, selectedUser)} user={user} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      </Drawer>
    </div>
  );
};

export default ChatPage;
