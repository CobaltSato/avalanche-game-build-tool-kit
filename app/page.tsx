'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const gridSize = 10;
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setPlayerX((prevX) => {
      let newX = prevX;
      if (event.key === 'ArrowLeft') {
        newX = Math.max(0, prevX - 1);
      } else if (event.key === 'ArrowRight') {
        newX = Math.min(gridSize - 1, prevX + 1);
      }
      return newX;
    });

    setPlayerY((prevY) => {
      let newY = prevY;
      if (event.key === 'ArrowUp') {
        newY = Math.max(0, prevY - 1);
      } else if (event.key === 'ArrowDown') {
        newY = Math.min(gridSize - 1, prevY + 1);
      }
      return newY;
    });
  }, [gridSize]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const gridItems = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      gridItems.push(
        <div key={`${x}-${y}`} className="grid-item" data-x={x} data-y={y} />
      );
    }
  }

  return (
    <main>
      <h1>Avalanche Game Toolkit</h1>
      <p>Move the player using keyboard arrows (once wallet is connected).</p>
      <div className="grid-container">
        {gridItems}
        <div
          className="player"
          style={{
            gridColumnStart: playerX + 1,
            gridRowStart: playerY + 1,
          }}
        >
          P
        </div>
      </div>
    </main>
  );
}


