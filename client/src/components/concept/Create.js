import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './create.module.scss';

function CreateConcept() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newConcept, setNewConcept] = useState({
    title: '',
    description: '',
  });

  const { title, description } = newConcept;

  const onChange = (e) => setNewConcept({ ...newConcept, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/path/${id}`);
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
        <input type="submit" value="Create Concept" />
      </form>
    </section>
  );
}

export default CreateConcept;
