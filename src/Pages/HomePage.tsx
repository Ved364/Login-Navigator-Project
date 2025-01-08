import { useNavigate } from "react-router-dom";

type UserPostLinks = {
  name: string;
  navLink: string;
};

const HomePage = () => {
  const currentUser = localStorage.getItem("currentUser");
  const userPostButton: UserPostLinks[] = [
    { name: "Users", navLink: "/users" },
    { name: "Posts", navLink: "/posts" },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="user-postBackground">
        <div className="user-postTopBar">
          <div className="username">
            <h3 className="header-heading">{currentUser}</h3>
          </div>
          <button
            type="button"
            className="logout-button"
            onClick={() => {
              navigate("/login");
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
