import React from 'react';
import styles from './progress.module.scss';

function Progress() {
  return (
    <div className={styles.container}>
      <h3>Current Path</h3>
      <div>
        <p>Introduction to SQL Databases</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} />
        </div>
      </div>
    </div>
  );
}

export default Progress;