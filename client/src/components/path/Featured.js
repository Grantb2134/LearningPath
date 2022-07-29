import React from 'react';
import styles from './featured.module.scss';

function Featured() {
  const samplePaths = [
    {
      title: 'Javascript Memorazation guide',
      description: 'The split() method takes a pattern and divides a String into an ordered list of substrings by searching for th...',
    },
    {
      title: 'Redux Toolkit From Begining to Advanced',
      description: 'The join() method creates and returns a new string by concatenating all of the elements in an array...',
    },
    {
      title: 'Data Structures with Python',
      description: 'The substring() method returns the part of the `string` between the start and end indexes, or to the end of the string.',
    },
  ];

  return (
    <div className={styles.container}>
      {samplePaths.map((path) => (
        <div className={styles.path}>
          <h4>{path.title}</h4>
          <p>{path.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Featured;
