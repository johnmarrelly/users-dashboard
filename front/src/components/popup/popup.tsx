import React from 'react';
import './popup.scss';

export const Popup = ({ onClose, children, header }: any) => {
  return (
    <div className='popup-wrapper'>
      <div className='modal-content'>
        <div className='modal-header'>
          <a onClick={onClose} className='close'>
            X
          </a>
          <h2>{header}</h2>
        </div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <div className='popup-btn' onClick={onClose}>
            close
          </div>
        </div>
      </div>
    </div>
  );
};
