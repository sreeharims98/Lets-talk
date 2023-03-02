import { truncateString } from "../../utils/string-utils";
import Avatar from "../Avatar/Avatar";
import { UserListProps } from "./UserList.types";

const UserList = ({ name, email, avatar, handleClick, isHoverable = true }: UserListProps) => {
  return (
    <div
      className={`w-full flex gap-2 items-center p-2 cursor-pointer rounded-md active:bg-slate-800 ${
        isHoverable && "hover:bg-slate-800"
      } `}
      onClick={handleClick}
    >
      <Avatar url={avatar} />
      <div className="flex flex-col">
        <span className="text-slate-100 font-bold">{truncateString(name, 18)}</span>
        <span className="text-xs">{truncateString(email, 24)}</span>
      </div>
    </div>
  );
};

export default UserList;
