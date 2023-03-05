import * as React from "react";
import Box from "@mui/material/Box";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import { isModalClose, isModalOpen } from "../Redux/allSlice";
import { useSelector, useDispatch } from "react-redux";
import { SelectedAll } from "../Redux/allSlice";
import { BsFillCheckCircleFill } from "react-icons/bs";

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

function BasicModal() {
  //Conditions for opening modal using Redux
  const open = useSelector(SelectedAll).openModal;
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(isModalOpen());
  };
  const handleClose = () => {
    dispatch(isModalClose());
  };

  return (
    <div>
      <div onClick={handleOpen} className="modal_svg">
        <AiOutlineExclamationCircle />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal_body">
            <h3>Your password must contain the following.</h3>
            <div className="modal_must_contain">
              <div className="modal_must_contain_1">
                <BsFillCheckCircleFill />
                <p>one lowercase character</p>
              </div>
              <div className="modal_must_contain_1">
                <BsFillCheckCircleFill />
                <p>one uppercase character</p>
              </div>
              <div className="modal_must_contain_1">
                <BsFillCheckCircleFill />
                <p>one special character</p>
              </div>
              <div className="modal_must_contain_1">
                <BsFillCheckCircleFill />
                <p>8 character minimum</p>
              </div>
              <div className="modal_must_contain_1">
                <BsFillCheckCircleFill />
                <p>one number</p>
              </div>
            </div>
            <button onClick={handleClose} className="btn-one">
              Ok! Got it.
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
