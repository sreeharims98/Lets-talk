export type userState = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

export type AuthSliceState = {
  user: userState | null;
  loading: boolean;
  error: string | null;
};

export type loginData = {
  email: string;
  password: string;
};
export type registerData = {
  username: string;
  email: string;
  password: string;
};
