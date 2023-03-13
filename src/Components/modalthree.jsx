import Box from "@mui/material/Box";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModalThree({ videoID }) {
  //USESTATEs
  const [videoURL, setVideoURL] = useState("");
  //GETTING THE MOVIES
  const getMovies = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2628430868msha458838465f332fp14cf7djsn7696ae8601c9",
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    };

    fetch(
      `https://youtube-v2.p.rapidapi.com/video/data?video_id=${videoID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setVideoURL(response[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //INVOKING THE CALL
  useEffect(() => {
    getMovies();
  }, [videoID]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} className="singlepage_play_btn">
        <BsFillPlayCircleFill />
      </div>
      <div onClick={handleOpen} className="singlepage_play_btn_mobile">
        <button>Play Now</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <video
            style={style}
            className="videoFit"
            controls
            src={videoURL}
          ></video>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModalThree;
