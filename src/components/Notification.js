import React from 'react';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <div className="notification-content">
        <span>{message}</span>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Notification;
