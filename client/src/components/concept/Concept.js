import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContentByConceptId } from '../../slices/contents';
import Content from '../content/Content';
import About from '../sidebar/About';
import Changelog from '../sidebar/Changelog';
import styles from './concept.module.scss';

function Concept() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { content, loading } = useSelector((store) => store.contents);

  useEffect(() => {
    dispatch(getContentByConceptId(id));
  }, []);

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
          <Content content={content} />
        </div>
        <aside className={styles.sidebar}>
          <About buttonTitle="Add Content" buttonLink={`/content/create/concept/${id}`} />
          <Changelog />
        </aside>
      </div>
    </div>
  );
}

export default Concept;
