import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { BASE_URL } from "../config";
import { SOCKET } from "../data/constants";

export const socketContext = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);

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

  return { socket, loading };
};
