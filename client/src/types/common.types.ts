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

export type userMsgState = {
  _id: string;
  username: string;
  email: string;
};

export type chatState = {
  user: userMsgState;
  msg: string;
};
export type allChatsState = {
  user: userMsgState;
  msgs: chatState[];
};

export type socketMsg = {
  msg: string;
  sender: userState;
  reciever: userState;
};
