import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';

function Navbar() {
  return (
    <nav className={styles.container}>
      <Link id={styles.logo} to="/">LearningPath</Link>
      <ul>
        <Link className="nav-item" to="/">
          Login
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
