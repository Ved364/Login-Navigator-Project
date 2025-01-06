import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  username: string;
};

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostsPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [postData, setPostData] = useState<Posts[]>([]);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 3;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleCardChange = (userId: number) => {
    navigate(`/post/${userId}`);
  };

  const totalPages = Math.ceil(100 / rowsPerPage);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage}`
      )
      .then((res) => setPostData(res.data))
      .catch((err) => console.log(err));
    if (currentUser) {
      const parsedUser: User = JSON.parse(currentUser);
      setUsername(parsedUser.username);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate, currentPage]);

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3 className="fw-bold">
              Welcome {username} for the Posts Section
            </h3>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
        <div>
          <h3 className="text-center text-white">Posts</h3>
          <div className="postBackgroundImg1">
            <div className="postsCard">
              {postData.map((pData, index) => (
                <div
                  key={index}
                  onClick={() => handleCardChange(pData.id)}
                  className="postsSmallCard m-4"
                >
                  <div className="d-flex gap-5 postsSmallSubCard">
                    <h4 className="fw-bold">User Id: {pData.userId}</h4>
                    <h4>Id: {pData.id}</h4>
                  </div>
                  <div className="p-3">
                    <p>
                      <span className="fw-bold">Title:</span> {pData.title}
                    </p>
                    <p>
                      <span className="fw-bold">Body:</span> {pData.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsPage;
