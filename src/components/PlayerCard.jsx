import React from 'react';


const PlayerCard = ({ player, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players/${player.id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                onDelete(player.id); 
            } else {
                console.error('Failed to delete player:', result.error);
            }
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    return (
        <div>
            <div>
                <p>{player.name}</p>
                <p>{`#${player.id}`}</p>
            </div>
            <img src={player.imageUrl} alt={`photo of ${player.name} the puppy`} />
            <button onClick={handleDelete}>Remove from roster</button>
        </div>
    );
};

export default PlayerCard;