import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Logic/firebase";
import { SelectedAll } from "../../Redux/allSlice";
import { useSelector } from "react-redux";
import movieURLNIN from "../../Images/movieLab noImgURL.avif";
import { AiFillDelete, AiFillPlayCircle } from "react-icons/ai";
import "./watchlist.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const WatchList = () => {
  //FROM LIBRARYS
  const uid = useSelector(SelectedAll).uid;
  const docRef = doc(db, "watchLists", uid);

  //STATES
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [watchListArr, setWatchListArr] = useState([]);
  const [doesNotExist, setDoesNotExist] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchList = async () => {
      const docSnap = await getDoc(docRef);

      const { watchLists } = docSnap.data();
      console.log(watchLists);

      if (watchLists.length >= 1) {
        setWatchListArr(watchLists);
        setLoading(false);
        setDoesNotExist(false);
      } else {
        setLoading(false);
        setDoesNotExist(true);
      }
    };

    fetchWatchList();

    return () => {
      console.log("unmounting");
    };
  }, []);

  //MODAL FUNCS
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const filtered = watchListArr.filter((movie) => movie.id !== id);

    await updateDoc(docRef, {
      watchLists: filtered,
    })
      .then(() => {
        toast.success("Deleted");
        window.location.reload();
      })
      .catch(() => {
        toast.error("There was a problem deleting this item");
      });
    console.log(id);
  };

  //MODAL
  function BasicModal(id) {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="watchlist_modal_one">
              <h3>Are you sure you want to delete this from your watchList?</h3>
              <p>This action is irrevesible</p>
              <div className="watchlist_modal_one_btn">
                <button
                  onClick={handleClose}
                  className="cancel_watchlist btn-one"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    handleClose();
                  }}
                  className="delete_watchlist"
                >
                  Delete
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div className="home_three">
      <Sidebar openMenu={openMenu} />
      <div className="home_four">
        <Navbar setOpenMenu={setOpenMenu} />
        <div className="watchlist_one">
          {loading ? (
            <div className="centerLoader watchlist_loader">
              <div className="spinnerSecond"></div>
            </div>
          ) : (
            <div className="watchlist_two padding">
              {doesNotExist ? (
                <div className="notavailable_one">
                  <div className="notavailable_two">
                    <h3>Sorry Buddy...</h3>
                    <p>You havent saved any movie</p>
                    <button
                      onClick={() => {
                        navigate("/home");
                      }}
                    >
                      Add to watchlist
                    </button>
                  </div>
                </div>
              ) : (
                <div className="watchlist_three">
                  <h2>Here are your saved movie(s)...</h2>
                  <div className="watchlist_four">
                    {watchListArr?.map((item) => {
                      const img = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
                      return (
                        <div key={item.id} className="watchlist_five">
                          <div className="watchlist_six">
                            <img
                              src={
                                item.backdrop_path == null ? movieURLNIN : img
                              }
                              alt=""
                            />
                            <div className="watchlist_seven padding">
                              <h3>{item.title}</h3>
                              <p>{item.overview}</p>
                              <small>Released on: {item.release_date}</small>
                              <div className="watchlist_eight">
                                <button
                                  onClick={() => {
                                    handleOpen(item.id);
                                  }}
                                  title="Delete"
                                  className="watchlist_delete"
                                >
                                  <AiFillDelete />
                                </button>
                                <button
                                  onClick={() => {
                                    navigate("/moviepage/" + item.id);
                                  }}
                                  className="watchlist_play"
                                >
                                  <AiFillPlayCircle />
                                  <p>Watch Now</p>
                                </button>
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
          )}
        </div>
      </div>
      <BasicModal />
    </div>
  );
};

export default WatchList;
