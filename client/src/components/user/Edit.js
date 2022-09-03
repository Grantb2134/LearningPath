import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './edit.module.scss';
import { changeSettings } from '../../slices/users';

function Edit() {
  const [user, setUser] = useState({
    email: '',
    twitter: '',
    github: '',
    website: '',
    password: '',
    bio: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    email, password, username, twitter, github, website, bio,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSettings({
      email, password, username, twitter, github, website, bio,
    }));
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="github">Github</label>
          <input type="text" id="github" name="github" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" name="twitter" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="bio">Short Bio</label>
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
