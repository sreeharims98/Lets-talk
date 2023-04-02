import { Socket } from "socket.io-client";

export type DrawerProps = {
  socket?: Socket | null;
  children: JSX.Element;
};
