import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editConcept, getConcept } from '../../slices/concepts';
import styles from './create.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { concept, loading } = useSelector((store) => store.concepts);
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
        if (userInfo.id !== res.payload.userId) {
          navigate(`/concept/${id}`);
        }
      }
    });
  }, [concept, loading, userInfo]);

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
        <input type="submit" value="Edit Concept" />
      </form>
    </section>
  );
}

export default Edit;
