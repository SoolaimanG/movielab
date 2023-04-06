import Logo from "../Components/logo";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillStar, AiFillSetting } from "react-icons/ai";
import { MdOutlineTimer, MdOutlineReviews } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiDonateHeart } from "react-icons/bi";
import { RxExit } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/allSlice";
import { toast, Toaster } from "react-hot-toast";

const Sidebar = ({ openMenu }) => {
  //UseDIspatch
  const dispatch = useDispatch();
  //SignOut
  const signOut = () => {
    toast.loading("Logging Out");
    setTimeout(() => {
      dispatch(logout());
    }, 3000);
  };

  return (
    <div className={openMenu ? "sidebar_open" : "sidebar_one"}>
      <Toaster />
      <div className="sidebar_two padding">
        <div className="sidebar_logo">
          <Logo />
        </div>
        <div className="sidebar_three">
          <h3>Menu</h3>
          <ul className="sidebar_ul">
            <li>
              <NavLink to={"/home"} className="active_style">
                <AiFillHome />
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/comingsoon"} className="active_style">
                <MdOutlineTimer />
                <p>Coming Soon</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/watchlist"} className="active_style">
                <BsFillBookmarkFill />
                <p>WatchList</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/genrepage/:id"} className="active_style">
                <AiFillStar />
                <p>Genre</p>
              </NavLink>
            </li>
          </ul>
          <div className="sidebar_four">
            <h3>Manage</h3>
            <ul className="sidebar_ul">
              <li>
                <NavLink to={"/settings"} className="active_style">
                  <AiFillSetting />
                  <p>Settings</p>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/review"} className="active_style">
                  <MdOutlineReviews />
                  <p>Reviews</p>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/support"} className="active_style">
                  <BiDonateHeart />
                  <p>Support</p>
                </NavLink>
              </li>
              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={signOut}
                  to={"/support"}
                  className="active_style"
                >
                  <RxExit />
                  <p>LogOut</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
