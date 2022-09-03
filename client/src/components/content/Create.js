import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createContent } from '../../slices/contents';
import styles from './create.module.scss';

function CreateContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    link: '',
  });

  const dispatch = useDispatch();
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
  const { title, description, link } = newContent;

  const onChange = (e) => setNewContent({ ...newContent, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createContent({
      title, description, link, conceptId: id,
    }));
    navigate(`/concept/${id}`);
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
            <span>Link:</span>
            <input type="text" {...register('link', pathValidation.link)} onChange={onChange} value={link} />
            <p className="validation-error">{errors.link && errors.link.message}</p>
          </label>
        </div>
        <div>
          <label>
            <span>Description:</span>
            <textarea {...register('description', pathValidation.description)} onChange={onChange} value={description} />
            <p className="validation-error">{errors.description && errors.description.message}</p>
          </label>
        </div>
        <input type="submit" value="Create Content" />
      </form>
    </section>
  );
}

export default CreateContent;
