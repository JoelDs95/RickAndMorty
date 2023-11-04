import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
    <h1 className={styles.notFoundTitle}>404 - Página no encontrada</h1>
    <p className={styles.notFoundMessage}>
      Lo sentimos, la página que buscas no existe.
    </p>
  </div>
  );
};

export default NotFound;