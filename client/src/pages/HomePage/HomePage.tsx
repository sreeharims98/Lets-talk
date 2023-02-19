import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { login } from "../../store/features/auth/authSlice";
import { ROUTE_PATHS } from "../../data/constants";

const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({
        uid: "",
        name: "",
        email: "",
        image: "",
      })
    );
    navigate(ROUTE_PATHS.USERS);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="chat chat-start">
        <div className="chat-bubble ">Hey</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">😛</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble w-60 text-center text-2xl font-bold">
          Let's talk
        </div>
      </div>
      <div className="chat chat-end">
        <div
          className="chat-bubble chat-bubble-primary w-60 text-center font-bold cursor-pointer hover:bg-primary-focus"
          onClick={handleLogin}
        >
          LOG IN
        </div>
      </div>
    </div>
  );
};

export default HomePage;
