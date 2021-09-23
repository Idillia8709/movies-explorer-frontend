import React from 'react';
import './ServerErrorMessage.css';

export default function ServerErrorMessage({ message }) {
  return (
    <div className="server-error-message">
      {message}
    </div>
  )
}