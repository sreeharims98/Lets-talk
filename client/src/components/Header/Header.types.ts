import { userState } from "../../types/common.types";

export type HeaderProps = {
  hasBack: boolean;
  user: userState;
  handleUserClick: () => void;
};
