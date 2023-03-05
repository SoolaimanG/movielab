import "./login.css";
import LoginImage from "../../Images/LoginImage.svg";
import Logo from "../../Components/logo";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../Logic/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  //UseState for Firebase Authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Erorr State
  const [error, setError] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();

    //SignIn Existing User From Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { uid, email } = user;
        console.log(uid, email);
      })
      .catch(() => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="login_one">
      <div className="login_two padding">
        <div className="login_three">
          <Logo />
          <div className="login_six padding">
            <h3>Welcome Back Soolaiman,</h3>
            <p>Welcome back! please enter your details.</p>
            <button className="btn-one">
              <FcGoogle />
              Log in with Google
            </button>
            <div className="login_seven">
              <div className="login_eight"></div>
              <p>Or</p>
              <div className="login_eight"></div>
            </div>
            <form onSubmit={loginUser} action="">
              <label htmlFor="email">
                Email
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={error ? "errorInput" : ""}
                  type="email"
                  name=""
                  id="email"
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name=""
                  className={error ? "errorInput" : ""}
                  id="password"
                />
              </label>
              <p className={error ? "" : "errorInput"}>Invalid Input!</p>
              <Link className="login_nine">Forget Password?</Link>
              <button className="btn-one" type="submit">
                Sign In
              </button>
            </form>
            <p className="login_ten">
              Don't have an account?{" "}
              <Link className="login-acct" to={"/signup"}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="login_four">
          <img src={LoginImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
