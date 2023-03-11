import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../data/constants";

const ChatPage = () => {
  const navigate = useNavigate();

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  const { selectedUser } = useSelector((state: RootState) => state.chat);

  if (!selectedUser) return <Navigate to={ROUTE_PATHS.HOME} />;
  return (
    <div className="">
      <Drawer>
        <>
          <Header hasBack user={selectedUser} handleUserClick={handleUserHeaderClick} />
          <ChatList />
          <ChatInput />
        </>
      </Drawer>
    </div>
  );
};

export default ChatPage;
