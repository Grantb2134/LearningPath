import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPath } from '../../slices/paths';
import styles from './create.module.scss';

function CreatePath() {
  const navigate = useNavigate();

  const [newPath, setNewPath] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const { title, description } = newPath;

  const onChange = (e) => setNewPath({ ...newPath, [e.target.name]: e.target.value });
  const handleError = () => {};
  const onSubmit = () => {
    dispatch(createPath(newPath));
    navigate('/path/create');
  };

  const pathValidation = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div>
          <label>
            <span>Title:</span>
            <input type="text" {...register('title', pathValidation.title)} onChange={onChange} value={title} />
            <p className="validation-error">{errors.title && errors.title.message}</p>
          </label>
        </div>
        <div>
          <label>
            <span>Description:</span>
            <textarea {...register('description', pathValidation.description)} onChange={onChange} value={description} />
            <p className="validation-error">{errors.description && errors.description.message}</p>
          </label>
        </div>
        <input type="submit" value="Create Path" />
      </form>
    </section>
  );
}

export default CreatePath;
