import { Socket } from "socket.io-client";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  socket: Socket | null;
};

export function useSocket() {
  return useOutletContext<ContextType>();
}
