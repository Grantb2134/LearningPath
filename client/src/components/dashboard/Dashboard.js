import React from 'react';
import Concepts from '../concept/Concepts';
import AddPath from '../sidebar/CreatePath';
import Progress from '../sidebar/Progress';
import styles from './dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.container}>
      <h2>Memorization Guide: JS/HTML/CSS</h2>
      <div>
        <div>
          <Concepts />
        </div>
        <div className={styles.sidebar}>
          <Progress />
          <AddPath />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
