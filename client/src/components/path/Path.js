import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './path.module.scss';
import { getPath } from '../../../slices/paths';
import { getConceptsByPathId } from '../../../slices/concepts';

function Path() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { concepts, loading } = useSelector((store) => store.concepts);
  const { path } = useSelector((store) => store.paths);

  useEffect(() => {
    dispatch(getConceptsByPathId(id));
    dispatch(getPath(id));
  }, []);
  if (loading || path === null || concepts === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>{path.title}</h2>
      <div>
        <aside className={styles.sidebar}>
          <div>sidebar</div>
        </aside>
      </div>
    </div>
  );
}

export default Path;
