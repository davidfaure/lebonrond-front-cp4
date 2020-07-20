import React from 'react';
import '../../App.css';
import './Header.css';

const Header = () => {
  return(
    <header>
      <div className="Header-container">
        <div className="Admin-brand col-md-2">
          {/* <img src={tricky} className="Img-logo" alt="Tricky" /> */}
          <h1 className="Text-Logo">lebonrond</h1>
        </div>
        <div className="Admin-brand col-md-2">
        <button
              className="ButtonAction Action"
              type="button"
            >Déposer une annonce
        </button>
        </div>
        <div className="Admin-board Flex">
          <div className="Admin-name">
            David Faure
          </div>
          <button
            type="button"
            className="Disconnect"
            tabIndex={0}
          >
            <span className="fas fa-power-off" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;