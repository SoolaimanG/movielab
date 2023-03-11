import "./singlepage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import { toast, Toaster } from "react-hot-toast";
import movieURLNIN from "../../Images/movieLab noImgURL.avif";
import { useNavigate } from "react-router-dom";
import BasicModalThree from "../../Components/modalthree";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { SelectedAll } from "../../Redux/allSlice";
import { db } from "../../Logic/firebase";
import { useSelector } from "react-redux";

const SinglePage = () => {
  const params = useParams();

  //UID
  const uid = useSelector(SelectedAll).uid;

  //Doc Reference
  const docRef = doc(db, "watchList", uid);

  //Opening and Closing Menu//Sroring DAta
  const [openMenu, setOpenMenu] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoaading] = useState(true);
  const [displayErr, setDisplayErr] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [videoID, setVideoID] = useState("");
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );
  const [test, setTest] = useState([]);

  //DESTRUCTING USE NAVIGATOR
  const navigate = useNavigate();

  //Requesting for each data from TMDB API
  const requestCall = async () => {
    try {
      const emptyArray = [];
      const URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`;
      const response = await fetch(URL);
      const data = await response.json();
      const { genres } = data;
      emptyArray.push(data);
      setStoreData(emptyArray);
      setGenres(genres);
      setLoaading(false);
    } catch (error) {
      setLoaading(false);
      toast.error("Oh no!Check your connection");
    }
  };

  //Getting Video IDS
  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`
      );
      const data = await response.json();
      const { results } = data;
      setVideoID(results[0].key);
    } catch (error) {
      toast.error("Oh no!Check your connection");
    }
  };

  //Movie Recommendations
  const movieRecommendations = async () => {
    try {
      const URL = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&page=1`;
      const response = await fetch(URL);
      const data = await response.json();
      const { results } = data;
      setRecommendations(results);
    } catch (error) {
      toast.error("Connectivity issues");
    }
  };

  //SCROLL TO TOP
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Calling The API function
  useEffect(() => {
    requestCall();
    movieRecommendations();
    getMovieVideos();

    return () => {
      console.log("unmounting/Cleaning up");
    };
  }, [params]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  });

  //INVOKING CALLS
  useEffect(() => {
    const requestCallTimer = setTimeout(() => {
      if (loading) {
        setDisplayErr(true);
        setLoaading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(requestCallTimer);
    };
  }, []);

  //Add to WatchList
  const addToWatchList = async (id) => {
    setWatchList((prev) => [...prev, ...storeData]);

    const find = watchList.find((item) => {
      return item.id === id;
    });

    if (find) {
      toast.error("Movie Already In WatchList");
    } else {
      toast.success("Added to your watchlist");
      await setDoc(docRef, {
        watchLists: watchList.map((item) => {
          return item;
        }),
      });
    }
  };

  //useEffect(() => {
  //  const selectedGenreTwo = movieGenre.find((genre) => genre.id === id);
  //  if (!selectedGenreTwo.condition) {
  //    setTest((prev) => [...prev, selectedGenreTwo]);
  //  } else {
  //    setTest((prev) =>
  //      prev.filter((genre) => genre.id !== selectedGenreTwo.id)
  //    );
  //  }
  //});

  return (
    <div className="home_three">
      <Toaster />
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="home_five">
          {loading ? (
            <div className="centerLoader singlepage_loader">
              <div className="spinnerSecond"></div>
            </div>
          ) : (
            <div className="singlepage_one">
              {storeData.map((item) => {
                const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                return (
                  <div key={item.id} className="singlepage_two">
                    <button
                      onClick={() => {
                        addToWatchList(item.id);
                      }}
                      className="btn_watchlist"
                    >
                      Add to Watchlist
                    </button>
                    <div className="singlepage_three">
                      <img
                        src={item.backdrop_path == null ? movieURLNIN : img}
                        alt=""
                      />
                    </div>
                    <div className="singlepage_container">
                      <div className="singlepage_four">
                        <BasicModalThree videoID={videoID} />
                        <div className="singlepage_content">
                          <h1>{item.title}</h1>
                          <p>{item.overview}</p>
                          <div className="singlepage_genre">
                            {genres.map((item, i) => {
                              return <span key={i}>{item.name}</span>;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="recommendation_one padding">
          {recommendations.length > 0 ? (
            <h2>More Like This 😃</h2>
          ) : (
            <h2>Sorry No Movie Recommendations For This Movie 😞</h2>
          )}
          <div className="recommendation_two">
            {recommendations.map((recommendation) => {
              const img = `https://image.tmdb.org/t/p/w500${recommendation.backdrop_path}`;
              return (
                <div
                  onClick={() => {
                    navigate("/moviepage/" + recommendation.id);
                    handleScroll();
                  }}
                  key={recommendation.id}
                  className="recommendaion_three"
                >
                  <img
                    src={
                      recommendation.backdrop_path == null ? movieURLNIN : img
                    }
                    alt=""
                  />
                  <div
                    className={
                      recommendation.title.length > 10
                        ? "recommendation_content_than_ten"
                        : "recommendation_content"
                    }
                  >
                    <h3>{recommendation.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
