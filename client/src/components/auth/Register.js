import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './register.module.scss';
import { createUser } from '../../slices/auth';

function Register() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const handleError = () => {};

  const {
    userInfo, success,
  } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/auth/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/dashboard');
  }, [navigate, userInfo, success, newUser]);

  const onChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = () => {
    if (newUser.password === newUser.confirmPassword) {
      dispatch(createUser(newUser)).then(() => {
        navigate('/auth/login');
      });
    }
  };

  const registerValidation = {
    username: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must have at least 3 characters',
      },
      maxLength: {
        value: 24,
        message: 'Username must have at most 24 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address format',
      },
    },
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
          <label htmlFor="username">Username</label>
          <input type="tect" id="username" {...register('username', registerValidation.username)} onChange={onChange} />
          <p className="validation-error">{errors.username && errors.username.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email', registerValidation.email)} onChange={onChange} />
          <p className="validation-error">{errors.email && errors.email.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password', registerValidation.password)} onChange={onChange} />
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
          {newUser.confirmPassword
          && newUser.password !== newUser.confirmPassword
          && <p className="validation-error">Confirmation password does not match.</p>}
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
      <div>
        <Link to="/auth/reset">Forgot password</Link>
      </div>
    </div>
  );
}

export default Register;
