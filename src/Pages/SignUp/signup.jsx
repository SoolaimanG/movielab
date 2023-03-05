import Logo from "../../Components/logo";
import "./signup.css";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Download from "../../Images/movieLab download.svg";
import Security from "../../Images/movieLab security.svg";
import Cinema from "../../Images/movieLab cinema.svg";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

//Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SignUp = () => {
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

  return (
    <div className="signup_one">
      <div className="signup_two padding">
        <div className="signup_three">
          <div className="signup_four">
            <Logo />
            <div className="signup_six">
              <h3>Create an account.</h3>
              <p>Let's get started by filling the form below</p>
              <form action="">
                <label htmlFor="">
                  Username
                  <input type="text" />
                </label>
                <label htmlFor="">
                  Email
                  <input type="text" />
                </label>
                <label htmlFor="">
                  Password
                  <input type="text" />
                </label>
                <button className="btn-one create-acct" type="submit">
                  Create Account
                </button>
                <button className="btn-one google-btn">
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
            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
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
