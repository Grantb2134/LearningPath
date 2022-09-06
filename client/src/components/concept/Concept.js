import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConcept } from '../../slices/concepts';
import { getContentByConceptId } from '../../slices/contents';

import Content from '../content/Content';
import About from '../layout/sidebar/About';
import styles from './concept.module.scss';

function Concept() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { content, loading } = useSelector((store) => store.contents);
  const { concept, loading: loadingConcept } = useSelector((store) => store.concepts);
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getConcept(id));
    dispatch(getContentByConceptId(id));
  }, []);

  if (loading || loadingConcept || concept === null) {
    return (
      <div>Loading</div>
    );
  }
  return (
    <div className={styles.container}>
      <h2>{concept.title}</h2>
      <div>
        {content
          ? (
            <div className={styles.main}>
              <Content content={content} />
            </div>
          )
          : <div>loading</div>}
        <aside className={styles.sidebar}>
          {userInfo && userInfo.id === concept.userId
            ? <About buttonTitle="Add Content" buttonLink={`/content/create/concept/${id}`} author={concept.userId === userInfo.id} />
            : null}
        </aside>

      </div>
    </div>
  );
}

export default Concept;
