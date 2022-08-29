import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConceptsByPathId } from '../../slices/concepts';
import Concepts from '../concept/Concepts';
import AddPath from '../layout/sidebar/CreatePath';
import Progress from '../layout/sidebar/Progress';
import styles from './dashboard.module.scss';

function Dashboard() {
  const dispatch = useDispatch();
  const { concepts, loading } = useSelector((store) => store.concepts);
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(getConceptsByPathId(userInfo.currentPath));
    }
  }, [userInfo]);
	
  if (loading || concepts === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Current path title</h2>
      <div>
        <div>
          <Concepts concepts={concepts} />
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
