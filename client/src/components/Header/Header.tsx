import { useNavigate } from "react-router-dom";
import { HeaderProps } from "./Header.types";
import { MdArrowBack, MdOutlineMoreVert } from "react-icons/md";
import UserList from "../UserList/UserList";

const Header = ({
  hasBack,
  name,
  email,
  avatar,
  handleUserClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-base-300 w-full p-2 z-1">
      <div className="w-full flex gap-2 items-center">
        {hasBack && (
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => navigate(-1)}
          >
            <MdArrowBack size={24} />
          </button>
        )}
        <UserList
          name={name}
          email={email}
          avatar={avatar}
          handleClick={handleUserClick}
          isHoverable={false}
        />
      </div>
      <div>
        <label
          htmlFor="my-drawer-menu"
          className="drawer-button btn btn-circle btn-ghost"
        >
          <MdOutlineMoreVert size={24} />
        </label>
      </div>
    </div>
  );
};

export default Header;
