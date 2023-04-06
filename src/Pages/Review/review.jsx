import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import ReportBug from "../../Components/reportBug";
import ContactCreator from "../../Components/contactCreator";
import { useState } from "react";
import "./review.css";

const Review = () => {
  //Changing State
  const [openMenu, setOpenMenu] = useState(false);
  const [page, setPage] = useState(true);
  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="review_one">
          <div className="review_two padding">
            <div className="review_head">
              <button
                className={`ButtonReview ${page ? "isActiveButtonReview" : ""}`}
                onClick={() => {
                  setPage(true);
                }}
              >
                Contact the creator
              </button>
              <button
                className={`ButtonReview ${page ? "" : "isActiveButtonReview"}`}
                onClick={() => {
                  setPage(false);
                }}
              >
                Report a bug
              </button>
            </div>
            <div className="review_three">
              {page ? <ContactCreator /> : <ReportBug />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
