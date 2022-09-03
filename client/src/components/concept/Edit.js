import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editConcept, getConcept } from '../../slices/concepts';
import styles from './edit.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { concept } = useSelector((store) => store.concepts);
  const { userInfo } = useSelector((store) => store.auth);
  const [editedConcept, setEditedConcept] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConcept(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setEditedConcept(res.payload);
        if (!userInfo||userInfo.id !== res.payload.userId) {
          navigate(`/path/${res.payload.pathId}`);
        }
      }
    });
  }, []);
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
  const { title, description } = editedConcept;

  const onChange = (e) => setEditedConcept({ ...editedConcept, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editConcept({
      concept: {
        id, title, description,
      },
    }));
    navigate(`/path/${concept.pathId}`);
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
        <input type="submit" value="Edit Concept" />
      </form>
    </section>
  );
}

export default Edit;
