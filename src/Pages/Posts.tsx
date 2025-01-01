import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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

const Posts = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [postData, setPostData] = useState<Posts[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 3;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPostData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user: User = JSON.parse(currentUser);
      setUsername(user.username);
    }
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleCardChange = (userId: number) => {
    navigate(`/post/${userId}`);
  };

  const paginationData = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = postData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(postData.length / rowsPerPage);
    return { indexOfLastRow, indexOfFirstRow, currentRows, totalPages };
  }, [postData, currentPage, rowsPerPage]);

  const { currentRows, totalPages } = paginationData;

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3>{username}</h3>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/user-post")}
          >
            Back
          </button>
        </div>
        <div>
          <h3 className="text-center text-white fw-bold">Posts</h3>
          <div className="postBackgroundImg1">
            <div className="postsCard">
              {currentRows.map((pData, index) => (
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

export default Posts;
