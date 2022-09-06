import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deletePath } from '../../slices/paths';
import { setCurrentPath } from '../../slices/auth';
import styles from './paths.module.scss';

function Paths({ paths }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.auth);

  const onDelete = async (id) => {
    dispatch(deletePath(id));
  };

  const handleSetCurrentPath = (id) => {
    dispatch(setCurrentPath(id))
      .then(() => {
        navigate('/dashboard');
      });
  };

  return (
    <div className={styles.container}>
      {paths
        && paths.map((path) => (
          <div key={path.id} className={styles.path}>
            <h4><Link to={`/path/${path.id}`}>{path.title}</Link></h4>
            <p>{path.description}</p>
            {userInfo && (
            <div className={styles.icons}>
              {userInfo.currentPath !== path.id
                && <i onClick={() => handleSetCurrentPath(path.id)} className="las la-play" />}
              {userInfo.id === path.userId &&(
              <>
                <i onClick={() => onDelete(path.id)} className="las la-trash-alt" />
                <Link to={`/path/edit/${path.id}`}><i className="las la-pen" /></Link>
              </>
              )}
            </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Paths;
