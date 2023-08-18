import React, { useState } from "react";
import "./Alert.css";

import AlertIcon from "../../assets/AlertIcon.svg";

type props = {
  trigger: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

function Alert({ trigger, title, message, onClose }: props) {
  return trigger ? (
    <div className="alert-popup">
      <div className="alert-popup-inner">
        <div className="title-alert">
          <img src={AlertIcon} />
          {title}
        </div>

        <div className="message-alert">{message}</div>

        <div className="alert-btn">
          <button className="alert-close" onClick={onClose}>
            ตกลง
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Alert;
