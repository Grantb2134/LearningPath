import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paths from '../path/Paths';
import styles from './user.module.scss';
import { getUsersPaths } from '../../slices/paths';
import { getUser } from '../../slices/users';

function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { paths, loading } = useSelector((store) => store.paths);
  const { user } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUsersPaths(id));
  }, []);

  if (loading || paths === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.picture} />
        <p>Starting out at the age of 12 I never stopped learning new</p>
        <ul>
          <li>
            <i className="las la-2x la-link" />
            <a href={user.website}>{user.website}</a>
          </li>
          <li>
            <i className="lab la-2x la-github" />
            <a href={user.github}>
              @
              {user.github}
            </a>
          </li>
          <li>
            <i className="lab la-2x la-twitter" />
            <a href={user.twitter}>
              @
              {user.twitter}
            </a>
          </li>
        </ul>
        {/* <About />
        <Changelog /> */}
      </aside>
      <div className={styles.main}>
        <h2>Recent Paths</h2>
        <Paths paths={paths} />
      </div>
    </div>
  );
}

export default User;
