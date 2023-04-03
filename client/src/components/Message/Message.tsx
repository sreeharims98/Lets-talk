import { MessageProps } from "./Message.types";

const Message = ({ text }: MessageProps) => {
  return (
    <div className="flex items-center justify-center m-2">
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Message;
