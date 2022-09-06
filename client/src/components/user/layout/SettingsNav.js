import React from 'react';
import { Link } from 'react-router-dom';
import styles from './settingsNav.module.scss';

function SettingsNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li><Link to="/user/account">Account</Link></li>
        <li><Link to="/user/password">Change Password</Link></li>
      </ul>
    </div>
  );
}

export default SettingsNav;
