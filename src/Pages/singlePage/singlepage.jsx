import "./singlepage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";
import movieURLNIN from "../../Images/movieLab noImgURL.avif";
import { useNavigate } from "react-router-dom";

const SinglePage = () => {
  const params = useParams();

  //Opening and Closing Menu//Sroring DAta
  const [openMenu, setOpenMenu] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoaading] = useState(true);
  const [displayErr, setDisplayErr] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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

  console.log(params.id);

  //Movie Recommendations
  const movieRecommendations = async () => {
    try {
      const URL = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&page=1`;
      const response = await fetch(URL);
      const data = await response.json();
      const { results } = data;
      setRecommendations(results);
    } catch (error) {
      console.log(error.message);
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

    return () => {
      console.log("unmounting/Cleaning up");
    };
  }, [params]);

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
                    <button className="btn_watchlist">Add to Watchlist</button>
                    <div className="singlepage_three">
                      <img
                        src={item.backdrop_path == null ? movieURLNIN : img}
                        alt=""
                      />
                    </div>
                    <div className="singlepage_container">
                      <div className="singlepage_four">
                        <div className="singlepage_play_btn">
                          <BsFillPlayCircleFill />
                        </div>
                        <div className="singlepage_play_btn_mobile">
                          <button>Play Now</button>
                        </div>
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
