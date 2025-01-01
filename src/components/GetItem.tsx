type User = {
  username: string;
  email: string;
  password: string;
};
const GetItem = (): User[] => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : [];
};

export default GetItem;
