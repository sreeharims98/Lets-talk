import { userState } from "../../store/auth/auth.types";

export type UserListProps = {
  user: userState;
  isHoverable?: boolean;
  handleClick: (user: userState) => void;
};
