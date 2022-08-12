import React from 'react';
import styles from './dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.container}>
      <h2>Memorization Guide: JS/HTML/CSS</h2>
      <div>
        <div>
					<div>concepts</div>
        </div>
        <div className={styles.sidebar}>
					<div>sidebar</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;