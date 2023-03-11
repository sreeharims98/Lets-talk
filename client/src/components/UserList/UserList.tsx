import { truncateString } from "../../utils/string-utils";
import Avatar from "../Avatar/Avatar";
import { UserListProps } from "./UserList.types";

const UserList = ({ user, handleClick, isHoverable = true }: UserListProps) => {
  const { username, email } = user;
  return (
    <div
      className={`w-full flex gap-2 items-center p-2 cursor-pointer rounded-md active:bg-slate-800 ${
        isHoverable && "hover:bg-slate-800"
      } `}
      onClick={() => handleClick(user)}
    >
      <Avatar url={username[0]} />
      <div className="flex flex-col">
        <span className="text-slate-100 font-bold">{truncateString(username, 18)}</span>
        <span className="text-xs">{truncateString(email, 24)}</span>
      </div>
    </div>
  );
};

export default UserList;
