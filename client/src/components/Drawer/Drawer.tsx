import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/auth/authSlice";
import { DrawerProps } from "./Drawer.types";

const Drawer = ({ socket, children }: DrawerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    if (socket) {
      socket.disconnect();
    }
    dispatch(logout());
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-menu" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <li onClick={handleLogout}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
