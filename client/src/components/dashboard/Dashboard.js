import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConceptsByPathId } from '../../slices/concepts';
import { getPath } from '../../slices/paths';
import Concepts from '../concept/Concepts';
import styles from './dashboard.module.scss';

function Dashboard() {
  const dispatch = useDispatch();
  const { concepts } = useSelector((store) => store.concepts);
  const { path, loading: loadingPath } = useSelector((store) => store.paths);
  const { userInfo, currentPath } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate('/');
    if (currentPath) {
      dispatch(getConceptsByPathId(currentPath));
      dispatch(getPath(currentPath));
    }
  }, [currentPath]);

  if (loadingPath) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      {currentPath !== null ? (
        <>
          <h2>{path?path.title:'Current Path'}</h2>
          <div>
            <div>
              <Concepts concepts={concepts} />
            </div>
            <div className={styles.sidebar}>
              <div>
                <h3>{userInfo.username}</h3>
                {path
                  ? <div>{path.description}</div>
                  : null}
              </div>
            </div>
          </div>
        </>
      ):(
        <div>
          You don&apos;t have a path selected as your current path.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
