import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { login } from '../../slices/auth';

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const { email, password, username } = loginUser;

  const onChange = (e) => setLoginUser({ ...loginUser, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, username }));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      <div>
        <a href="http://www.google.com">Forgot password</a>
      </div>
      <div>
        <p>
          Don&apos;t have an account?
          <Link to="/auth/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
