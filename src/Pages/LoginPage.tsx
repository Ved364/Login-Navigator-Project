import { useNavigate } from "react-router-dom";

type FormEvent = React.FormEvent<HTMLFormElement>;

const LoginPage = () => {
  const localEmail = localStorage.getItem("Email");
  const localPassword = localStorage.getItem("Password");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    if (email && password) {
      if (email === localEmail && password === localPassword) {
        localStorage.setItem("currentUser", JSON.stringify(email));
        navigate("/");
      } else if (email !== localEmail) {
        alert("Please enter a valid email.");
      } else {
        alert("Incorrect password.");
      }
    }
  };

  return (
    <div className="loginPageBackground">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="butn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
