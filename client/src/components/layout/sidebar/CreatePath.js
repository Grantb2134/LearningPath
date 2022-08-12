import React from 'react';
import { Link } from 'react-router-dom';
import styles from './createPath.module.scss';

function CreatePath() {
  return (
    <div className={styles.container}>
      <Link to="/path/create">
        <button>
          Create Path
          <i className="las la-plus" />
        </button>
      </Link>
    </div>
  );
}

export default CreatePath;