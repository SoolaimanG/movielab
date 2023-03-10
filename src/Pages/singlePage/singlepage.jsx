import "./singlepage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import { BsFillPlayCircleFill } from "react-icons/bs";

const SinglePage = () => {
  const params = useParams();

  //Opening and Closing Menu//Sroring DAta
  const [openMenu, setOpenMenu] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [genres, setGenres] = useState([]);
  //Requesting for each data from TMDB API
  const requestCall = async () => {
    const emptyArray = [];
    const URL = `https://api.themoviedb.org/3/movie/${params.id}?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`;
    const response = await fetch(URL);
    console.log(response);
    const data = await response.json();
    const { genres } = data;
    emptyArray.push(data);
    setStoreData(emptyArray);
    setGenres(genres);
  };

  console.log(genres);
  console.log(storeData);

  //Calling The API function
  useEffect(() => {
    requestCall();

    return () => {
      console.log("unmounting/Cleaning up");
    };
  }, [params]);

  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="home_five">
          <div className="singlepage_one">
            {storeData.map((item) => {
              const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
              return (
                <div key={item.id} className="singlepage_two">
                  <button className="btn_watchlist">Add to Watchlist</button>
                  <div className="singlepage_three">
                    <img src={img} alt="" />
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
                          {genres.map((item) => {
                            return <span>{item.name}</span>;
                          })}
                        </div>
                      </div>
                    </div>
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
