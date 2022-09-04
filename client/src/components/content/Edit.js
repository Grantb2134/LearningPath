import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editContent, getContent } from '../../slices/contents';
import styles from './edit.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { content } = useSelector((store) => store.contents);
  const { userInfo } = useSelector((store) => store.auth);
  const [editedContent, setEditedContent] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContent(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setEditedContent(res.payload);
        if (!userInfo||userInfo.id !== res.payload.userId) {
          navigate(`/concept/${res.payload.conceptId}`);
        }
      }
    });
  }, []);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const pathValidation = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
  };
  const { title, description, link } = editedContent;

  const onChange = (e) => setEditedContent({ ...editedContent, [e.target.name]: e.target.value });
  const handleError = () => {};

  const onSubmit = () => {
    dispatch(editContent({
      content: {
        id, title, description, link,
      },
    }));
    navigate(`/concept/${content.conceptId}`);
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
        <input type="submit" value="Edit Content" />
      </form>
    </section>
  );
}

export default Edit;
