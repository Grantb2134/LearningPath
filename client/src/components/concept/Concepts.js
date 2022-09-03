import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteConcept } from '../../slices/concepts';
import styles from './concepts.module.scss';

function Concepts({ concepts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);
  const onDelete = async (id, pathId) => {
    dispatch(deleteConcept(id));
    navigate(`/path/${pathId}`);
  };
  console.log(concepts);
  return (
    <div className={styles.container}>
      {concepts.length !== 0
        ? concepts.map((concept) => (
          <div className={styles.concept}>
            <Link to={`/concept/${concept.id}`}><h4>{concept.title}</h4></Link>
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
            Path doesn&apos;t have concepts
          </div>
        )}
    </div>
  );
}

export default Concepts;
