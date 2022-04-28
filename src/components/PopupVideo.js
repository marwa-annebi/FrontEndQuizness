import React from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import "./../css/popUpVideo.css";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "1000px",
    backgroundColor: "#570b03",
    borderRadius: "25px",
    height: "550px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    webkitBackdropFilter: "blur(30px) brightness(115%)",
    backdropFilter: " blur(30px) brightness(115%)",
    backgroundColor: "transparent",
  },
};
const icon = {};
export default function PopupVideo(props) {
  const { open, setOpenPopup } = props;
  return (
    <div >
    <IconContext.Provider
          value={{ color: "red", fontSize: "20px",style:{ position: "absolute", top: "-10px", right: "10px" } }}
        >
          <div>
            <AiOutlineClose  />
          </div>
        </IconContext.Provider>
      <Modal
        isOpen={open}
        style={customStyles}
        onRequestClose={() => setOpenPopup(false)}
      >
        
        <div className="video">
          <ReactPlayer
            url="https://vimeo.com/3155182"
            controls={true}
            className="react-player"
            width="1000px"
            height="550px"
            
          />
        </div>
      </Modal>
    </div>
  );
}
