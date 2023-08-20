import React, { useState, useEffect } from "react";
import "./Alert.css";

import AlertIcon from "../../assets/AlertIcon.svg";

type props = {
  trigger: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

function Alert({ trigger, title, message, onClose }: props) {
  const [showAlert, setShowAlert] = useState(trigger);

  useEffect(() => {
    setShowAlert(trigger);
  }, [trigger]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".alert-popup-inner")) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "enter") {
      onClose();
    }
  };

  return showAlert ? (
    <div className="alert-popup" onClick={handleOutsideClick}>
      <div className="alert-popup-inner" tabIndex={0} onKeyDown={handleKeyDown}>
        <div className="title-alert">
          <img src={AlertIcon} alt="Alert Icon" />
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
