import { RiSearchLine } from "react-icons/ri";
import { BsFillBellFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import NavbarPic from "../Images/movieLab Navbar Pic.jpg";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { SelectedAll } from "../Redux/allSlice";
import { db } from "../Logic/firebase";
import iconNotification from "../Images/icons8-notification.png";
import { motion } from "framer-motion";

const Navbar = ({ setOpenMenu }) => {
  //State for scroll
  const [scroll, setScroll] = useState(false);
  const [input, setInput] = useState("");
  const uid = useSelector(SelectedAll).uid;
  const [photoURL, setPhotoURL] = useState("");
  const [showNotfications, setShowNotfications] = useState(false);

  //RETRIEVING GOOGLE-IMAGE
  useEffect(() => {
    const getDataFromFireBase = async () => {
      const docRef = doc(db, "usersInfo", uid);
      const docSnap = await getDoc(docRef);

      const { displayName, photoURL, email } = docSnap.data();
      setPhotoURL(photoURL);
    };

    getDataFromFireBase();
  }, []);

  //USENAVIGATE
  const navigate = useNavigate();
  //Changing the style of the navbar if the scroll is greater than 10px
  useEffect(() => {
    const handlePageScroll = () => {
      const windowScrollTop = window.pageYOffset;
      if (windowScrollTop > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handlePageScroll);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  });

  const query = (e) => {
    e.preventDefault();
    if (input.length < 2) {
      toast("Come on!You Can't Seacrh Like This", {
        icon: "🌚",
      });
    } else {
      navigate("/query/" + input);
    }
  };

  return (
    <div className={scroll ? "navbar_new_style" : "navbar_one"}>
      <Toaster />
      <div className="navbar_two padding">
        <div className="navbar_three">
          <form onSubmit={query} className="navbar_form" action="">
            <button type="submit">
              <RiSearchLine />
            </button>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              placeholder="Search"
            />
          </form>
          <div className="navbar_four">
            <button
              onClick={() => {
                setOpenMenu((prev) => !prev);
              }}
              className="navbar_five navbar_menu"
              type="button"
            >
              <CgMenuGridR />
            </button>
            <div className="bell_notifications">
              <button
                onClick={() => {
                  setShowNotfications((prev) => !prev);
                }}
                className="navbar_five navbar_bell"
                type="button"
              >
                <BsFillBellFill />
                <div className="bell_notification"></div>
              </button>
              {showNotfications && (
                <motion.div className="new_notification" animate={{ x: 100 }}>
                  <div className="notification_image">
                    <img src={iconNotification} alt="" />
                  </div>
                  <h3>Notifications</h3>
                  <p>We will let you know when we get news for you.</p>
                </motion.div>
              )}
            </div>
            <button className="navbar_five navbar_profile" type="button">
              <img
                src={photoURL !== "" ? photoURL : NavbarPic}
                alt="profileImage"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
