import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import AllPlayers from './components/AllPlayers';
import PlayerCard from './components/PlayerCard';
import './App.css'; 

const App = () => {
    // State variables for managing players, form data, search query
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        imageUrl: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch players from API when component mounts
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

    // Handler for input change in form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler for form submission
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

    // Filter players based on search query
    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div>
            <header>
                <h1>Puppy Bowl Players</h1>
                {/* Input for searching players */}
                <input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </header>
            <main>
                <Routes>
                    {/* Route for displaying all players */}
                    <Route path="/" element={<AllPlayers players={filteredPlayers} />} />
                    {/* Route for displaying single player details */}
                    <Route path="/players/:id" element={<SinglePlayerDetails />} />
                </Routes>
                <div className="player-form">
                    <h2>Add New Player</h2>
                    {/* Form for adding new player */}
                    <form id="addPuppyForm" onSubmit={handleSubmit}>
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
                <div className="player-list" id="puppyList">
                    {/* Display list of players */}
                    {filteredPlayers.map(player => (
                        <div key={player.id}>
                            {/* Each player card with a "Details" button */}
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

// SinglePlayerDetails component to display detailed information about a single player
const SinglePlayerDetails = () => {
    // Get player ID from URL params
    const { id } = useParams();

    // UseEffect to fetch player details based on ID
    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-MT-WEB-PT/players/${id}`);
                const result = await response.json();
                // Handle successful response
                if (result.success) {
                    console.log('Player Details:', result.data.player);
                } else {
                    console.error('Failed to fetch player details:', result.error);
                }
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayerDetails();
    }, [id]); // Dependency array to re-run effect when ID changes

    return (
        <div>
            <h2>Player Details</h2>
            <p>Player ID: {id}</p>
           
        </div>
    );
};

export default App;