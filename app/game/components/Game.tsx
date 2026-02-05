'use client';

import React, { useState } from 'react';
import Grid from './Grid';
import Player from './Player';

const Game: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); // Initial position

  return (
    <div>
      <h1>Avalanche Grid Game</h1>
      <Grid>
        <Player x={playerPosition.x} y={playerPosition.y} />
      </Grid>
      <p>Player Position: ({playerPosition.x}, {playerPosition.y})</p>
      {/* Movement instructions for user */}
      <p>Use arrow keys to move the player.</p>
    </div>
  );
};

export default Game;
