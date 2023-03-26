import { userState } from "../../types/common.types";

export type UserListProps = {
  user: userState;
  isHoverable?: boolean;
  handleClick: (user: userState) => void;
  isOnline?: boolean;
};
