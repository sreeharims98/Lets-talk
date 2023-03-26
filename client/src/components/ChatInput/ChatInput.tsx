import { useState } from "react";
import { MdSend } from "react-icons/md";
import { ChatInputProps } from "./ChatInput.types";

const ChatInput = ({ handleSendMsg }: ChatInputProps) => {
  const [msg, setMsg] = useState("");

  return (
    <div className="flex gap-2 p-2 w-full z-1">
      <input
        type="text"
        placeholder="Let's talk"
        className="input input-bordered w-full"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button className="btn btn-circle btn-primary" onClick={() => handleSendMsg(msg)}>
        <MdSend size={24} />
      </button>
    </div>
  );
};

export default ChatInput;
