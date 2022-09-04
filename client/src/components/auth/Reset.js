import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './reset.module.scss';
import { sendResetPassword } from '../../slices/auth';

function Reset() {
  const [resetPassword, setResetPassword] = useState({
    password: '',
  });

  const {
    register, handleSubmit, getValues, watch, formState: { errors },
  } = useForm();

  const handleError = () => {};

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

  const onSubmit = () => {
    dispatch(sendResetPassword({ password, id, token }));
    navigate('/dashboard');
  };

  const resetValidation = {
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      maxLength: {
        value: 35,
        message: 'Password must have at most 35 characters',
      },
      pattern: {
        value: /[!@#$%^&*(),.?":{}|<>]/,
        message: 'Password should have at least one sepcial character',
      },
    },
    confirmPassword: {
      required: 'Password is required',
    },
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password', resetValidation.password)} onChange={onChange} />
          <p className="validation-error">{errors.password && errors.password.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={onChange}
            {...register('confirmPassword', resetValidation.confirmPassword)}
          />
          {watch('confirmPassword') !== watch('password')
          && getValues('confirmPassword') ? (
            <p className="validation-error">Passwords do not match</p>
            ) : null}
        </div>
        <div>
          <button>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
