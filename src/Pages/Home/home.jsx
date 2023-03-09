import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./home.css";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Home = () => {
  //State For Loading
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [storeTrend, setStoreTrend] = useState([]);

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

  console.log(storeTrend);

  //APIs Calls Here
  useEffect(() => {
    fetchData();

    return () => {
      console.log("unmounting//Cleanup");
    };
  }, []);

  //Synchronous Loading to allow everything to settle
  useEffect(() => {
    const LoadingTimers = [2000, 3000, 4000, 5500, 6000];
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
                      spaceBetween={30}
                      slidesPerView={3}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                      className="home_eight"
                    >
                      {storeTrend?.map((item) => {
                        const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                        console.log(img);
                        return (
                          <SwiperSlide key={item.id} className="home_nine">
                            <img src={img} alt="" crossOrigin="false" />
                            <div className="container_gradient">
                              <h3>{item.title}</h3>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
