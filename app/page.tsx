'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@avalanche-wallet/useWallet';

export default function Home() {
  const gridSize = 10;
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const { account, isConnected, connectWallet, sendTransaction, callView, txStatus, txMessage } = useWallet();

  // Load player position from contract on wallet connect or account change
  useEffect(() => {
    const loadPosition = async () => {
      if (isConnected && account) {
        try {
          const [x, y, initialized] = await callView('getPosition', [account]);
          setIsInitialized(initialized);
          if (initialized) {
            setPlayerX(Number(x)); // Convert BigInt to Number
            setPlayerY(Number(y)); // Convert BigInt to Number
          } else {
            setPlayerX(0);
            setPlayerY(0);
          }
        } catch (error) {
          console.error("Failed to load position or check initialization:", error);
          setIsInitialized(false);
          setPlayerX(0);
          setPlayerY(0);
        }
      }
    };
    loadPosition();
  }, [isConnected, account, callView]);

  const handleInitialize = useCallback(async () => {
    if (isConnected) {
      try {
        await sendTransaction('initialize');
        setIsInitialized(true); // Assuming initialize transaction is successful
        setPlayerX(0);
        setPlayerY(0);
      } catch (error) {
        console.error("Failed to initialize:", error);
      }
    }
  }, [isConnected, sendTransaction]);

  const handleKeyDown = useCallback(async (event: KeyboardEvent) => {
    if (!isConnected || !isInitialized || txStatus === 'pending') return; // Only allow movement if wallet is connected, initialized, and no transaction is pending

    let newX = playerX;
    let newY = playerY;
    let dx = 0;
    let dy = 0;

    if (event.key === 'ArrowLeft') {
      newX = Math.max(0, playerX - 1);
      dx = -1;
    } else if (event.key === 'ArrowRight') {
      newX = Math.min(gridSize - 1, playerX + 1);
      dx = 1;
    } else if (event.key === 'ArrowUp') {
      newY = Math.max(0, playerY - 1);
      dy = -1;
    } else if (event.key === 'ArrowDown') {
      newY = Math.min(gridSize - 1, playerY + 1);
      dy = 1;
    }

    if (dx !== 0 || dy !== 0) {
      try {
        await sendTransaction('move', [dx, dy]);
        // After successful transaction, re-fetch position to ensure sync
        const [x, y] = await callView('getPosition', [account]);
        setPlayerX(Number(x)); // Convert BigInt to Number
        setPlayerY(Number(y)); // Convert BigInt to Number
      } catch (error) {
        console.error("Failed to send transaction:", error);
        // Transaction failed, player position remains unchanged on UI
      }
    }
  }, [gridSize, isConnected, isInitialized, playerX, playerY, sendTransaction, callView, account, txStatus]);

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
      {!isConnected ? (
        <>
          <p>Connect your wallet to start playing!</p>
          <button onClick={connectWallet} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Connect Wallet
          </button>
        </>
      ) : (
        <>
          <p>Wallet Connected: {account}</p>
          {isInitialized ? (
            <p>Move the player using keyboard arrows. Current position: ({playerX}, {playerY})</p>
          ) : (
            <>
              <p>Player not initialized. Initialize your position to start.</p>
              <button onClick={handleInitialize} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Initialize Player
              </button>
            </>
          )}

          {txStatus !== 'idle' && (
            <p>Transaction Status: {txStatus} - {txMessage}</p>
          )}
        </>
      )}
      <div className="grid-container" style={{ marginTop: '20px' }}>
        {gridItems}
        {isConnected && isInitialized && (
          <div
            className="player"
            style={{
              gridColumnStart: playerX + 1,
              gridRowStart: playerY + 1,
            }}
          >
            P
          </div>
        )}
      </div>
    </main>
  );
}


