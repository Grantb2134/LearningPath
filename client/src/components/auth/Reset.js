import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './reset.module.scss';
import { sendResetPassword } from '../../slices/auth';

function Reset() {
  const [resetPassword, setResetPassword] = useState({
    password: '',
  });

  const { id, token } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const { password } = resetPassword;

  const onChange = (e) => setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPassword({ password, id, token }));
    navigate('/dashboard');
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={onChange} />
        </div>
        {/* <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChange} />
        </div> */}
        <div>
          <button>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
