import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostsPage = () => {
  const [postData, setPostData] = useState<Posts[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setISLoading] = useState<boolean>(true);

  const currentUser = localStorage.getItem("email");
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = Number(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 3;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleCardChange = (userId: number) => {
    navigate(`/post/${userId}`);
  };

  const handleFetch = useCallback(async () => {
    setISLoading(true);
    try {
      const posts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage}`
      );
      setPostData(posts.data);
      const dataCount = posts.headers["x-total-count"];
      setTotalCount(dataCount);
    } catch (err) {
      console.log(err);
    } finally {
      setISLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3 className="header-heading">{currentUser}</h3>
          </div>
          <button
            type="button"
            className="pageButton"
            onClick={() => navigate("/home")}
          >
            Back
          </button>
        </div>
        <div>
          <h3 className="tableHeading">Posts</h3>
          {isLoading ? (
            <div className="tableLoading">Loading...</div>
          ) : (
            <div className="postBackgroundImg1">
              <div className="postsCard">
                {postData.map((pData, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardChange(pData.id)}
                    className="postsSmallCard"
                  >
                    <div className="postsSmallSubCard">
                      <h4 className="header-heading">
                        User Id: {pData.userId}
                      </h4>
                      <h4>Id: {pData.id}</h4>
                    </div>
                    <div className="cardpara-padding">
                      <p>
                        <span className="header-heading">Title:</span>
                        {pData.title}
                      </p>
                      <p>
                        <span className="header-heading">Body:</span>{" "}
                        {pData.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="paginationButtons">
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
