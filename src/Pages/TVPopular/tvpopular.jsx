import { useEffect, useState } from "react";
import "./tvpopular.css";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Tvpopular = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [img, setImg] = useState("");
  //Request API Call
  const requestCall = async () => {
    const emptyArray = [];
    try {
      const response = await fetch(`
      https://api.themoviedb.org/3/tv/${params.id}?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`);
      const data = await response.json();
      emptyArray.push(data);
      setData(emptyArray);
      setLoading(false);
      console.log(emptyArray);
    } catch (err) {
      console.log(err);
    }
  };

  const episodesGroup = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${params.id}/season/1?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`
      );
      const data = await response.json();
      const { episodes } = data;
      console.log(episodes);
      setEpisodes(episodes);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(episodes);

  useEffect(() => {
    requestCall();
    episodesGroup();
    setImg(
      data.map((imgURL) => {
        return `https://image.tmdb.org/t/p/w500${imgURL.backdrop_path}`;
      })
    );

    return () => {
      console.log("Call finished");
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home_three">
      <Toaster />
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="tvpopular_one">
          <div className="tvpopular_two">
            {loading ? (
              <div className="centerLoader tvpopularLoader">
                <div className="spinnerSecond"></div>
              </div>
            ) : (
              <div className="tvpopular_three">
                {data.map((item) => {
                  const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                  const seasons = item.seasons;
                  const { genres } = item;
                  return (
                    <div key={item.id} className="tvpopular_four">
                      <div className="tvpopular_five">
                        <img src={img} alt="" />
                        <div className="tvpopular_container">
                          <div className="tvpopular_six">
                            <h1>{item.name}</h1>
                            <h3>{seasons[0].name}</h3>
                            <div className="genre_four tvpopular_seven">
                              {genres.map((genre) => {
                                return <span key={genre.id}>{genre.name}</span>;
                              })}
                            </div>
                            <div className="tvpopular_btn">
                              <button
                                onClick={() => {
                                  toast.error(
                                    "Cannot Play Series Because Of Limited API Request(You Can Support Me)"
                                  );
                                }}
                                className="tvpopular_play"
                              >
                                Play
                              </button>
                              <button className="tvpopular_add">
                                Add to watchlist
                              </button>
                            </div>
                            <div className="tvpopular_overview">
                              <p>{item.overview}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tvpopular_eight padding">
                        <h2>ALL EPISODES</h2>
                        <div className="tvpopular_nine">
                          {episodes.map((episode) => {
                            return (
                              <div
                                onClick={() => {
                                  navigate("/tvpopular/" + episode.id);
                                  handleScroll();
                                }}
                                key={episode.id}
                                className="tvpopular_ten"
                              >
                                <img src={img} alt="" />
                                <h3>{episode.name}</h3>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tvpopular;
