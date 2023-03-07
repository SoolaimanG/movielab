import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { SelectedAll } from "../Redux/allSlice";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Logic/firebase";
import {
  isModalGenreOpen,
  isModalGenreClose,
  updateGenre,
  clearGenre,
} from "../Redux/allSlice";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

function BasicModalTwo({ userGenres }) {
  //isOpen should be false from default
  const isopen = useSelector(SelectedAll).openModalGenre;
  const userGenre = useSelector(SelectedAll).userGenre;
  const uid = useSelector(SelectedAll).uid;
  const [sychronous, setSychrous] = useState(false);

  //Document Refrence
  const docRef = doc(db, "users", uid);

  //UseDispatch be used and also useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Functions for opening and closing Genre Modal
  const handleOpen = () => {
    dispatch(isModalGenreOpen());
  };
  const handleClose = () => {
    dispatch(isModalGenreClose());
  };

  //Mapping through user genre
  const userGenreMapped = userGenre.map((userGenres) => {
    return (
      <ul className="modalGenre_four" key={userGenres.id}>
        <li>{userGenres.name}</li>
      </ul>
    );
  });

  //Function for saving user genre
  const saveGenre = async () => {
    try {
      await setDoc(docRef, {
        genres: userGenre.map((genre) => {
          return genre.name;
        }),
      });
      setSychrous(true);
      toast.loading("Adding");
    } catch (error) {
      toast.error("Unable to add your genres");
    }
  };

  //Performing Synchronous Loading
  useEffect(() => {
    if (sychronous) {
      const timer = setTimeout(() => {
        toast.dismiss();
        navigate("/home");
        handleClose();
      }, 4000);

      return () => {
        clearTimeout(timer);
        setSychrous(false);
      };
    }
  }, [sychronous]);

  return (
    <div>
      <Toaster />
      <button
        onClick={() => {
          handleOpen();
          dispatch(updateGenre(userGenres));
        }}
        className="donegenre"
      >
        Done
      </button>
      <Modal
        open={isopen}
        onClose={() => {
          handleClose();
          dispatch(clearGenre());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalGenre_one">
            <div className="modalGenre_two">
              <h3>Just to be clear!</h3>
              <p>you choose the following as your genre:</p>
              <div className="modalGenre_three">{userGenreMapped}</div>
              <h4>Please note you can't change this in settings later.</h4>
            </div>
            <div className="modalGenre_btn">
              <button
                onClick={() => {
                  handleClose();
                  dispatch(clearGenre());
                }}
                className="genre_btn"
              >
                Cancel
              </button>
              <button onClick={saveGenre} className="genre_btn_two">
                Understood
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModalTwo;
