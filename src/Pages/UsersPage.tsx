import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
};

const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentUser = localStorage.getItem("email");
  const initialPage = Number(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleRowsChange = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const users = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage * currentPage}`
      );
      setData(users.data);
      const dataCount = users.headers["x-total-count"];
      setTotalCount(dataCount);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <div>
      <div className="userBackground UserBackgroundImg">
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
        <div className="background_table">
          <h3 className="tableHeading">Users</h3>
          {isLoading ? (
            <div className="tableLoading">isLoading...</div>
          ) : (
            <table className="content_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User name</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index} onClick={() => handleRowsChange(user.id)}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
