import React from 'react';
import styles from './Game.module.css';

interface PlayerProps {
  x: number;
  y: number;
}

const Player: React.FC<PlayerProps> = ({ x, y }) => {
  return (
    <div
      className={styles.player}
      style={{
        gridColumn: x + 1,
        gridRow: y + 1,
      }}
    ></div>
  );
};

export default Player;
