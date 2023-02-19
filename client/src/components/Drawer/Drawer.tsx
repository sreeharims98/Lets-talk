import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { DrawerProps } from "./Drawer.types";

const Drawer = ({ children }: DrawerProps) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
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
