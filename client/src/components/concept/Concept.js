import React from 'react';
import { useSelector } from 'react-redux';
import styles from './concept.module.scss';

function Concept() {
  const { content, loading } = useSelector((store) => store.contents);

  if (loading || content === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Concept page</h2>
      <div>
        <div className={styles.main}>
          <div>content</div>
        </div>
        <aside className={styles.sidebar}>
          <div>sidebar</div>
        </aside>
      </div>
    </div>
  );
}

export default Concept;
