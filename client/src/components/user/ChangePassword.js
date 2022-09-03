import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './changePassword.module.scss';
import { changePassword } from '../../slices/users';

function ChangePassword() {
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
    currentPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { password, confirmPassword, currentPassword } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ password, confirmPassword, currentPassword }));
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChange} />
        </div>
        <div>
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
