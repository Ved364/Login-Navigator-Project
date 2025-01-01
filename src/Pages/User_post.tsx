import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
  username: string;
};

type UserPostLinks = {
  name: string;
  navLink: string;
};

const User_post = () => {
  const [username, setUsername] = useState<string | null>(null);
  const userPostButton: UserPostLinks[] = [
    { name: "User", navLink: "/users" },
    { name: "Post", navLink: "/posts" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user: User = JSON.parse(currentUser);
      setUsername(user.username);
    }
  }, []);

  return (
    <>
      <div className="user-postBackground">
        <div className="user-postTopBar">
          <div className="username">
            <h3>Welcome {username}</h3>
          </div>
          <button
            type="button"
            className="btn btn-primary logout-button"
            onClick={() => navigate("/")}
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

export default User_post;
