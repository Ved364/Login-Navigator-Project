import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type Username = {
  username: string;
};

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
};

const Users = () => {
  const [data, setData] = useState<User[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleRowsChange = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const paginationUser = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);
    return { indexOfLastRow, indexOfFirstRow, currentRows, totalPages };
  }, [data, currentPage, rowsPerPage]);

  const { currentRows, totalPages } = paginationUser;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user: Username = JSON.parse(currentUser);
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="userBackground UserBackgroundImg">
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
      <div className="background_table mt-3 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center text-white">Users</h3>
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
            {currentRows.map((user, index) => (
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

export default Users;
