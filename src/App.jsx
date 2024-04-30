import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import PlayerCard from './components/PlayerCard';
import NewPlayer from './components/NewPlayerForm';
import SinglePlayerDetails from './components/SinglePlayer';
import './App.css'; 

const App = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        imageUrl: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
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
        const { value } = event.target;
        setSearchQuery(value);
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

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <header>
                <h1>Puppy Bowl Players</h1>
                <input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<AllPlayers players={filteredPlayers} />} />
                    <Route path="/players/:id" element={<SinglePlayerDetails />} /> {}
                </Routes>
                <NewPlayer
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
                <div className="player-list" id="puppyList">
                    {filteredPlayers.map(player => (
                        <div key={player.id}>
                            <PlayerCard player={player} />
                            <Link to={`/players/${player.id}`}>
                                <button className="details-button">Details</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;