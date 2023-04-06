import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./query.css";
import { useParams, useNavigate } from "react-router-dom";
import movieLabNotFound from "../../Images/movieLab notFound.svg";

const Query = () => {
  const [loading, setLoading] = useState(true);
  const [queryResult, setQueryResult] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getMultiSearch = async () => {
    try {
      const response = await fetch(`
   https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_APIKEY}&language=en-US&query=${params.type}&page=1&include_adult=false`);

      const data = await response.json();
      const { results } = data;
      setQueryResult(results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(queryResult);
  useEffect(() => {
    getMultiSearch();

    return () => {
      console.log("Clean Up");
    };
  }, [params]);

  return (
    <div className="query_one">
      <div className="home_three">
        <Sidebar />
        <div className="home_four">
          <Navbar />
          <div className="query_two">
            {loading ? (
              <div className="centerLoader queryLoader">
                <div className="spinnerSecond"></div>
              </div>
            ) : (
              <div className="query_three padding">
                <h2 className={queryResult.length == 0 ? "queryErrH2" : ""}>
                  {queryResult.length > 0
                    ? "Here are your search results"
                    : "Search Did Not Match Our DataBase"}
                </h2>
                <div className="query_four">
                  {!queryResult.length ? (
                    <div className="queryErr">
                      <img src={movieLabNotFound} alt="" />
                    </div>
                  ) : (
                    queryResult.map((item) => {
                      const img = `${
                        item.backdrop_path == null
                          ? "https://images.unsplash.com/photo-1517076731070-13c65bcb2e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGhhbmslMjB5b3V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                          : "https://image.tmdb.org/t/p/w500" +
                            item.backdrop_path
                      }`;
                      return (
                        <div
                          onClick={() => {
                            navigate("/moviepage/" + item.id);
                          }}
                          key={item.id}
                          className="query_four"
                        >
                          <img src={img} alt="" />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
