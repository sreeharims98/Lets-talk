import { userState } from "../../store/auth/auth.types";

export type HeaderProps = {
  hasBack: boolean;
  user: userState;
  handleUserClick: () => void;
};
