import React, { useState } from 'react';

const NewPlayerForm = () => {
    // State variables for form data
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        status: 'bench', // Default status is bench
        imageUrl: ''
    });

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
            console.log(result);
            // Clear form fields after successful submission
            setFormData({
                name: '',
                breed: '',
                status: 'bench',
                imageUrl: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="player-form">
            <h2>Add New Player</h2>
           
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="breed"
                    placeholder="Breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                >
                    <option value="bench">Bench</option>
                    <option value="field">Field</option>
                </select>
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default NewPlayerForm;