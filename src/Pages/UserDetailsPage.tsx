import axios from "axios";
import { useState, useEffect } from "react";
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
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const handleUserpage = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <div className="userBackground UserBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3>{currentUser}</h3>
          </div>
          <button type="button" className="pageButton" onClick={handleUserpage}>
            Back
          </button>
        </div>
        <UserContent user={user} loading={loading} />
      </div>
    </>
  );
};

export default UserDetailsPage;
