import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgotPassword.module.scss';
import { reset } from '../../slices/auth';

function Reset() {
  const [resetUser, setResetUser] = useState({
    email: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const { email } = resetUser;

  const onChange = (e) => setResetUser({ ...resetUser, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(reset({ email }));
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
          <button>Reset</button>
        </div>
      </form>
      <div>
        <p>
          Don&apos;t have an account?
          <Link to="/auth/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Reset;
