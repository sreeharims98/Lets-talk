export interface AuthSliceState {
  user: userState | null;
}
export interface userState {
  uid: string;
  name: string;
  email: string;
  image: string;
}
