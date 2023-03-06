import Logo from "../../Components/logo";
import "./forgetpassword.css";
import { Link } from "react-router-dom";
import ForgotPasswordImg from "../../Images/movieLab forgetpassword.svg";
import { useEffect, useState } from "react";
import { auth, db } from "../../Logic/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const ForgetPassword = () => {
  //Timer and Condition
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(false);

  //Usestate for email
  const [email, setEmail] = useState("");

  //Send Reset Password Email
  const sendResetPasswordEmail = (e) => {
    e.preventDefault();

    if (email) {
      //Logic for sending reset password email
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Notifying the user!
          toast.success("Password reset email sent!");
          setDisabled(true);
        })
        .catch(() => {
          toast.error("Oh no! this didnt go well");
          // ..
        });

      return;
    } else {
      toast("Did you put your email?!", {
        icon: "❗",
      });
    }
  };

  //Side Rendering For Timer
  useEffect(() => {
    if (disabled) {
      const timeInterval = setInterval(
        () => setTimer((prev) => prev - 1),
        1000
      );

      return () => clearInterval(timeInterval);
    }
  }, [disabled, timer]);

  //Side Rendering For Resetting Timer
  useEffect(() => {
    if (timer === 0) {
      setTimer(30);
      setDisabled(false);
    }

    return () => {
      console.log("unmounting timer");
    };
  }, [timer]);

  console.log(timer);
  return (
    <div className="forgetpassword_one">
      <Toaster />
      <div className="forgetpassword_two padding">
        <div className="forgetpassword_three">
          <Logo />
          <div className="forgetpassword_four">
            <h3>Forgot password!</h3>
            <p>So you forgot your password uh?no worries!we gat you.</p>
            <form onSubmit={sendResetPasswordEmail} action="">
              <label htmlFor="email">
                Email
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email"
                />
              </label>
              <button disabled={disabled} type="submit">
                Submit Email
              </button>
            </form>
            <Link to={"/"} className="bck_to_login">
              Back to login
            </Link>
          </div>
        </div>
        <div className="forgetpassword_five">
          <img src={ForgotPasswordImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
