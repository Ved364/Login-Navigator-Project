import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Username = {
  username: string;
};

type UserPostLinks = {
  name: string;
  navLink: string;
};

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const currentUser = localStorage.getItem("currentUser");
  const userPostButton: UserPostLinks[] = [
    { name: "Users", navLink: "/users" },
    { name: "Posts", navLink: "/posts" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const parsedUser: Username = JSON.parse(currentUser);
      setUsername(parsedUser.username);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div className="user-postBackground">
        <div className="user-postTopBar">
          <div className="username">
            <h3 className="fw-bold">Welcome {username}</h3>
          </div>
          <button
            type="button"
            className="btn btn-primary logout-button"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("currentUser");
            }}
          >
            Log out
          </button>
        </div>
        <div className="user-postFlex">
          {userPostButton.map((upbutton, i) => (
            <button
              key={i}
              type="button"
              onClick={() => navigate(upbutton.navLink)}
              className="user-postButton"
            >
              {upbutton.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;