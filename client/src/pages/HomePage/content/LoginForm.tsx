import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { loginData } from "../../../store/auth/auth.types";
import { login } from "../../../store/auth/authSlice";
import { formType } from "../HomePage.types";
import { validation } from "../HomePage.validation";

const LoginForm = ({ setIsRegister }: formType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const onSubmit = async (data: loginData) => {
    await dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between p-6 h-screen">
      <div className="chat chat-end">
        <div className="chat-bubble">Hey</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble">😛</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble text-2xl font-bold">Let's talk</div>
      </div>
      <div className="chat chat-start ">
        <div className={clsx("chat-bubble", error && "chat-bubble-error")}>{error ? error : "Login to your account"}</div>
      </div>
      {/* email */}
      <div className="flex flex-col gap-2 w-full">
        <input
          className={clsx("input input-bordered w-full", errors.email && "input-error")}
          type="email"
          placeholder="Email"
          {...register("email", validation.email)}
        />
        {errors.email && <span className="text-xs">{errors.email?.message}</span>}
      </div>
      {/* password */}
      <div className="flex flex-col gap-2 w-full">
        <input
          className={clsx("input input-bordered w-full", errors.password && "input-error")}
          type="password"
          placeholder="Password"
          {...register("password", validation.password)}
        />
        {errors.password && <span className="text-xs">{errors.password?.message}</span>}
      </div>
      {/* submit button */}
      <button className={clsx("btn btn-primary", loading && "loading")} type="submit" disabled={loading}>
        LOGIN
      </button>
      <div className="chat chat-start">
        <div className="chat-bubble" onClick={() => setIsRegister(true)}>
          Don't have an account? <br /> Register here
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
