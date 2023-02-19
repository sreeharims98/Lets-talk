import { ChatBubbleProps } from "./ChatBubble.types";

const ChatBubble = ({ isStart, msg }: ChatBubbleProps) => {
  return (
    <div className={`chat py-2 ${isStart ? "chat-start" : "chat-end"}`}>
      <div className="chat-bubble">{msg}</div>
    </div>
  );
};

export default ChatBubble;
