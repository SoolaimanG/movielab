import Logo from "../../Components/logo";
import "./signup.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Logic/firebase";
import Download from "../../Images/movieLab download.svg";
import Security from "../../Images/movieLab security.svg";
import Cinema from "../../Images/movieLab cinema.svg";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/allSlice";
import { toast, Toaster } from "react-hot-toast";

//Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import BasicModal from "../../Components/modalone";

const SignUp = () => {
  //UseState for auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [acctCreated, setAcctCreated] = useState(false);

  //UseDisbatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Google Auth
  const provider = new GoogleAuthProvider();

  //Info About Movie Lab
  const signUp_info = [
    {
      id: 1,
      description: "Stream movies effortlessly with your family and friends.",
      image: Cinema,
    },
    {
      id: 2,
      description: "Save favorites and create a watchlist",
      image: Download,
    },
    {
      id: 3,
      description:
        "Your data is our number one priority,we will make sure it's safe",
      image: Security,
    },
  ];

  useEffect(() => {
    //Reggex
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const numbers = /[0-9]/;

    const testSpecial = specialCharacters.test(password);
    const testUppercase = upperCase.test(password);
    const testLowercase = lowerCase.test(password);
    const testNumber = numbers.test(password);
    const testLength = password.length >= 8;
    const testUsername = username.length > 0;

    //conditionally test
    if (
      testSpecial &&
      testUppercase &&
      testLowercase &&
      testNumber &&
      testLength &&
      testUsername
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    return () => {
      console.log("Clean-up");
    };
  }, [password, username]);

  //creating new Account
  const createAccount = (e) => {
    e.preventDefault();

    //Fnction from firebase
    if (disabled) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const { email, uid } = user;

          //settting doc
          const docRef = doc(db, "users", uid);
          setDoc(docRef, {
            displayname: username,
            email: email,
          });
          setAcctCreated(true);
          toast.success("Account Created");
          setEmailActive(false);
        })
        .catch((error) => {
          setEmailActive(
            error.message === "Firebase: Error (auth/email-already-in-use)."
          );
          toast.error(error.message);
        });

      return;
    }
  };

  //Signin or Login with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(login());
        navigate("/genre");
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      })
      .catch(() => {
        toast.error("Check your connection");
        toast.dismiss();
      });
  };

  return (
    <div className="signup_one">
      <Toaster />
      <div className="signup_two padding">
        <div className="signup_three">
          <div className="signup_four">
            <Logo />
            <div className="signup_six">
              <div className="info_about_password">
                <BasicModal />
              </div>
              <h3>Create an account.</h3>
              <p>Let's get started by filling the form below</p>
              <form onSubmit={createAccount} action="">
                <label htmlFor="">
                  Username
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </label>
                <label htmlFor="">
                  Email
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </label>
                <label htmlFor="">
                  Password
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                  />
                </label>
                <span className="emailActive">
                  {emailActive && "Seems you have an account already."}
                </span>
                <span className="acctCreated">
                  {acctCreated && "Proceed to login"}
                </span>
                <button
                  disabled={!disabled}
                  className="btn-one create-acct"
                  type="submit"
                >
                  Create Account
                </button>
                <button
                  onClick={() => {
                    signInWithGoogle();
                    toast.loading("Creating Account...");
                  }}
                  type="button"
                  className="btn-one google-btn"
                >
                  <FcGoogle />
                  Log in with Google
                </button>
              </form>
              <p className="exist-acct">
                Already have an account?
                <Link to={"/"} className="login-acct">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div className="signup_five">
            <BasicModal />
            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="signup_seven"
            >
              {signUp_info.map((info) => {
                return (
                  <SwiperSlide key={info.id} className="signup_eight">
                    <img src={info.image} alt="" />
                    <h3>{info.description}</h3>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
