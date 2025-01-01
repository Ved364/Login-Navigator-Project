import User from "./Pages/Users";
import { HashRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./Pages/UserDetails";
import Posts from "./Pages/Posts";
import PostDetails from "./Pages/PostDetails";
import User_post from "./Pages/User_post";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-post" element={<User_post />} />
          <Route path="/users" element={<User />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
