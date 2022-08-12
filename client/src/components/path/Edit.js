import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPath, getPath } from '../../slices/paths';
import styles from './create.module.scss';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { path, loading } = useSelector((store) => store.paths);
  const [editedPath, setEditedPath] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && path) {
      setEditedPath({
        title: path.title,
        description: path.description,
      });
    } else {
      dispatch(getPath(id)).then((res) => res.meta.requestStatus === 'fulfilled' && setEditedPath(res.payload));
    }
  }, [path, loading]);

  const { title, description } = editedPath;

  const onChange = (e) => setEditedPath({ ...editedPath, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editPath({
      id, title, description,
    }));
    navigate(`/user/${path.userId}`);
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
        <input type="submit" value="Edit Path" />
      </form>
    </section>
  );
}

export default Edit;