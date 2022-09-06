import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editContent, getContent } from '../../slices/contents';
import styles from '../layout/formDefaults.module.scss';

function Edit() {
  const { id } = useParams();
  const { singleContent } = useSelector((store) => store.contents);
  const { userInfo } = useSelector((store) => store.auth);
  const [editedContent, setEditedContent] = useState({});
  const { title, description, link } = editedContent;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm();
  const handleError = () => {};

  useEffect(() => {
    if (userInfo) {
      dispatch(getContent(id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setEditedContent(res.payload);
          if (userInfo.id !== res.payload.userId) {
            navigate(`/user/${res.payload.userId}`);
          }
          reset({
            title: res.payload.title,
            link: res.payload.link,
            description: res.payload.description,
          });
        }
      });
    } else {
      navigate('/');
    }
  }, [userInfo]);

  const onChange = (e) => setEditedContent({ ...editedContent, [e.target.name]: e.target.value });

  const onSubmit = () => {
    dispatch(editContent({
      id, title, description, link,
    })).then(() => {
      navigate(`/concept/${singleContent.conceptId}`);
    });
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
            <input type="text" {...register('title', pathValidation.title)} onChange={onChange} />
            <p className="validation-error">{errors.title && errors.title.message}</p>
          </label>
        </div>
        <div>
          <label>
            <span>Link:</span>
            <input type="text" {...register('link', pathValidation.link)} onChange={onChange} />
            <p className="validation-error">{errors.link && errors.link.message}</p>
          </label>
        </div>
        <div>
          <label>
            <span>Description:</span>
            <textarea {...register('description', pathValidation.description)} onChange={onChange} />
            <p className="validation-error">{errors.description && errors.description.message}</p>
          </label>
        </div>
        <input type="submit" value="Edit Content" />
      </form>
    </section>
  );
}

export default Edit;
