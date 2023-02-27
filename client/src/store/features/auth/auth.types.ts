export type userState = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export type AuthSliceState = {
  user: userState | null;
  loading: boolean;
  error: string | null;
};

export type loginData = {
  username: string;
  email: string;
  password: string;
};
