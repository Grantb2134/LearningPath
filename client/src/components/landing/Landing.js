import React from 'react';
import Login from '../auth/Login';
import Featured from '../path/Featured';
import Header from './Header';
import styles from './landing.module.scss';

function Landing() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div>
          <h2>Login</h2>
          <Login />
        </div>
        <div className={styles.featured}>
          <h2>Featured Posts</h2>
          <Featured />
        </div>
      </div>
    </>
  );
}

export default Landing;
