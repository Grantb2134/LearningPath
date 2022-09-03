import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './changePassword.module.scss';
import { changePassword } from '../../slices/users';

function ChangePassword() {
  const [inputData, setInputData] = useState({
    password: '',
    confirmPassword: '',
    currentPassword: '',
  });
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const handleError = () => {};

  const onChange = (e) => setInputData({ ...inputData, [e.target.name]: e.target.value });

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

  const { password, confirmPassword, currentPassword } = inputData;

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return setConfirmPasswordMessage('Passwords do not much');
    }
    dispatch(changePassword({ password, confirmPassword, currentPassword }));
    setConfirmPasswordMessage('');
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" name="currentPassword" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" {...register('password', resetValidation.password)} onChange={onChange} />
          <p className="validation-error">{errors.password && errors.password.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={onChange}
            name="confirmPassword"
          />
          <p className="validation-error">{confirmPasswordMessage&&confirmPasswordMessage}</p>
        </div>
        <div>
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
