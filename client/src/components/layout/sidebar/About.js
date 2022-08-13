import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.scss';

function About({ buttonTitle, buttonLink }) {
  return (
    <div className={styles.container}>
      <div>
        <h6>Author:</h6>
        <p><strong>@username</strong></p>
      </div>

      <div>
        <h6>Followers:</h6>
        <p><strong>134</strong></p>
      </div>
      <Link to={buttonLink}>
        {buttonTitle}
        <i className="las la-plus" />
      </Link>
    </div>
  );
}

export default About;