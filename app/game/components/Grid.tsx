import React from 'react';
import styles from './Game.module.css';

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className={styles.gridContainer}>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className={styles.cell}></div>
      ))}
      {children}
    </div>
  );
};

export default Grid;
