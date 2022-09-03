import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../auth/Login';
// import Concepts from '../concept/Concepts';
import Header from './Header';
import styles from './landing.module.scss';

function Landing() {
  const {
    userInfo,
  } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/dashboard');
  }, [navigate, userInfo]);
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div>
          <h2>Login</h2>
          <Login />
        </div>
        <div className={styles.featured}>
          <h2>Featured Paths</h2>
        </div>
      </div>
    </>
  );
}

export default Landing;
