import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createContent, getContentByConceptId } from '../../slices/contents';
import styles from '../layout/formDefaults.module.scss';

function CreateContent() {
  const { id } = useParams();

  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    link: '',
  });
  const { title, description, link } = newContent;
  const { userInfo } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const handleError = () => {};

  const onChange = (e) => setNewContent({ ...newContent, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!userInfo) navigate('/');
  }, [userInfo]);

  const onSubmit = () => {
    dispatch(createContent({
      title, description, link, conceptId: id,
    })).then(() => {
      dispatch(getContentByConceptId(id));
    });
    navigate(`/concept/${id}`);
  };

  const pathValidation = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
    link: {
      pattern: {
        // eslint-disable-next-line no-useless-escape
        value: /^((http|https|ftp|www):\/\/)?([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)(\.)([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]+)/,
        message: 'Please enter a valid url',
      },
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
