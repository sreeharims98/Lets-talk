import React, { useContext, createContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { BASE_URL } from "../config";

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);

  if (socket === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    setSocket(io(BASE_URL));
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
