import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, logout } from '../../slices/auth';
import styles from './navbar.module.scss';

function Navbar() {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(currentUser());
    }
  }, [userToken, dispatch]);

  return (
    <nav className={styles.container}>
      <Link id={styles.logo} to="/">LearningPath</Link>

      <ul>
        {userInfo ? (
          <>
            <Link to={`/user/${userInfo.id}`}>Me</Link>
            <button onClick={() => dispatch(logout())}>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="button" to="/auth/login">
            Login
          </Link>

        )}
      </ul>
    </nav>
  );
}

export default Navbar;
