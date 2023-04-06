import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import { Toaster, toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
  p: 2,
};

export default function Donation({ text, title }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [whichIsClicked, setWhichIsClicked] = useState("Bank");
  const [cryptoClicked, setCryptoClicked] = useState("Bitcoin");

  const bitcoinD = {
    imgURL:
      "https://scontent.cdninstagram.com/v/t1.15752-9/337179564_155462140787575_2835269929471817216_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5a057b&_nc_ohc=a6LBl9lRqgYAX8_5KiD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS4qwFNOyki_j64xxTMKZrQoaK2Cp2I6KiXYcBS4v1xmA&oe=6454E61A",
    address: "bc1qssag40g8l7fce9zd3lh7vmvqrxd8eup3flyv9m",
  };

  const LitecoinD = {
    imgURL:
      "https://scontent.cdninstagram.com/v/t51.39111-15/339691805_618849509652620_6812488427408117375_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5a057b&_nc_ohc=VC_8akPgofoAX_L3L7D&_nc_oc=AQljcbdBAJAnYCnyYyeJCUH_jfYsp8pCJmqywwasve830RRn0HN1aztJaUdNA4PLBYuIAgVcCCujiEfcvRxzWCVA&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=02_AVCjebNqNqpbW7DL3Q_YjyaN75IgU9JAId1n6AOJ7D6LQA&oe=643212DB&ig_cache_key=MzA3NDIzNjA3NTU4ODIxODk0MA%3D%3D.2-ccb7-5",
    address: "ltc1qm92aa5xmzdpuz20kf6jw407mnfcxkjjdrqw3xh",
  };

  const EthereumD = {
    imgURL:
      "https://scontent.cdninstagram.com/v/t51.39111-15/339088199_2383694808470421_5403401094713434845_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5a057b&_nc_ohc=fZhCUFF2_6AAX8ggIB0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=02_AVA78WhCQQLMjG7_pG5ffHJ-Z_AmMrS0wR8FOuiVb6bWPg&oe=6432AFED&ig_cache_key=MzA3NDIzNDY0MTQ2MzQ3ODkxMA%3D%3D.2-ccb7-5",
    address: "0x156856538F5bb16ff596bd20d47DEEC2945c6791",
  };

  const copyBitcoinAddress = () => {
    navigator.clipboard
      .writeText(bitcoinD.address)
      .then(() => {
        toast.success("Copied");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  const copyLiteCoinAddress = () => {
    navigator.clipboard
      .writeText(LitecoinD.address)
      .then(() => {
        toast.success("Copied");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  const copyEthereumAddress = () => {
    navigator.clipboard
      .writeText(EthereumD.address)
      .then(() => {
        toast.success("Copied");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  //BITCOIN COMPONENT
  const bitcoin = () => {
    return (
      <div className="bitcoin_one">
        <div className="bitcoin_two">
          <img src={bitcoinD.imgURL} alt="" />
        </div>

        <div className="Address_crypto">
          <small>
            {bitcoinD.address.slice(0, bitcoinD.address.length - 13)}...
          </small>
          <button onClick={copyBitcoinAddress}>Copy </button>
        </div>
        <h3>Bitcoin Address</h3>
      </div>
    );
  };

  //LITECOIN COMPONENT
  const litecoin = () => {
    return (
      <div className="bitcoin_one">
        <div className="bitcoin_two">
          <img src={LitecoinD.imgURL} alt="" />
        </div>

        <div className="Address_crypto">
          <small>
            {LitecoinD.address.slice(0, LitecoinD.address.length - 13)}...
          </small>
          <button onClick={copyLiteCoinAddress}>Copy </button>
        </div>
        <h3>Litecoin Address</h3>
      </div>
    );
  };

  //ETHEREUM COMPONENT
  const ethereum = () => {
    return (
      <div className="bitcoin_one">
        <div className="bitcoin_two">
          <img src={EthereumD.imgURL} alt="" />
        </div>

        <div className="Address_crypto">
          <small>
            {EthereumD.address.slice(0, EthereumD.address.length - 13)}...
          </small>
          <button onClick={copyEthereumAddress}>Copy </button>
        </div>
        <h3>Ethereum Address</h3>
      </div>
    );
  };

  return (
    <div>
      <Toaster />
      <Tooltip title={title} placement="top-end" arrow>
        <p onClick={handleOpen}>{text}</p>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bankDetails_head">
            {title === "Bank" ? (
              <div>
                <div className="bankDetailsBTN">
                  <button
                    onClick={() => {
                      setWhichIsClicked("Bank");
                    }}
                    className={`bankCTA ${
                      whichIsClicked === "Bank" ? "isBankCtaActive" : ""
                    }`}
                  >
                    Use Bank
                  </button>
                  <button
                    onClick={() => {
                      setWhichIsClicked("Wallet");
                    }}
                    className={`bankCTA ${
                      whichIsClicked === "Wallet" ? "isBankCtaActive" : ""
                    }`}
                  >
                    Use Wallet
                  </button>
                </div>
                <div className="bankDetails_body">
                  {whichIsClicked === "Bank" ? (
                    <div className="bankDetails_body_content">
                      <ul>
                        <li>
                          <strong>Bank Name:</strong> Wema Bank
                        </li>
                        <li>
                          <strong>Bank Account Number:</strong> NaN
                        </li>
                        <li>
                          <strong> Receiver's Name:</strong> Suleiman Abubakar
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bankDetails_body_content">
                      <ul>
                        <li>
                          <strong>Bank Name:</strong> Opay
                        </li>
                        <li>
                          <strong>Bank Account Number:</strong> 8088362315
                        </li>
                        <li>
                          <strong> Receiver's Name:</strong> Suleiman Abubakar
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className="sent_div">
                    <button
                      onClick={() => {
                        toast.success("Thank you for your kind gesture");
                      }}
                      className="bankDetails_sent"
                    >
                      Sent
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cryptoCurrency_details">
                <div className="cryptoCurrency_head">
                  <div className="bankDetailsBTN">
                    <button
                      onClick={() => {
                        setCryptoClicked("Bitcoin");
                      }}
                      className={`bankCTA ${
                        cryptoClicked === "Bitcoin" ? "isBankCtaActive" : ""
                      }`}
                    >
                      Bitcoin
                    </button>
                    <button
                      onClick={() => {
                        setCryptoClicked("Litecoin");
                      }}
                      className={`bankCTA ${
                        cryptoClicked === "Litecoin" ? "isBankCtaActive" : ""
                      }`}
                    >
                      Litecoin
                    </button>
                    <button
                      onClick={() => {
                        setCryptoClicked("Ethereum");
                      }}
                      className={`bankCTA ${
                        cryptoClicked === "Ethereum" ? "isBankCtaActive" : ""
                      }`}
                    >
                      Ethereum
                    </button>
                  </div>
                  {cryptoClicked === "Bitcoin"
                    ? bitcoin()
                    : cryptoClicked === "Litecoin"
                    ? litecoin()
                    : ethereum()}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
