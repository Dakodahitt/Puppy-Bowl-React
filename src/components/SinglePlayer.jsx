import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SinglePlayerDetails = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players/${id}`);
                const result = await response.json();
                if (result.success) {
                    setPlayer(result.data.player);
                } else {
                    console.error('Player not found:', result.error);
                }
            } catch (error) {
                console.error('Error fetching player:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!player) {
        return <div>Player not found</div>;
    }

    return (
        <div>
            <h2>{player.name}</h2>
            <p>Breed: {player.breed}</p>
            <img src={player.imageUrl} alt={player.name} />
            
        </div>
    );
};

export default SinglePlayerDetails;