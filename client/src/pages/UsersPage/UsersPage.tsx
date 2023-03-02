import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import Spinner from "../../components/Spinner/Spinner";
import UserList from "../../components/UserList/UserList";
import { ROUTE_PATHS } from "../../data/constants";
import { AppDispatch, RootState } from "../../store";
import { getAllUsers } from "../../store/users/usersSlice";

const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { users, error, loading } = useSelector((state: RootState) => state.users);

  const handleUserClick = () => {
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAllUsers(""));
  }, []);

  let content;
  if (loading) {
    content = <Spinner isFull={false} />;
  } else if (error) {
    content = <Alert msg={error} type="error" />;
  } else if (users.length) {
    content = users.map((u) => (
      <UserList key={u.email} avatar={u.username[0]} email={u.email} name={u.username} handleClick={handleUserClick} />
    ));
  }

  return (
    <div className="">
      <Drawer>
        <>
          <Header
            hasBack={false}
            name={"Sreehari M S"}
            email={"iamsreeharims"}
            avatar={"S"}
            handleUserClick={handleUserHeaderClick}
          />
          <div className="p-2 z-1 z-0 h-[calc(100vh-6rem)] overflow-y-scroll overflow-x-hidden py-2">{content}</div>
        </>
      </Drawer>
    </div>
  );
};

export default UsersPage;
