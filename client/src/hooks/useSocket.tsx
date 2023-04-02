// import { useState, useEffect, useRef } from "react";
// import io, { Socket } from "socket.io-client";
// import { BASE_URL } from "../config";
// import { SOCKET } from "../data/constants";

// export const socketContext = () => {
//   const socketConnectRef = useRef(false);

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [loading, setLoading] = useState(true);

//   let skt: Socket;

//   useEffect(() => {
//     //used ref to eliminate 2 times calling of useeffect
//     if (socketConnectRef.current) return;
//     socketConnectRef.current = true;

//     if (!skt) {
//       skt = io(BASE_URL);
//       setSocket(skt);
//       setLoading(false);
//     }
//     // return () => {
//     //   console.log("SOCKET OFF");
//     //   skt.off(SOCKET.CONNECT);
//     //   skt.off(SOCKET.DISCONNECT);
//     // };
//   }, []);

//   return { socket, loading };
// };
