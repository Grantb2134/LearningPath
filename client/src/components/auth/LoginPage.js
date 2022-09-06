import React from 'react';
import Login from './Login';
import styles from './loginPage.module.scss';

function LoginPage() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

export default LoginPage;
