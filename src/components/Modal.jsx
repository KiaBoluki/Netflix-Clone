// src/components/Modal.jsx
import React from 'react';
import YouTube from 'react-youtube';
import '../assets/style/Modal.css';
import { motion } from "framer-motion";

function Modal({ isOpen, onClose, videoId }) {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modal__content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <YouTube videoId={videoId} opts={opts} className="modal__video" />
      </motion.div>
    </motion.div>
  );
}

export default Modal;