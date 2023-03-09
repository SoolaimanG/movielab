import { RiSearchLine } from "react-icons/ri";
import { BsFillBellFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import NavbarPic from "../Images/movieLab Navbar Pic.jpg";
import { useEffect, useState } from "react";

const Navbar = ({ setOpenMenu }) => {
  //State for scroll
  const [scroll, setScroll] = useState(false);
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

    console.log(scroll);

    window.addEventListener("scroll", handlePageScroll);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  });

  return (
    <div className={scroll ? "navbar_new_style" : "navbar_one"}>
      <div className="navbar_two padding">
        <div className="navbar_three">
          <form className="navbar_form" action="">
            <button type="submit">
              <RiSearchLine />
            </button>
            <input type="text" placeholder="Search" />
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
            <button className="navbar_five navbar_bell" type="button">
              <BsFillBellFill />
              <div className="bell_notification"></div>
            </button>
            <button className="navbar_five navbar_profile" type="button">
              <img src={NavbarPic} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
