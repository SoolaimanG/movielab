import "./login.css";
import LoginImage from "../../Images/LoginImage.svg";
import Logo from "../../Components/logo";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../Redux/allSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../../Logic/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { SelectedAll } from "../../Redux/allSlice";

const Login = () => {
  //UseState for Firebase Authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //useSelector
  const isUserLoggedIn = useSelector(SelectedAll).condition;
  console.log(isUserLoggedIn);

  //Google Auth Provider
  const provider = new GoogleAuthProvider();

  //Erorr State
  const [error, setError] = useState(false);

  //UseDispatch and UseNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Function for Login
  const loginUser = (e) => {
    e.preventDefault();

    //SignIn Existing User From Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { uid, email } = user;
        console.log(uid, email);
        dispatch(login());
        navigate("/home");
      })
      .catch(() => {
        setError(true);
        dispatch(logout());
        navigate("/genre");
      });
  };

  useEffect(() => {
    if (isUserLoggedIn)
      localStorage.setItem("userLogin", JSON.stringify(isUserLoggedIn));
  }, [isUserLoggedIn]);

  //Google Authentication
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(login());
        navigate("/genre");
      })
      .catch(() => {});
  };

  return (
    <div className="login_one">
      <div className="login_two padding">
        <div className="login_three">
          <Logo />
          <div className="login_six padding">
            <h3>Welcome Back Soolaiman,</h3>
            <p>Welcome back! please enter your details.</p>
            <button onClick={signInWithGoogle} className="btn-one">
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
              <Link to={"/forgetpassword"} className="login_nine">
                Forget Password?
              </Link>
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
