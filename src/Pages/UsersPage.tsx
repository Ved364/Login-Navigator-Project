import axios from "axios";
import { useEffect, useState } from "react";
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
  const [username, setUsername] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentUser = localStorage.getItem("currentUser");
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

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage * currentPage}`
      )
      .then((res) => {
        setData(res.data);
        const dataCount = res.headers["x-total-count"];
        setTotalCount(dataCount);
      })
      .catch((err) => console.error(err));

    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUsername(parsedUser);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate, currentPage]);

  return (
    <div className="userBackground UserBackgroundImg">
      <div className="user-postTopBar">
        <div className="username">
          <h3 className="header-heading">
            Welcome {username} for the Users Section
          </h3>
        </div>
        <button
          type="button"
          className="pageButton"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
      <div className="background_table">
        <h3 className="tableHeading">Users</h3>
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UsersPage;
