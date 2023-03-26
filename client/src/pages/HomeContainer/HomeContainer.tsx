import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../config";
import { ROUTE_PATHS, SOCKET } from "../../data/constants";
import { AppDispatch, RootState } from "../../store";
import { setOnlineUsers } from "../../store/users/usersSlice";
import { userSocketState } from "../../types/common.types";
// import useOnlineSocket from "../../hooks/useOnlineSocket";

type ContextType = {
  socket: Socket | null;
};

export const HomeContainer = () => {
  // const { loading, socketDisconnect, socket } = useOnlineSocket();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.common);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  // const [isConnected, setIsConnected] = useState(false);
  let skt: Socket;

  useEffect(() => {
    if (!skt) {
      skt = io(BASE_URL);
      setSocket(skt);
      setLoading(false);
    }
    return () => {
      if (skt) {
        console.log("SOCKET OFF");
        skt.off(SOCKET.CONNECT);
        skt.off(SOCKET.DISCONNECT);
      }
    };
  }, []);

  if (loading) return <Spinner isFull={false} />;
  else if (error) return <Alert msg={error} type="error" />;
  else if (!user) return <Navigate to={ROUTE_PATHS.AUTH} />;
  return (
    <div>
      <Outlet context={{ socket }} />
    </div>
  );
};

export function useSocket() {
  return useOutletContext<ContextType>();
}
