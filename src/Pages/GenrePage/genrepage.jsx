import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Logic/firebase";
import { SelectedAll } from "../../Redux/allSlice";
import { useSelector } from "react-redux";
import "./genrepage.css";
import GenreNav from "../../Components/genreNav";

const GenrePage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const uid = useSelector(SelectedAll).uid;
  const [genreData, setGenreData] = useState([]);

  //DOCUMENT REFS
  const docRef = doc(db, "users", uid);

  useEffect(() => {
    const getGenres = async () => {
      const docSnap = await getDoc(docRef);
      const { genres } = docSnap.data();
      genres.length > 1 ? setLoading(false) : setLoading(false);
      console.log(genres);
      setGenreData(genres);
    };

    getGenres();
  }, []);

  console.log(genreData);

  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="genrepage_one">
          <div className="genrepage_two padding">
            {loading ? (
              <div className="centerLoader genrepage_loading">
                <div className="spinnerSecond"></div>
              </div>
            ) : (
              <div className="genrepage_three">
                <GenreNav genreData={genreData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
