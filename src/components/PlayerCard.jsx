import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import PlayerCard from './PlayerCard';

const App = () => {
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    // Fetch players from API and set state
  }, []);

  const handleDeletePlayer = async (playerId) => {
    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players/${playerId.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        // Remove the deleted player from the state
        setPlayers(players.filter(player => player.id !== playerId));
      } else {
        console.error('Failed to delete player:', result.error);
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div className="app">
      <h1>Puppy Bowl Players</h1>
      <div className="player-list">
        {/* Wrap PlayerCard component inside Link */}
        {players.map(player => (
          <Link key={player.id} to={`/players/${player.id}`}>
            <PlayerCard player={player} onDelete={handleDeletePlayer} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
