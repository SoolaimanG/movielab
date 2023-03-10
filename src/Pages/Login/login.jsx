import "./login.css";
import LoginImage from "../../Images/LoginImage.svg";
import Logo from "../../Components/logo";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { login, logout, addUID } from "../../Redux/allSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth, db } from "../../Logic/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { SelectedAll } from "../../Redux/allSlice";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  //UseState for Firebase Authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingone, setLoadingone] = useState(false);
  const [popData, setPopData] = useState([]);

  //useSelector
  const isUserLoggedIn = useSelector(SelectedAll).condition;
  const uid = useSelector(SelectedAll).uid;
  console.log(isUserLoggedIn);

  //Google Auth Provider
  const provider = new GoogleAuthProvider();

  //Erorr State
  const [error, setError] = useState(false);

  //UseDispatch and UseNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Document Reference
  const docRef = doc(db, "users", uid);
  console.log(uid);

  //Function to check if user already has a genres
  const genreExist = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const { genres } = docSnap.data();
      setPopData(genres);
      console.log(genres);
    } else {
      // doc.data() will be undefined in this case
      setPopData([]);
    }
  };

  useEffect(() => {
    genreExist();
    toast.dismiss();
    return () => {
      console.log("Check Complete");
    };
  }, []);

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
        dispatch(addUID(uid));
        navigate(`${popData == undefined ? "/genre" : "/home"}`);
        toast.loading("Logging in...");
      })
      .catch((err) => {
        setError(true);
        dispatch(logout());
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      localStorage.setItem("userLogin", JSON.stringify(isUserLoggedIn));
      localStorage.setItem("uid", JSON.stringify(uid));
    }
  }, [isUserLoggedIn]);

  //Google Authentication
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(login());
        navigate(`${popData ? "/home" : "/genre"}`);
        setLoadingone(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoadingone(false);
      });
  };

  return (
    <div className="login_one">
      <Toaster />
      <div className="login_two padding">
        <div className="login_three">
          <Logo />
          <div className="login_six padding">
            <h3>Welcome Back Soolaiman,</h3>
            <p>Welcome back! please enter your details.</p>
            <button
              onClick={() => {
                signInWithGoogle();
                setLoadingone(true);
              }}
              disabled={loadingone}
              className="btn-one"
            >
              <div className="spinner1">
                <div className={loadingone ? "spinner" : ""}></div>
              </div>
              <div className="google_loader">
                <FcGoogle />
                Log in with Google
              </div>
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
              <button className="btn-one form_btn_signin" type="submit">
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
