import { useEffect, useState } from "react";
import "./tvpopular.css";
import Sidebar from "../../Components/sidebar";
import Navbar from "../../Components/navbar";
import { useParams } from "react-router-dom";

const Tvpopular = () => {
  const params = useParams();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  useEffect(() => {
    requestCall();

    return () => {
      console.log("Call finished");
    };
  }, []);
  return (
    <div className="home_three">
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
                  console.log(genres);
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
                                return <span>{genre.name}</span>;
                              })}
                            </div>
                            <div className="tvpopular_btn">
                              <button className="tvpopular_play">Play</button>
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
