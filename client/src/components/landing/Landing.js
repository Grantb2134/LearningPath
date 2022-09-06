import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFeaturedPaths } from '../../slices/paths';
import Login from '../auth/Login';
import Paths from '../path/Paths';
// import Concepts from '../concept/Concepts';
import Header from './Header';
import styles from './landing.module.scss';

function Landing() {
  const { userInfo } = useSelector((state) => state.auth);
  const { paths, loading } = useSelector((state) => state.paths);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeaturedPaths());
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/dashboard');
  }, [navigate, userInfo]);
  if (loading) {
    return (
      <div>loading</div>
    );
  }
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
          <Paths paths={paths} />
        </div>
      </div>
    </>
  );
}

export default Landing;
