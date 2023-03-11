import ChatBubble from "../ChatBubble/ChatBubble";

const ChatList = () => {
  return (
    <div className="z-0 h-[calc(100vh-9rem)] overflow-y-scroll overflow-x-hidden py-2">
      <ChatBubble isStart={true} msg="It's over Anakin, I have the high ground." />

      <ChatBubble isStart={false} msg="You underestimate my power!" />
    </div>
  );
};

export default ChatList;
