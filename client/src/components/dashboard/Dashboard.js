import React from 'react';
import Concepts from '../concept/Concepts';
import AddPath from '../layout/sidebar/CreatePath';
import Progress from '../layout/sidebar/Progress';
import styles from './dashboard.module.scss';

function Dashboard() {
  return (
    <div className={styles.container}>
      <h2>Current path title</h2>
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