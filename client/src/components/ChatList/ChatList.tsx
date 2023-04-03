import { chatState, userState } from "../../types/common.types";
import ChatBubble from "../ChatBubble/ChatBubble";

const ChatList = ({ chat, user }: { chat: chatState[] | undefined; user: userState | null }) => {
  // console.log({ chat });
  return (
    <div className="z-0 h-[calc(100vh-9rem)] overflow-y-scroll overflow-x-hidden py-2">
      {chat?.map((c, i) => (
        <ChatBubble isStart={c.user._id !== user?._id} msg={c.msg} key={c.msg + i} />
      ))}
    </div>
  );
};

export default ChatList;
