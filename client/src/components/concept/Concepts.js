import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteConcept } from '../../slices/concepts';
import styles from './concepts.module.scss';

function Concepts({ concepts }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
  const onDelete = async (id) => {
    dispatch(deleteConcept(id));
  };
  return (
    <div className={styles.container}>
      {concepts
        ? concepts.map((concept) => (
          <div key={concept.id} className={styles.concept}>
            <h4><Link to={`/concept/${concept.id}`}>{concept.title}</Link></h4>
            <p>{concept.description}</p>
            {userInfo&&userInfo.id === concept.userId &&(
            <div id={styles.icons}>
              <i onClick={() => onDelete(concept.id)} className="las la-trash-alt" />
              <Link to={`/concept/edit/${concept.id}`}><i className="las la-pen" /></Link>
            </div>
            )}
            <div className={styles.line} />
          </div>
        ))
        :(
          <div>
            Path doesn&apos;t have concepts.
          </div>
        )}
    </div>
  );
}

export default Concepts;
