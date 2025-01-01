import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetItem from "../components/GetItem";

type FormEvent = React.FormEvent<HTMLFormElement>;

type User = {
  email: string;
  password: string;
};

const a: number[] = [];
for (let i = 0; i < 50; i++) {
  a.push(i);
}

const Login = () => {
  const [, setLogin] = useState<boolean>(false);
  const [, setData] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(GetItem());
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    if (email && password) {
      const users = GetItem();
      for (const val of users) {
        if (val.email.includes(email)) {
          setLogin(true);
          if (val.email === email && val.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(val));
            navigate("/user-post");
          } else if (val.email !== email) {
            alert(`${email} does not exist`);
          } else {
            alert("Password is incorrect");
          }
          return;
        }
      }
      alert("User doesnot exist. Please Signup.");
    }
  };

  return (
    <div className="loginPageBackground">
      <div className="loginContainer">
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
            <div className="forgot-pass">
              <a href="#">Forgot your password</a>
            </div>
            <button type="submit" className="butn">
              Login
            </button>
            <div className="signup-link">
              <a href="#" onClick={() => navigate("/signup")}>
                Signup
              </a>
            </div>
          </form>
        </div>
        {a.map((j, i) => (
          <span key={i} style={{ "--i": j } as React.CSSProperties}></span>
        ))}
      </div>
    </div>
  );
};

export default Login;
