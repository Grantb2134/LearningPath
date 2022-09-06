import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './edit.module.scss';
import { changeSettings } from '../../slices/users';
import SettingsNav from './layout/SettingsNav';

function Edit() {
  const [user, setUser] = useState({});
  const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate('/');
  }, [userInfo]);

  const {
    password, username, twitter, github, website, bio,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSettings({
      password, username, twitter, github, website, bio,
    })).then(() => {
      navigate('/dashboard');
    });
  };
  return (
    <div className={styles.container}>
      <SettingsNav />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="github">Github Username</label>
          <input type="text" id="github" name="github" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="twitter">Twitter Handle</label>
          <input type="text" id="twitter" name="twitter" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="bio">Shortly About Yourself</label>
          <input type="text" id="bio" name="bio" onChange={onChange} />
        </div>
        <div>
          <button>Edit Account</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
