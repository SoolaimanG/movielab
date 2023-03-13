import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./home.css";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer";

const Home = () => {
  //State For Loading
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [storeTrend, setStoreTrend] = useState([]);
  const [tvshow, setTvShow] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  //Navigation Actions
  const navigate = useNavigate();

  //API FUNCTIONS
  const fetchData = async () => {
    const emptyArray = [];
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=8d876fa3a55e224dfafe5aa02f1d97da"
    );
    const data = await response.json();
    const { results } = data;
    for (let i = 0; i <= 5; i++) {
      emptyArray.push(results[i]);
    }
    setStoreTrend(emptyArray);
  };

  const fetchDataTv = async () => {
    const URL = `https://api.themoviedb.org/3/tv/popular?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&page=1`;
    const reponse = await fetch(URL);
    const data = await reponse.json();
    const { results } = data;
    setTvShow(results);
  };

  const nowPlayingREQ = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&page=10`
    );
    const data = await response.json();
    const { results } = data;
    setNowPlaying(results);
    console.log(results);
  };

  //APIs Calls Here
  useEffect(() => {
    fetchData();
    fetchDataTv();
    nowPlayingREQ();

    return () => {
      console.log("unmounting//Cleanup");
    };
  }, []);

  //Synchronous Loading to allow everything to settle
  useEffect(() => {
    const LoadingTimers = [1000, 1100, 1200, 1300, 1400];
    const randomSelectTimer = Math.floor(Math.random() * LoadingTimers.length);
    const timer = setTimeout(() => {
      setLoading(false);
    }, LoadingTimers[randomSelectTimer]);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="home_one">
      <div className="home_two">
        {loading ? (
          <div className="centerLoader">
            <div className="spinnerSecond"></div>
          </div>
        ) : (
          //SIdeBar And NavBar Component
          <div className="home_three">
            <Sidebar openMenu={openMenu} />
            <div className="home_four">
              <Navbar setOpenMenu={setOpenMenu} />
              {/* Home Starts Here */}
              <div className="home_five">
                <div className="home_six padding">
                  <div className="home_seven">
                    <h2>Top Movies</h2>
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={20}
                      slidesPerView={1.5}
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                      className="home_eight"
                    >
                      {storeTrend?.map((item) => {
                        const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                        return (
                          <SwiperSlide
                            onClick={() => {
                              navigate(`/moviepage/${item.id}`);
                            }}
                            key={item.id}
                            className="home_nine"
                          >
                            <img src={img} alt="" crossOrigin="false" />
                            <div className="container_gradient">
                              <h3
                                className={
                                  item.title.length > 9
                                    ? "title_morethan_9"
                                    : "container_gradient_h3"
                                }
                              >
                                {item.title}
                              </h3>
                              <p>
                                {item.adult
                                  ? "Parental Guidance is adviced"
                                  : "PG 13"}
                              </p>
                              <button className="home_container_btn">
                                Watch Now
                              </button>
                            </div>
                            {/*<div className="home_ten"></div>*/}
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                  <div className="home_ten">
                    <div className="home_eleven">
                      <h2>TV SHOWS</h2>
                      <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={50}
                        slidesPerView={2.6}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
                        className="home_eight"
                      >
                        {tvshow.map((item) => {
                          const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                          return (
                            <SwiperSlide
                              key={item.id}
                              className="home_thirteen"
                              onClick={() => {
                                navigate("/tvpopular/" + item.id);
                              }}
                            >
                              <img src={img} alt="" />
                              <div className="container_gradient">
                                <h3
                                  className={
                                    item.name.length > 9
                                      ? "name_morethan_9_two"
                                      : "container_gradient_h3"
                                  }
                                >
                                  {item.name}
                                </h3>
                                <p>
                                  {item.adult
                                    ? "Parental Guidance is adviced"
                                    : "PG 13"}
                                </p>
                                <button className="home_container_btn">
                                  Watch Now
                                </button>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                  <div className="home_fourteen">
                    <h2>Now Playing...</h2>
                    <div className="home_fifteen">
                      {nowPlaying.map((item) => {
                        const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                        return (
                          <div key={item.id} className="home_sixteen">
                            <div className="home_seventeen">
                              <img
                                onClick={() => {
                                  navigate("/nowplaying/" + item.id);
                                }}
                                src={img}
                                alt=""
                              />
                              <p>{item.original_title}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
