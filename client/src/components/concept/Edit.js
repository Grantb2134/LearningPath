import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editConcept, getConcept } from '../../slices/concepts';
import styles from '../layout/formDefaults.module.scss';

function Edit() {
  const { id } = useParams();
  const { concept } = useSelector((store) => store.concepts);
  const { userInfo } = useSelector((store) => store.auth);
  const [editedConcept, setEditedConcept] = useState({
    title: '',
    description: '',
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      dispatch(getConcept(id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setEditedConcept(res.payload);
          if (userInfo.id !== res.payload.userId) {
            navigate(`/concept/${res.payload.id}`);
          }
          reset({
            title: res.payload.title,
            description: res.payload.description,
          });
        }
      });
    } else {
      navigate('/');
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
  const { title, description } = editedConcept;

  const onChange = (e) => setEditedConcept({ ...editedConcept, [e.target.name]: e.target.value });
  const onSubmit = () => {
    dispatch(editConcept({
      id, title, description,
    })).then(() => {
      navigate(`/concept/${concept.pathId}`);
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
        <input type="submit" value="Edit Concept" />
      </form>
    </section>
  );
}

export default Edit;
