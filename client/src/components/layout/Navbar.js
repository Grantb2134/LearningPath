import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logout } from '../../slices/auth';
import styles from './navbar.module.scss';

function Navbar() {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  useEffect(() => {
    // authenticate user if token is found
    if (userToken) {
      dispatch(currentUser());
    }
    // detect clicks outside of dropdown
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked area is not within the menu,
      // then close the menu
      if (dropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [userToken, dispatch, dropdown]);

  return (
    <nav className={styles.container}>
      <Link id={styles.logo} to="/">
        <i className="las la-road" />
        LearningPath
      </Link>

      <ul className={styles.nav}>
        {userInfo ? (
          <>
            <li className={styles.create}>
              <Link className="button" to="/path/create">
                Create Path
              </Link>
            </li>
            <li onClick={() => setDropdown(!dropdown)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span>{userInfo.username}</span>
                {' '}
                <i className="las la-user-circle" />
              </span>
            </li>
          </>
        ) : (
          <Link className="button" to="/auth/login">
            Login
          </Link>

        )}
        {userInfo && dropdown && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <ul>
            <li>
              <Link to={`/user/${userInfo.id}`}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/user/account">
                Settings
              </Link>
            </li>
            <li onClick={() => dispatch(logout())}>
              <span>
                Sign Out
              </span>
            </li>
          </ul>
        </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
