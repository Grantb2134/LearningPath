import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './concepts.module.scss';

function Concepts({ concepts }) {
  const navigate = useNavigate();

  const onDelete = async (id, pathId) => {
    navigate(`/path/${pathId}`);
  };

  return (
    <div className={styles.container}>
      {concepts?concepts.map((concept) => (
        <div className={styles.concept}>
          <Link to={`/concept/${concept.id}`}><h4>{concept.title}</h4></Link>
          <p>{concept.description}</p>
          <i onClick={() => onDelete(concept.id, concept.pathId)} className="las la-trash-alt" />
          <div className={styles.line} />
        </div>
      )): 'loading' }
    </div>
  );
}

export default Concepts;
