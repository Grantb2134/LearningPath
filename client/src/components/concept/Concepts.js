import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteConcept } from '../../slices/concepts';
import styles from './concepts.module.scss';

function Concepts({ concepts }) {
	const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async (id, pathId) => {
    dispatch(deleteConcept(id));
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
