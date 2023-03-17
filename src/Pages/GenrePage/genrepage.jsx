import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../Logic/firebase";
import { SelectedAll } from "../../Redux/allSlice";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { toast, Toaster } from "react-hot-toast";
import "./genrepage.css";
import MovieLabVoid from "../../Images/movieLab Void.svg";

const GenrePage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [secLoading, setSecLoading] = useState(true);
  const uid = useSelector(SelectedAll).uid;
  const [genreData, setGenreData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [watchList, setWatchList] = useState([]);

  //DOCUMENT REFS
  const docRef = doc(db, "users", uid);

  //!React-Rounter-Dom-Tools
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getGenres = async () => {
      const docSnap = await getDoc(docRef);
      const { genres } = docSnap.data();
      genres.length > 1
        ? setLoading(false)
        : setSecLoading(true) || setLoading(false);
      console.log(genres);
      setGenreData(genres);
    };

    getGenres();
  }, []);

  //Retrieving Data
  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${params.id}&with_watch_monetization_types=flatrate`
    );
    const data = await response.json();
    const { results } = data;
    setDatas(results);
    setSecLoading(false);
  };

  console.log(datas);

  useEffect(() => {
    fetchData();

    return () => {
      console.log("Unmounted");
    };
  }, [params.id]);

  const addToWatchList = async (id) => {
    console.log(id);
    //IDENTIFING THE ITEM TO ADD
    const mapped = datas.find((movie) => {
      return movie.id == id ? { ...movie } : null;
    });

    //console.log(mapped);

    //ADDING IT TO AN ARRAY
    setWatchList((prev) => [...prev, mapped]);

    //CHECKING IF AN ITEM ARLEADY EXIST
    const docRef = doc(db, "watchLists", uid);
    const docSnap = await getDoc(docRef);
    const { watchLists } = docSnap.data();
    console.log(watchLists);

    const existAlready = watchLists.some((movie) => movie.id == id);

    if (existAlready) {
      toast.error("This movie is already in your watchlist");
    } else {
      const updatedWatchLists = [...watchLists, mapped];
      await setDoc(docRef, { watchLists: updatedWatchLists })
        .then(() => {
          toast.success("Movie added to watchlist");
        })
        .catch((error) => {
          toast.error("Error adding movie to watchlist");
        });
    }
  };

  return (
    <div className="home_three">
      <Toaster />
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
                <div className="genrepage_nav">
                  {genreData.map((genre) => {
                    return (
                      <div key={genre.id} className="genrepage_nav_one">
                        <button
                          onClick={() => {
                            navigate("/genrepage/" + genre.id);
                          }}
                          className="genrepage_nav_btn"
                        >
                          {genre.name}
                          {genre.emoji}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="genrepage_four">
                  <div className="genrepage_sec_loading">
                    {secLoading ? (
                      <div className="genrepage_void_one">
                        <div className="genrepage_void_two">
                          <img src={MovieLabVoid} alt="" />
                        </div>
                        <h2>
                          You did'nt pick any movie genre from your signup...
                        </h2>
                        <p>
                          You might be able to select genre in settings in
                          coming updates
                        </p>
                      </div>
                    ) : (
                      <div className="genrepage_five">
                        <div className="genrepage_six">
                          {datas.map((genre) => {
                            const img = `https://image.tmdb.org/t/p/w500${genre.backdrop_path}`;
                            return (
                              <div key={genre.id} className="genrepage_seven">
                                <div className="genrepage_eight">
                                  <img src={img} alt="" />
                                  <button
                                    onClick={() => {
                                      addToWatchList(genre.id);
                                    }}
                                    className="add_genre_watchList"
                                  >
                                    <GoPlus />
                                  </button>
                                  <button
                                    onClick={() => {
                                      navigate("/moviepage/" + genre.id);
                                    }}
                                    className="genrepage_watchNow"
                                  >
                                    Watch Now
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
