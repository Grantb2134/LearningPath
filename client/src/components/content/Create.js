import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

  const { title, description, link } = newContent;

  const onChange = (e) => setNewContent({ ...newContent, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createContent({
      content: {
        title, description, link, conceptId: id,
      },
    }));
    navigate(`/concept/${id}`);
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
            <span>Link:</span>
            <input type="text" name="link" onChange={onChange} value={link} />
          </label>
        </div>
        <div>
          <label>
            <span>Description:</span>
            <textarea name="description" onChange={onChange} value={description} />
          </label>
        </div>
        <input type="submit" value="Create Content" />
      </form>
    </section>
  );
}

export default CreateContent;
