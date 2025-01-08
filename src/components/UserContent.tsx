import { UserDetails } from "../Pages/UserDetailsPage";

type Props = {
  loading: boolean;
  user: UserDetails | null;
};

const UserContent = ({ loading, user }: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="background_table">
      <h3 className="tableHeading">User Id: {user.id}</h3>
      <table className="content_table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>User name</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {user.address.street}, {user.address.suite}
              {user.address.city}, {user.address.zipcode}
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>{user.website}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>
              {user.company.name}, {user.company.catchPhrase},{user.company.bs}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserContent;
