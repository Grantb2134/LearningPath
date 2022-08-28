import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePath } from '../../slices/paths';
import styles from './paths.module.scss';

function Paths({ paths }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);

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
          {userInfo && userInfo.id === path.userId &&(
          <div id={styles.icons}>
            <i onClick={() => onDelete(path.id)} className="las la-trash-alt" />
            <Link to={`/path/edit/${path.id}`}><i className="las la-pen" /></Link>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Paths;
