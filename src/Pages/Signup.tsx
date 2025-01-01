import { useNavigate } from "react-router-dom";
import SetItem from "../components/SetItem";

type User = {
  username: string;
  email: string;
  password: string;
};

type FormEvent = React.FormEvent<HTMLFormElement>;

const a: number[] = [];
for (let i = 0; i < 50; i++) {
  a.push(i);
}

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value;
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    const user: User = { username, email, password };
    SetItem(user);
    navigate("/");
  };

  return (
    <div className="loginPageBackground">
      <div className="loginContainer">
        <div className="login-box">
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="input-box">
              <input type="text" name="username" required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <input type="email" name="email" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" name="password" required />
              <label>Set Password</label>
            </div>
            <button type="submit" className="butn">
              Signup
            </button>
            <div className="signup-link">
              <a href="#" onClick={() => navigate("/")}>
                Login
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

export default Signup;
