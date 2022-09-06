import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.scss';

function About({
  buttonTitle, buttonLink,
}) {
  return (
    <div className={styles.container}>
      <Link to={buttonLink}>
        {buttonTitle}
        <i className="las la-plus" />
      </Link>
    </div>
  );
}

export default About;
