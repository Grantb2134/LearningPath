import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContent } from '../../slices/contents';
import styles from './content.module.scss';

function Content({ content }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
  const onDelete = useCallback((id) => dispatch(deleteContent(id)), []);

  return (
    <div className={styles.container}>
      {content.map((singleContent) => (
        <div key={singleContent.id} className={styles.content}>
          <h4><a href={singleContent.link}>{singleContent.title}</a></h4>
          <p>{singleContent.description}</p>
          {userInfo&&userInfo.id === singleContent.userId &&(
          <div id={styles.icons}>
            <i onClick={() => onDelete(singleContent.id)} className="las la-trash-alt" />
            <Link to={`/content/edit/${singleContent.id}`}><i className="las la-pen" /></Link>
          </div>
          )}
          <div className={styles.line} />
        </div>
      ))}
    </div>
  );
}

export default Content;
