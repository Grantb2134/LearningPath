import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPath } from '../../slices/paths';
import styles from './create.module.scss';

function CreatePath() {
  const navigate = useNavigate();

  const [newPath, setNewPath] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();

  const { title, description } = newPath;

  const onChange = (e) => setNewPath({ ...newPath, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPath({ path: newPath }));
    navigate('/path/create');
  };
  return (
    <section className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            <span>Title:</span>
            <input type="text" name="title" onChange={onChange} value={title} />
          </label>
        </div>
        <div>
          <label>
            <span>Description:</span>
            <textarea name="description" onChange={onChange} value={description} />
          </label>
        </div>
        <input type="submit" value="Create Path" />
      </form>
    </section>
  );
}

export default CreatePath;
