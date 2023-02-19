import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import Header from "../../components/Header/Header";
import UserList from "../../components/UserList/UserList";
import { ROUTE_PATHS } from "../../data/constants";

const UsersPage = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(ROUTE_PATHS.CHAT);
  };

  const handleUserHeaderClick = () => {
    navigate(-1);
  };

  const getAllUsers = () => {};

  useEffect(() => {
    getAllUsers();
  }, []);

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
          <div className="p-2 z-1 z-0 h-[calc(100vh-6rem)] overflow-y-scroll overflow-x-hidden py-2">
            <UserList
              avatar="1"
              email="user1@asd.com"
              name="user1"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />

            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
            <UserList
              avatar="2"
              email="user2@asd.com"
              name="user2"
              handleClick={handleUserClick}
            />
          </div>
        </>
      </Drawer>
    </div>
  );
};

export default UsersPage;
