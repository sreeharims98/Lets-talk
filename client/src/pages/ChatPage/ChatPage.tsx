import { useNavigate } from "react-router-dom";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";

const ChatPage = () => {
  const navigate = useNavigate();

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <Drawer>
        <>
          <Header
            hasBack
            name={"Sreehari M S"}
            email={"iamsreeharims"}
            avatar={"S"}
            handleUserClick={handleUserHeaderClick}
          />
          <ChatList />
          <ChatInput />
        </>
      </Drawer>
    </div>
  );
};

export default ChatPage;
