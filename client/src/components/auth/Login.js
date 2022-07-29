import React from 'react';
import styles from './login.module.scss';

function Login() {
  return (
    <div className={styles.container}>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input type="password" id="password" name="password" />
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
          <a href="http://www.google.com">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
