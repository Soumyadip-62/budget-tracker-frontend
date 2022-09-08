import React from 'react'
import styles from './loading.module.css'
const Loading = () => {
  return (
    <div className='flex justify-center m-12'>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loading