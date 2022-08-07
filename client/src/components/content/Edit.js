import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editContent, getContent } from '../../slices/contents';
import styles from './create.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { content } = useSelector((store) => store.contents);
  const [editedContent, setEditedContent] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContent(id)).then((res) => res.meta.requestStatus === 'fulfilled' && setEditedContent(res.payload));
  }, []);

  const { title, description, link } = editedContent;

  const onChange = (e) => setEditedContent({ ...editedContent, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editContent({
      content: {
        id, title, description, link,
      },
    }));
    navigate(`/concept/${content.conceptId}`);
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
        <input type="submit" value="Edit Content" />
      </form>
    </section>
  );
}

export default Edit;
