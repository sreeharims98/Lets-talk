export type userState = {
  _id: string;
  username: string;
  email: string;
  token: string;
};
export type userSocketState = {
  sid: string;
  _id: string;
  username: string;
  email: string;
};

export type chatState = {
  user: userState;
  msg: string;
};
export type allChatsState = chatState[];
