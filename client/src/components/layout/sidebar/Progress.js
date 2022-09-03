import React from 'react';
import styles from './progress.module.scss';

function Progress({ title, description }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div>
        <p>{description}</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} />
        </div>
      </div>
    </div>
  );
}

export default Progress;
