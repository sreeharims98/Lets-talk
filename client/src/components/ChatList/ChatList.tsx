import { socketMsg } from "../../types/common.types";
import ChatBubble from "../ChatBubble/ChatBubble";

const ChatList = ({ chat }: { chat: socketMsg | null }) => {
  return (
    <div className="z-0 h-[calc(100vh-9rem)] overflow-y-scroll overflow-x-hidden py-2">
      {chat && <ChatBubble isStart={true} msg={chat.msg} />}

      {/* <ChatBubble isStart={false} msg="You underestimate my power!" /> */}
    </div>
  );
};

export default ChatList;
