/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './profile.module.scss';
import { getUser } from '../../../slices/users';

function User({ id }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.users);
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  if (!user && !userInfo) {
    return <div>Loading</div>;
  }
  return (
    <aside className={styles.sidebar}>
      <div className={styles.picture} />
      { user
        && !user.website
        && !user.twitter
        && !user.github
        && !user.bio
        ?(
          userInfo&&userInfo.id === parseInt(id)
            ? (
              <p>
                Please set personal credentials
                {' '}
                <Link to="/user/account">here</Link>
                .
              </p>
            )
            : <p>User didn&apos;t set personal credentials yet.</p>
        )
        : (
          <div>
            {user.bio&&<p>{user.bio}</p>}
            <ul>
              {user.website &&(
              <li>
                <i className="las la-2x la-link" />
                <a href={user.website}>{user.website}</a>
              </li>
              )}
              {user.github
          &&(
          <li>
            <i className="lab la-2x la-github" />
            <a href={`https://github.com/${user.github}`}>

              {user.github}
            </a>
          </li>
          )}
              {user.twitter
          &&(
          <li>
            <i className="lab la-2x la-twitter" />
            <a href={`https://twitter.com//${user.twitter}`}>
              @
              {user.twitter}
            </a>
          </li>
          )}
            </ul>
          </div>
        )}
    </aside>
  );
}

export default User;
