import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { createConcept } from '../../slices/concepts';
import styles from './create.module.scss';

function CreateConcept() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const handleError = () => {};
  const pathValidation = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
  };
  const [newConcept, setNewConcept] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();

  const { title, description } = newConcept;

  const onChange = (e) => setNewConcept({ ...newConcept, [e.target.name]: e.target.value });

  const onSubmit = () => {
    dispatch(createConcept({ title, description, pathId: id }));
    navigate(`/path/${id}`);
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
        <input type="submit" value="Create Concept" />
      </form>
    </section>
  );
}

export default CreateConcept;
