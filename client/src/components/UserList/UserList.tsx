import { truncateString } from "../../utils/string-utils";
import Avatar from "../Avatar/Avatar";
import { UserListProps } from "./UserList.types";

const UserList = ({ user, handleClick, isHoverable = true, isOnline = false }: UserListProps) => {
  const { username, email } = user;
  return (
    <div
      className={`w-full flex gap-2 items-center justify-between p-2 cursor-pointer rounded-md active:bg-slate-800 ${
        isHoverable && "hover:bg-slate-800"
      } `}
      onClick={() => handleClick(user)}
    >
      <div className="flex gap-2 items-center">
        <Avatar url={username[0]} />
        <div className="flex flex-col">
          <span className="text-slate-100 font-bold">{truncateString(username, 18)}</span>
          <span className="text-xs">{truncateString(email, 24)}</span>
        </div>
      </div>

      {isOnline && <div className="w-2 h-2 rounded bg-green-600 m-3"></div>}
    </div>
  );
};

export default UserList;
