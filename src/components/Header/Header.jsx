import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Header.css';
import { authContext } from '../Contexts/AuthContext';

const Header = () => {
  const { setAuthData, auth } = useContext(authContext);
  const [Profile, setProfile] = useState({
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth',
      headers: {
        Authorization: `Bearer ${auth.data}`,
      },
    })
      .then((response) => response.data)
      .then((data) => setProfile(data.authData.user[0]));
  }, []);

  const Logout = () => {
    setAuthData(null);
    localStorage.clear();
    window.location.reload();
  };

  return(
    <header>
      <div className="Header-container">
        <div className="Admin-brand col-md-2">
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1 className="Text-Logo">lebonrond</h1>
          </Link>
        </div>
        <div className="Admin-brand col-md-2">
        <Link to={'/login'}>
          <button
                className="ButtonAction Action"
                type="button"
              >Déposer une annonce
          </button>
        </Link>
        </div>
        <div className="Admin-board Flex">
          <div className="Admin-name">
          {Profile.firstname === '' 
          ? 
          <div className="Admin-name-disc">
          <p>Bonjour invité</p>
          <Link to='/login' style={{ textDecoration: 'none', outline: 'none' }}>
            <button
              type="button"
              className="Connect"
            >
              <span className="fas fa-sign-in-alt" />
            </button>
          </Link> 
          </div>
          : 
          <p>Bonjour {' '}
            <Link to='/profile' style={{ textDecoration: 'none' }}>
              {Profile.firstname} {Profile.lastname}
              </Link>
          </p>}
          </div>
          <Link to='/' style={{ textDecoration: 'none', outline: 'none' }}>
            <button
              type="button"
              className="Disconnect"
              tabIndex={0}
              onClick={Logout}
            >
              <span className="fas fa-power-off" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;