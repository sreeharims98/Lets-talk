import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { login } from "../../store/features/auth/authSlice";
import { ROUTE_PATHS } from "../../data/constants";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { formValues } from "./HomePage.types";
import { validation } from "./HomePage.validation";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>();

  const [isRegister, setIsRegister] = useState(false);

  const onSubmit = (data: formValues) => {
    console.log(data);
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

  console.log(errors.password);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between p-10 h-screen"
    >
      <div className="chat chat-end">
        <div className="chat-bubble">Hey</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble">😛</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble text-2xl font-bold">Let's talk</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble font-bold">
          {isRegister ? "Login to your account" : "Create a new account"}
        </div>
      </div>

      {/* username */}
      <div className="flex flex-col gap-2 w-full">
        <input
          className={clsx(
            "input input-bordered w-full",
            errors.username && "input-error"
          )}
          type="text"
          placeholder="Username"
          {...register("username", validation.username)}
        />
        {errors.username && (
          <span className="text-xs">{errors.username?.message}</span>
        )}
      </div>

      {/* password */}
      <div className="flex flex-col gap-2 w-full">
        <input
          className={clsx(
            "input input-bordered w-full",
            errors.password && "input-error"
          )}
          type="password"
          placeholder="Password"
          {...register("password", validation.password)}
        />
        {errors.password && (
          <span className="text-xs">{errors.password?.message}</span>
        )}
      </div>

      {/* submit button */}
      <button className="btn btn-primary" onClick={() => {}} type="submit">
        {isRegister ? "REGISTER" : "LOGIN"}
      </button>

      <div className="chat chat-start">
        {isRegister ? (
          <div className="chat-bubble" onClick={() => setIsRegister(false)}>
            Already have an account? <br /> Login here
          </div>
        ) : (
          <div className="chat-bubble" onClick={() => setIsRegister(true)}>
            Don't have an account? <br /> Register here
          </div>
        )}
      </div>
    </form>
  );
};

export default HomePage;
