import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';
import PlayerCard from './components/PlayerCard'; // Assuming you have a PlayerCard component
import './App.css';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        imageUrl: ''
    });

    useEffect(() => {
        // Fetch players from the API when the component mounts
        const fetchPlayers = async () => {
            try {
                const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players');
                const result = await response.json();
                if (result.success) {
                    setPlayers(result.data.players);
                } else {
                    console.error('Failed to fetch players:', result.error);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                setPlayers([...players, result.data.player]);
                setFormData({
                    name: '',
                    breed: '',
                    imageUrl: ''
                });
            } else {
                console.error('Failed to add player:', result.error);
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    return (
        <div>
            <header>
                <h1>Puppy Bowl Players</h1>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<AllPlayers players={players} />} />
                    <Route path="/players/:id" element={<SinglePlayer />} />
                </Routes>
                <div className="player-form">
                    <h2>Add New Player</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="breed"
                            placeholder="Breed"
                            value={formData.breed}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Add Player</button>
                    </form>
                </div>
                <div className="player-list">
                    {players.map(player => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;