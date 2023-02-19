import { MdSend } from "react-icons/md";

const ChatInput = () => {
  return (
    <div className="flex gap-2 p-2 w-full z-1">
      <input
        type="text"
        placeholder="Let's talk"
        className="input input-bordered w-full"
      />
      <button className="btn btn-circle btn-primary" onClick={() => {}}>
        <MdSend size={24} />
      </button>
    </div>
  );
};

export default ChatInput;
