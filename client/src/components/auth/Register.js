import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { createUser } from '../../slices/auth';

function Register() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const {
    userInfo, success,
  } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/dashboard');
  }, [navigate, userInfo, success]);

  const onChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ user: newUser }));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">username</label>
          <input type="tect" id="username" name="username" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
      <div>
        <a href="http://www.google.com">Forgot password</a>
      </div>
      <div>
        <p>
          Don&apos;t have an account?
          <a href="http://www.google.com">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Register;