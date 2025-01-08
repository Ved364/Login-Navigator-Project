import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import UsersPage from "./Pages/UsersPage";
import UserDetailsPage from "./Pages/UserDetailsPage";
import PostsPage from "./Pages/PostsPage";
import PostDetailsPage from "./Pages/PostDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
