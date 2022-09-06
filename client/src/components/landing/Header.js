import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.container}>
      <div>
        <img src="/img/lightbulb.png" alt="" />
      </div>
      <div className={styles.text}>
        <h1>Learning Path</h1>
        <p>Platform for finding paths to learn programming</p>
        <Link to="/auth/register"><button>Get Started</button></Link>
      </div>
    </header>
  );
}

export default Header;
