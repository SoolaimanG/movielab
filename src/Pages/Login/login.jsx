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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SelectedAll } from "../../Redux/allSlice";
import { toast, Toaster } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  //UseState for Firebase Authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingone, setLoadingone] = useState(false);
  //const [popData, setPopData] = useState([]);
  const [checkLogin, setCheckLogin] = useState(false);
  const [loggin, setLoggin] = useState(false);
  const [getName, setGetName] = useState(
    JSON.parse(localStorage.getItem("displayName")) || ""
  );

  //useSelector
  const isUserLoggedIn = useSelector(SelectedAll).condition;
  const uid = useSelector(SelectedAll).uid;

  //Google Auth Provider
  const provider = new GoogleAuthProvider();

  //Erorr State
  const [error, setError] = useState(false);

  //UseDispatch and UseNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Document Reference
  const docRef = doc(db, "users", uid);

  //  useEffect(() => {
  //    //Function to check if user already has a genres
  //    const genreExist = async () => {
  //      const docSnap = await getDoc(docRef);
  //
  //      if (docSnap.exists()) {
  //        const { genres } = docSnap.data();
  //        setPopData(genres);
  //      } else {
  //        setPopData([]);
  //      }
  //    };
  //
  //    genreExist();
  //
  //    return () => {
  //      console.log("Check Complete");
  //    };
  //  }, []);

  useEffect(() => {
    dispatch(logout());
    toast.dismiss();

    return () => {
      console.log("Logged Out");
    };
  }, []);

  //Function for Login
  const loginUser = async (e) => {
    e.preventDefault();
    const genreRef = doc(db, "users", uid);
    const genreSnap = await getDoc(genreRef);
    const SettingsRef = doc(db, "userSettings", uid);
    const settingsSnap = await getDoc(SettingsRef);
    const UserInfoRef = doc(db, "usersInfo", uid);
    const userSnap = await getDoc(UserInfoRef);
    const watchListsRef = doc(db, "watchLists", uid);
    const watchListsSnap = await getDoc(watchListsRef);
    setLoggin(true);

    //SignIn Existing User From Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { uid, email1 } = user;
        dispatch(login());
        dispatch(addUID(uid));
        toast.loading("Logging in...");
        setCheckLogin(true);

        //Setting UserWatclist
        if (watchListsSnap.exists()) {
          const { watchLists } = watchListsSnap.data();
        } else {
          setDoc(doc(db, "watchLists", uid), {
            watchLists: [],
          });
        }

        //Checking For Genre
        if (genreSnap.exists()) {
          const { genres } = genreSnap.data();
          navigate(`${genres.length > 0 ? "/home" : "/genre"}`);
        } else {
          setDoc(doc(db, "users", uid), {
            genres: [],
          });
        }

        //Send Login Email
        if (settingsSnap.exists()) {
          const { enableNotifications } = settingsSnap.data();
          enableNotifications
            ? sendPasswordResetEmail(auth, email)
                .then(() => {})
                .catch((error) => {})
            : console.log(enableNotifications);
        } else {
          setDoc(doc(db, "userSettings", uid), {
            enableNotifications: false,
          });
        }

        //Check if watchLists already exists
        if (watchListsSnap.exists()) {
          const { watchLists } = watchListsSnap.data();
        } else {
          setDoc(doc(db, "watchLists", uid), {
            watchLists: [],
          });
        }

        //Disabling Button
        setLoggin(false);
      })
      .catch((err) => {
        //dispatch(logout());
        toast.error(err.message);
        err.message === "Firebase: Error (auth/internal-error)."
          ? setError(false)
          : setError(true);

        //Disabling Button
        setLoggin(false);
      });
  };

  useEffect(() => {
    if (checkLogin) {
      const timer = setTimeout(() => {
        toast.dismiss();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [checkLogin]);

  useEffect(() => {
    if (isUserLoggedIn) {
      localStorage.setItem("userLogin", JSON.stringify(isUserLoggedIn));
      localStorage.setItem("uid", JSON.stringify(uid));
    } else {
      localStorage.setItem("userLogin", JSON.stringify(isUserLoggedIn));
    }
  }, [isUserLoggedIn]);

  //Google Authentication
  const signInWithGoogle = async () => {
    //Settings Reference
    const SettingsRef = doc(db, "userSettings", uid);
    const settingsSnap = await getDoc(SettingsRef);
    const watchListsRef = doc(db, "watchLists", uid);
    const watchListsSnap = await getDoc(watchListsRef);
    const genreRef = doc(db, "users", uid);
    const genreSnap = await getDoc(genreRef);

    //Continue with Google Authentication
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;
        dispatch(login());
        dispatch(addUID(uid));
        setLoadingone(false);

        //USERS INFOS
        const docRef = doc(db, "usersInfo", uid);
        setDoc(docRef, {
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        });

        //Enabling Notifications for each login if user toggle it on
        if (settingsSnap.exists()) {
          const { enableNotifications } = settingsSnap.data();
          enableNotifications
            ? sendPasswordResetEmail(auth, email)
                .then(() => {})
                .catch((error) => {})
            : console.log(enableNotifications);
        } else {
          setDoc(doc(db, "userSettings", uid), {
            enableNotifications: false,
          });
        }

        //Check if watchLists already exists
        if (watchListsSnap.exists()) {
          const { watchLists } = watchListsSnap.data();
        } else {
          setDoc(doc(db, "watchLists", uid), {
            watchLists: [],
          });
        }

        //Checking For Genre
        if (genreSnap.exists()) {
          const { genres } = genreSnap.data();
          navigate(`${genres.length > 0 ? "/home" : "/genre"}`);
        } else {
          setDoc(doc(db, "users", uid), {
            genres: [],
          });
        }
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
            {getName.length > 2 ? (
              <h3>Welcome Back {getName},</h3>
            ) : (
              <h3>Hello There!</h3>
            )}
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
              <div className="loaderEffect">
                <button
                  disabled={loggin}
                  className="btn-one form_btn_signin"
                  type="submit"
                >
                  Sign In
                </button>
                {loggin && <div className="spinnerLoader"></div>}
              </div>
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
