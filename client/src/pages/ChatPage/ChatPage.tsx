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

const ChatPage = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { chat, socketSendMsg } = useChatSocket({ socket });

  const { selectedUser } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  const handleSendMsg = (msg: string) => {
    if (user && selectedUser) {
      socketSendMsg({ msg, sender: user, reciever: selectedUser });
    }
  };

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
