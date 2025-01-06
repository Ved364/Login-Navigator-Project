import axios from "axios";
import { useEffect, useState } from "react";
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

const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const currentUser = localStorage.getItem("currentUser");
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

  const totalPages = Math.ceil(10 / rowsPerPage);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/users?_start=${
          rowsPerPage * (currentPage - 1)
        }&_limit=${rowsPerPage * currentPage}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
    if (currentUser) {
      const parsedUser: Username = JSON.parse(currentUser);
      setUsername(parsedUser.username);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate, currentPage]);

  return (
    <div className="userBackground UserBackgroundImg">
      <div className="user-postTopBar">
        <div className="username">
          <h3 className="fw-bold">Welcome {username} for the Users Section</h3>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
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
