export type userState = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

export type userSliceState = {
  users: userState[];
  loading: boolean;
  error: string | null;
};
