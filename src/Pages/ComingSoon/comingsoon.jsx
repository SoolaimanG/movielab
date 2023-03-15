import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import "./comingsoon.css";
import { toast, Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { RiParentFill } from "react-icons/ri";
import { IoCheckmarkSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

const ComingSoon = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState(true);

  const date = new Date();
  const year = date.getFullYear();

  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=8d876fa3a55e224dfafe5aa02f1d97da&language=en-US&page=1`
    );
    const data = await response.json();
    const { results } = data;
    setDatas(results);
    setLoading(false);
  };

  console.log(datas);

  //Invoking Call
  useEffect(() => {
    getUpcoming();

    return () => {
      console.log("unmounting");
    };
  }, []);

  //Handle Remind
  const remindBtn = (id) => {
    setDatas(
      datas.map((data) => {
        return data.id === id ? { ...data, video: !data.video } : data;
      })
    );
  };
  return (
    <div className="home_three">
      <Toaster />
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="comingsoon_one">
          <div className="comingsoon_two">
            {loading ? (
              <div className="centerLoader comingsoon_loader">
                <div className="spinnerSecond"></div>
              </div>
            ) : (
              <div className="comingsoon_three">
                <div className="comingsoon_four padding">
                  {datas.map((data) => {
                    const img = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
                    return (
                      <div className="comingsoon_five">
                        <div className="comingsoon_six">
                          <img src={img} alt="" />
                          <div className="comingsoon_seven">
                            <h2>{data.original_title}</h2>
                            <p>Year:{year}</p>
                            <h4>Realease On {data.release_date}</h4>
                            <div className="comingsoon_eight">
                              <div className="comingsoon_nine">
                                <div className="comingsoon_svg">
                                  <RiParentFill />
                                </div>
                                <button
                                  onClick={() => {
                                    remindBtn(data.id);
                                  }}
                                  className="comingsoon_cta"
                                >
                                  {data.video ? (
                                    <IoCheckmarkSharp />
                                  ) : (
                                    <AiOutlinePlus />
                                  )}

                                  <div className="comingsoon_cta_two">
                                    <p>
                                      {data.video
                                        ? "Will Remind You"
                                        : "Remind me"}
                                    </p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
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
    </div>
  );
};

export default ComingSoon;
