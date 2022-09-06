import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editPath, getPath } from '../../slices/paths';
import styles from '../layout/formDefaults.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useSelector((store) => store.auth);
  const [editedPath, setEditedPath] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      dispatch(getPath(id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setEditedPath(res.payload);
          if (userInfo.id !== res.payload.userId) {
            navigate(`/user/${res.payload.userId}`);
          }
          reset({
            title: res.payload.title,
            description: res.payload.description,
          });
        }
      });
    }
  }, [userInfo]);

  const handleError = () => {};
  const pathValidation = {
    title: {
      required: 'Title is required',
    },
    description: {
      required: 'Description is required',
    },
  };

  const { title, description } = editedPath;

  const onChange = (e) => setEditedPath({ ...editedPath, [e.target.name]: e.target.value });
  const onSubmit = () => {
    dispatch(editPath({
      id, title, description,
    })).then(() => {
      navigate(`/path/${id}`);
    });
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
            <span>Description:</span>
            <textarea {...register('description', pathValidation.description)} onChange={onChange} />
            <p className="validation-error">{errors.description && errors.description.message}</p>
          </label>
        </div>
        <input type="submit" value="Edit Path" />
      </form>
    </section>
  );
}

export default Edit;
