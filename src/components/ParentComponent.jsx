import React from 'react';
import PlayerCard from './PlayerCard';

const ParentComponent = () => {
    // Define a function to handle player deletion
    const handleDelete = (playerId) => {
        // Handle delete logic here
        console.log(`Player with ID ${playerId} deleted`);
    };

    return (
        <div>
            {/* 
                Render PlayerCard component and pass player object and handleDelete function as props 
                Make sure player object contains id, name, and imageUrl properties
            */}
            <PlayerCard 
                player={{ id: 1, name: 'Example Player', imageUrl: 'example.jpg' }} 
                onDelete={handleDelete} 
            />
        </div>
    );
};

export default ParentComponent;