import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePath } from '../../slices/paths';
import styles from './paths.module.scss';

function Paths({ paths }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async (id, userId) => {
    dispatch(deletePath(id));
    navigate(`/user/${userId}`);
  };

  return (
    <div className={styles.container}>
      {paths.map((path) => (
        <div className={styles.path}>
          <Link to={`/path/${path.id}`}><h4>{path.title}</h4></Link>
          <p>{path.description}</p>
          <i onClick={() => onDelete(path.id, path.userId)} className="las la-trash-alt" />
        </div>
      ))}
    </div>
  );
}

export default Paths;
