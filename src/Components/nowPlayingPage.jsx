import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import movieURLNIN from "../Images/movieLab noImgURL.avif";

const NowPlayingPage = () => {
  const params = useParams();
  console.log(params);

  const [dataLists, setDataLists] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  //Request data from API
  const fetchData = async () => {
    const emptyArray = [];
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US`
      );
      const data = await response.json();
      emptyArray.push(data);
      setDataLists(emptyArray);
    } catch (err) {}
  };

  //Invoking Call
  useEffect(() => {
    fetchData();
  }, [params]);
  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="nowplaing_one">
          <div className="nowplaying_two">
            {dataLists?.map((item) => {
              const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
              return (
                <div key={item.id} className="nowplaying_three">
                  <img
                    src={item.backdrop_path == null ? movieURLNIN : img}
                    alt={item.backdrop_path}
                  />
                  <div className="nowplaying_container">
                    <div className="nowplaying_four">
                      <h2>{item.title}</h2>
                      <p>{item.overview}</p>
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

export default NowPlayingPage;
