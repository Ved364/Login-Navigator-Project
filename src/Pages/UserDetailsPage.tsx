import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContent from "../components/UserContent";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

export type UserDetails = {
  id: number;
  username: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
};

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleUserpage = () => {
    navigate(-1);
  };

  const handleFetch = useCallback(async () => {
    setLoading(true);
    try {
      const users = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(users.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <>
      <div>
        {!loading && user && (
          <div className="userBackground UserBackgroundImg">
            <div className="user-postTopBar">
              <div className="username">
                <h3>{currentUser}</h3>
              </div>
              <button
                type="button"
                className="pageButton"
                onClick={handleUserpage}
              >
                Back
              </button>
            </div>
            <UserContent user={user} />
          </div>
        )}
        {loading && <div>Loading...</div>}
        {!loading && !user && <div>Page not found</div>}
      </div>
    </>
  );
};

export default UserDetailsPage;
