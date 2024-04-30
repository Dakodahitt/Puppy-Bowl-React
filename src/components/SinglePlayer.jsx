import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import { fetchSinglePlayer } from '../API';

function SinglePlayer() {
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { playerId } = useParams();

    useEffect(() => {
        const getPlayerByID = async () => {
            try {
                const playerData = await fetchSinglePlayer(playerId);
                setPlayer(playerData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching single player:', error);
            }
        };
        getPlayerByID();
    }, [playerId]);

    if (isLoading) return <h3>Loading...</h3>;

    if (!player) return <h3>Player not found</h3>;

    return <PlayerCard key={player.id} player={player} />;
}

export default SinglePlayer;