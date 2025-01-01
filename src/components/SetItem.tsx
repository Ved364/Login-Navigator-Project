import getUser from "./GetItem";

type User = {
  username: string;
  email: string;
  password: string;
};

const SetItem = (user: User): void => {
  const localUsers = getUser();
  localUsers.push(user);
  localStorage.setItem("user", JSON.stringify(localUsers));
};

export default SetItem;
