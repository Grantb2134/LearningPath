import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './path.module.scss';
import Concepts from '../concept/Concepts';
import About from '../layout/sidebar/About';
import { getPath } from '../../slices/paths';
import { getConceptsByPathId } from '../../slices/concepts';

function Path() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { concepts, loading } = useSelector((store) => store.concepts);
  const { path } = useSelector((store) => store.paths);

  useEffect(() => {
    dispatch(getConceptsByPathId(id));
    dispatch(getPath(id));
  }, []);
  if (loading || path === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>{path.title}</h2>
      <div>
        <div className={styles.main}>
          <Concepts concepts={concepts} />
        </div>
        <aside className={styles.sidebar}>
          <About buttonTitle="Add Concept" buttonLink={`/concept/create/path/${id}`} />
        </aside>
      </div>
    </div>
  );
}

export default Path;
