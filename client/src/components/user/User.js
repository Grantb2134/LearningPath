import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paths from '../path/Paths';
import styles from './user.module.scss';
import { getUsersPaths } from '../../slices/paths';
import { getUserByUsername } from '../../slices/users';
import Sidebar from './sidebar/Profile';

function User() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { paths, loading } = useSelector((store) => store.paths);
  const { user } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUserByUsername(username)).then((res) => {
      dispatch(getUsersPaths(res.payload.id));
    });
  }, []);
  if (loading || paths === null) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Recent Paths</h2>
        <Paths paths={paths} />
      </div>
      <Sidebar id={user.id} />
    </div>
  );
}

export default User;
